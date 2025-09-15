import React, { useState, useEffect } from 'react';
import { Modal, Form, Upload, Button, message, Spin } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useUpdateGalleryImage } from '../../../../hooks/vendor/galleryImage/useUpdateGalleryImage';
import UploadImage from '../../../../assets/UploadIcon.png';

// No select needed for display order; it will remain unchanged on update

const EditGymImage = ({ isVisible, onClose, selectedImage, selectedGymId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const updateGalleryImageMutation = useUpdateGalleryImage();

  // Pre-fill form when image data is available
  useEffect(() => {
    if (selectedImage && isVisible) {
      if (selectedImage.image_url) {
        setFileList([
          {
            uid: 'existing-image',
            name: 'existing-image.jpg',
            status: 'done',
            url: selectedImage.image_url,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [selectedImage, isVisible]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !selectedGymId) {
      message.error('Missing image or gym information');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Add form fields aligned with endpoint
      formData.append('imageGalleryId', selectedImage.id);
      formData.append('venueId', selectedGymId);
      formData.append('type', 3); // type: 3 for gym
      formData.append('displayOrder', selectedImage.display_order || 1);
      
      // Add new image file if uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      console.log('📤 Updating gym image with formData:', formData);
      
      await updateGalleryImageMutation.mutateAsync(formData);
      
      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      onClose();
      
    } catch (error) {
      console.error('❌ Update gym image error:', error);
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

  if (!selectedImage) {
    return null;
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CameraOutlined style={{ color: '#1163C7' }} />
          Edit Gym Image - #{selectedImage.display_order || 'N/A'}
        </div>
      }
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      destroyOnClose
    >
      <Form layout="vertical" className="edit-gym-image-form" onFinish={handleSubmit}>
        <Form.Item label="Upload New Image (Optional)">
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
            maxCount={1}
            fileList={fileList}
            onRemove={() => setFileList([])}
            listType="text"
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }}
          >
            {fileList.length >= 1 ? null : (
              <Button icon={<UploadOutlined />}>Select New Image</Button>
            )}
          </Upload>
        </Form.Item>

        <div className="form-actions">
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginLeft: '8px' }}>
            {loading ? 'Updating...' : 'Update Gym Image'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditGymImage;
