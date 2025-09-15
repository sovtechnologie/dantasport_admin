import "../../styelsheets/Manage/addSport.css";
import React, { useEffect, useState } from "react";
import { Select, Button, TimePicker, InputNumber, Collapse, message, Input, Form } from "antd";
import { useAddVenueSport } from "../../../../hooks/vendor/sport/useAddVenueSport";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchSports } from "../../../../hooks/admin/sport/useFetchSport";
import { useAddSportPrice } from "../../../../hooks/vendor/venue/useAddSportPrice";
import { useFetchSportPrice } from "../../../../hooks/vendor/venue/useFetchSportPrice";
import { useFetchVenueSport } from "../../../../hooks/vendor/sport/useFetchVenueSport";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";


const { Panel } = Collapse;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AddSport() {
    const vendorId = useSelector((state) => state.auth.user.id);
    const { id } = useParams();
    const [form] = Form.useForm();
    const { mutate: addVenueSport } = useAddVenueSport();
    const { mutate: addSportPrice } = useAddSportPrice();
    const { data: venueList, loading: venueListLoading } = useFetchVendorVenueList();
    const { data: sportsList, loading: sportsloading } = useFetchSports();
    const { data: sportPriceData, loading: sportPriceLoading } = useFetchSportPrice({ venueId: 19, sportId: 22 }); // Example IDs, replace with actual
    console.log("Sport Price Data:", sportPriceData?.result);

    const onFinish = (values) => {
        console.log('Form wfrgerge Values:', values);
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
            slots: slotArray
        };
        console.log('Payload:', slotArray);
        addVenueSport(payload, {
            onSuccess: (data) => {
                if (data.status === 200) {
                    addSportPrice(secondPayload, {
                        onSuccess: (data) => {
                            console.log("Sport Price added:", data);
                            form.resetFields();
                            setSlots({});
                        },
                        onError: (error) => {
                            message.error(error?.response?.data?.message || 'Failed to add sport price');
                        }
                    })
                }
                message.success('VenueSports created successfully');

                // ✅ Navigate to venue list
                // navigate("/admin/venues")
            },
            onError: (error) => {
                message.error(error?.response?.data?.message || 'Failed to create venueSports');
            }
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
    days?.forEach(day => {
        slots[day]?.forEach(slot => {
            let slotObj = {
                startTime: slot.startTime?.format("HH:mm"),
                endTime: slot.endTime?.format("HH:mm"),
                pricePerHour: slot.price
            };
            // Set day booleans
            days?.forEach(d => {
                slotObj[d.toLowerCase()] = d === day;
            });
            slotArray.push(slotObj);
        });
    });


    const handleSlotChange = (day, index, key, value) => {
        const updated = [...slots[day]];
        updated[index][key] = value;
        setSlots({ ...slots, [day]: updated });
    };

    const addSlot = (day) => {
        setSlots({ ...slots, [day]: [...slots[day], { startTime: null, endTime: null, price: null }] });
    };

    const removeSlot = (day, index) => {
        const updated = [...slots[day]];
        updated.splice(index, 1);
        setSlots({ ...slots, [day]: updated });
    };

    useEffect(() => {
        if (sportPriceData?.result?.length) {
            // Initialize empty slots object with empty arrays
            const newSlots = days.reduce((acc, day) => {
                acc[day] = [];
                return acc;
            }, {});

            sportPriceData.result.forEach(slot => {
                days.forEach(day => {
                    const dayFlag = slot[day.toLowerCase()];
                    if (dayFlag) {
                        newSlots[day].push({
                            startTime: slot.start_time ? dayjs(slot.start_time, "HH:mm:ss") : null,
                            endTime: slot.end_time ? dayjs(slot.end_time, "HH:mm:ss") : null,
                            price: slot.price ? Number(slot.price) : null,
                        });
                    }
                });
            });

            // Set slots state with populated data
            setSlots(newSlots);
        }
    }, [sportPriceData]);


    return (
        <div className="add-sport-container">

            <h2 className="add-sport-title">Edit Sport</h2>
            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <div className="form-row">
                    <Form.Item name="selectVenue" label="Select Venue" rules={[{ required: true }]}>
                        <Input className="sport-Select" disabled />
                        {/* <Select
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
                        </Select> */}
                    </Form.Item>
                    <Form.Item name="venueId" label="Venue ID" rules={[{ required: true }]}>
                        <Input placeholder="Enter the venueId" disabled />
                    </Form.Item>
                </div>

                <div className="form-row">
                    <Form.Item name="selectSport" label="Select Sport" rules={[{ required: true }]}>

                        <Select
                            placeholder="Select Sport"
                            className="sport-Select"
                            onChange={(value) => form.setFieldsValue({ selectSport: value })}
                            loading={sportsloading}
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


                    </Form.Item>

                    <Form.Item name="duration" label="Slots Duration (mins)" rules={[{ required: true }]}>
                        <Input placeholder="Booking Duration" />
                    </Form.Item>
                </div>

                <div className="form-row">
                    <Form.Item name="minduration" label="Minimum Booking Duration" rules={[{ required: true }]}>
                        <Input placeholder="Min Booking Duration" />
                    </Form.Item>
                    <Form.Item name="courtNO" label="Number of Courts" rules={[{ required: true }]}>
                        <InputNumber placeholder="No. of Courts" className="sport-Number" />
                    </Form.Item>

                </div>

                <div className="form-row">
                    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                        <Input placeholder="Description" className="description-input" />
                    </Form.Item>
                </div>



                <h2 className="add-sport-title">Timing & Pricing</h2>

                <Collapse defaultActiveKey={["Monday"]}>
                    {days?.map(day => (
                        <Panel header={day} key={day}>
                            <div className="slot-list">
                                {slots[day]?.map((slot, index) => (
                                    <div className="slot-row" key={index}>
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
                                        />
                                        <InputNumber
                                            min={0}
                                            placeholder="Price"
                                            value={slot.price}
                                            onChange={(value) => handleSlotChange(day, index, "price", value)}
                                        />
                                        <Button danger onClick={() => removeSlot(day, index)} className="remove-slot-btn">
                                            X
                                        </Button>
                                    </div>
                                ))}
                                <Button onClick={() => addSlot(day)} className="AddSlot-btn">+ Add Slot</Button>



                            </div>
                        </Panel>
                    ))}
                </Collapse>

                <div className="form-submit-btn">
                    <Form.Item>
                        <Button type="primary" className="update-btn" htmlType="submit">Update Time and Price</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}


