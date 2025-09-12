import React, { useState, useEffect } from 'react';
import { Modal, Form, Upload, Button, message, Spin, Select } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useAddGalleryImage } from '../../../../hooks/vendor/galleryImage/useAddGalleryImage';
import { useFetchGalleryImage } from '../../../../hooks/vendor/galleryImage/useFetchGalleryImage';
import UploadImage from '../../../../assets/UploadIcon.png';

const { Option } = Select;

const AddGymImage = ({ isVisible, onClose, selectedGymId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [nextDisplayOrder, setNextDisplayOrder] = useState(1);

  const addGalleryImageMutation = useAddGalleryImage();
  const { data: galleryList } = useFetchGalleryImage({ venueId: selectedGymId, type: 3 });

  // Calculate next display order based on existing images
  useEffect(() => {
    if (galleryList?.result && galleryList.result.length > 0) {
      const existingOrders = galleryList.result.map(img => img.display_order).filter(order => order != null);
      const maxOrder = Math.max(...existingOrders, 0);
      setNextDisplayOrder(maxOrder + 1);
    } else {
      setNextDisplayOrder(1);
    }
  }, [galleryList, selectedGymId]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    if (!selectedGymId) {
      message.error('Please select a gym first');
      return;
    }

    if (fileList.length === 0) {
      message.error('Please select an image to upload');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Add form fields
      formData.append('venueId', selectedGymId);
      formData.append('type', 3); // type: 3 for gym
      formData.append('displayOrder', nextDisplayOrder);

      // Add single image file
      const fileToUpload = fileList[0].originFileObj || fileList[0];
      formData.append('image', fileToUpload);

      console.log('📤 Adding gym image with formData:', formData);
      
      await addGalleryImageMutation.mutateAsync(formData);
      
      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      onClose();
      
    } catch (error) {
      console.error('❌ Add gym images error:', error);
      // Error is handled by the mutation
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CameraOutlined style={{ color: '#1163C7' }} />
          Add Gym Images
        </div>
      }
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="add-gym-image-form"
      >
        <Form.Item label="Upload Image" required>
          <Upload
            accept="image/*"
            beforeUpload={(file) => {
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
              setFileList([{
                uid: file.uid || Date.now(),
                name: file.name,
                status: 'done',
                originFileObj: file,
                url: URL.createObjectURL(file)
              }]);
              return false;
            }}
            multiple={false}
            fileList={fileList}
            onRemove={() => setFileList([])}
            listType="text"
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>Select Image</Button>
          </Upload>
          <div style={{ marginTop: 8, color: '#666', fontSize: '12px' }}>Supported formats: JPG, PNG, GIF. Max size: 10MB</div>
        </Form.Item>

        <div className="form-actions">
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            style={{ marginLeft: '8px' }}
          >
            {loading ? 'Adding...' : 'Add Gym Images'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddGymImage;
