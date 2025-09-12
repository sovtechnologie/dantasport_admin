import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Upload, Select, Input, message } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, UploadOutlined, UserOutlined, TrophyOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { addGymCoach } from "../../../../services/vendor/gym/endpointApi";

const { Option } = Select;

export default function AddGymCoach() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const id = useSelector((state) => state.auth.user.id);
    const [selectedGymId, setSelectedGymId] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch gym list
    const { data: gymList, loading: gymLoading, error: gymError } = useFetchGymList(id);

    // Set default gym when gym list loads
    useEffect(() => {
        if (gymList?.result?.length && !selectedGymId) {
            setSelectedGymId(gymList.result[0].Id);
        }
    }, [gymList, selectedGymId]);

    // Handle errors
    useEffect(() => {
        if (gymError) {
            message.error("Failed to load gym list");
        }
    }, [gymError]);

    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);
            console.log('Form Values:', values);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('gymId', selectedGymId);
            formData.append('coacheName', values.coacheName);
            formData.append('coacheType', values.coacheType);
            formData.append('type', 'gym');
            
            // Add image file if uploaded
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj, fileList[0].name);
            }

            console.log('FormData payload:', {
                gymId: selectedGymId,
                coacheName: values.coacheName,
                coacheType: values.coacheType,
                type: 'gym',
                image: fileList.length > 0 ? fileList[0].name : 'No file'
            });

            // Call API
            const response = await addGymCoach(formData);
            console.log('API Response:', response);

            if (response.status === 200 || response.status === 201) {
                message.success('Gym coach added successfully!');
                form.resetFields();
                setFileList([]);
                // Navigate back to coaches list
                navigate('/vendor/gym/coaches');
            } else {
                message.error(response.message || 'Failed to add gym coach');
            }
        } catch (error) {
            console.error('Error adding gym coach:', error);
            message.error(error.response?.data?.message || 'Failed to add gym coach. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [selectedGymId, fileList, navigate]);

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

    const handleGymChange = (gymId) => {
        setSelectedGymId(gymId);
        form.setFieldsValue({ selectGym: gymId });
    };

    const handleBack = () => {
        navigate('/vendor/gym/coaches');
    };

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
                    selectGym: selectedGymId,
                    coacheType: 'HEAD'
                }}
            >
                <h2 className="member-title">
                    ADD GYM COACH
                </h2>
                
                <div className="member-form-row">
                    <Form.Item 
                        name="selectGym" 
                        label="Select Gym" 
                        rules={[{ required: true, message: 'Please select a gym' }]}
                    >
                        <Select 
                            placeholder="Select Gym" 
                            className="member-Select"
                            loading={gymLoading}
                            onChange={handleGymChange}
                            disabled={gymLoading || !gymList?.result?.length}
                        >
                            {gymList?.result?.map((gym) => (
                                <Option key={gym.Id} value={gym.Id}>
                                    {gym.gym_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item 
                        name="coacheName" 
                        label="Enter Coach Name" 
                        rules={[{ required: true, message: 'Please enter coach name' }]}
                    >
                        <Input placeholder="Enter coach full name" />
                    </Form.Item>
                </div>

                <div className="member-form-row">
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
                    
                    <Form.Item 
                        label="Upload Coach Photo" 
                        name="coacheImage" 
                        rules={[
                            { 
                                required: true, 
                                message: 'Please upload coach photo',
                                validator: (_, value) => {
                                    if (fileList.length > 0 && fileList[0].originFileObj) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Please upload coach photo'));
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
                                    <div style={{ marginTop: 8 }}>Upload Photo</div>
                                </div>
                            )}
                        </Upload>
                        <div className="upload-hint">
                            <p>• Upload a clear photo of the coach</p>
                            <p>• Supported formats: JPG, PNG, GIF</p>
                            <p>• Maximum file size: 10MB</p>
                        </div>
                    </Form.Item>
                </div>

                <Form.Item className="centered-submit">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        disabled={!selectedGymId || loading}
                    >
                        {loading ? 'ADDING COACH...' : 'ADD GYM COACH'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
