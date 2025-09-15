import { Form, Input, DatePicker, Select, Upload, Button } from 'antd';
import './Stylesheets/AdminBanner.css';
import uploadImage from "../../../assets/UploadIcon.png";
import { useCreateBanner } from '../../../hooks/admin/banners/useCreateBanner';
import { useUpdateBanner } from '../../../hooks/admin/banners/useUpdateBanner';
import { useFetchCustomCity } from '../../../hooks/admin/banners/useFetchCustomCity';
import { useState } from 'react';

const { Option } = Select;



export default function AddBannerForm() {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const { data: customCityList, isLoading: cityloading } = useFetchCustomCity();
  const customCities = customCityList?.result || [];


  const onFinish = (values) => {
    setUpdateLoading(true);
    const formData = new FormData();

    formData.append('startDate', values.startDate?.format('YYYY-MM-DD'));
    formData.append('endDate', values.endDate?.format('YYYY-MM-DD'));
    formData.append('url', values.pageLink);
    formData.append('bannerType', '1');


    if (values.desktopBanner?.length > 0) {
      formData.append('desktopImage', values.desktopBanner[0].originFileObj);
    }
    if (values.mobileBanner?.length > 0) {
      formData.append('mobileImage', values.mobileBanner[0].originFileObj);
    }


    console.log('Submitted values:', formData);
    // Call mutation
    createBanner.mutate(formData, {
      onSuccess: (data) => {
        const payload = {
          bannerId: data?.result,
          location: values.location,
          page: values.page.map(Number),
          position: Number(values.position)
        }
        updateBanner.mutate(payload, {
          onSettled: () => {
            setUpdateLoading(false);
          }
        })
        form.resetFields();
      },
      onError: () => setUpdateLoading(false)
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
          <Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div className="form-row">
          {/* <Form.Item label="Location" name="location" rules={[{ required: true }]}>
            <Select placeholder="Select Location" mode="multiple" allowClear>
              <Option value="pune">Pune</Option>
              <Option value="mumbai">Mumbai</Option>
              <Option value="delhi">Delhi</Option>
              <Option value="noida">Noida</Option>
              <Option value="bangalore">Banglore</Option>
              <Option value="ghaziabad">Ghaziabad</Option>
              <Option value="gurugram">Gurugram</Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="Location" name="location" rules={[{ required: true }]}>
            <Select
              placeholder="Select Location"
              mode="multiple"
              allowClear
              loading={cityloading}
              showSearch
              optionFilterProp="children"
            >
              {customCities.map((city) => (
                <Option key={city.id} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
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

          <Form.Item label="BannerPosition" name="position" rules={[{ required: true }]}>
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
            <Upload listType="picture" beforeUpload={() => false} className='upload-banner-image'>
              <div className='upload-banner'>
                <img src={uploadImage} alt="Upload" className='desktop-image' />
                <div>Upload Image<br />(Size 430px * 200px)</div>
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
            <Upload listType="picture" beforeUpload={() => false} className='upload-banner-image'>
              <div className='upload-banner'>
                <img src={uploadImage} alt="Upload" className='desktop-image' />
                <div>Upload Image<br />(Size 430px * 200px)</div>
              </div>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" className="submit-btn" loading={updateLoading}>
            UPDATE BANNER
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file); // reads file as base64 data URL
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// };
