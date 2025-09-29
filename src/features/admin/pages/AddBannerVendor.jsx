import { Form, Input, DatePicker, Select, Upload, Button } from "antd";
import "./Stylesheets/BannerVendor.css";
import uploadImage from "../../../assets/UploadIcon.png";
import { useCreateBanner } from "../../../hooks/admin/banners/useCreateBanner";
import { useUpdateBanner } from "../../../hooks/admin/banners/useUpdateBanner";
import { useFetchVendorVenueList } from "../../../hooks/admin/banners/useFetchVendorVenueList";
import { useGetAllVendor } from "../../../hooks/admin/CreateVenue/useGetAllVendor";
import { useEffect, useState } from "react";

const { Option } = Select;

export default function AddBannerForm() {
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  console.log(createBanner.isLoading);
  const { data: vendorlist, isLoading: vendorloading } = useGetAllVendor();
  const { data: venuelist, isLoading: venueloading } =
    useFetchVendorVenueList(selectedVendorId);

  // When the vendor changes, clear venueId and venueType fields
  useEffect(() => {
    form.setFieldsValue({ venueId: undefined, venueType: undefined });
  }, [selectedVendorId, form]);

  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("vendorId", values.vendorId);
    formData.append("venueId", values.venueId);
    formData.append("startDate", values.startDate?.format("YYYY-MM-DD"));
    formData.append("endDate", values.endDate?.format("YYYY-MM-DD"));
    formData.append("url", values.pageLink);
    formData.append("radius", values.radius);
    formData.append("bannerType", "2");
    formData.append("venueType", values.venueType || "");

    if (values.desktopBanner?.length > 0) {
      formData.append("desktopImage", values.desktopBanner[0].originFileObj);
    }
    if (values.mobileBanner?.length > 0) {
      formData.append("mobileImage", values.mobileBanner[0].originFileObj);
    }

    console.log("Submitted values:", formData);
    // Call mutation
    createBanner.mutate(formData, {
      onSuccess: (data) => {
        setLoading(false);
        const payload = {
          bannerId: data?.result,
          page: values.page.map(Number),
          position: Number(values.position),
        };
        updateBanner.mutate(payload, {
          onSettled: () => {
            setUpdateLoading(false);
          },
        });
        form.resetFields();
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="banner-form-container">
      <h3 className="form-title">Add Banners</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="banner-form"
      >
        <div className="form-row">
          <Form.Item
            label="Vendor ID"
            name="vendorId"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a vendorId"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              loading={vendorloading}
              allowClear
              onChange={(value) => {
                const selectedVendor = vendorlist?.result?.find(
                  (v) => v.id === value
                );
                setSelectedVendorId(value);
                form.setFieldsValue({
                  vendorId: selectedVendor?.id || "",
                });
              }}
            >
              {vendorlist?.result?.map((vendor) => (
                <Option key={vendor.id} value={vendor.id}>
                  {`${vendor.full_name} (${vendor.id})`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Venue ID"
            name="venueId"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a venueId"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              loading={venueloading}
              allowClear
              onChange={(value) => {
                const selectedVenue = venuelist?.result?.find(
                  (v) => v.id === value
                );
                form.setFieldsValue({
                  venueId: selectedVenue?.id || "",
                  venueType: selectedVenue?.venue_type || "", // set venueType here
                });
              }}
            >
              {venuelist?.result?.map((venue) => (
                <Option key={`${venue.type}-${venue.id}`} value={venue.id}>
                  {`${venue.name} (${venue.id})`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Venue Type" name="venueType" hidden>
            <Input disabled />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Radius in KM"
            name="radius"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter Radius in KM" />
          </Form.Item>
          <Form.Item
            label="Enter Page Link To Redirect"
            name="pageLink"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item label="Pages" name="page" rules={[{ required: true }]}>
            <Select placeholder="Select Pages" mode="multiple" allowClear>
              <Option value={1}>Home</Option>
              <Option value={2}>List Page</Option>
              <Option value={3}>VenueDetails</Option>
              <Option value={4}>SuccessfulPage</Option>
              <Option value={5}>EventDetails</Option>
              <Option value={6}>GymDetails</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="BannerPosition"
            name="position"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Banner Position">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Upload Banner Image (For Desktop)"
            name="desktopBanner"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              className="upload-banner-image"
            >
              <div className="upload-banner">
                <img src={uploadImage} alt="Upload" className="desktop-image" />
                <div>
                  Upload Image
                  <br />
                  (Size 430px * 200px)
                </div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Upload Banner Image (For Mobile)"
            name="mobileBanner"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              className="upload-banner-image"
            >
              <div className="upload-banner">
                <img src={uploadImage} alt="Upload" className="desktop-image" />
                <div>
                  Upload Image
                  <br />
                  (Size 430px * 200px)
                </div>
              </div>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="submit-btn"
          >
            UPDATE VENDOR BANNER
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
