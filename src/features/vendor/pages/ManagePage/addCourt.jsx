import "../../styelsheets/Manage/addCourt.css";
import { Form, Input, Button, Select, message, Spin } from "antd";
import { useState } from "react";
import { AddSingleCourt } from "../../../../services/vendor/Court/endpointsApi";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useNavigate } from "react-router-dom";
import { useFetchVendorSportsList } from "../../../../hooks/vendor/sports/useFetchSportVendor";

const { Option } = Select;
const { TextArea } = Input;

export default function AddCourt() {
  const [form] = Form.useForm();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    data: sportsData,
    isLoading: sportsLoading,
    error: sportsError,
  } = useFetchVendorSportsList(selectedVenue);
  const { data: venuesData, isLoading: venuesLoading } =
    useFetchVendorVenueList();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if (!selectedVenue) {
      return message.error("Please select a venue first!");
    }

    const payload = {
      courtName: values.courtName,
      sportId: values.sports,
      venueId: selectedVenue,
      description: values.description,
    };

    setLoading(true);
    try {
      await AddSingleCourt(payload);
      message.success("Court added successfully!");
      navigate("/vendor/manage/court");
      form.resetFields();
      setSelectedVenue(null);
    } catch (err) {
      console.error("Error adding court:", err);
      message.error("Failed to add court.");
    } finally {
      setLoading(false);
    }
  };

  if (sportsLoading || venuesLoading) {
    return (
      <div className="add-Court-Container">
        <Spin tip="Loading venues and sports..." size="large" />
      </div>
    );
  }

  return (
    <div className="add-Court-Container">
      <div className="add-court-form-section">
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <h2 className="add-court-title">Add Court</h2>

          <div className="court-form-row">
            <Form.Item
              name="selectVenue"
              label="Select Venue"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Venue"
                className="court-Select"
                value={selectedVenue}
                onChange={(value) => setSelectedVenue(value)}
              >
                {venuesData?.resutl?.map((venue) => (
                  <Option key={venue.venue_id} value={venue.venue_id}>
                    {venue.venue_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="courtName"
              label="Enter Court Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="E.g. 6x6 Box Cricket" />
            </Form.Item>
          </div>

          <div className="court-form-row">
            <Form.Item name="sports" label="Sport" rules={[{ required: true }]}>
              <Select placeholder="Select Sport" className="court-Select">
                {sportsData?.result?.map((sport) => (
                  <Option key={sport.sports_id} value={sport.sports_id}>
                    {sport.sports_name || sport.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Enter the Description" />
            </Form.Item>
          </div>

          <Form.Item className="submit">
            <Button type="primary" htmlType="submit" loading={loading}>
              CREATE COURT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
