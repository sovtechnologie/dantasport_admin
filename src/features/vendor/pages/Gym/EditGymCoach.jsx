import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Upload, Select, Input, message } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusOutlined, UserOutlined, TrophyOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { updateGymCoach } from "../../../../services/vendor/gym/endpointApi";

const { Option } = Select;

export default function EditGymCoach() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coachData, setCoachData] = useState(null);
    
    // Get coach data from location state or fallback to mock data
    const coachId = location.state?.coachId || new URLSearchParams(location.search).get('id');

    // Set form values when coach data is available
    useEffect(() => {
        if (coachData) {
            form.setFieldsValue({
                coacheName: coachData.coaches_name,
                coacheType: coachData.coaches_type,
            });
            
            // Set file list if coach image exists
            if (coachData.coaches_image && coachData.coaches_image !== 'coachimage') {
                setFileList([{
                    uid: '-1',
                    name: 'current-coach.jpg',
                    status: 'done',
                    url: coachData.coaches_image,
                }]);
            } else {
                setFileList([]);
            }
        }
    }, [coachData, form]);

    // Get coach data from location state or use mock data as fallback
    useEffect(() => {
        if (location.state?.coachData) {
            // Use data passed from the list
            setCoachData(location.state.coachData);
        } else if (coachId) {
            // Fallback to mock data if no state data
            const mockCoachData = {
                id: coachId,
                coaches_name: "John Doe",
                coaches_type: "HEAD",
                coaches_image: "https://example.com/coach.jpg",
                status: 1,
                created_at: "2025-01-01T00:00:00.000Z"
            };
            setCoachData(mockCoachData);
        }
    }, [location.state, coachId]);

    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);
            console.log('Form Values:', values);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('coachesId', coachId);
            formData.append('coacheName', values.coacheName);
            formData.append('coacheType', values.coacheType);
            
            // Add image file if uploaded
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj, fileList[0].name);
            }

            console.log('FormData payload:', {
                coachesId: coachId,
                coacheName: values.coacheName,
                coacheType: values.coacheType,
                image: fileList.length > 0 ? fileList[0].name : 'No file'
            });

            // Call API
            const response = await updateGymCoach(formData);
            console.log('API Response:', response);

            if (response.status === 200 || response.status === 201) {
                message.success('Gym coach updated successfully!');
                form.resetFields();
                setFileList([]);
                // Navigate back to coaches list
                navigate('/vendor/gym/coaches');
            } else {
                message.error(response.message || 'Failed to update gym coach');
            }
        } catch (error) {
            console.error('Error updating gym coach:', error);
            message.error(error.response?.data?.message || 'Failed to update gym coach. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [coachId, fileList, navigate]);

    const handleFileChange = useCallback(({ fileList: newFileList }) => {
        setFileList(newFileList);
        
        // Update form field value for validation
        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            form.setFieldValue('coacheImage', newFileList[0].originFileObj);
        } else {
            form.setFieldValue('coacheImage', undefined);
        }
        
        // Trigger validation for the coacheImage field
        form.validateFields(['coacheImage']).catch(() => {
            // Ignore validation errors, just trigger the validation
        });
    }, [form]);

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

    const handleBack = () => {
        navigate('/vendor/gym/coaches');
    };

    // Delete functionality removed per request

    if (!coachData) {
        return (
            <div className="add-member-container">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        {coachId ? 'Loading coach data...' : 'No coach data available'}
                    </div>
                    {!coachId && (
                        <Button type="primary" onClick={() => navigate('/vendor/gym/coaches')}>
                            Back to Coaches List
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="add-member-container">
            {/* Back Button */}
            <div style={{ marginBottom: '20px' }}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={handleBack}
                    style={{ 
                        color: '#1163C7',
                        fontSize: '16px',
                        padding: '4px 8px',
                        height: 'auto'
                    }}
                >
                    Back to Coaches
                </Button>
            </div>

            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={{
                    coacheName: coachData.coaches_name,
                    coacheType: coachData.coaches_type
                }}
            >
                <h2 className="member-title">
                    EDIT GYM COACH {coachData?.id && `#${coachData.id}`}
                </h2>
                
                <div className="member-form-row">
                    <Form.Item 
                        name="coacheName" 
                        label="Enter Coach Name" 
                        rules={[{ required: true, message: 'Please enter coach name' }]}
                    >
                        <Input placeholder="Enter coach full name" />
                    </Form.Item>
                    
                    <Form.Item 
                        name="coacheType" 
                        label="Select Coach Type" 
                        rules={[{ required: true, message: 'Please select coach type' }]}
                    >
                        <Select placeholder="Select Coach Type" className="member-Select">
                            <Option value="HEAD">Head Trainer</Option>
                            <Option value="PERSONAL">Personal Trainer</Option>
                            <Option value="YOGA">Yoga Instructor</Option>
                            <Option value="FITNESS">Fitness Instructor</Option>
                            <Option value="CARDIO">Cardio Specialist</Option>
                            <Option value="STRENGTH">Strength Trainer</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item 
                        label="Upload Coach Photo" 
                        name="coacheImage" 
                        rules={[
                            { 
                                required: false, // Make it optional for edit
                                message: 'Please upload coach photo',
                                validator: (_, value) => {
                                    if (fileList.length > 0 && fileList[0].originFileObj) {
                                        return Promise.resolve();
                                    }
                                    return Promise.resolve(); // Allow empty for edit
                                }
                            }
                        ]}
                    >
                        <div>
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
                                        <div style={{ marginTop: 8 }}>Upload Photo</div>
                                    </div>
                                )}
                            </Upload>
                            <div className="upload-hint">
                                <p>• Upload a clear photo of the coach</p>
                                <p>• Supported formats: JPG, PNG, GIF</p>
                                <p>• Maximum file size: 10MB</p>
                                <p>• Leave empty to keep current photo</p>
                            </div>
                        </div>
                    </Form.Item>
                </div>

                <Form.Item className="centered-submit">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? 'UPDATING COACH...' : 'UPDATE GYM COACH'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
