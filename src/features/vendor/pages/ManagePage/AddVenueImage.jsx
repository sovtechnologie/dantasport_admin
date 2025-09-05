import React, { useState, useEffect } from "react";
import { Modal, Upload, Button, Form, Select, InputNumber, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddGalleryImage } from "../../../../hooks/vendor/galleryImage/useAddGalleryImage";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchGalleryImage } from "../../../../hooks/vendor/galleryImage/useFetchGalleryImage";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddVenueImage = ({ isVisible, onClose, selectedVenueId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [nextDisplayOrder, setNextDisplayOrder] = useState(1);
  
  const user = useSelector((state) => state.auth.user);
  const { data: venueList, loading: venueLoading } = useFetchVendorVenueList();
  const { data: galleryList } = useFetchGalleryImage({ venueId: selectedVenueId, type: 1 });
  const addImageMutation = useAddGalleryImage();

  // Calculate next display order based on existing images
  useEffect(() => {
    if (galleryList?.result && galleryList.result.length > 0) {
      // Get all existing display orders and find the next available number
      const existingOrders = galleryList.result.map(img => img.display_order).filter(order => order != null);
      const maxOrder = Math.max(...existingOrders, 0);
      setNextDisplayOrder(maxOrder + 1);
    } else {
      setNextDisplayOrder(1);
    }
  }, [galleryList, selectedVenueId]);

  const handleUpload = async () => {
    try {
      if (fileList.length === 0) {
        message.error("Please select an image to upload");
        return;
      }

      // Validate that we have a proper file object
      const fileToCheck = fileList[0].originFileObj || fileList[0];
      if (!fileToCheck || !(fileToCheck instanceof File)) {
        message.error("Invalid file selected. Please select a valid image file.");
        return;
      }

      const values = await form.validateFields();
      setUploading(true);

      console.log("📝 Form values:", values);
      console.log("📁 File to upload:", fileList[0]);
      console.log("🏢 Selected venue ID:", selectedVenueId);
      console.log("🔢 Next display order:", nextDisplayOrder);
      console.log("👤 Current user:", user);
      console.log("🍪 Auth token:", document.cookie.split('token=')[1]?.split(';')[0] || 'No token found');

      const formData = new FormData();
      
      // Get the actual file object - handle both cases
      const fileToUpload = fileList[0].originFileObj || fileList[0];
      console.log("📁 File object details:", {
        file: fileToUpload,
        name: fileToUpload.name,
        size: fileToUpload.size,
        type: fileToUpload.type,
        hasOriginFileObj: !!fileList[0].originFileObj
      });
      
      formData.append("image", fileToUpload, fileToUpload.name);
      formData.append("venueId", values.venueId.toString());
      formData.append("type", "1");
      formData.append("displayOrder", nextDisplayOrder.toString());

      console.log("📤 FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (key === 'image') {
          console.log(`${key}:`, {
            name: value.name,
            size: value.size,
            type: value.type,
            lastModified: value.lastModified
          });
        } else {
          console.log(`${key}:`, value);
        }
      }
      
      // Additional validation
      console.log("🔍 FormData validation:");
      console.log("- Has image:", formData.has('image'));
      console.log("- Has venueId:", formData.has('venueId'));
      console.log("- Has type:", formData.has('type'));
      console.log("- Has displayOrder:", formData.has('displayOrder'));

      console.log("🚀 Starting API call...");
      const result = await addImageMutation.mutateAsync(formData);
      console.log("✅ API response:", result);
      
      // Success handling
      message.success("Image uploaded successfully!");
      
      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      onClose();
      
      console.log("🔄 Modal closed and form reset - list should refresh automatically");
    } catch (error) {
      console.error("❌ Upload error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to upload image";
      message.error(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  // Update form values when nextDisplayOrder changes
  useEffect(() => {
    if (isVisible) {
      form.setFieldsValue({
        venueId: selectedVenueId,
        displayOrder: nextDisplayOrder,
      });
    }
  }, [isVisible, selectedVenueId, nextDisplayOrder, form]);



  const uploadProps = {
    beforeUpload: (file) => {
      console.log("📁 File selected:", file);
      
      // Check if we already have a file and replace it
      if (fileList.length > 0) {
        console.log("📁 Replacing existing file");
        setFileList([]);
      }
      
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
        return false;
      }
      
      // Store the file with proper structure
      const fileObj = {
        uid: file.uid || Date.now(),
        name: file.name,
        status: 'done',
        originFileObj: file, // Store the original file object
        url: URL.createObjectURL(file) // Create preview URL
      };
      
      console.log("📁 Stored file object:", fileObj);
      setFileList([fileObj]);
      return false; // Prevent auto upload
    },
    fileList,
    onRemove: () => {
      setFileList([]);
    },
    maxCount: 1,
    multiple: false, // Explicitly disable multiple file selection
    listType: "text", // Keep simple text list like before
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
    accept: "image/*", // Only accept image files
    disabled: uploading, // Disable during upload
  };

  return (
    <Modal
      title="Add Venue Image"
      open={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          loading={uploading}
          onClick={handleUpload}
        >
          Upload Image
        </Button>,
      ]}
      width={600}
    >
      <Spin spinning={uploading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            venueId: selectedVenueId,
            displayOrder: nextDisplayOrder,
          }}
        >
          <Form.Item
            name="venueId"
            label="Select Venue"
            rules={[{ required: true, message: "Please select a venue" }]}
          >
            <Select
              placeholder="Select Venue"
              loading={venueLoading}
              disabled={!!selectedVenueId}
            >
              {venueList?.resutl?.map((venue) => (
                <Option key={venue.venue_id} value={venue.venue_id}>
                  {venue.venue_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            name="displayOrder"
            label="Display Order (Auto-assigned)"
          >
            <InputNumber
              value={nextDisplayOrder}
              disabled
              style={{ width: "100%" }}
            />
            <div style={{ marginTop: 4, color: "#666", fontSize: "12px" }}>
              This image will be positioned at slot {nextDisplayOrder}
            </div>
          </Form.Item> */}

          <Form.Item
            label="Upload Image"
            required
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} disabled={uploading}>
                Select Image
              </Button>
            </Upload>
            <div style={{ marginTop: 8, color: "#666", fontSize: "12px" }}>
              Supported formats: JPG, PNG, GIF. Max size: 10MB
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddVenueImage;
