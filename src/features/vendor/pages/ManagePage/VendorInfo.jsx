import "../../styelsheets/Manage/VendorInfo.css"
import UploadImage from "../../../../assets/UploadIcon.png";
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
    Radio,
    TimePicker,
} from 'antd';
import { useParams } from "react-router-dom";
import { useFetchSingleVenue } from "../../../../hooks/admin/CreateVenue/useFetchSingleVenue";
import { useFetchAmenities } from "../../../../hooks/admin/amenities/useFetchAmenities";
import { useUpdateVenue } from "../../../../hooks/admin/CreateVenue/useUpdateVenue";
import { useEffect, useState } from "react";
import moment from "moment";
import GooglePlacesAutocomplete from "../../../../components/GooglePlacesAutocomplete";


const { TextArea } = Input;
const { Option } = Select;


// Optional: component to embed Google Places Autocomplete
function LocationSearch({ form, onPlaceSelect }) {
    const addressValue = form.getFieldValue('search') || '';

    const onSearchInputChange = e => {
        form.setFieldsValue({ search: e.target.value });
    };

    return (
        <>
            <Form.Item name="search" label="Location" disabled>
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


export default function VenueInfo() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { RangePicker } = TimePicker;
    const [loading, setLoading] = useState(false);
    const [mapLocation, setMapLocation] = useState({
        latitude: 18.5204,  // Default lat (e.g., Pune)
        longitude: 73.8567, // Default lng
    });
    const [mobileFileList, setMobileFileList] = useState([]);
    const [webFileList, setWebFileList] = useState([]);

    const beforeUploadMobile = (file) => {
        setMobileCoverFile(file);
        return false; // prevent default upload
    };

    const beforeUploadWeb = (file) => {
        setWebCoverFile(file);
        return false;
    };

    const { data: venueDetails } = useFetchSingleVenue({ venueId: id });
    const { data: amenitiesData, isloading: amenitiesloading } = useFetchAmenities();
    const updateVenue = useUpdateVenue();

    const amenitiesOptions = amenitiesData?.result || [];

    // Populate form fields when venueDetails change
    useEffect(() => {
        if (venueDetails && venueDetails.result) {
            const details = venueDetails.result[0];

            // Extract amenity IDs for form Select value
            const selectedAmenityIds = details.amenities
                ? details.amenities.map((a) => a.amenties_id)
                : [];
            form.setFieldsValue({
                venueName: details.venue_name || '',
                venueId: details.id || '',
                about: details.about_venue || '',
                timing: details.start_time && details.end_time
                    ? [moment(details.start_time, 'HH:mm:ss'), moment(details.end_time, 'HH:mm:ss')]
                    : null,
                isBookable: details.isBookable === 1 ? 'yes' : 'no',
                amenities: selectedAmenityIds,
                lat: details.latitude || '',
                lng: details.longitude || '',
                fullAddress: details.full_address || '',
                area: details.area || '',
                city: details.city || '',
                state: details.state || '',
                pincode: details.pincode || '',
                bookingPolicy: details.booking_policy ? details.booking_policy.replace(/\\n/g, '\n') : '',
            });
            setMobileFileList(details.cover_image_mobile ? [{
                uid: '-1',
                name: 'mobile_cover.jpg',
                status: 'done',
                url: details.cover_image_mobile,
            }] : []);

            setWebFileList(details.cover_image ? [{
                uid: '-2',
                name: 'web_cover.jpg',
                status: 'done',
                url: details.cover_image,
            }] : []);
        }
    }, [venueDetails, form]);

    // Handle Upload changes (new upload or remove)
    const handleMobileChange = ({ fileList }) => setMobileFileList(fileList);
    const handleWebChange = ({ fileList }) => setWebFileList(fileList);

    // Update map location when latitude or longitude fields change
    useEffect(() => {
        const lat = form.getFieldValue('lat');
        const lng = form.getFieldValue('lng');
        if (lat && lng) {
            setMapLocation({ latitude: lat, longitude: lng });
        }
    }, [form.getFieldValue('lat'), form.getFieldValue('lng')]);

    const onPlaceSelect = ({ address, area, city, state, pincode, latitude, longitude, search }) => {
        form.setFieldsValue({ fullAddress: address, area, city, state, pincode, latitude, longitude, search });
        if (latitude && longitude) {
            setMapLocation({ latitude, longitude });
        }
    };
    // Construct dynamic Google Maps URL
    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;





    const handleFinish = (values) => {
        setLoading(true); // Start loading

        const formData = new FormData();


        // Append text fields
        formData.append("venueId", id);
        formData.append("venueName", values.venueName);
        formData.append("about_venue", values.about);
        formData.append("startTime", values.timing ? values.timing[0].format("HH:mm:ss") : "");
        formData.append("endTime", values.timing ? values.timing[1].format("HH:mm:ss") : "");
        formData.append("bookingPolicy", values.bookingPolicy);
        // Append image files if selected
        // append images if new file is uploaded
        if (mobileFileList[0]?.originFileObj) {
            formData.append("mobileCoverImage", mobileFileList[0].originFileObj);
        }
        if (webFileList[0]?.originFileObj) {
            formData.append("desktopCoverImage", webFileList[0].originFileObj);
        }
        const payload = {
            venueId: id,
            isBookable: values.isBookable === "yes" ? 1 : 0,
            amenitiesIds: values.amenities || [],
        };
        updateVenue.mutate(formData, {
            onSuccess: (data) => {
                if (data.status === 200) {
                    updateVenue.mutate(payload, {
                        onSuccess: () => {
                            setLoading(false);
                            console.log("Venue details updated successfully");
                            // Optionally, show a success message or redirect
                            // setFieldsValue({});
                        },
                        onError: () => {
                            console.error("Failed to update venue details");
                            setLoading(false);
                        },
                    })
                }
            },
            onError: () => {
                console.error("Failed to update venue details");
                setLoading(false);
            },
        });
    };

    return (
        <div className="venue-info-container">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <div className="section-title">Venue Information</div>

                <div className="Venue-form-row">
                    <Form.Item name="venueName" label="Venue Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter venue name" disabled />
                    </Form.Item>

                    <Form.Item name="venueId" label="Venue ID" initialValue="#123456">
                        <Input disabled />
                    </Form.Item>
                </div>

                <div className="Venue-form-row">
                    {/* <Form.Item name="mobileCover" label="Upload Cover Image For Mobile App">
                        <Upload>
                            <Button className="uploadImg"><img src={UploadImage} alt="upload" />Upload Cover Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="webCover" label="Upload Cover Image For Website">
                        <Upload>
                            <Button className="uploadImg"><img src={UploadImage} alt="upload" />Upload Cover Image</Button>
                        </Upload>
                    </Form.Item> */}
                    {/* 
                    <Form.Item label="Upload Cover Image For Mobile App">
                        <Upload
                            accept="image/*"
                            beforeUpload={beforeUploadMobile}
                            maxCount={1}
                            showUploadList={mobileCoverFile ? [{ uid: '-1', name: mobileCoverFile.name }] : []}
                        >
                            <Button className="uploadImg">
                                <img src={UploadImage} alt="upload" /> Upload Cover Image
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Upload Cover Image For Website">
                        <Upload
                            accept="image/*"
                            beforeUpload={beforeUploadWeb}
                            maxCount={1}
                            showUploadList={webCoverFile ? [{ uid: '-2', name: webCoverFile.name }] : []}
                        >
                            <Button className="uploadImg">
                                <img src={UploadImage} alt="upload" /> Upload Cover Image
                            </Button>
                        </Upload>
                    </Form.Item> */}

                    <Form.Item label="Upload Cover Image For Mobile App">
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}  // prevent auto upload
                            maxCount={1}
                            listType="text"
                            fileList={mobileFileList}
                            onChange={handleMobileChange}
                        >

                            <Button className="uploadImg">
                                <img src={UploadImage} alt="upload" />Upload Cover Image
                            </Button>

                        </Upload>
                    </Form.Item>

                    <Form.Item label="Upload Cover Image For Website">
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="text"
                            fileList={webFileList}
                            onChange={handleWebChange}
                        >

                            <Button className="uploadImg">
                                <img src={UploadImage} alt="upload" /> Upload Cover Image
                            </Button>

                        </Upload>
                    </Form.Item>


                </div>

                <Form.Item name="about" label="Add About Venue" rules={[{ required: true }]}>
                    <TextArea rows={5}
                        placeholder="Eg:Football:- It is recommended but not compulsory to wear football studs while playing at the facility.
- Metal studs are not allowed.
Box Cricket:
- Stumps and Bats will be provided by the venue.
- Users have to bring their own Cricket Balls." />
                </Form.Item>

                <div className="Venue-form-row">
                    <Form.Item name="timing" label="Timing" rules={[{ required: true }]}>
                        <RangePicker format="hh:mm A" use12Hours />
                    </Form.Item>


                    <Form.Item name="isBookable" label="Is Bookable?">
                        <Radio.Group>
                            <Radio value="yes" className="radio-btn">Yes</Radio>
                            <Radio value="no" className="radio-btn">No</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="amenities" label="Amenities"
                        rules={[{ required: true, message: 'Please select at least one amenity' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select amenities"
                            optionFilterProp="label" // search applies to labels now
                            loading={amenitiesloading}
                            allowClear
                            options={amenitiesOptions.map(amenity => ({
                                label: amenity.amenities_name,
                                value: amenity.id,
                            }))}
                            onChange={(selectedIds) => {
                                // selectedIds is an array of selected amenity IDs
                                form.setFieldsValue({ amenities: selectedIds });
                            }}
                            filterOption={(input, option) =>
                                option.label.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                </div>

                <div className="section-title">Location Info</div>

                <div className="location-container">
                    {/* Left Form Inputs */}
                    <div className="location-form">
                        <div className="Venue-form-row">
                            <Form.Item name="fullAddress" label="Enter Full Address" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                        </div>
                        <div className="Venue-form-row">
                            <Form.Item name="area" label="Area" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                            <Form.Item name="city" label="City" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                        </div>

                        <div className="Venue-form-row">
                            <Form.Item name="state" label="State" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                            <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                        </div>

                        <Form.Item name="bookingPolicy" label="Booking Policy">
                            <TextArea rows={3} />
                        </Form.Item>
                    </div>

                    {/* Right Side Map Section */}
                    <div className="map-side">
                        <div className="Venue-form-row">
                            <Form.Item label="Search for a location">
                                <Input placeholder="Search location" />
                            </Form.Item>
                            {/* <LocationSearch form={form} onPlaceSelect={onPlaceSelect} /> */}
                        </div>
                        <div className="map-container">
                            <p className="map-label">Location</p>
                            <iframe
                                title="map"
                                src={mapSrc}
                                width="100%"
                                height="220"
                                style={{ border: '1px solid #ccc', borderRadius: 8 }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>


                <Form.Item className="centered-submit">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        UPDATE
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
