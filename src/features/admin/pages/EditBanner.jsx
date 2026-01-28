import {
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Button,
  message,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import uploadImage from "../../../assets/UploadIcon.png";
import {
  fetchBannerById,
  UpdateBanner,
  fetchCustomCityList,
} from "../../../services/admin/Banners/endpointApi";

const { Option } = Select;

export default function EditBannerForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const banner = await fetchBannerById(id);

        const citiesResponse = await fetchCustomCityList();
        const cityOptions = citiesResponse?.result || [];
        setCities(cityOptions);

        // banner.location ko proper parse karo
        let locations = [];
        if (Array.isArray(banner.location)) {
          locations = banner.location.map((loc) => loc.trim());
        } else if (typeof banner.location === "string") {
          try {
            const parsed = JSON.parse(banner.location);
            if (Array.isArray(parsed)) {
              locations = parsed.map((loc) => loc.trim());
            } else {
              locations = banner.location.split(",").map((loc) => loc.trim());
            }
          } catch {
            locations = banner.location.split(",").map((loc) => loc.trim());
          }
        }

        // selectedLocations abhi set karo
        const selectedLocations = cityOptions
          .filter((city) =>
            locations.some(
              (loc) => city.name.trim().toLowerCase() === loc.toLowerCase()
            )
          )
          .map((city) => city.name);

        form.setFieldsValue({
          startDate: banner.valid_from ? dayjs(banner.valid_from) : null,
          endDate: banner.valid_to ? dayjs(banner.valid_to) : null,
          location: selectedLocations,
          page: banner.page || [],
          pageLink: banner.url || "",
          position: banner.banner_type || 1,
          desktopBanner: banner.banner_image
            ? [
                {
                  uid: "-1",
                  name: "desktopBanner",
                  status: "done",
                  url: banner.banner_image,
                },
              ]
            : [],
          mobileBanner: banner.mobile_image
            ? [
                {
                  uid: "-2",
                  name: "mobileBanner",
                  status: "done",
                  url: banner.mobile_image,
                },
              ]
            : [],
        });
      } catch (err) {
        message.error("Failed to load banner details");
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, form]);
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("bannerId", id);
      formData.append("vendorId", values.vendorId || "");
      formData.append("venueId", values.venueId || "");
      formData.append("radius", values.radius || "");
      formData.append("venueType", values.venueType || "");
      formData.append("status", values.status || 1);

      formData.append(
        "startDate",
        values.startDate?.format("YYYY-MM-DD") || ""
      );
      formData.append("endDate", values.endDate?.format("YYYY-MM-DD") || "");
      formData.append("location", JSON.stringify(values.location || []));
      formData.append("url", values.pageLink || "");
      formData.append("bannerType", values.position || 1);

      if (values.desktopBanner?.[0]?.originFileObj) {
        formData.append("desktopImage", values.desktopBanner[0].originFileObj);
      }
      if (values.mobileBanner?.[0]?.originFileObj) {
        formData.append("mobileImage", values.mobileBanner[0].originFileObj);
      }

      await UpdateBanner(formData);
      message.success("Banner updated successfully!");
      navigate("/admin/banners/bannerlist");
    } catch (err) {
      message.error("Failed to update banner");
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return (
      <Spin size="large" style={{ marginTop: "50vh", display: "block" }} />
    );
  }
  return (
    <div className="banner-form-container bg-white p-3 shadow-sm rounded-2xl">
      <h3 className="my-3" style={{color: "#1163C7"}}>Edit Banner</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="row">
         <div className="col-6">
           <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%", height:"56px" }} />
          </Form.Item>
         </div>

          <div className="col-6">
            <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%", height:"56px" }} />
          </Form.Item>
          </div>
        </div>

        <div className="row">
        <div className="col-6">
            <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" allowClear showSearch  style={{ height:"56px" }}>
              {cities.map((city) => (
                <Option key={city.id} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-6">
           <Form.Item
            label="Page Link"
            name="pageLink"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter URL"  style={{ height:"56px" }}/>
          </Form.Item>
        </div>

         
        </div>

        <div className="row">
        <div className="col-6">
            <Form.Item label="Pages" name="page" rules={[{ required: true }]}  >
            <Select mode="multiple" allowClear style={{ height:"56px" }}>
              <Option value={1}>Home</Option>
              <Option value={2}>Turf List</Option>
              <Option value={3}>Event List</Option>
              <Option value={4}>Run List</Option>
              <Option value={5}>Gym List</Option>
              <Option value={6}>Turf Details</Option>
              <Option value={7}>Event Details</Option>
              <Option value={8}>Run Details</Option>
              <Option value={9}>Gym Details</Option>
              <Option value={10}>SuccessfulPage</Option>
            </Select>
          </Form.Item>
        </div>

          <div className="col-6">
            <Form.Item
            label="Banner Type / Position"
            name="position"
            rules={[{ required: true }]}
          >
            <Select style={{ height:"56px" }}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
            </Select>
          </Form.Item>
          </div>
        </div>

        <div className="row">
         <div className="col-6">
           <Form.Item
            label="Desktop Banner"
            name="desktopBanner"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <div>
                <img src={uploadImage} alt="Upload" />
                <div>Upload Image (430x200)</div>
              </div>
            </Upload>
          </Form.Item>
         </div>

          <div className="col-6">
            <Form.Item
            label="Mobile Banner"
            name="mobileBanner"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <div>
                <img src={uploadImage} alt="Upload" />
                <div>Upload Image (430x200)</div>
              </div>
            </Upload>
          </Form.Item>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-4 m-auto">
            <Form.Item>
          <Button className="w-100 py-4 fs-5 fw-bold" type="primary" htmlType="submit">
            Update Banner
          </Button>
        </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
