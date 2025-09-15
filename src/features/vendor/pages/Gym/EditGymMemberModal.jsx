import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useUpdateGymMember } from '../../../../hooks/vendor/gym/useUpdateGymMember';
// Removed image button; using picture-card like venue EditMember

const { Option } = Select;

const EditGymMemberModal = ({ isVisible, onClose, selectedMember, selectedGymId, vendorId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const updateGymMemberMutation = useUpdateGymMember(selectedGymId, vendorId);

  // Pre-fill form when member data is available
  useEffect(() => {
    if (selectedMember && isVisible) {
      form.setFieldsValue({
        fullName: selectedMember.name,
        mobileNumber: selectedMember.mobile,
        password: selectedMember.raw?.nakedPassword || '',
        document: selectedMember.docType,
        documentNumber: selectedMember.docNo,
      });

      // Set existing document image if available
      if (selectedMember.docImg && selectedMember.docImg !== 'memberimage') {
        setFileList([
          {
            uid: 'existing-doc',
            name: 'existing-document.jpg',
            status: 'done',
            url: selectedMember.docImg,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [selectedMember, isVisible, form]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      form.setFieldValue('memberDoc', newFileList[0].originFileObj);
    } else {
      form.setFieldValue('memberDoc', undefined);
    }
    form.validateFields(['memberDoc']).catch(() => {});
  };

  const handleSubmit = async (values) => {
    if (!selectedMember || !selectedGymId) {
      message.error('Missing member or gym information');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Mirror venue EditMember payload keys
      formData.append('memberId', selectedMember.raw?.user_id || selectedMember.raw?.member_id || selectedMember.id);
      formData.append('fullName', values.fullName);
      formData.append('password', values.password);
      formData.append('document', values.document);
      formData.append('documentNumber', values.documentNumber);
      
      // Add document file if uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('memberDoc', fileList[0].originFileObj, fileList[0].name);
      }

      console.log('📤 Updating gym member (mirroring venue EditMember payload)');
      
      await updateGymMemberMutation.mutateAsync(formData);
      
      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      onClose();
      
    } catch (error) {
      console.error('❌ Update gym member error:', error);
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

  if (!selectedMember) {
    return null;
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: '#1163C7' }} />
          Edit Member - {selectedMember.name}
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
        autoComplete="off"
        className="edit-member-form"
      >
        <div className="form-row">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter full name' },
              { min: 2, message: 'Name must be at least 2 characters' },
              { max: 50, message: 'Name must not exceed 50 characters' }
            ]}
          >
            <Input placeholder="Enter member's full name" />
          </Form.Item>
          
          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            help="Mobile number cannot be changed after member creation"
          >
            <Input 
              placeholder="Mobile number"
              disabled
              style={{ 
                backgroundColor: '#f5f5f5', 
                color: '#666',
                cursor: 'not-allowed'
              }}
            />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          
          <Form.Item
            name="document"
            label="Document Type"
            rules={[{ required: true, message: 'Please select document type' }]}
          >
            <Select placeholder="Select document type">
              <Option value="Aadhar">Aadhar Card</Option>
              <Option value="Pan">PAN Card</Option>
              <Option value="Driving License">Driving License</Option>
              <Option value="Passport">Passport</Option>
              <Option value="Voter ID">Voter ID</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            name="documentNumber"
            label="Document Number"
            rules={[
              { required: true, message: 'Please enter document number' },
              { min: 5, message: 'Document number must be at least 5 characters' }
            ]}
          >
            <Input placeholder="Enter document number" />
          </Form.Item>
          
          <Form.Item
            label="Document Photo"
            name="memberDoc"
            rules={[
              { 
                required: false,
                message: 'Please upload document photo',
                validator: (_, value) => {
                  if (fileList.length > 0 && fileList[0].originFileObj) {
                    return Promise.resolve();
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
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
                return false;
              }}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Document</div>
                </div>
              )}
            </Upload>
            <div className="upload-hint">
              <p>• Upload a clear photo of the document</p>
              <p>• Supported formats: JPG, PNG, GIF</p>
              <p>• Maximum file size: 10MB</p>
              <p>• Leave empty to keep current document</p>
            </div>
          </Form.Item>
        </div>

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
            {loading ? 'Updating Member...' : 'Update Member'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditGymMemberModal;
