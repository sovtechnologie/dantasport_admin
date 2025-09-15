import "../../styelsheets/Manage/addCoupan.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Form, Select, Input, InputNumber, Radio, message, Spin, Typography, Card, DatePicker, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchSportsByCategory } from "../../../../hooks/vendor/sports/useFetchSportsByCategory";
import { useUpdateCoupon } from "../../../../hooks/vendor/coupons/useUpdateCoupon";
import { ArrowLeftOutlined, TagOutlined, CalendarOutlined, PercentageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export default function EditCoupon() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = useSelector((state) => state.auth.user.id);
    const [form] = Form.useForm();
    const [selectedVenueId, setSelectedVenueId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedSports, setSelectedSports] = useState(['All Sports']);
    const [couponData, setCouponData] = useState(null);

    // Fetch venue list
    const { data: venueList, loading: venueLoading, error: venueError } = useFetchVendorVenueList();

    // Fetch sports list
    const { data: sportsData, loading: sportsLoading, error: sportsError } = useFetchSportsByCategory(1);

    // Update coupon mutation
    const updateCouponMutation = useUpdateCoupon();

    // Get coupon data from location state
    useEffect(() => {
        if (location.state?.couponData) {
            const data = location.state.couponData;
            setCouponData(data);
            setSelectedVenueId(data.venueId);
            
            // Set form values
            form.setFieldsValue({
                selectVenue: data.venueId,
                couponCode: data.coupon,
                couponType: data.type === 'Upto' ? 'percentage' : 'flat',
                value: parseFloat(data.value.replace(/[%₹]/g, '')),
                startDate: data.startDate ? dayjs(data.startDate) : null,
                endDate: data.rawExpiryDate ? dayjs(data.rawExpiryDate) : null,
                description: data.description
            });

            // Set selected sports - check if it's actually all sports or specific sports
            if (data.isAllSports === 1 && (!data.sportsIds || data.sportsIds.length === 0)) {
                // True "All Sports" - no specific sports selected
                setSelectedSports(['All Sports']);
            } else if (data.sportsIds && data.sportsIds.length > 0) {
                // Specific sports selected, even if isAllSports is 1
                const sportsNames = data.sportsIds.map(sportId => {
                    const sport = sportsData?.result?.find(s => s.id === sportId);
                    return sport?.sports_name || `Sport ${sportId}`;
                }).filter(Boolean);
                setSelectedSports(sportsNames.length > 0 ? sportsNames : ['All Sports']);
            } else {
                // Fallback to All Sports
                setSelectedSports(['All Sports']);
            }
        }
    }, [location.state, form, sportsData]);

    // Handle sports selection after sports data is loaded
    useEffect(() => {
        if (couponData && sportsData?.result) {
            // Set selected sports - check if it's actually all sports or specific sports
            if (couponData.isAllSports === 1 && (!couponData.sportsIds || couponData.sportsIds.length === 0)) {
                // True "All Sports" - no specific sports selected
                setSelectedSports(['All Sports']);
            } else if (couponData.sportsIds && couponData.sportsIds.length > 0) {
                // Specific sports selected, even if isAllSports is 1
                const sportsNames = couponData.sportsIds.map(sportId => {
                    const sport = sportsData.result.find(s => s.id === sportId);
                    return sport?.sports_name || `Sport ${sportId}`;
                }).filter(Boolean);
                setSelectedSports(sportsNames.length > 0 ? sportsNames : ['All Sports']);
            } else {
                // Fallback to All Sports
                setSelectedSports(['All Sports']);
            }
        }
    }, [couponData, sportsData?.result]);

    // Set default venue when venue list loads
    useEffect(() => {
        if (venueList?.resutl?.length && !selectedVenueId && !couponData) {
            setSelectedVenueId(venueList.resutl[0].venue_id);
            form.setFieldsValue({ selectVenue: venueList.resutl[0].venue_id });
        }
    }, [venueList, selectedVenueId, form, couponData]);

    // Handle errors
    useEffect(() => {
        if (venueError) {
            message.error("Failed to load venue list");
        }
        if (sportsError) {
            message.error("Failed to load sports list");
        }
    }, [venueError, sportsError]);

    // Sync form field with selectedSports state
    useEffect(() => {
        form.setFieldsValue({ sport: selectedSports });
    }, [selectedSports, form]);

    // Memoized selected venue for performance
    const selectedVenue = useMemo(() => {
        return venueList?.resutl?.find(venue => venue.venue_id === selectedVenueId);
    }, [venueList?.resutl, selectedVenueId]);

    const handleVenueChange = useCallback((venueId) => {
        setSelectedVenueId(venueId);
        form.setFieldsValue({ selectVenue: venueId });
    }, [form]);

    const handleSportToggle = useCallback((sport) => {
        setSelectedSports(prev => {
            let newSports;
            if (sport === 'All Sports') {
                newSports = ['All Sports'];
            } else if (prev.includes(sport)) {
                newSports = prev.filter(s => s !== sport);
                newSports = newSports.length === 0 ? ['All Sports'] : newSports;
            } else {
                newSports = prev.filter(s => s !== 'All Sports');
                newSports = [...newSports, sport];
            }
            
            // Update form field value for validation
            form.setFieldsValue({ sport: newSports });
            
            return newSports;
        });
    }, [form]);

    // Memoized sports list for performance
    const sportsList = useMemo(() => {
        if (!sportsData?.result) return [];
        return sportsData.result.map(sport => ({
            id: sport.id,
            name: sport.sports_name,
            image: sport.sports_images,
            status: sport.status
        }));
    }, [sportsData?.result]);

    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            console.log('Form Values:', values);
            console.log('Selected Sports:', selectedSports);
            console.log('Selected Venue ID:', selectedVenueId);
            console.log('Form Field Names:', Object.keys(values));

            // Prepare sports data
            const isAllSports = selectedSports.includes('All Sports');
            const sportsIds = isAllSports ? [] : selectedSports
                .filter(sport => sport !== 'All Sports')
                .map(sportName => {
                    const sport = sportsList.find(s => s.name === sportName);
                    return sport?.id;
                })
                .filter(Boolean);

            // Prepare API payload
            const payload = {
                couponId: couponData.id,
                venueId: selectedVenueId,
                couponCode: values.couponCode,
                couponType: values.couponType, // "percentage" or "flat"
                value: values.value,
                // maxDiscount: values.maxDiscount || null,
                // minimumBookingValue: values.minimumBookingValue || null,
                description: values.description,
                startDate: values.startDate?.format('YYYY-MM-DD'),
                endDate: values.endDate?.format('YYYY-MM-DD'),
                sportsIds: sportsIds,
                isAllSports: isAllSports ? 1 : 0,
                status: 1
            };


            console.log('API Payload:', payload);

            // Call API
            const response = await updateCouponMutation.mutateAsync(payload);
            
            if (response.status === 200) {
                message.success("Discount coupon updated successfully!");
                // Show loading message while list refreshes
                message.loading("Refreshing coupon list...", 1);
                // Navigate back to discount page
                navigate('/vendor/manage/discount');
            } else {
                throw new Error(response.message || 'Failed to update coupon');
            }
        } catch (error) {
            console.error('Error updating coupon:', error);
            message.error(error.message || "Failed to update discount coupon. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!couponData) {
        return (
            <div className="add-coupon-conatiner">
                <div className="page-loading-container">
                    <Spin size="large" />
                    <div className="page-loading-text">
                        Loading coupon data...
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state when venues or sports are loading
    if (venueLoading || sportsLoading) {
        return (
            <div className="add-coupon-conatiner">
                <div className="page-loading-container">
                    <Spin size="large" />
                    <div className="page-loading-text">
                        {venueLoading ? "Loading venues..." : "Loading sports..."}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="add-coupon-conatiner">
            {/* Compact Header */}
            <div className="coupon-header-compact">
                <div className="header-left">
                    <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate('/vendor/manage/discount')}
                        className="back-button-compact"
                    >
                        Back
                    </Button>
                    <div className="header-title">
                        <TagOutlined className="title-icon" />
                        <Title level={3} className="coupon-title-compact">Edit Discount Coupon</Title>
                    </div>
                </div>
                <div className="header-right">
                    <Text type="secondary" className="venue-info">
                        {selectedVenue?.venue_name || 'Select venue'}
                    </Text>
                </div>
            </div>

            <Card className="coupon-form-card-compact">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    className="coupon-form-compact"
                >
                    {/* Main Form Grid */}
                    <div className="form-grid">
                        {/* Left Column */}
                        <div className="form-column">
                            {/* Venue Selection */}
                            <Form.Item 
                                name="selectVenue" 
                                label="Venue" 
                                rules={[{ required: true, message: 'Please select a venue' }]}
                                className="form-item-compact"
                            >
                                <Select 
                                    placeholder="Select Venue" 
                                    className="venue-select-compact"
                                    loading={venueLoading}
                                    onChange={handleVenueChange}
                                    value={selectedVenueId}
                                >
                                    {venueList?.resutl?.map((venue) => (
                                        <Option key={venue.venue_id} value={venue.venue_id}>
                                            {venue.venue_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {/* Coupon Code */}
                            <Form.Item 
                                name="couponCode" 
                                label="Coupon Code" 
                                rules={[{ required: true, message: 'Please enter coupon code' }]}
                                className="form-item-compact"
                            >
                                <Input 
                                    placeholder="e.g., WELCOME20" 
                                    className="form-input-compact"
                                />
                            </Form.Item>

                            {/* Coupon Type */}
                            <Form.Item 
                                name="couponType" 
                                label="Type" 
                                rules={[{ required: true, message: 'Please select type' }]}
                                className="form-item-compact"
                            >
                                <Radio.Group className="radio-group-compact">
                                    <Radio value="percentage" className="radio-btn-compact">
                                        <PercentageOutlined />
                                        Percentage
                                    </Radio>
                                    <Radio value="flat" className="radio-btn-compact">
                                        <TagOutlined />
                                        Fixed
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>

                            {/* Discount Value */}
                            <Form.Item 
                                name="value" 
                                label="Discount Value" 
                                rules={[{ required: true, message: 'Please enter value' }]}
                                className="form-item-compact"
                            >
                                <InputNumber 
                                    suffix="₹" 
                                    style={{ width: '100%' }} 
                                    placeholder="Enter value"
                                    className="form-input-compact"
                                />
                            </Form.Item>
                        </div>

                        {/* Right Column */}
                        <div className="form-column">
                            {/* Start Date */}
                            <Form.Item 
                                name="startDate" 
                                label="Start Date" 
                                rules={[{ required: true, message: 'Please select start date' }]}
                                className="form-item-compact"
                            >
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    className="form-input-compact"
                                    placeholder="Start date"
                                />
                            </Form.Item>

                            {/* Expiry Date */}
                            <Form.Item 
                                name="endDate" 
                                label="Expiry Date" 
                                rules={[{ required: true, message: 'Please select expiry date' }]}
                                className="form-item-compact"
                            >
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    className="form-input-compact"
                                    placeholder="Expiry date"
                                />
                            </Form.Item>

                        </div>
                    </div>

                    {/* Full Width Items */}
                    <div className="form-full-width">
                        {/* Description */}
                        <Form.Item 
                            name="description" 
                            label="Description" 
                            rules={[{ required: true, message: 'Please enter description' }]}
                            className="form-item-compact"
                        >
                            <TextArea 
                                placeholder="Brief description of the coupon offer..." 
                                rows={2}
                                className="form-textarea-compact"
                            />
                        </Form.Item>


                        {/* Applicable Sports */}
                        <Form.Item 
                            name="sport" 
                            label="Applicable Sports" 
                            rules={[{ required: true, message: 'Please select sports' }]}
                            className="form-item-compact"
                            initialValue={selectedSports}
                        >
                            <div className="sports-selection-container">
                                {sportsLoading ? (
                                    <div className="sports-loading">
                                        <Spin size="small" />
                                        <Text type="secondary" style={{ marginLeft: 8 }}>Loading sports...</Text>
                                    </div>
                                ) : (
                                    <Space wrap className="sports-container">
                                        <Button
                                            key="All Sports"
                                            type={selectedSports.includes('All Sports') ? 'primary' : 'default'}
                                            onClick={() => handleSportToggle('All Sports')}
                                            className="sport-button-compact"
                                            size="small"
                                        >
                                            All Sports
                                        </Button>
                                        {sportsList.map(sport => (
                                            <Button
                                                key={sport.id}
                                                type={selectedSports.includes(sport.name) ? 'primary' : 'default'}
                                                onClick={() => handleSportToggle(sport.name)}
                                                className="sport-button-compact"
                                                size="small"
                                                disabled={sport.status !== 1}
                                            >
                                                {sport.name}
                                            </Button>
                                        ))}
                                    </Space>
                                )}
                            </div>
                        </Form.Item>
                    </div>

                    {/* Compact Submit Button */}
                    <div className="form-actions-compact">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large"
                            loading={isSubmitting || updateCouponMutation.isPending}
                            className="submit-button-compact"
                            block
                        >
                            {isSubmitting || updateCouponMutation.isPending ? 'Updating Coupon...' : 'Update Discount Coupon'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}