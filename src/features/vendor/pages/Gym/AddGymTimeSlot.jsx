import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Select, Input, message, TimePicker, Checkbox, Space, Card, Row, Col, Typography, Divider, Tag, Spin } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined, CalendarOutlined, ArrowLeftOutlined, ThunderboltOutlined, CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { addGymTimeSlot } from "../../../../services/vendor/gym/endpointApi";
import moment from 'moment';

const { Option } = Select;

export default function AddGymTimeSlot() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const id = useSelector((state) => state.auth.user.id);
    const [selectedGymId, setSelectedGymId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

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

            // Check if at least one day is selected
            const hasSelectedDay = Object.values(selectedDays).some(day => day);
            if (!hasSelectedDay) {
                message.error("Please select at least one day");
                return;
            }

            // Create payload
            const payload = {
                gymId: selectedGymId,
                startTime: values.startTime.format('HH:mm'),
                endTime: values.endTime.format('HH:mm'),
                days_schedule: values.scheduleType === 'daily' ? 1 : 0,
                monday: selectedDays.monday,
                tuesday: selectedDays.tuesday,
                wednesday: selectedDays.wednesday,
                thursday: selectedDays.thursday,
                friday: selectedDays.friday,
                saturday: selectedDays.saturday,
                sunday: selectedDays.sunday
            };

            console.log('API payload:', payload);

            // Call API
            const response = await addGymTimeSlot(payload);
            console.log('API Response:', response);

            if (response.status === 200 || response.status === 201) {
                message.success('Gym time slot added successfully!');
                form.resetFields();
                setSelectedDays({
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                });
                // Navigate back to time slots list
                navigate('/vendor/gym/timeslots');
            } else {
                message.error(response.message || 'Failed to add gym time slot');
            }
        } catch (error) {
            console.error('Error adding gym time slot:', error);
            message.error(error.response?.data?.message || 'Failed to add gym time slot. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [selectedGymId, selectedDays, navigate]);

    const handleGymChange = (gymId) => {
        setSelectedGymId(gymId);
        form.setFieldsValue({ selectGym: gymId });
    };

    const handleDayChange = (day, checked) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: checked
        }));
    };

    const handleScheduleTypeChange = (value) => {
        if (value === 'daily') {
            // Select all days for daily schedule
            setSelectedDays({
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            });
        }
    };

    const handleBack = () => {
        navigate('/vendor/gym/timeslots');
    };

    const daysOptions = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    return (
        <div className="add-member-container">
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
                        onClick={handleBack}
                        style={{
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            height: '40px',
                            padding: '0 16px'
                        }}
                    >
                        Back to Time Slots
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
                        <ClockCircleOutlined style={{ fontSize: '32px', color: 'white' }} />
                    </div>
                    <div>
                        <h2 style={{ 
                            margin: 0, 
                            fontSize: '28px', 
                            fontWeight: '700',
                            color: 'white'
                        }}>
                            Add New Time Slot
                        </h2>
                        <p style={{ 
                            margin: '8px 0 0 0', 
                            fontSize: '16px', 
                            opacity: 0.9,
                            color: 'white'
                        }}>
                            Configure operating hours for your gym
                        </p>
                    </div>
                </div>
            </div>

            <Card style={{ 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f0f0f0'
            }}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        selectGym: selectedGymId,
                        scheduleType: 'custom',
                        startTime: moment('06:00', 'HH:mm'),
                        endTime: moment('18:00', 'HH:mm')
                    }}
                >
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
                            Time Slot Configuration
                        </Typography.Title>
                        <Typography.Text style={{ 
                            color: '#6b7280',
                            fontSize: '16px'
                        }}>
                            Set up your gym's operating schedule
                        </Typography.Text>
                    </div>
                
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="selectGym" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CalendarOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Select Gym</span>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select a gym' }]}
                        >
                            <Select 
                                placeholder="Choose a gym" 
                                size="large"
                                loading={gymLoading}
                                onChange={handleGymChange}
                                disabled={gymLoading || !gymList?.result?.length}
                                style={{
                                    borderRadius: '8px'
                                }}
                            >
                                {gymList?.result?.map((gym) => (
                                    <Option key={gym.Id} value={gym.Id}>
                                        {gym.gym_name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="scheduleType" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ThunderboltOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Schedule Type</span>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select schedule type' }]}
                        >
                            <Select 
                                placeholder="Choose schedule type" 
                                size="large"
                                onChange={handleScheduleTypeChange}
                                style={{
                                    borderRadius: '8px'
                                }}
                            >
                                <Option value="custom">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CalendarOutlined />
                                        Custom Days
                                    </div>
                                </Option>
                                <Option value="daily">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircleOutlined />
                                        Daily (All Days)
                                    </div>
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="startTime" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ClockCircleOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Start Time</span>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select start time' }]}
                        >
                            <TimePicker 
                                format="HH:mm"
                                size="large"
                                style={{ 
                                    width: '100%',
                                    borderRadius: '8px'
                                }}
                                placeholder="Select start time"
                            />
                        </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                        <Form.Item 
                            name="endTime" 
                            label={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ClockCircleOutlined style={{ color: '#1163C7' }} />
                                    <span style={{ fontWeight: '600', color: '#374151' }}>End Time</span>
                                </div>
                            }
                            rules={[{ required: true, message: 'Please select end time' }]}
                        >
                            <TimePicker 
                                format="HH:mm"
                                size="large"
                                style={{ 
                                    width: '100%',
                                    borderRadius: '8px'
                                }}
                                placeholder="Select end time"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ marginBottom: '32px' }}>
                    <Form.Item 
                        label={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <CalendarOutlined style={{ color: '#1163C7' }} />
                                <span style={{ fontWeight: '600', color: '#374151', fontSize: '16px' }}>Select Days</span>
                                <Tag color="blue" style={{ marginLeft: '8px' }}>
                                    Required
                                </Tag>
                            </div>
                        }
                        help="Select the days when this time slot will be active"
                    >
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: '12px',
                            padding: '20px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0'
                        }}>
                            {daysOptions.map((day) => (
                                <div
                                    key={day.key}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        background: selectedDays[day.key] ? '#1163C7' : 'white',
                                        borderRadius: '8px',
                                        border: `2px solid ${selectedDays[day.key] ? '#1163C7' : '#e2e8f0'}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: selectedDays[day.key] ? '0 4px 12px rgba(17, 99, 199, 0.2)' : 'none'
                                    }}
                                    onClick={() => handleDayChange(day.key, !selectedDays[day.key])}
                                >
                                    <Checkbox
                                        checked={selectedDays[day.key]}
                                        onChange={(e) => handleDayChange(day.key, e.target.checked)}
                                        style={{ 
                                            marginRight: '8px',
                                            color: selectedDays[day.key] ? 'white' : '#1163C7'
                                        }}
                                    />
                                    <span style={{ 
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: selectedDays[day.key] ? 'white' : '#374151'
                                    }}>
                                        {day.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div style={{ 
                            marginTop: '12px',
                            padding: '12px 16px',
                            background: '#f0f9ff',
                            borderRadius: '8px',
                            border: '1px solid #e0f2fe'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <InfoCircleOutlined style={{ color: '#1163C7' }} />
                                <span style={{ fontSize: '14px', color: '#1e40af', fontWeight: '500' }}>
                                    Selected Days: {Object.values(selectedDays).filter(Boolean).length} of 7
                                </span>
                            </div>
                        </div>
                    </Form.Item>
                </div>

                <div style={{ 
                    textAlign: 'center', 
                    padding: '32px 0',
                    borderTop: '1px solid #f0f0f0',
                    marginTop: '32px'
                }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        disabled={!selectedGymId || loading}
                        size="large"
                        style={{ 
                            width: '240px',
                            height: '56px',
                            fontSize: '18px',
                            fontWeight: '600',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        {loading ? 'Creating Time Slot...' : 'Create Time Slot'}
                    </Button>
                    <div style={{ 
                        marginTop: '16px',
                        fontSize: '14px',
                        color: '#6b7280'
                    }}>
                        <InfoCircleOutlined style={{ marginRight: '8px' }} />
                        This will create a new time slot for the selected gym
                    </div>
                </div>
            </Form>
            </Card>
        </div>
    );
}
