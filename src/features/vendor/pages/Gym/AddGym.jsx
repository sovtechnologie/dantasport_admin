import { Form, Input, Button, Select, Upload, Radio, TimePicker, InputNumber, message, Card, Row, Col, Typography, Divider, Space, Tag, Spin } from 'antd';
import "../../styelsheets/Manage/VendorInfo.css";
import UploadImage from '../../../../assets/UploadIcon.png';
import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from '../../../../components/GooglePlacesAutocomplete';
import { useFetchActiveAmenities, useAddGym } from '../../../../hooks/vendor/venue/useFetchvendorVenues';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, UserOutlined, ThunderboltOutlined, CheckCircleOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function AddGym() {
    const [form] = Form.useForm();
    const { RangePicker } = TimePicker;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [mobileFileList, setMobileFileList] = useState([]);
    const [webFileList, setWebFileList] = useState([]);

    const [mapLocation, setMapLocation] = useState({
        latitude: 18.5204,
        longitude: 73.8567,
    });

    // Fetch active amenities
    const { data: amenitiesData } = useFetchActiveAmenities();
    const amenitiesOptions = amenitiesData?.resutl || [];

    const addGymMutation = useAddGym();

    const handleMobileChange = ({ fileList }) => setMobileFileList(fileList);
    const handleWebChange = ({ fileList }) => setWebFileList(fileList);

    const onPlaceSelect = ({ address, area, city, state, pincode, latitude, longitude, search }) => {
        form.setFieldsValue({ fullAddress: address, area, city, state, pincode, latitude, longitude, search });
        if (latitude && longitude) {
            setMapLocation({ latitude, longitude });
        }
    };

    useEffect(() => {
        const lat = form.getFieldValue('latitude');
        const lng = form.getFieldValue('longitude');
        if (lat && lng) setMapLocation({ latitude: lat, longitude: lng });
    }, [form]);

    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;

    const handleFinish = async (values) => {
        try {
            setLoading(true);
            const formData = new FormData();

            // Images
            if (mobileFileList[0]?.originFileObj) {
                formData.append('mobileImage', mobileFileList[0].originFileObj);
            }
            if (webFileList[0]?.originFileObj) {
                formData.append('desktopImage', webFileList[0].originFileObj);
            }

            // Map gym-specific fields to API
            formData.append('gymName', values.gymName);
            formData.append('aboutGym', values.aboutGym || '');
            formData.append('onlyWomen', values.onlyWomen === 'yes');
            formData.append('lat', values.latitude || '');
            formData.append('lng', values.longitude || '');
            formData.append('fullAddress', values.fullAddress || '');
            formData.append('state', values.state || '');
            formData.append('city', values.city || '');
            formData.append('area', values.area || '');
            formData.append('pincode', values.pincode || '');
            formData.append('termAndConditions', values.termAndConditions || '');
            formData.append('cancellationPolicy', values.cancellationPolicy || '');
            formData.append('amenitiesType', 'gym');

            // Timing and isBookable
            if (values.timing && values.timing.length === 2) {
                formData.append('startTime', values.timing[0].format('HH:mm'));
                formData.append('endTime', values.timing[1].format('HH:mm'));
            }
            formData.append('isBookable', values.isBookable === 'yes');

            // Single fixed pass name with user-provided price
            const gymPasses = [
                { passes_name: 'One day passes', price: Number(values.passPrice || 0) }
            ];
            formData.append('gymPasses', JSON.stringify(gymPasses));

            // Amenities IDs as single array similar to gymPasses
            if (values.amenities?.length) {
                formData.append('amenities', JSON.stringify(values.amenities));
            }

            const res = await addGymMutation.mutateAsync(formData);
            if (res?.status === 200) {
                message.success('Gym added successfully');
                navigate('/vendor/gym/list');
            } else {
                message.error(res?.message || 'Failed to add gym');
            }
        } catch (e) {
            message.error(e?.message || 'Failed to add gym');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="venue-info-container">
            {/* Enhanced Header */}
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                color: 'white',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate('/vendor/gym/list')}
                        style={{
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            height: '40px',
                            padding: '0 16px'
                        }}
                    >
                        Back to Gym List
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <EnvironmentOutlined style={{ fontSize: '32px', color: 'white' }} />
                    </div>
                    <div>
                        <h2 style={{ 
                            margin: 0, 
                            fontSize: '28px', 
                            fontWeight: '700',
                            color: 'white'
                        }}>
                            Add New Gym
                        </h2>
                        <p style={{ 
                            margin: '8px 0 0 0', 
                            fontSize: '16px', 
                            opacity: 0.9,
                            color: 'white'
                        }}>
                            Create a new gym listing for your business
                        </p>
                    </div>
                </div>
            </div>

            <Card style={{ 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f0f0f0'
            }}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '32px',
                        padding: '20px 0'
                    }}>
                        <Typography.Title level={2} style={{ 
                            margin: 0, 
                            color: '#1f2937',
                            fontSize: '24px',
                            fontWeight: '600'
                        }}>
                            Gym Information
                        </Typography.Title>
                        <Typography.Text style={{ 
                            color: '#6b7280',
                            fontSize: '16px'
                        }}>
                            Provide details about your gym facility
                        </Typography.Text>
                    </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="gymName" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Gym Name</span>
                                    <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please enter gym name' }]}
                        >
                            <Input 
                                placeholder="Enter gym name" 
                                size="large"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="coverMobile" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UploadOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Mobile Cover Image</span>
                                </div>
                            }
                        >
                            <Upload
                                accept="image/*"
                                beforeUpload={() => false}
                                maxCount={1}
                                listType="picture-card"
                                fileList={mobileFileList}
                                onChange={handleMobileChange}
                                style={{ width: '100%' }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <UploadOutlined style={{ fontSize: '24px', color: '#1163C7' }} />
                                    <div style={{ marginTop: '8px', color: '#6b7280' }}>Upload Image</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ marginBottom: '32px' }}>
                    <Form.Item 
                        name="aboutGym" 
                        label={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <InfoCircleOutlined style={{ color: '#1163C7' }} />
                                <span style={{ fontWeight: '600', color: '#374151', fontSize: '16px' }}>About Gym</span>
                                <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                            </div>
                        }
                        rules={[{ required: true, message: 'Please describe your gym' }]}
                    >
                        <TextArea 
                            rows={5} 
                            placeholder="Describe your gym facilities, equipment, and what makes it special..." 
                            style={{ 
                                borderRadius: '8px',
                                fontSize: '16px'
                            }}
                        />
                    </Form.Item>
                </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="onlyWomen" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UserOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Gym Type</span>
                                </div>
                            }
                            initialValue="no"
                        >
                            <Radio.Group style={{ display: 'flex', gap: '24px' }}>
                                <Radio 
                                    value="yes" 
                                    style={{ 
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}
                                >
                                    Women Only
                                </Radio>
                                <Radio 
                                    value="no" 
                                    style={{ 
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}
                                >
                                    Mixed Gender
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="amenities" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ThunderboltOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Amenities</span>
                                    <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select amenities' }]}
                        >
                            <Select 
                                mode="multiple" 
                                placeholder="Select gym amenities" 
                                size="large"
                                style={{ borderRadius: '8px' }}
                                options={amenitiesOptions.map(a => ({ 
                                    label: a.amenities_name, 
                                    value: a.id 
                                }))} 
                                optionFilterProp="label"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="isBookable" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircleOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Booking Available</span>
                                    <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select booking availability' }]}
                        >
                            <Radio.Group style={{ display: 'flex', gap: '24px' }}>
                                <Radio 
                                    value="yes" 
                                    style={{ 
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}
                                >
                                    Yes - Bookable
                                </Radio>
                                <Radio 
                                    value="no" 
                                    style={{ 
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }}
                                >
                                    No - Walk-in Only
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="timing" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ClockCircleOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Operating Hours</span>
                                </div>
                            }
                        >
                            <RangePicker 
                                format="HH:mm" 
                                minuteStep={5} 
                                size="large"
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ marginBottom: '32px' }}>
                    <Form.Item 
                        name="coverWeb" 
                        label={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <UploadOutlined style={{ color: '#1163C7' }} />
                                <span style={{ fontWeight: '600', color: '#374151' }}>Website Cover Image</span>
                            </div>
                        }
                    >
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="picture-card"
                            fileList={webFileList}
                            onChange={handleWebChange}
                            style={{ width: '100%' }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <UploadOutlined style={{ fontSize: '24px', color: '#1163C7' }} />
                                <div style={{ marginTop: '8px', color: '#6b7280' }}>Upload Image</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Divider style={{ margin: '32px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                    <EnvironmentOutlined style={{ marginRight: '8px', color: '#1163C7' }} />
                    Location Information
                </Divider>
                <div className="location-container">
                    <div className="location-form">
                        <div style={{ marginBottom: '24px' }}>
                            <Form.Item 
                                name="fullAddress" 
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                        <span style={{ fontWeight: '600', color: '#374151' }}>Full Address</span>
                                        <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                    </div>
                                }
                                rules={[{ required: true, message: 'Please enter full address' }]}
                            >
                                <Input 
                                    placeholder="Enter complete address" 
                                    size="large"
                                    style={{ borderRadius: '8px' }}
                                />
                            </Form.Item>
                        </div>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="area" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>Area</span>
                                            <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'Please enter area' }]}
                                >
                                    <Input 
                                        placeholder="Enter area" 
                                        size="large"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="city" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>City</span>
                                            <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'Please enter city' }]}
                                >
                                    <Input 
                                        placeholder="Enter city" 
                                        size="large"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="state" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>State</span>
                                            <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'Please enter state' }]}
                                >
                                    <Input 
                                        placeholder="Enter state" 
                                        size="large"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="pincode" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>Pincode</span>
                                            <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'Please enter pincode' }]}
                                >
                                    <Input 
                                        placeholder="Enter pincode" 
                                        size="large"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="passPrice" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <ThunderboltOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>Price (Per Day)</span>
                                            <Tag color="red" style={{ marginLeft: '8px' }}>Required</Tag>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'Please enter price' }]}
                                >
                                    <InputNumber 
                                        style={{ 
                                            width: '100%', 
                                            borderRadius: '8px',
                                            height: '40px'
                                        }} 
                                        placeholder="Enter price per day (e.g., 250)" 
                                        size="large"
                                        formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/₹\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="termAndConditions" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <InfoCircleOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>Terms & Conditions</span>
                                        </div>
                                    }
                                >
                                    <TextArea 
                                        rows={3} 
                                        placeholder="Enter terms and conditions..."
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item 
                                    name="cancellationPolicy" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <InfoCircleOutlined style={{ color: '#1163C7' }} />
                                            <span style={{ fontWeight: '600', color: '#374151' }}>Cancellation Policy</span>
                                        </div>
                                    }
                                >
                                    <TextArea 
                                        rows={3} 
                                        placeholder="Enter cancellation policy..."
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <div className="map-side">
                        <div className="Venue-form-row">
                            <Form.Item name="search" label="Search for a location">
                                <GooglePlacesAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Search your address" />
                            </Form.Item>
                            {/* Hidden lat/lng */}
                            <Form.Item name="latitude" hidden><Input /></Form.Item>
                            <Form.Item name="longitude" hidden><Input /></Form.Item>
                        </div>
                        <div className="map-container">
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                marginBottom: '12px' 
                            }}>
                                <EnvironmentOutlined style={{ color: '#1163C7' }} />
                                <span style={{ 
                                    fontWeight: '600', 
                                    color: '#374151',
                                    fontSize: '16px'
                                }}>
                                    Location Preview
                                </span>
                            </div>
                            <iframe
                                title="map"
                                src={mapSrc}
                                width="100%"
                                height="220"
                                style={{ 
                                    border: '1px solid #e5e7eb', 
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <Divider style={{ margin: '40px 0 24px 0' }} />

                <div style={{ 
                    textAlign: 'center', 
                    padding: '24px 0',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        size="large"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            height: '48px',
                            padding: '0 32px',
                            fontSize: '16px',
                            fontWeight: '600',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                            minWidth: '200px'
                        }}
                    >
                        {loading ? 'Creating Gym...' : 'Create Gym'}
                    </Button>
                    <div style={{ 
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#6b7280',
                        fontSize: '14px'
                    }}>
                        <InfoCircleOutlined />
                        <span>All required fields must be completed</span>
                    </div>
                </div>
            </Form>
            </Card>
        </div>
    );
}
