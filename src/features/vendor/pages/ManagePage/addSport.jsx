import "../../styelsheets/Manage/addSport.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Select,
  Button,
  TimePicker,
  InputNumber,
  Collapse,
  message,
  Input,
  Form,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAddVenueSport } from "../../../../hooks/vendor/sport/useAddVenueSport";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchSports } from "../../../../hooks/admin/sport/useFetchSport";
import { useAddSportPrice } from "../../../../hooks/vendor/venue/useAddSportPrice";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AddSport() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate: addVenueSport } = useAddVenueSport();
  const { mutate: addSportPrice } = useAddSportPrice();
  const { data: venueList, loading: venueListLoading } =
    useFetchVendorVenueList();
  const { data: sportsList, loading: sportsloading } = useFetchSports();

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Form wfrgerge Values:", values);
    // Prepare payload
    const payload = {
      venueId: values.venueId,
      sportsId: values.selectSport,
      slotDuration: values.duration,
      startTiming: "null",
      endTiming: "null",
      minimumBookingDuration: values.minduration,
      courtCount: values.courtNO,
      description: values.description,
      isBookable: true,
      // slots: slots
    };
    const secondPayload = {
      venueId: values.venueId,
      sportId: values.selectSport,
      slots: slotArray,
    };
    console.log("Payload:", slotArray);
    addVenueSport(payload, {
      onSuccess: (data) => {
        if (data.status === 200) {
          addSportPrice(secondPayload, {
            onSuccess: (data) => {
              console.log("Sport Price added:", data);
              form.resetFields();
              setSlots({});
              setLoading(false);
            },
            onError: (error) => {
              message.error(
                error?.response?.data?.message || "Failed to add sport price"
              );
              setLoading(false);
            },
          });
        }
        message.success("VenueSports created successfully");

        // ✅ Navigate to venue list
        navigate("/vendor/manage/sports");
      },
      onError: (error) => {
        message.error(
          error?.response?.data?.message || "Failed to create venueSports"
        );
        setLoading(false);
      },
    });
    message.success("Sport added successfully");
  };

  const [slots, setSlots] = useState({
    Monday: [{ startTime: null, endTime: null, price: null }],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  let slotArray = [];
  days?.forEach((day) => {
    slots[day]?.forEach((slot) => {
      let slotObj = {
        startTime: slot.startTime?.format("HH:mm"),
        endTime: slot.endTime?.format("HH:mm"),
        pricePerHour: slot.price,
      };
      // Set day booleans
      days?.forEach((d) => {
        slotObj[d.toLowerCase()] = d === day;
      });
      slotArray.push(slotObj);
    });
  });

  const [applyToDays, setApplyToDays] = useState([]);

  const handleSlotChange = (day, index, key, value) => {
    const updated = [...slots[day]];
    updated[index][key] = value;
    setSlots({ ...slots, [day]: updated });
  };

  const addSlot = (day) => {
    setSlots({
      ...slots,
      [day]: [...slots[day], { startTime: null, endTime: null, price: null }],
    });
  };

  const removeSlot = (day, index) => {
    const updated = [...slots[day]];
    updated.splice(index, 1);
    setSlots({ ...slots, [day]: updated });
  };

  const handleApply = () => {
    if (!slots.Monday.length)
      return message.warning("No Monday slots to apply.");
    if (!applyToDays.length)
      return message.warning("Select weekdays to apply.");

    const updated = { ...slots };
    applyToDays.forEach((day) => {
      updated[day] = [...slots.Monday];
    });
    setSlots(updated);
    message.success("Slots applied to selected days");
  };

  return (
    <div className="add-sport-container">
      <h2 className="add-sport-title">Add Sport</h2>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row>
          <Col lg={6}>
            <Form.Item
              name="selectVenue"
              label="Select Venue"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Venue"
                className="sport-Select"
                loading={venueListLoading}
                onChange={(value) => form.setFieldsValue({ venueId: value })}
                value={venueList?.resutl?.[0]?.venue_id}
              >
                {venueList?.resutl?.map((venue) => (
                  <Option key={venue.venue_id} value={venue.venue_id}>
                    {venue.venue_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="venueId"
              label="Venue ID"
              rules={[{ required: true }]}
            >
              <Input placeholder="venueId" disabled />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="selectSport"
              label="Select Sport"
              rules={[{ required: true }]}
            >
              {/* <Select placeholder="Select Sport" className="sport-Select">
                            <Option value="cricket">Cricket</Option>
                        </Select> */}
              {/* <Form.Item name="selectSport" label="Select Sport" rules={[{ required: true }]}> */}
              <Select
                placeholder="Select Sport"
                className="sport-Select"
                onChange={(value) => form.setFieldsValue({ selectSport: value })}
                loading={sportsloading}
                showSearch
                optionFilterProp="children" // Filter options by the text inside Option
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {sportsList?.result
                  ?.filter((sport) => sport.sports === 1) // ✅ only sports === 1
                  ?.sort((a, b) => a.sports_name.localeCompare(b.sports_name)) // ✅ sort alphabetically
                  ?.map((sport) => (
                    <Option key={sport.id} value={sport.id}>
                      {sport.sports_name}
                    </Option>
                  ))}
              </Select>
              {/* </Form.Item> */}

              {/* Hidden field to actually capture sportsId */}
              {/* <Form.Item name="sportsId" label="Sport ID" rules={[{ required: true }]}>
                            <Input placeholder="Selected Sport ID" disabled />
                        </Form.Item> */}
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="duration"
              label="Slots Duration (mins)"
              rules={[
                { required: true, message: "Slot Duration is required" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    if (value < 60)
                      return Promise.reject(
                        "Slot duration cannot be less than 60 minutes"
                      );

                    const minDuration = form.getFieldValue("minduration");
                    if (minDuration && minDuration > value) {
                      return Promise.reject(
                        "Minimum Booking Duration cannot be greater than Slot Duration"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Slot Duration (min)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="minduration"
              label="Minimum Booking Duration (mins)"
              dependencies={["duration"]}
              rules={[
                {
                  required: true,
                  message: "Minimum Booking Duration is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const slotDuration = getFieldValue("duration");
                    if (!value) return Promise.resolve();
                    if (slotDuration && value > slotDuration) {
                      return Promise.reject(
                        "Minimum Booking Duration cannot be greater than Slot Duration"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                placeholder="Min Booking Duration (min)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name="courtNO"
              label="Number of Courts"
              rules={[{ required: true }]}
            >
              <InputNumber placeholder="No. of Courts" className="sport-Number w-100" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder="Enter description"
                className="description-input"
                rows={4} // you can adjust the number of visible lines
              />
            </Form.Item>
          </Col>

        </Row>





        <div className="form-row">

        </div>

        <h2 className="add-sport-title">Timing & Pricing</h2>

        <div className="wrapper">
          <Collapse defaultActiveKey={["Monday"]}>
            {days?.map((day) => (
              <Panel header={day} key={day}>
                <div className="slot-list">
                  {slots[day]?.map((slot, index) => (
                    <div className="slot-row" key={index}>
                      <TimePicker
                        format="hh:mm A"
                        value={slot.startTime}
                        onChange={(time) =>
                          handleSlotChange(day, index, "startTime", time)
                        }
                        use12Hours
                      />
                      <TimePicker
                        format="hh:mm A"
                        value={slot.endTime}
                        onChange={(time) =>
                          handleSlotChange(day, index, "endTime", time)
                        }
                        use12Hours
                      />
                      <InputNumber
                        min={0}
                        placeholder="Price"
                        value={slot.price}
                        onChange={(value) =>
                          handleSlotChange(day, index, "price", value)
                        }
                      />
                      <Button
                        danger
                        onClick={() => removeSlot(day, index)}
                        className="close_btn"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addSlot(day)} className="add_btn">
                    + Add Slot
                  </Button>

                  {/* <div className="apply-to">
                                    <span className="apply-label">Apply To:</span>
                                    <div className="checkbox-group">
                                        {days
                                            .filter((d) => d !== day) // Exclude current day
                                            .map((d) => (
                                                <label key={d} className="checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        value={d}
                                                        checked={applyToDays.includes(d)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setApplyToDays([...applyToDays, d]);
                                                            } else {
                                                                setApplyToDays(applyToDays.filter((day) => day !== d));
                                                            }
                                                        }}
                                                    />
                                                    {d}
                                                </label>
                                            ))}
                                    </div>
                                    <Button onClick={handleApply} type="primary">
                                        Apply
                                    </Button>
                                </div> */}
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>


        <Col lg={4}>
          <div className="blue_btn">
            <Form.Item>
              <Button
                type="primary"
                className="update-btn"
                htmlType="submit"
                loading={loading}
              >
                Update Time & Price
              </Button>
            </Form.Item>
          </div>
        </Col>
      </Form>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";

// export default function AddSport(){
//     const naviagte = useNavigate();

//  const handleSubmit=()=>{
//      naviagte('/vendor/manage/sports');
//  }

//     return(
//         <>
//         <div>Add Sport</div>
//         <Button onClick={handleSubmit}>Add Sport</Button>
//         </>
//     )
// }

// AddSport.jsx

// import React, { useState } from "react";
// import { Select, Input, Collapse, TimePicker, InputNumber, Button } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// const { Option } = Select;
// const { Panel } = Collapse;

// const weekdays = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
// ];

// export default function AddSportPage() {
//     const [slots, setSlots] = useState({
//         Monday: [],
//         Tuesday: [],
//         Wednesday: [],
//         Thursday: [],
//         Friday: [],
//         Saturday: [],
//         Sunday: [],
//     });

//     const [applyToDays, setApplyToDays] = useState([]);

//     const handleAddSlot = (day) => {
//         setSlots((prev) => ({
//             ...prev,
//             [day]: [...(prev[day] || []), { start: null, end: null, price: null }],
//         }));
//     };

//     const handleSlotChange = (day, index, key, value) => {
//         const updated = [...slots[day]];
//         updated[index][key] = value;
//         setSlots({ ...slots, [day]: updated });
//     };

//     const handleRemoveSlot = (day, index) => {
//         const updated = [...slots[day]];
//         updated.splice(index, 1);
//         setSlots({ ...slots, [day]: updated });
//     };

//     const handleApplyToWeekdays = () => {
//         if (slots.Monday.length === 0) {
//             message.warning("Please add slots for Monday first.");
//             return;
//         }

//         if (applyToDays.length === 0) {
//             message.warning("Please select weekdays to apply.");
//             return;
//         }

//         const updatedSlots = { ...slots };
//         applyToDays.forEach((day) => {
//             updatedSlots[day] = [...slots.Monday]; // Copy Monday slots
//         });

//         setSlots(updatedSlots);
//         message.success("Slots applied to selected weekdays.");
//     };

//     return (
//         <div className="add-sport-container">
//             <h2 className="add-sport-title">Add Sport</h2>

//             <div className="form-row">
//                 <Select placeholder="Select Venue">
//                     <Option value="venue1">Venue 1</Option>
//                 </Select>
//                 <Input placeholder="Sport Name" />
//                 </div>
//                 <div className="form-row">
//                 <Select placeholder="Select Sport">
//                     <Option value="cricket">Cricket</Option>
//                 </Select>
//                 <Input placeholder="Booking Duration" />
//                 <InputNumber placeholder="No. of Courts" />
//                 <Input placeholder="Min Booking Duration" />
//                 <Input placeholder="Description" className="description-input" />
//             </div>

//             <Collapse defaultActiveKey={["Monday"]}>
//                 {weekdays.map((day) => (
//                     <Panel header={day} key={day} className="day-card">
//                         <div className="slot-box">
//                             {(slots[day] || []).map((slot, index) => (
//                                 <div key={index} className="slot-row">
//                                     <TimePicker
//                                         format="HH:mm:a"
//                                         onChange={(time) => handleSlotChange(day, index, "start", time)}
//                                         placeholder="Start Time"
//                                     />
//                                     <TimePicker
//                                         format="HH:mm:a"
//                                         onChange={(time) => handleSlotChange(day, index, "end", time)}
//                                         placeholder="End Time"
//                                     />
//                                     <InputNumber
//                                         placeholder="Price"
//                                         onChange={(value) => handleSlotChange(day, index, "price", value)}
//                                     />
//                                     <Button
//                                         icon={<MinusCircleOutlined />}
//                                         danger
//                                         onClick={() => handleRemoveSlot(day, index)}
//                                     />
//                                 </div>
//                             ))}
//                             <Button
//                                 icon={<PlusOutlined />}
//                                 type="dashed"
//                                 onClick={() => handleAddSlot(day)}
//                                 className="add-slot-button"
//                             >
//                                 Add Slot
//                             </Button>

//                                 <div className="apply-to-wrapper">
//                                     <Select
//                                         mode="multiple"
//                                         placeholder="Apply to"
//                                         style={{ width: 200 }}
//                                         value={applyToDays}
//                                         onChange={setApplyToDays}
//                                         options={["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => ({
//                                             label: d,
//                                             value: d,
//                                         }))}
//                                     />
//                                     <Button
//                                         type="primary"
//                                         onClick={() => handleApplyToWeekdays()}
//                                         className="apply-week-button"
//                                     >
//                                         Apply
//                                     </Button>
//                                 </div>

//                         </div>
//                     </Panel>
//                 ))}
//             </Collapse>

//             <button className="save-button">Update Time and Price</button>
//         </div>
//     );
// }
