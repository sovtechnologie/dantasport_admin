import React, { useState, useCallback, useEffect } from "react";
import { Modal, Form, Input, Button, message, Select, Upload } from "antd";
import { UserOutlined, PhoneOutlined, IdcardOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useUpdateMember } from "../../../../hooks/vendor/members/useUpdateMember";

const { Option } = Select;

const EditMemberModal = ({ isVisible, onClose, selectedMember, selectedVenueId, vendorId }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const updateMemberMutation = useUpdateMember(selectedVenueId, vendorId);

  // Set form values when member data changes
  useEffect(() => {
    if (selectedMember && isVisible) {
      form.setFieldsValue({
        fullName: selectedMember.name,
        mobileNumber: selectedMember.mobile,
        password: selectedMember.raw?.nakedPassword || '',
        document: selectedMember.docType,
        documentNumber: selectedMember.docNo,
      });
      
      // Set file list if document image exists
      if (selectedMember.docImg && selectedMember.docImg !== 'placeholder') {
        setFileList([{
          uid: '-1',
          name: 'current-document.jpg',
          status: 'done',
          url: selectedMember.docImg,
        }]);
      } else {
        setFileList([]);
      }
    }
  }, [selectedMember, isVisible, form]);

  const handleSubmit = useCallback(async (values) => {
    try {
      setIsSubmitting(true);
      console.log("📝 Form values:", values);

      // Create FormData for member update (to handle file uploads)
      const formData = new FormData();
      // Use raw member data to get the correct user_id or member_id
      const memberId = selectedMember.raw?.user_id || selectedMember.raw?.member_id || selectedMember.id;
      
      console.log("🔍 Edit Member ID resolution:", {
        'selectedMember.raw?.user_id': selectedMember.raw?.user_id,
        'selectedMember.raw?.member_id': selectedMember.raw?.member_id,
        'selectedMember.id': selectedMember.id,
        'resolved memberId': memberId
      });
      
      formData.append("memberId", memberId);
      formData.append("fullName", values.fullName);
      // Mobile number is not editable, so we don't include it in the payload
      formData.append("password", values.password);
      formData.append("document", values.document);
      formData.append("documentNumber", values.documentNumber);

      // Add document file if uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("memberDoc", fileList[0].originFileObj, fileList[0].name);
      }

      console.log("📤 Updating member data:", {
        memberId: memberId,
        fullName: values.fullName,
        mobileNumber: "Not editable (disabled)",
        document: values.document,
        documentNumber: values.documentNumber,
        hasDocument: fileList.length > 0
      });

      await updateMemberMutation.mutateAsync(formData);
      
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
  }, [form, selectedMember, updateMemberMutation, onClose, fileList]);

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
          Edit Member - {selectedMember?.name}
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
            className="form-item-half"
            help="Mobile number cannot be changed after member creation"
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Mobile number"
              size="large"
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
              required: false, // Make it optional for edit
              message: 'Please upload document photo',
              validator: (_, value) => {
                if (fileList.length > 0 && fileList[0].originFileObj) {
                  return Promise.resolve();
                }
                return Promise.resolve(); // Allow empty for edit
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
            <p>• Leave empty to keep current document</p>
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
            {isSubmitting ? 'Updating Member...' : 'Update Member'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditMemberModal;
