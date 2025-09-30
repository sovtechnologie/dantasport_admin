import "../../styelsheets/Manage/addCourt.css";
import { Form, Input, Button, message, Spin, Select } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FetchSingleCourt,
  UpdateVendorCourt,
} from "../../../../services/vendor/Court/endpointsApi";
import { useFetchSports } from "../../../../hooks/admin/sport/useFetchSport";

const { TextArea } = Input;
const { Option } = Select;

export default function EditCourtPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const { courId } = useParams();

  const { data: sportsList, loading: sportsLoading } = useFetchSports();

  useEffect(() => {
    if (courId) {
      setLoading(true);
      FetchSingleCourt({ courId: Number(courId) })
        .then((res) => {
          const courtData = res?.result?.[0];
          if (courtData) {
            // Find sport name from all sports
            const sportObj = sportsList?.result?.find(
              (s) => s.id === courtData.sport_id
            );

            const dataToSet = {
              venueName: courtData.venue_name || courtData.venue_id,
              sportId: courtData.sport_id,
              sportName: sportObj?.sports_name || "Unknown Sport",
              courtName: courtData.court_name || "",
              description: courtData.description || "",
            };

            setInitialData(dataToSet);

            // Fill form fields
            form.setFieldsValue({
              courtName: dataToSet.courtName,
              description: dataToSet.description,
              venue: dataToSet.venueName,
              sport: dataToSet.sportId, // value for Select
            });
          } else {
            message.error("Court not found");
          }
        })
        .catch(() => message.error("Failed to fetch court details"))
        .finally(() => setLoading(false));
    }
  }, [courId, form, sportsList]);

  const handleUpdate = (values) => {
    setLoading(true);
    const payload = {
      courId: Number(courId),
      courtName: values.courtName,
      description: values.description,
    };

    UpdateVendorCourt(payload)
      .then(() => {
        message.success("Court updated successfully!");
        navigate("/vendor/manage/court");
      })
      .catch(() => message.error("Failed to update court"))
      .finally(() => setLoading(false));
  };

  if (loading || !initialData) {
    return (
      <div className="add-Court-Container">
        <Spin tip="Loading court details..." size="large" />
      </div>
    );
  }

  return (
    <div className="add-Court-Container">
      <div className="add-court-form-section">
        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <h2 className="add-court-title">Edit Court</h2>

          <div className="court-form-row">
            {/* Disabled Venue Field */}
            <Form.Item label="Venue" name="venue">
              <Input disabled />
            </Form.Item>

            {/* Editable Court Name */}
            <Form.Item
              name="courtName"
              label="Court Name"
              rules={[{ required: true, message: "Enter court name" }]}
            >
              <Input placeholder="Enter court name" />
            </Form.Item>
          </div>

          <div className="court-form-row">
            {/* Disabled Sport Select */}
            <Form.Item label="Sport" name="sport">
              <Select
                placeholder="Select Sport"
                disabled
                loading={sportsLoading}
              >
                {sportsList?.result
                  ?.filter((s) => s.id === initialData.sportId)
                  .map((sport) => (
                    <Option key={sport.id} value={sport.id}>
                      {sport.sports_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            {/* Editable Description */}
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Enter description" }]}
            >
              <TextArea placeholder="Enter description" />
            </Form.Item>
          </div>

          <Form.Item className="centered-submit">
            <Button type="primary" htmlType="submit" loading={loading}>
              UPDATE COURT
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => navigate("/vendor/manage/court")}
            >
              CANCEL
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
