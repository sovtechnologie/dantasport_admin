import React, { useState, useCallback } from "react";
import { Modal, Form, Input, Select, Upload, Button, message, Spin } from "antd";
import { PlusOutlined, UploadOutlined, UserOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";
import { useAddMember } from "../../../../hooks/vendor/members/useAddMember";

const { Option } = Select;

const AddMemberModal = ({ isVisible, onClose, selectedVenueId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addMemberMutation = useAddMember();

  const handleSubmit = useCallback(async (values) => {
    try {
      setIsSubmitting(true);
      console.log("📝 Form values:", values);

      // Create FormData
      const formData = new FormData();
      formData.append("venueId", String(selectedVenueId));
      formData.append("fullName", values.fullName);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("password", values.password);
      formData.append("document", values.document);
      formData.append("documentNumber", values.documentNumber);
      formData.append("type", "1"); // Member type

      // Add document file if uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("memberDoc", fileList[0].originFileObj, fileList[0].name);
      }

      // Debug: Log all FormData entries
      console.log("📤 FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      console.log("📤 Submitting member data:", {
        venueId: selectedVenueId,
        fullName: values.fullName,
        mobileNumber: values.mobileNumber,
        document: values.document,
        documentNumber: values.documentNumber,
        hasDocument: fileList.length > 0
      });

      await addMemberMutation.mutateAsync(formData);
      
      // Reset form and close modal
      form.resetFields();
      setFileList([]);
      onClose();
      
    } catch (error) {
      console.error("❌ Submit error:", error);
      // Error is handled by the mutation's onError
    } finally {
      setIsSubmitting(false);
    }
  }, [form, fileList, selectedVenueId, addMemberMutation, onClose]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setFileList([]);
    onClose();
  }, [form, onClose]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    // Update form field value for validation
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      form.setFieldValue('memberDoc', newFileList[0].originFileObj);
    } else {
      form.setFieldValue('memberDoc', undefined);
    }
    
    // Trigger validation for the memberDoc field
    form.validateFields(['memberDoc']).catch(() => {
      // Ignore validation errors, just trigger the validation
    });
  };

  const beforeUpload = (file) => {
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
    return false; // Prevent auto upload
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: '#1163C7' }} />
          Add New Member
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
        className="add-member-form"
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
            className="form-item-half"
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter full name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please enter mobile number' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
            ]}
            className="form-item-half"
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Enter mobile number"
              size="large"
              maxLength={10}
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
            className="form-item-half"
          >
            <Input.Password 
              placeholder="Enter password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="document"
            label="Document Type"
            rules={[{ required: true, message: 'Please select document type' }]}
            className="form-item-half"
          >
            <Select placeholder="Select document type" size="large">
              <Option value="Aadhar">Aadhar Card</Option>
              <Option value="Pan">PAN Card</Option>
              <Option value="Driving License">Driving License</Option>
              <Option value="Passport">Passport</Option>
              <Option value="Voter ID">Voter ID</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="documentNumber"
          label="Document Number"
          rules={[
            { required: true, message: 'Please enter document number' },
            { min: 5, message: 'Document number must be at least 5 characters' }
          ]}
        >
          <Input 
            prefix={<IdcardOutlined />} 
            placeholder="Enter document number"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Document Photo"
          name="memberDoc"
          rules={[
            { 
              required: true, 
              message: 'Please upload document photo',
              validator: (_, value) => {
                if (fileList.length > 0 && fileList[0].originFileObj) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please upload document photo'));
              }
            }
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={beforeUpload}
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
          </div>
        </Form.Item>

        <div className="form-actions">
          <Button 
            type="default" 
            onClick={handleCancel}
            size="large"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Member...' : 'Add Member'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
