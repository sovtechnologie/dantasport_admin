import React, { useState, useEffect } from "react";
import { Modal, Form, InputNumber, Upload, Button, message, Spin, Tooltip } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useUpdateGalleryImage } from "../../../../hooks/vendor/galleryImage/useUpdateGalleryImage";

const EditVenueImage = ({ isVisible, onClose, selectedImage, selectedVenueId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  
  const { data: venueList } = useFetchVendorVenueList();
  const updateImageMutation = useUpdateGalleryImage();

  // Set form initial values when modal opens
  useEffect(() => {
    if (isVisible && selectedImage) {
      form.setFieldsValue({
        venueId: selectedVenueId,
        imageGalleryId: selectedImage.id
      });

      // Set existing image in file list for preview
      if (selectedImage.image_url) {
        setFileList([{
          uid: selectedImage.id,
          name: `image-${selectedImage.id}`,
          status: 'done',
          url: selectedImage.image_url
        }]);
      }
    }
  }, [isVisible, selectedImage, selectedVenueId, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      console.log("📝 Form values:", values);
      console.log("🖼️ Selected image:", selectedImage);
      console.log("🏢 Selected venue ID:", selectedVenueId);
      console.log("👤 Current user:", user);

      const formData = new FormData();

      // Only append new image if a file is selected
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const fileToUpload = fileList[0].originFileObj;
        console.log("📁 New file to upload:", {
          file: fileToUpload,
          name: fileToUpload.name,
          size: fileToUpload.size,
          type: fileToUpload.type
        });
        formData.append("image", fileToUpload, fileToUpload.name);
      }

      formData.append("venueId", values.venueId.toString());
      formData.append("type", "1");
      formData.append("displayOrder", selectedImage?.display_order?.toString() || "1");
      formData.append("imageGalleryId", values.imageGalleryId.toString());

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

      console.log("🚀 Starting API call...");
      const result = await updateImageMutation.mutateAsync(formData);
      console.log("✅ API response:", result);

      // Check for 200 status code
      if (result.status === 200) {
        message.success("Image updated successfully!");
        
        // Reset form and close modal
        form.resetFields();
        setFileList([]);
        onClose();
        
        console.log("🔄 Modal closed and form reset - list should refresh automatically");
      } else {
        message.error(`Update failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      const errorMessage = error.response?.data?.message || error.message || "Failed to update image";
      message.error(`Update failed: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      console.log("📁 File selected:", file);

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
        originFileObj: file,
        url: URL.createObjectURL(file)
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
    multiple: false,
    listType: "text",
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
    accept: "image/*",
    disabled: uploading,
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOutlined style={{ color: '#1163C7' }} />
          Edit Venue Image
        </div>
      }
      open={isVisible}
      onCancel={handleCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={uploading}
          onClick={handleUpdate}
        >
          Update Image
        </Button>,
      ]}
    >
      <Spin spinning={uploading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            venueId: selectedVenueId,
            imageGalleryId: selectedImage?.id
          }}
        >
          <Form.Item
            name="venueId"
            label="Venue"
            rules={[{ required: true, message: "Please select a venue" }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              disabled
              placeholder="Venue ID"
            />
          </Form.Item>

          {/* <Form.Item
            name="displayOrder"
            label="Display Order"
            rules={[{ required: true, message: "Please enter display order" }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="Enter display order"
            />
          </Form.Item> */}

          <Form.Item
            name="imageGalleryId"
            label="Image ID"
            rules={[{ required: true, message: "Image ID is required" }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              disabled
              placeholder="Image Gallery ID"
            />
          </Form.Item>

          <Form.Item
            label="Update Image (Optional)"
            help="Leave empty to keep current image, or select a new image to replace it"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} disabled={uploading}>
                {fileList.length > 0 ? 'Change Image' : 'Select New Image'}
              </Button>
            </Upload>
            <div style={{ marginTop: 8, color: "#666", fontSize: "12px" }}>
              Supported formats: JPG, PNG, GIF. Max size: 10MB
            </div>
          </Form.Item>

          {selectedImage?.image_url && (
            <Form.Item label="Current Image">
              <div style={{ 
                border: '1px solid #d9d9d9', 
                borderRadius: '8px', 
                padding: '8px',
                textAlign: 'center'
              }}>
                <img 
                  src={selectedImage.image_url} 
                  alt="Current image" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    objectFit: 'contain' 
                  }} 
                />
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                  Current image (Position {selectedImage.display_order})
                </div>
              </div>
            </Form.Item>
          )}
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditVenueImage;
