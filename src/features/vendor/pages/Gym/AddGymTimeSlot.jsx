import "../../styelsheets/Manage/addMember.css";
import { 
    Button, Form, Select, Input, message, TimePicker, Checkbox, Space, Card, Row, Col,
    Collapse, Typography, Divider, Tag, Spin, InputNumber 
} from "antd";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    ClockCircleOutlined, CalendarOutlined, ArrowLeftOutlined, ThunderboltOutlined, 
    CheckCircleOutlined, InfoCircleOutlined 
} from "@ant-design/icons";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { addGymTimeSlot } from "../../../../services/vendor/gym/endpointApi";
import moment from 'moment';

const { Option } = Select;
const { Panel } = Collapse;

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

    // ---------------------------------------------------------------------
    // ✅ NEW STATE FOR MULTIPLE DAY-WISE SLOTS
    // ---------------------------------------------------------------------
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const [slots, setSlots] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });

    const addSlot = (day) => {
        setSlots((prev) => ({
            ...prev,
            [day]: [...prev[day], { startTime: null, endTime: null, price: "" }]
        }));
    };

    const removeSlot = (day, index) => {
        setSlots((prev) => {
            const updated = [...prev[day]];
            updated.splice(index, 1);
            return { ...prev, [day]: updated };
        });
    };

    const handleSlotChange = (day, index, field, value) => {
        const updated = [...slots[day]];
        updated[index][field] = value;
        setSlots((prev) => ({ ...prev, [day]: updated }));
    };
    // ---------------------------------------------------------------------


    // Fetch gym list
    const { data: gymList, loading: gymLoading, error: gymError } = useFetchGymList(id);

    useEffect(() => {
        if (gymList?.result?.length && !selectedGymId) {
            setSelectedGymId(gymList.result[0].Id);
        }
    }, [gymList, selectedGymId]);


    useEffect(() => {
        if (gymError) {
            message.error("Failed to load gym list");
        }
    }, [gymError]);

    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);

            const hasSelectedDay = Object.values(selectedDays).some(day => day);
            if (!hasSelectedDay) {
                message.error("Please select at least one day");
                return;
            }

            const payload = {
                gymId: selectedGymId,
                startTime: values.startTime?.format('HH:mm'),
                endTime: values.endTime?.format('HH:mm'),
                days_schedule: values.scheduleType === 'daily' ? 1 : 0,

                monday: selectedDays.monday,
                tuesday: selectedDays.tuesday,
                wednesday: selectedDays.wednesday,
                thursday: selectedDays.thursday,
                friday: selectedDays.friday,
                saturday: selectedDays.saturday,
                sunday: selectedDays.sunday,

                // ✅ NEWLY ADDED DAY-WISE SLOTS
                dayWiseSlots: slots
            };

            const response = await addGymTimeSlot(payload);

            if (response.status === 200 || response.status === 201) {
                message.success('Gym time slot added successfully!');
                form.resetFields();
                navigate('/vendor/gym/timeslots');
            } else {
                message.error(response.message || 'Failed to add gym time slot');
            }

        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to add gym time slot');
        } finally {
            setLoading(false);
        }
    }, [selectedGymId, selectedDays, slots, navigate]);


    const handleGymChange = (gymId) => {
        setSelectedGymId(gymId);
        form.setFieldsValue({ selectGym: gymId });
    };

    const handleBack = () => {
        navigate('/vendor/gym/timeslots');
    };

    return (
        <div className="add-member-container">

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <Button 
                    type="text"
                    icon={<ArrowLeftOutlined />} 
                    onClick={handleBack}
                    style={{
                        color: '#1163C7',
                        border: '1px solid #1163C7',
                        borderRadius: '8px',
                        height: '40px',
                        padding: '0 16px'
                    }}
                >
                    Back to Time Slots
                </Button>
            </div>

            <h2 className=" fs-4 my-4">Add Slot Times</h2>

            {/* ---------------------------------------------------------------- */}
            {/*  NEW DAY-WISE MULTIPLE SLOT UI  */}
            {/* ---------------------------------------------------------------- */}
            <div className="wrapper">
                <Collapse defaultActiveKey={["Monday"]}>
                    {days.map((day) => (
                        <Panel header={day} key={day}>
                            <div className="slot-list">

                                {slots[day]?.map((slot, index) => (
                                    <div className="slot-row mb-3" key={index}>

                                        <TimePicker
                                            format="hh:mm A"
                                            value={slot.startTime}
                                            onChange={(time) => handleSlotChange(day, index, "startTime", time)}
                                            use12Hours
                                        />

                                        <TimePicker
                                            format="hh:mm A"
                                            value={slot.endTime}
                                            onChange={(time) => handleSlotChange(day, index, "endTime", time)}
                                            use12Hours
                                            className="ms-3"
                                        />

                                        <InputNumber
                                            min={0}
                                            placeholder="Price"
                                            value={slot.price}
                                            onChange={(value) => handleSlotChange(day, index, "price", value)}
                                            className="ms-3"
                                        />

                                        <Button danger onClick={() => removeSlot(day, index)} className="close_btn ms-3">
                                            X
                                        </Button>
                                    </div>
                                ))}

                                <Button onClick={() => addSlot(day)} className="add_btn my-3">
                                    + Add Slot
                                </Button>

                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
}
