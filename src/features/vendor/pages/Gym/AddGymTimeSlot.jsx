import "../../styelsheets/Manage/addMember.css";
import { 
    Button, Form, TimePicker, message, Collapse, InputNumber, Spin 
} from "antd";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { addGymTimeSlot, updateGymTimeSlot } from "../../../../services/vendor/gym/endpointApi";
import moment from "moment/moment";

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

  // Jab user slot add kare kisi day ke liye
const addSlot = (day) => {
     if (slots[day].length >= 2) {
        message.warning(`You can add maximum 2 slots for ${day}`);
        return;
    }
    setSlots((prev) => ({
        ...prev,
        [day]: [...prev[day], { startTime: null, endTime: null, price: "" }]
    }));
    // ✅ Automatically mark day as selected
    setSelectedDays(prev => ({ ...prev, [day.toLowerCase()]: true }));
};


const location = useLocation();
const mode = location.state?.mode || "add";
const isEdit = mode === "edit"; // ✅ Add this
const editData = location.state?.timeSlotData || null;


const passedGymId = location.state?.gymId;

useEffect(() => {
  if (passedGymId) {
    setSelectedGymId(passedGymId);
    form.setFieldsValue({
      gymId: passedGymId
    });
  }
}, [passedGymId]);

useEffect(() => {
  if (mode === "edit" && editData) {

    // 🔹 days checkbox prefill
    setSelectedDays({
      monday: editData.monday === 1,
      tuesday: editData.tuesday === 1,
      wednesday: editData.wednesday === 1,
      thursday: editData.thursday === 1,
      friday: editData.friday === 1,
      saturday: editData.saturday === 1,
      sunday: editData.sunday === 1,
    });

    // 🔹 ek basic slot prefill (API single slot leti hai)
    const daysMap = {
      Monday: "monday",
      Tuesday: "tuesday",
      Wednesday: "wednesday",
      Thursday: "thursday",
      Friday: "friday",
      Saturday: "saturday",
      Sunday: "sunday",
    };

    let updatedSlots = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    Object.keys(daysMap).forEach(day => {
      if (editData[daysMap[day]] === 1) {
        updatedSlots[day] = [{
          startTime: moment(editData.start_time, "HH:mm:ss"),
          endTime: moment(editData.end_time, "HH:mm:ss"),
          price: ""
        }];
      }
    });

    setSlots(updatedSlots);
    setSelectedGymId(editData.gym_id);
  }
}, [mode, editData]);



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

    // Fetch gym list
    const { data: gymList, loading: gymLoading, error: gymError } = useFetchGymList(id);

    useEffect(() => {
    if (
        gymList?.result?.length &&
        !selectedGymId &&
        !passedGymId   // 🔒 IMPORTANT
    ) {
        setSelectedGymId(gymList.result[0].Id);
    }
}, [gymList, selectedGymId, passedGymId]);


    useEffect(() => {
        if (gymError) {
            message.error("Failed to load gym list");
        }
    }, [gymError]);

    const handleBack = () => {
        navigate('/vendor/gym/timeslots');
    };

    // ----------------- FIXED onFinish -----------------
   const onFinish = useCallback(async () => {
  try {
    setLoading(true);

    const payload = {
      gymId: selectedGymId,
      startTime: null,
      endTime: null,
      days_schedule: 1,
      monday: selectedDays.monday,
      tuesday: selectedDays.tuesday,
      wednesday: selectedDays.wednesday,
      thursday: selectedDays.thursday,
      friday: selectedDays.friday,
      saturday: selectedDays.saturday,
      sunday: selectedDays.sunday,
    };

    for (let day of days) {
      if (slots[day]?.length > 0) {
        payload.startTime = slots[day][0].startTime?.format("HH:mm");
        payload.endTime = slots[day][0].endTime?.format("HH:mm");
        break;
      }
    }

    if (!payload.startTime || !payload.endTime) {
      message.error("Please add at least one slot");
      return;
    }

 let response;

if (mode === "edit") {
  response = await updateGymTimeSlot({
    gymTimeSlotId: editData.id,
    ...payload
  });
} else {
  response = await addGymTimeSlot(payload);
}


    if (response.status === 200 || response.status === 201) {
  message.success(
    mode === "edit"
      ? "Gym time slot updated successfully!"
      : "Gym time slot added successfully!"
  );
  navigate("/vendor/gym/timeslots");


    } else {
      message.error(response.message || "Operation failed");
    }

  } catch (err) {
    message.error(
      err.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
}, [isEdit, editData, selectedGymId, selectedDays, slots]);


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

          <h2 className="fs-4 my-4">
  {mode === "edit" ? "Edit Slot Times" : "Add Slot Times"}
</h2>


            {gymLoading ? <Spin size="large" /> : (
                <>
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

                                        {/* <InputNumber
                                            min={0}
                                            placeholder="Price"
                                            value={slot.price}
                                            onChange={(value) => handleSlotChange(day, index, "price", value)}
                                            className="ms-3"
                                        /> */}

                                        <Button danger onClick={() => removeSlot(day, index)} className="close_btn ms-3">
                                            X
                                        </Button>
                                    </div>
                                ))}

                                <Button onClick={() => addSlot(day)} className="add_btn my-3"   disabled={slots[day]?.length >= 2}>
                                    + Add Slot
                                </Button>

                            </div>
                        </Panel>
                    ))}
                </Collapse>

            <Button type="primary" onClick={onFinish} loading={loading}>
  {mode === "edit" ? "Update Slots" : "Submit Slots"}
</Button>

                </>
            )}
        </div>
    );
}
