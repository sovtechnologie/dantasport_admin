
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import "./Stylesheets/AddVenue.css";
import { DeleteOutlined } from '@ant-design/icons';
import { useFetchSingleVenue } from '../../../hooks/admin/CreateVenue/useFetchSingleVenue';
import { useUpdateVenue } from '../../../hooks/admin/CreateVenue/useUpdateVenue';
import GooglePlacesAutocomplete from '../../../components/GooglePlacesAutocomplete';
import { useNavigate, useParams } from 'react-router-dom';

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

export default function EditVenueInfoForm() {
    const { id } = useParams();
    const venueId = Number(id);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    // Local state for map location
    const [mapLocation, setMapLocation] = useState({
        latitude: 18.5204,  // Default lat (e.g., Pune)
        longitude: 73.8567, // Default lng
    });

    // Use the hook to fetch single venue details with venue id
    const { data: Venuedata, isLoading, error } = useFetchSingleVenue({ venueId });
    const venueData = Venuedata?.result[0];
    // When venueData loads, set form fields and map location
    useEffect(() => {

        if (venueData) {
            // Set form fields with venue data; adjust keys as per your API response
            form.setFieldsValue({
                vendorName: venueData.owner_name,
                vendorId: venueData.vendor_id,
                venueName: venueData.venue_name,
                address: venueData.full_address,
                area: venueData.area,
                city: venueData.city,
                state: venueData.state,
                pincode: venueData.pincode,
                bookingPolicy: venueData.booking_policy,
                latitude: venueData.latitude,
                longitude: venueData.longitude,
            });

            if (venueData.latitude && venueData.longitude) {
                setMapLocation({
                    latitude: venueData.latitude,
                    longitude: venueData.longitude,
                });
            }
        }
    }, [venueData, form]);

    const onPlaceSelect = ({ address, area, city, state, pincode, latitude, longitude, search }) => {
        form.setFieldsValue({ address, area, city, state, pincode, latitude, longitude, search });
        if (latitude && longitude) {
            setMapLocation({ latitude, longitude });
        }
    };

    // Construct dynamic Google Maps URL
    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;


    // status change
    const { mutate: venueUpdate, isloading: Updateloading } = useUpdateVenue();


    const onFinish = (values) => {
        console.log('Form values:', values);
        // Add vendorId to values payload if not from form
        const payload = {
            venueName: values.venueName,
            lat: values.latitude,
            lng: values.longitude,
            fullAddress: values.address, // from your LocationSearch component's name="address"
            area: values.area,
            city: values.city,
            state: values.state,
            pincode: Number(values.pincode),
            venueId: venueId,  // use prop vendorId as fallback
            bookingPolicy: values.bookingPolicy, // include if needed by backend
        }
        venueUpdate(payload, {
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
                            label="Enter Vendor Name"
                            name="vendorName"
                        >
                            <Input  disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Enter Vendor ID"
                            name="vendorId"
                        >
                            <Input disabled={true} />
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
                        {/* You may replace this Input with Google Maps Autocomplete */}
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
                                    {/* <Select placeholder="Select Area">
                                        <Option value="Rk Nagar">Rk Nagar</Option>
                                    </Select> */}
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
                                    {/* <Select placeholder="Select City">
                                        <Option value="Ghazibad">Ghazibad</Option>
                                    </Select> */}
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
                                    {/* <Select placeholder="Select State">
                                        <Option value="U.P">U.P</Option>
                                    </Select> */}
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
