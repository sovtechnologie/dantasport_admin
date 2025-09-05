
import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import "./Stylesheets/AddVenue.css";
import { DeleteOutlined } from '@ant-design/icons';
import { useCreateVenue } from '../../../hooks/admin/CreateVenue/useCreateVenue';
import { useGetAllVendor } from '../../../hooks/admin/CreateVenue/useGetAllVendor';
import GooglePlacesAutocomplete from '../../../components/GooglePlacesAutocomplete';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// Optional: component to embed Google Places Autocomplete
function LocationSearch({ form, onPlaceSelect }) {
    const addressValue = form.getFieldValue('search') || '';

    const onSearchInputChange = e => {
        form.setFieldsValue({ search: e.target.value });
    };

    return (
        <>
            <Form.Item name="search" label="Location">
                <GooglePlacesAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Search your address" value={addressValue}
                    onChange={onSearchInputChange} border />
            </Form.Item>

            {/* Hidden fields to store latitude and longitude */}
            <Form.Item name="latitude" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="longitude" hidden>
                <Input />
            </Form.Item>
        </>
    );
}

export default function VenueInfoForm({ vendorId }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    // Local state for map location
    const [mapLocation, setMapLocation] = useState({
        latitude: 18.5204,  // Default lat (e.g., Pune)
        longitude: 73.8567, // Default lng
    });

    const { data: vendorlist, isLoading: vendorloading } = useGetAllVendor();
    console.log("vendorlist", vendorlist?.result);


    const onPlaceSelect = ({ address, area, city, state, pincode, latitude, longitude, search }) => {
        form.setFieldsValue({ address, area, city, state, pincode, latitude, longitude, search });
        if (latitude && longitude) {
            setMapLocation({ latitude, longitude });
        }
    };

    // Construct dynamic Google Maps URL
    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;

    const { mutate: createVenue, isLoading } = useCreateVenue();

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Add vendorId to values payload if not from form
        const payload = {
            venueName: values.venueName,
            latitude: values.latitude,
            longitude: values.longitude,
            fullAddress: values.address, // from your LocationSearch component's name="address"
            area: values.area,
            city: values.city,
            state: values.state,
            pincode: Number(values.pincode),
            vendorId: Number(values.vendorId),  // use prop vendorId as fallback
            bookingPolicy: values.bookingPolicy, // include if needed by backend
        }
        createVenue(payload, {
            onSuccess: () => {
                message.success('Venue created successfully');
                form.resetFields();
                // ✅ Navigate to venue list
                navigate("/admin/venues")
            },
            onError: (error) => {
                message.error(error?.response?.data?.message || 'Failed to create venue');
            }
        });

    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}

        >
            {/* Vendor + Venue Name */}
            <div className='venue-form'>
                <Row gutter={16} >
                    <Col span={12}>
                        <Form.Item
                            label="Select Vendor"
                            name="vendorName"  // will store selected vendor ID internally
                            rules={[{ required: true, message: "Please select a vendor" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a vendor"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().includes(input.toLowerCase())
                                }
                                loading={vendorloading}
                                allowClear
                                onChange={(value) => {
                                    const selectedVendor = vendorlist?.result?.find(v => v.id === value);
                                    form.setFieldsValue({
                                        vendorId: selectedVendor?.id || "",
                                        vendorName: selectedVendor?.full_name || "",
                                    });
                                }}
                            >
                                {vendorlist?.result?.map(vendor => (
                                    <Option key={vendor.id} value={vendor.id}>
                                         {`${vendor.full_name} (${vendor.id})`}  
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>


                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Enter Vendor ID"
                            name="vendorId"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </div>


            <div className="venue-form">

                <Row gutter={[16, 16]} align="bottom">
                    <Col span={12}>
                        <Form.Item
                            label="Enter Venue Name"
                            name="venueName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className='remove-btn-wrapper'>
                            <Button type="primary" className="remove-btn" icon={<DeleteOutlined />}>
                                REMOVE VENUES
                            </Button>
                        </Form.Item>

                    </Col>
                </Row>

                <h3 className="section-title">Location Info</h3>

                {/* Address + Map/Search */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="address"
                            rules={[{ required: true }]}
                            label="Enter Full Address*"
                        >
                            <Input.TextArea
                                placeholder="Address, Street, etc."
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <LocationSearch form={form} onPlaceSelect={onPlaceSelect} />
                    </Col>
                </Row>

                {/* full Address + Map */}
                <Row gutter={16}>
                    {/* Address */}
                    <Col span={12}>

                        {/* Area+ city */}
                        <Row gutter={16}>
                            {/* Area */}
                            <Col span={12}>
                                <Form.Item
                                    label="Area"
                                    name="area"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder="Enter Area" />
                                </Form.Item>
                            </Col>
                            {/* city */}
                            <Col span={12}>
                                <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder="Enter City" />
                                </Form.Item>
                            </Col>
                        </Row>


                        {/* state+ pincode */}
                        <Row gutter={16}>
                            {/* state */}
                            <Col span={12}>
                                <Form.Item
                                    label="State"
                                    name="state"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder='Enter State' />
                                </Form.Item>
                            </Col>
                            {/* pincode */}
                            <Col span={12}>
                                <Form.Item
                                    label="Pincode"
                                    name="pincode"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Booking Policy"
                            name="bookingPolicy"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>


                    </Col>



                    {/* Map Preview */}
                    <Col span={12}>

                        <div className="map-preview">
                            <h4>Location</h4>
                            <iframe
                                title="map"
                                src={mapSrc}
                                width="100%"
                                height="220"
                                style={{ border: '1px solid #ccc', borderRadius: 8 }}
                                loading="lazy"
                            />
                        </div>
                    </Col>
                </Row>




                <div className='form-actions'>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="update-btn">
                            UPDATE VENDOR
                        </Button>
                    </Form.Item>
                </div>

            </div>
        </Form>
    );
}
