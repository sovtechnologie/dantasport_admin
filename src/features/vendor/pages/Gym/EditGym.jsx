import { Form, Input, Button, Select, Upload, Radio, TimePicker, InputNumber, message, Spin } from 'antd';
import "../../styelsheets/Manage/VendorInfo.css";
import UploadImage from '../../../../assets/UploadIcon.png';
import { useEffect, useMemo, useState } from 'react';
import GooglePlacesAutocomplete from '../../../../components/GooglePlacesAutocomplete';
import { useFetchActiveAmenities, useFetchGymDetails, useUpdateGym } from '../../../../hooks/vendor/venue/useFetchvendorVenues';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const { TextArea } = Input;

export default function EditGym() {
    const [form] = Form.useForm();
    const { RangePicker } = TimePicker;
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    
    // Get gym data passed from navigation state (from GymList)
    const gymDataFromState = location.state?.gymData;
    const [gymData, setGymData] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [mobileFileList, setMobileFileList] = useState([]);
    const [webFileList, setWebFileList] = useState([]);

    const [mapLocation, setMapLocation] = useState({
        latitude: 18.5204,
        longitude: 73.8567,
    });

    // Data hooks
    const { data: amenitiesData } = useFetchActiveAmenities();
    const amenitiesOptions = amenitiesData?.resutl || [];
    const { data: gymResp, isLoading } = useFetchGymDetails(id);
    const updateGymMutation = useUpdateGym();

    const extractGym = (resp) => {
        console.log('Raw API response:', resp); // Debug log
        if (!resp) return null;
        const pickFirst = (obj) => Array.isArray(obj) ? obj[0] : obj;
        // Try common shapes: {result}, {data:{result}}, direct object, array
        if (resp.result) {
            const extracted = pickFirst(resp.result);
            console.log('Extracted from resp.result:', extracted);
            return extracted;
        }
        if (resp.data?.result) {
            const extracted = pickFirst(resp.data.result);
            console.log('Extracted from resp.data.result:', extracted);
            return extracted;
        }
        if (resp.data && (resp.data.gym_name || resp.data.gymName)) {
            console.log('Extracted from resp.data:', resp.data);
            return resp.data;
        }
        if (resp.gym_name || resp.gymName) {
            console.log('Extracted direct object:', resp);
            return resp;
        }
        console.log('Could not extract gym data from:', resp);
        return null;
    };

    // Function to prefill form with gym data
    const prefillForm = (gymData) => {
        if (!gymData) return;

        console.log('Prefilling form with gym data:', gymData); // Debug log

        // Note: Amenities are handled separately in dedicated useEffect after options load

        // Handle price - new API structure has price field directly
        let passPrice;
        if (gymData.price !== undefined && gymData.price !== null) {
            passPrice = Number(gymData.price);
        } else if (gymData.pass_price !== undefined && gymData.pass_price !== null) {
            passPrice = Number(gymData.pass_price);
        } else if (gymData.passPrice !== undefined && gymData.passPrice !== null) {
            passPrice = Number(gymData.passPrice);
        } else if (gymData.day_pass_price !== undefined && gymData.day_pass_price !== null) {
            passPrice = Number(gymData.day_pass_price);
        }

        // Handle pincode - check multiple possible field names with debugging
        console.log('🔍 Checking pincode in gymData from navigation state:', {
            pincode: gymData.pincode,
            pin_code: gymData.pin_code,
            postal_code: gymData.postal_code,
            zipcode: gymData.zipcode,
            allKeys: Object.keys(gymData)
        });
        
        const pincode = gymData.pincode || gymData.pin_code || gymData.postal_code || gymData.zipcode || '';
        console.log('🔍 Extracted pincode from navigation state:', pincode);

        const initialValues = {
            gymName: gymData.gym_name || gymData.gymName || '',
            aboutGym: gymData.about_gym || gymData.aboutGym || '',
            onlyWomen: (Number(gymData.only_women) === 1 || gymData.onlyWomen === true) ? 'yes' : 'no',
            isBookable: (Number(gymData.is_bookable) === 1 || gymData.isBookable === true) ? 'yes' : 'no',
            fullAddress: gymData.full_address || gymData.fullAddress || '',
            state: gymData.state || '',
            city: gymData.city || '',
            area: gymData.area || '',
            pincode: pincode,
            passPrice: passPrice,
            termAndConditions: gymData.term_and_conditions || gymData.termAndConditions || '',
            cancellationPolicy: gymData.cancellation_policy || gymData.cancellationPolicy || '',
            // Note: amenities handled separately
            latitude: gymData.lat || gymData.latitude || undefined,
            longitude: gymData.lng || gymData.longitude || undefined,
            timing: (gymData.start_time && gymData.end_time) || (gymData.startTime && gymData.endTime) ? 
                [
                    dayjs(gymData.start_time || gymData.startTime, 'HH:mm'), 
                    dayjs(gymData.end_time || gymData.endTime, 'HH:mm')
                ] : undefined,
        };

        console.log('Setting form values:', initialValues); // Debug log

        form.setFieldsValue(initialValues);

        const lat = initialValues.latitude;
        const lng = initialValues.longitude;
        if (lat && lng) setMapLocation({ latitude: lat, longitude: lng });

        // Prefill existing images into Upload components for better UX
        const mobileImageUrl = gymData.mobile_image || gymData.mobileImage || gymData.image_mobile || gymData.imageMobile || null;
        const desktopImageUrl = gymData.desktop_image || gymData.desktopImage || gymData.image_desktop || gymData.imageDesktop || null;

        if (mobileImageUrl) {
            setMobileFileList([
                {
                    uid: 'mobile-1',
                    name: 'mobile-cover.jpg',
                    status: 'done',
                    url: mobileImageUrl,
                },
            ]);
        }
        if (desktopImageUrl) {
            setWebFileList([
                {
                    uid: 'desktop-1',
                    name: 'desktop-cover.jpg',
                    status: 'done',
                    url: desktopImageUrl,
                },
            ]);
        }
    };

    // Get gym data from location state and set it - same as EditCoupon
    useEffect(() => {
        if (location.state?.gymData) {
            const data = location.state.gymData;
            setGymData(data);
            console.log('Setting gym data from location state:', data);
        }
    }, [location.state]);

    // Set form values when gymData is available - similar to EditCoupon
    useEffect(() => {
        if (gymData) {
            console.log('Setting form values from gym data:', gymData);
            
            // Set form values
            form.setFieldsValue({
                gymName: gymData.gym_name || gymData.gymName || '',
                aboutGym: gymData.about_gym || gymData.aboutGym || '',
                onlyWomen: (Number(gymData.only_women) === 1 || gymData.onlyWomen === true) ? 'yes' : 'no',
                isBookable: (Number(gymData.is_bookable) === 1 || gymData.isBookable === true) ? 'yes' : 'no',
                fullAddress: gymData.full_address || gymData.fullAddress || '',
                state: gymData.state || '',
                city: gymData.city || '',
                area: gymData.area || '',
                pincode: gymData.pincode || gymData.pin_code || gymData.postal_code || gymData.zipcode || '',
                termAndConditions: gymData.term_and_conditions || gymData.termAndConditions || '',
                cancellationPolicy: gymData.cancellation_policy || gymData.cancellationPolicy || '',
                latitude: gymData.lat || gymData.latitude || undefined,
                longitude: gymData.lng || gymData.longitude || undefined,
                timing: (gymData.start_time && gymData.end_time) || (gymData.startTime && gymData.endTime) ? 
                    [
                        dayjs(gymData.start_time || gymData.startTime, 'HH:mm'), 
                        dayjs(gymData.end_time || gymData.endTime, 'HH:mm')
                    ] : undefined,
            });

            // Debug: Check if pincode was set
            console.log('🔍 Form values set from gymData:', {
                pincode: gymData.pincode || gymData.pin_code || gymData.postal_code || gymData.zipcode || '',
                allSetValues: {
                    gymName: gymData.gym_name || gymData.gymName || '',
                    pincode: gymData.pincode || gymData.pin_code || gymData.postal_code || gymData.zipcode || '',
                }
            });

            // Set map location if available
            const lat = gymData.lat || gymData.latitude;
            const lng = gymData.lng || gymData.longitude;
            if (lat && lng) setMapLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });

            // Set images if available
            const mobileImageUrl = gymData.mobile_image || gymData.mobileImage || null;
            const desktopImageUrl = gymData.desktop_image || gymData.desktopImage || null;

            if (mobileImageUrl) {
                setMobileFileList([{
                    uid: 'mobile-1',
                    name: 'mobile-cover.jpg',
                    status: 'done',
                    url: mobileImageUrl,
                }]);
            }
            if (desktopImageUrl) {
                setWebFileList([{
                    uid: 'desktop-1',
                    name: 'desktop-cover.jpg',
                    status: 'done',
                    url: desktopImageUrl,
                }]);
            }
        }
    }, [gymData, form]);

    // Handle API response data after gymData is set - similar to EditCoupon sports handling
    useEffect(() => {
        if (gymData && gymResp) {
            const g = extractGym(gymResp);
            if (g) {
                console.log('Processing API response data:', g);
                
                const apiFields = {};

                // Handle price from API response - new structure has price field directly
                if (g.price !== undefined && g.price !== null) {
                    apiFields.passPrice = Number(g.price);
                    console.log('Setting passPrice from API:', apiFields.passPrice);
                }

                // Handle pincode from API response - enhanced debugging
                console.log('🔍 Checking pincode in API response:', {
                    pincode: g.pincode,
                    pin_code: g.pin_code,
                    postal_code: g.postal_code,
                    zipcode: g.zipcode,
                    allKeys: Object.keys(g)
                });
                
                const pincode = g.pincode || g.pin_code || g.postal_code || g.zipcode || '';
                console.log('🔍 Extracted pincode value:', pincode);
                
                if (pincode) {
                    apiFields.pincode = pincode;
                    console.log('✅ Setting pincode from API:', pincode);
                } else {
                    console.log('❌ No pincode found in API response');
                }

                // Update form with API fields
                if (Object.keys(apiFields).length > 0) {
                    form.setFieldsValue(apiFields);
                    console.log('🔍 API fields set:', apiFields);
                } else {
                    console.log('🔍 No API fields to set, testing pincode manually...');
                    // Test: Set a test pincode to verify form field works
                    form.setFieldsValue({ pincode: '123456' });
                    console.log('🧪 Test pincode set: 123456');
                }
            }
        }
    }, [gymData, gymResp, form]);

    // Handle amenities separately after amenities options are loaded - focus on IDs
    useEffect(() => {
        if (gymData && gymResp && amenitiesOptions.length > 0) {
            const g = extractGym(gymResp);
            if (g) {
                console.log('🔍 Processing amenities from API response:', g);
                console.log('🔍 Available amenities options:', amenitiesOptions);
                console.log('🔍 All keys in API response:', Object.keys(g));
                console.log('🔍 Full API response structure:', JSON.stringify(g, null, 2));
                
                let amenitiesIds = [];
                
                // Check if amenities exist in API response
                const hasAmenities = g.amenities || g.amenitiesIds || g.amenities_ids || g.amenities_list;
                console.log('🔍 Has amenities in API response:', hasAmenities);
                console.log('🔍 Checking for amenities_ids specifically:', g.amenities_ids);
                
                // Direct ID extraction - focus on getting the actual IDs
                // Priority: amenities_ids (your specific format) > amenitiesIds > amenities > amenities_list
                if (Array.isArray(g.amenities_ids)) {
                    console.log('✅ Found amenities_ids array (your format):', g.amenities_ids);
                    amenitiesIds = g.amenities_ids;
                } else if (Array.isArray(g.amenities)) {
                    console.log('✅ Found amenities array:', g.amenities);
                    amenitiesIds = g.amenities.map(a => {
                        if (typeof a === 'object' && a !== null) {
                            // Extract ID from object structure
                            return a.id || a.amenities_id || a.amenity_id || a.value;
                        }
                        // If it's already a number/string ID
                        return a;
                    });
                } else if (Array.isArray(g.amenitiesIds)) {
                    console.log('✅ Found amenitiesIds array:', g.amenitiesIds);
                    amenitiesIds = g.amenitiesIds;
                } else if (g.amenities_list && Array.isArray(g.amenities_list)) {
                    console.log('✅ Found amenities_list array:', g.amenities_list);
                    amenitiesIds = g.amenities_list;
                } else {
                    console.log('❌ No amenities found in API response');
                    console.log('🔍 Checking if amenities exist in gymData from navigation state...');
                    
                    // Fallback: Check if amenities exist in gymData from navigation state
                    if (gymData.amenities || gymData.amenitiesIds || gymData.amenities_ids) {
                        console.log('✅ Found amenities in gymData from navigation state');
                        if (Array.isArray(gymData.amenities_ids)) {
                            console.log('✅ Found amenities_ids in gymData:', gymData.amenities_ids);
                            amenitiesIds = gymData.amenities_ids;
                        } else if (Array.isArray(gymData.amenities)) {
                            amenitiesIds = gymData.amenities.map(a => {
                                if (typeof a === 'object' && a !== null) {
                                    return a.id || a.amenities_id || a.amenity_id || a.value;
                                }
                                return a;
                            });
                        } else if (Array.isArray(gymData.amenitiesIds)) {
                            amenitiesIds = gymData.amenitiesIds;
                        }
                    } else {
                        console.log('❌ No amenities found in gymData either');
                    }
                }

                // Ensure all values are valid numbers (IDs)
                amenitiesIds = amenitiesIds
                    .map(id => {
                        const numId = Number(id);
                        return !isNaN(numId) && numId > 0 ? numId : null;
                    })
                    .filter(id => id !== null);

                console.log('🔍 Final amenities IDs to set:', amenitiesIds);

                if (amenitiesIds.length > 0) {
                    // Verify that these IDs exist in amenitiesOptions
                    const validIds = amenitiesIds.filter(id => 
                        amenitiesOptions.some(option => option.id === id)
                    );
                    console.log('🔍 Valid amenities IDs (exist in options):', validIds);
                    
                    if (validIds.length > 0) {
                        form.setFieldsValue({ amenities: validIds });
                        console.log('✅ Amenities set successfully:', validIds);
                        
                        // Debug: Check if form values were actually set
                        setTimeout(() => {
                            const currentValues = form.getFieldsValue();
                            console.log('🔍 Current form values after setting amenities:', currentValues);
                            console.log('🔍 Current amenities value:', currentValues.amenities);
                        }, 100);
                    } else {
                        console.log('❌ No valid amenities IDs found in options');
                        console.log('🔍 Available option IDs:', amenitiesOptions.map(o => o.id));
                        
                        // Test: Try to set the exact amenities_ids format you mentioned
                        if (amenitiesOptions.length >= 3) {
                            const testAmenitiesIds = [5, 4, 3]; // Your example format
                            console.log('🧪 Testing with your exact amenities_ids format:', testAmenitiesIds);
                            form.setFieldsValue({ amenities: testAmenitiesIds });
                            console.log('🧪 Test amenities_ids set, check if form shows selection');
                        }
                    }
                } else {
                    console.log('❌ No amenities IDs extracted from any source');
                    
                    // Debug: Try to set some test amenities to verify form field works
                    if (amenitiesOptions.length > 0) {
                        const testIds = [amenitiesOptions[0].id]; // Use first available amenity
                        console.log('🧪 Testing with first available amenity ID:', testIds);
                        form.setFieldsValue({ amenities: testIds });
                        console.log('🧪 Test amenities set, check if form shows selection');
                    }
                }
            }
        } else {
            console.log('🔍 Missing dependencies:', {
                gymData: !!gymData,
                gymResp: !!gymResp,
                amenitiesOptionsLength: amenitiesOptions.length
            });
        }
    }, [gymData, gymResp, amenitiesOptions, form]);

    // Debug: Watch for form value changes
    useEffect(() => {
        const subscription = form.getFieldsValue();
        console.log('🔍 Form values changed:', subscription);
        if (subscription.amenities) {
            console.log('🔍 Amenities field value:', subscription.amenities);
        }
    }, [form]);

    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;

    const handleMobileChange = ({ fileList }) => setMobileFileList(fileList);
    const handleWebChange = ({ fileList }) => setWebFileList(fileList);

    const onPlaceSelect = ({ address, area, city, state, pincode, latitude, longitude, search }) => {
        form.setFieldsValue({ fullAddress: address, area, city, state, pincode, latitude, longitude, search });
        if (latitude && longitude) {
            setMapLocation({ latitude, longitude });
        }
    };

    const handleFinish = async (values) => {
        try {
            setSubmitting(true);
            const formData = new FormData();

            // Images - same as AddGym
            if (mobileFileList[0]?.originFileObj) {
                formData.append('mobileImage', mobileFileList[0].originFileObj);
            }
            if (webFileList[0]?.originFileObj) {
                formData.append('desktopImage', webFileList[0].originFileObj);
            }

            // Map gym-specific fields to API - exactly same as AddGym
            formData.append('gymName', values.gymName);
            formData.append('aboutGym', values.aboutGym || '');
            formData.append('onlyWomen', values.onlyWomen === 'yes');
            formData.append('lat', values.latitude || '');
            formData.append('lng', values.longitude || '');
            formData.append('fullAddress', values.fullAddress || '');
            formData.append('state', values.state || '');
            formData.append('city', values.city || '');
            formData.append('area', values.area || '');
            formData.append('pincode', values.pincode || '');
            formData.append('termAndConditions', values.termAndConditions || '');
            formData.append('cancellationPolicy', values.cancellationPolicy || '');
            formData.append('amenitiesType', 'gym');

            // Timing and isBookable - same as AddGym
            if (values.timing && values.timing.length === 2) {
                formData.append('startTime', values.timing[0].format('HH:mm'));
                formData.append('endTime', values.timing[1].format('HH:mm'));
            }
            formData.append('isBookable', values.isBookable === 'yes');

            // Single fixed pass name with user-provided price - same as AddGym
            const gymPasses = [
                { passes_name: 'One day passes', price: Number(values.passPrice || 0) }
            ];
            formData.append('gymPasses', JSON.stringify(gymPasses));

            // Amenities IDs as single array similar to gymPasses - same as AddGym
            if (values.amenities?.length) {
                formData.append('amenities', JSON.stringify(values.amenities));
            }

            const res = await updateGymMutation.mutateAsync({ gymId: id, formData });
            if (res?.status === 200) {
                message.success('Gym updated successfully');
                navigate('/vendor/gym/list');
            } else {
                message.error(res?.message || 'Failed to update gym');
            }
        } catch (e) {
            message.error(e?.message || 'Failed to update gym');
        } finally {
            setSubmitting(false);
        }
    };

    if (!gymData) {
        return (
            <div className="venue-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240, flexDirection: 'column' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16, color: '#666' }}>Loading gym data...</div>
            </div>
        );
    }

    // Show loading state when gym details are loading
    if (isLoading) {
        return (
            <div className="venue-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240, flexDirection: 'column' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16, color: '#666' }}>Loading gym details...</div>
            </div>
        );
    }

    return (
        <div className="venue-info-container">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <div className="section-title">GYM Information</div>

                <div className="Venue-form-row">
                    <Form.Item name="gymName" label="Gym Name" rules={[{ required: true }]}> 
                        <Input placeholder="Enter gym name" />
                    </Form.Item>
                    <Form.Item name="coverMobile" label="Upload Cover Image For Mobile App">
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="text"
                            fileList={mobileFileList}
                            onChange={handleMobileChange}
                        >
                            <Button className="uploadImg"><img src={UploadImage} alt="upload" /> Upload Cover Image</Button>
                        </Upload>
                    </Form.Item>
                </div>

                <div className="Venue-form-row">
                    <Form.Item name="aboutGym" label="Add About Gym" rules={[{ required: true }]}> 
                        <TextArea rows={5} placeholder="Describe your gym..." />
                    </Form.Item>
                </div>

                <div className="Venue-form-row">
                    <Form.Item name="onlyWomen" label="Only Women?" initialValue="no">
                        <Radio.Group>
                            <Radio value="yes" className="radio-btn">Yes</Radio>
                            <Radio value="no" className="radio-btn">No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="amenities" label="Amenities" rules={[{ required: true }]}> 
                        <Select 
                            mode="multiple" 
                            placeholder="select amenities" 
                            options={amenitiesOptions.map(a => ({ label: a.amenities_name, value: a.id }))} 
                            optionFilterProp="label"
                            allowClear
                        />
                    </Form.Item>
                </div>

                <div className="Venue-form-row">
                    <Form.Item name="isBookable" label="Is Bookable?" rules={[{ required: true }]}> 
                        <Radio.Group>
                            <Radio value="yes" className="radio-btn">Yes</Radio>
                            <Radio value="no" className="radio-btn">No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="timing" label="Timing">
                        <RangePicker format="HH:mm" minuteStep={5} />
                    </Form.Item>
                </div>

                <div className="Venue-form-row">
                    <Form.Item name="coverWeb" label="Upload Cover Image For Website">
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="text"
                            fileList={webFileList}
                            onChange={handleWebChange}
                        >
                            <Button className="uploadImg"><img src={UploadImage} alt="upload" /> Upload Cover Image</Button>
                        </Upload>
                    </Form.Item>
                </div>

                <div className="section-title">Location Info</div>
                <div className="location-container">
                    <div className="location-form">
                        <div className="Venue-form-row">
                            <Form.Item name="fullAddress" label="Enter Full Address" rules={[{ required: true }]}> 
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="Venue-form-row">
                            <Form.Item name="area" label="Area" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="city" label="City" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="Venue-form-row">
                            <Form.Item name="state" label="State" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item name="passPrice" label="Price (Per Day passes)" rules={[{ required: true }]}> 
                            <InputNumber style={{ width: '100%' }} placeholder="Eg: 250" />
                        </Form.Item>
                        <Form.Item name="termAndConditions" label="Terms & Conditions">
                            <TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="cancellationPolicy" label="Cancellation Policy">
                            <TextArea rows={3} />
                        </Form.Item>
                    </div>

                    <div className="map-side">
                        <div className="Venue-form-row">
                            <Form.Item name="search" label="Search for a location">
                                <GooglePlacesAutocomplete onPlaceSelect={onPlaceSelect} placeholder="Search your address" />
                            </Form.Item>
                            <Form.Item name="latitude" hidden><Input /></Form.Item>
                            <Form.Item name="longitude" hidden><Input /></Form.Item>
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
                    <Button type="primary" htmlType="submit" loading={submitting}>UPDATE</Button>
                </Form.Item>
            </Form>
        </div>
    );
}


