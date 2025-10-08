import "../../styelsheets/Manage/addSport.css";
import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  TimePicker,
  InputNumber,
  Collapse,
  message,
  Input,
  Form,
  Spin,
} from "antd";
import { useFetchSports } from "../../../../hooks/admin/sport/useFetchSport";
import { useFetchSportPrice } from "../../../../hooks/vendor/venue/useFetchSportPrice";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useUpdateVendorSport } from "../../../../hooks/vendor/sports/useUpdatevendorSport";
import { useUpdatePriceSlot } from "../../../../hooks/vendor/sports/useUpdatePriceSlot";
import { getSingleVendorSports } from "../../../../services/vendor/SportList/endpointApi";

const { Option } = Select;
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

export default function EditSport() {
  const { venueId, vendorSportsId } = useParams();
  const [form] = Form.useForm();
  const [slots, setSlots] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [sportData, setSportData] = useState(null);
  const navigate = useNavigate();

  const { data: sportsList, loading: sportsLoading } = useFetchSports();

  const { data: sportPriceData, loading: sportPriceLoading } =
    useFetchSportPrice({
      venueId: Number(venueId),
      vendorSportsId: Number(vendorSportsId),
    });

  const { mutate: updateVendorSports } = useUpdateVendorSport();
  const { mutate: updatePriceSlot } = useUpdatePriceSlot();

  useEffect(() => {
    const fetchUpperData = async () => {
      try {
        const res = await getSingleVendorSports({
          vendorSportsId: Number(vendorSportsId),
        });
        if (res?.status === 200 && res?.result?.length > 0) {
          const sport = res.result[0];
          setSportData(sport);

          form.setFieldsValue({
            selectVenue: sport.venue_name,
            venueId: sport.venue_id,
            selectSport: sport.sport_id,
            duration: sport.slots_duration,
            minduration: sport.minimum_booking_duration,
            courtNO: sport.courts_count,
            description: sport.description,
          });
        }
      } catch (err) {
        message.error("Failed to fetch sport info");
      }
    };
    fetchUpperData();
  }, [vendorSportsId, form]);

  useEffect(() => {
    if (sportPriceData?.result?.length) {
      const slotsArray = sportPriceData.result[0].price_slots;
      console.log("✅ price_slots array:", slotsArray);

      const newSlots = days.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
      const dayKeys = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const addedSlotIds = new Set();

      slotsArray.forEach((slot) => {
        dayKeys.forEach((dayKey, i) => {
          if (
            slot[dayKey] === 1 &&
            !addedSlotIds.has(slot.price_slot_id + dayKey)
          ) {
            const dayName = days[i];
            newSlots[dayName].push({
              startTime: slot.start_time
                ? dayjs(slot.start_time, ["HH:mm:ss", "HH:mm:ss.SSSSSS"])
                : null,
              endTime: slot.end_time
                ? dayjs(slot.end_time, ["HH:mm:ss", "HH:mm:ss.SSSSSS"])
                : null,
              price: slot.price,
              price_slot_id: slot.price_slot_id,
            });
            addedSlotIds.add(slot.price_slot_id + dayKey);
          }
        });
      });

      console.log("✅ Parsed slots for UI:", newSlots);
      setSlots(newSlots);
    }
  }, [sportPriceData]);

  const handleSlotChange = (day, index, key, value) => {
    const updated = [...slots[day]];
    updated[index][key] = value;
    setSlots({ ...slots, [day]: updated });
  };
  const addSlot = (day) =>
    setSlots({
      ...slots,
      [day]: [...slots[day], { startTime: null, endTime: null, price: null }],
    });
  const removeSlot = (day, index) => {
    const updated = [...slots[day]];
    updated.splice(index, 1);
    setSlots({ ...slots, [day]: updated });
  };

  const handleUpdateVendorSports = (values) => {
    updateVendorSports(
      {
        vendorSportsId: Number(vendorSportsId),
        sportId: values.selectSport,
        slotDuration: values.duration,
        minimumBookingDuration: values.minduration,
        description: values.description,
        status: 1,
      },
      {
        onSuccess: () => {
          message.success("Vendor sport updated!");
          navigate("/vendor/manage/sports");
        },
        onError: (err) => {
          message.error(
            err?.response?.data?.message || "Failed to update sport info"
          );
        },
      }
    );
  };

  // Update lower section (time slots)
  const handleUpdateSlots = () => {
    const slotArray = [];
    days.forEach((day) => {
      slots[day].forEach((slot) => {
        slotArray.push({
          startTime: slot.startTime?.format("HH:mm"),
          endTime: slot.endTime?.format("HH:mm"),
          pricePerHour: slot.price,
          monday: day === "Monday" ? 1 : 0,
          tuesday: day === "Tuesday" ? 1 : 0,
          wednesday: day === "Wednesday" ? 1 : 0,
          thursday: day === "Thursday" ? 1 : 0,
          friday: day === "Friday" ? 1 : 0,
          saturday: day === "Saturday" ? 1 : 0,
          sunday: day === "Sunday" ? 1 : 0,
        });
      });
    });

    updatePriceSlot(
      {
        venueId: Number(venueId),
        sportId: sportData?.sport_id,
        slots: slotArray,
      },
      {
        onSuccess: () => {
          message.success("Slots updated!");
          navigate("/vendor/manage/sports");
        },
        onError: (err) => {
          message.error(
            err?.response?.data?.message || "Failed to update slots"
          );
        },
      }
    );
  };

  if (sportPriceLoading || sportsLoading) return <Spin size="large" />;

  return (
    <div className="add-sport-container">
      <h2 className="add-sport-title">Edit Sport</h2>
      <Form layout="vertical" form={form} onFinish={handleUpdateVendorSports}>
        <div className="form-two-column">
          <div className="form-column">
            <Form.Item name="selectVenue" label="Venue Name">
              <Input
                value={sportData?.venue_name || ""}
                disabled
                className="disabled-input"
              />
            </Form.Item>
            <Form.Item
              name="selectSport"
              label="Select Sport"
              rules={[{ required: true }]}
            >
              <Select disabled value={sportData?.sport_id}>
                {sportsList?.result?.map((s) => (
                  <Option key={s.id} value={s.id}>
                    {s.sports_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="minduration"
              label="Minimum Booking Duration"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="form-column">
            <Form.Item name="venueId" label="Venue ID">
              <Input
                value={sportData?.venue_id || ""}
                disabled
                className="disabled-input"
              />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Slot Duration (mins)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="courtNO"
              label="Number of Courts"
              rules={[{ required: true }]}
            >
              <InputNumber
                value={sportData?.courts_count || 0}
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Sport Info
          </Button>
        </Form.Item>
      </Form>

      <h2 className="add-sport-title">Timing & Pricing</h2>
      <Collapse defaultActiveKey={["Monday"]}>
        {days.map((day) => (
          <Panel header={day} key={day}>
            <div className="slot-list">
              {slots[day]?.map((slot, index) => (
                <div className="slot-row" key={index}>
                  <TimePicker
                    format="HH:mm"
                    value={slot.startTime}
                    onChange={(time) =>
                      handleSlotChange(day, index, "startTime", time)
                    }
                    use12Hours
                  />
                  <TimePicker
                    format="HH:mm"
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
                  <Button danger onClick={() => removeSlot(day, index)}>
                    X
                  </Button>
                </div>
              ))}
              <Button onClick={() => addSlot(day)}>+ Add Slot</Button>
            </div>
          </Panel>
        ))}
      </Collapse>

      <Button type="primary" onClick={handleUpdateSlots}>
        Update Slots & Pricing
      </Button>
    </div>
  );
}
