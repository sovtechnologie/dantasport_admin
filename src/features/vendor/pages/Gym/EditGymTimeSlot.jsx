import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Select, Input, message, TimePicker, Checkbox, Space } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClockCircleOutlined, CalendarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { updateGymTimeSlot } from "../../../../services/vendor/gym/endpointApi";
import moment from 'moment';

const { Option } = Select;

export default function EditGymTimeSlot() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [timeSlotData, setTimeSlotData] = useState(null);
    const [selectedDays, setSelectedDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });
    
    // Get time slot data from location state or fallback to mock data
    const timeSlotId = location.state?.timeSlotId || new URLSearchParams(location.search).get('id');

    // Set form values when time slot data is available
    useEffect(() => {
        if (timeSlotData) {
            form.setFieldsValue({
                startTime: moment(timeSlotData.start_time, 'HH:mm:ss'),
                endTime: moment(timeSlotData.end_time, 'HH:mm:ss'),
                scheduleType: timeSlotData.days_schedule === 1 ? 'daily' : 'custom'
            });
            
            // Set selected days
            setSelectedDays({
                monday: timeSlotData.monday === 1,
                tuesday: timeSlotData.tuesday === 1,
                wednesday: timeSlotData.wednesday === 1,
                thursday: timeSlotData.thursday === 1,
                friday: timeSlotData.friday === 1,
                saturday: timeSlotData.saturday === 1,
                sunday: timeSlotData.sunday === 1
            });
        }
    }, [timeSlotData, form]);

    // Get time slot data from location state or use mock data as fallback
    useEffect(() => {
        if (location.state?.timeSlotData) {
            // Use data passed from the list
            setTimeSlotData(location.state.timeSlotData);
        } else if (timeSlotId) {
            // Fallback to mock data if no state data
            const mockTimeSlotData = {
                id: timeSlotId,
                gym_id: 35,
                start_time: "06:00:00",
                end_time: "17:00:00",
                days_schedule: 1,
                monday: 1,
                tuesday: 1,
                wednesday: 1,
                thursday: 1,
                friday: 1,
                saturday: 1,
                sunday: 0,
                created_at: "2025-09-10T11:24:31.000Z",
                updated_at: "2025-09-10T12:01:19.000Z"
            };
            setTimeSlotData(mockTimeSlotData);
        }
    }, [location.state, timeSlotId]);

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
                gymTimeSlotId: timeSlotId,
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
            const response = await updateGymTimeSlot(payload);
            console.log('API Response:', response);

            if (response.status === 200 || response.status === 201) {
                message.success('Gym time slot updated successfully!');
                form.resetFields();
                // Navigate back to time slots list
                navigate('/vendor/gym/timeslots');
            } else {
                message.error(response.message || 'Failed to update gym time slot');
            }
        } catch (error) {
            console.error('Error updating gym time slot:', error);
            message.error(error.response?.data?.message || 'Failed to update gym time slot. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [timeSlotId, selectedDays, navigate]);

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

    if (!timeSlotData) {
        return (
            <div className="add-member-container">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        {timeSlotId ? 'Loading time slot data...' : 'No time slot data available'}
                    </div>
                    {!timeSlotId && (
                        <Button type="primary" onClick={() => navigate('/vendor/gym/timeslots')}>
                            Back to Time Slots List
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
                    Back to Time Slots
                </Button>
            </div>

            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={{
                    startTime: moment(timeSlotData.start_time, 'HH:mm:ss'),
                    endTime: moment(timeSlotData.end_time, 'HH:mm:ss'),
                    scheduleType: timeSlotData.days_schedule === 1 ? 'daily' : 'custom'
                }}
            >
                <h2 className="member-title">
                    EDIT GYM TIME SLOT #{timeSlotData?.id}
                </h2>
                
                <div className="member-form-row">
                    <Form.Item 
                        name="scheduleType" 
                        label="Schedule Type" 
                        rules={[{ required: true, message: 'Please select schedule type' }]}
                    >
                        <Select 
                            placeholder="Select Schedule Type" 
                            className="member-Select"
                            onChange={handleScheduleTypeChange}
                        >
                            <Option value="custom">Custom Days</Option>
                            <Option value="daily">Daily (All Days)</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item 
                        name="startTime" 
                        label="Start Time" 
                        rules={[{ required: true, message: 'Please select start time' }]}
                    >
                        <TimePicker 
                            format="HH:mm"
                            style={{ width: '100%' }}
                            placeholder="Select start time"
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="endTime" 
                        label="End Time" 
                        rules={[{ required: true, message: 'Please select end time' }]}
                    >
                        <TimePicker 
                            format="HH:mm"
                            style={{ width: '100%' }}
                            placeholder="Select end time"
                        />
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item 
                        label="Select Days" 
                        required
                        help="Select the days when this time slot will be active"
                    >
                        <div style={{ 
                            padding: '16px', 
                            border: '1px solid #d9d9d9', 
                            borderRadius: '6px',
                            backgroundColor: '#fafafa'
                        }}>
                            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                {daysOptions.map((day) => (
                                    <Checkbox
                                        key={day.key}
                                        checked={selectedDays[day.key]}
                                        onChange={(e) => handleDayChange(day.key, e.target.checked)}
                                        style={{ 
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {day.label}
                                    </Checkbox>
                                ))}
                            </Space>
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
                        {loading ? 'UPDATING TIME SLOT...' : 'UPDATE GYM TIME SLOT'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
