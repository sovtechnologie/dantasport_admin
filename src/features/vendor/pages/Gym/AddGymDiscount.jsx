import "../../styelsheets/Manage/addCoupan.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Form, Select, Input, InputNumber, Flex, Radio, message, Spin, Typography, Card, DatePicker, Space, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchSportsByCategory } from "../../../../hooks/vendor/sports/useFetchSportsByCategory";
import { useCreateCoupon } from "../../../../hooks/vendor/coupons/useCreateCoupon";
import { ArrowLeftOutlined, TagOutlined, CalendarOutlined, PercentageOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export default function AddGymDiscount() {
    const navigate = useNavigate();
    const id = useSelector((state) => state.auth.user.id);
    const [form] = Form.useForm();
    const [selectedGymId, setSelectedGymId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedSports, setSelectedSports] = useState(['All Sports']);

    // Fetch gym list
    const { data: gymList, loading: gymLoading, error: gymError } = useFetchGymList(id);

    // Fetch sports list
    const { data: sportsData, loading: sportsLoading, error: sportsError } = useFetchSportsByCategory(1);

    // Create coupon mutation
    const createCouponMutation = useCreateCoupon();

    // Set default gym when gym list loads
    useEffect(() => {
        if (gymList?.result?.length && !selectedGymId) {
            setSelectedGymId(gymList.result[0].Id);
            form.setFieldsValue({ selectGym: gymList.result[0].Id });
        }
    }, [gymList, selectedGymId, form]);

    // Handle errors
    useEffect(() => {
        if (gymError) {
            message.error("Failed to load gym list");
        }
        if (sportsError) {
            message.error("Failed to load sports list");
        }
    }, [gymError, sportsError]);

    // Sync form field with selectedSports state
    useEffect(() => {
        form.setFieldsValue({ sport: selectedSports });
    }, [selectedSports, form]);

    // Memoized selected gym for performance
    const selectedGym = useMemo(() => {
        return gymList?.result?.find(gym => gym.Id === selectedGymId);
    }, [gymList?.result, selectedGymId]);

    const handleGymChange = useCallback((gymId) => {
        setSelectedGymId(gymId);
        form.setFieldsValue({ selectGym: gymId });
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
            console.log('Selected Gym ID:', selectedGymId);
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
                vendorId: id,
                type: 3, // type: 3 for gym
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
                linkedId: selectedGymId // gym ID
            };

            console.log('API Payload:', payload);

            // Call API
            const response = await createCouponMutation.mutateAsync(payload);
            
            if (response.status === 200) {
                message.success("Gym discount coupon created successfully!");
                // Show loading message while list refreshes
                message.loading("Refreshing gym coupon list...", 1);
                // Navigate back to gym discount page
                navigate('/vendor/gym/discount');
            } else {
                throw new Error(response.message || 'Failed to create gym coupon');
            }
        } catch (error) {
            console.error('Error creating gym coupon:', error);
            message.error(error.message || "Failed to create gym discount coupon. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading state when gyms or sports are loading
    if (gymLoading || sportsLoading) {
        return (
            <div className="add-coupon-conatiner">
                <div className="page-loading-container">
                    <Spin size="large" />
                    <div className="page-loading-text">
                        {gymLoading ? "Loading gyms..." : "Loading sports..."}
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
                        onClick={() => navigate('/vendor/gym/discount')}
                        className="back-button-compact"
                    >
                        Back
                    </Button>
                    <div className="header-title">
                        <TagOutlined className="title-icon" />
                        <Title level={3} className="coupon-title-compact">Add Gym Discount Coupon</Title>
                    </div>
                </div>
                <div className="header-right">
                    <Text type="secondary" className="venue-info">
                        {selectedGym?.gym_name || 'Select gym'}
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
                            {/* Gym Selection */}
                            <Form.Item 
                                name="selectGym" 
                                label="Gym" 
                                rules={[{ required: true, message: 'Please select a gym' }]}
                                className="form-item-compact"
                            >
                                <Select 
                                    placeholder="Select Gym" 
                                    className="venue-select-compact"
                                    loading={gymLoading}
                                    onChange={handleGymChange}
                                    value={selectedGymId}
                                >
                                    {gymList?.result?.map((gym) => (
                                        <Option key={gym.Id} value={gym.Id}>
                                            {gym.gym_name}
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
                                    placeholder="e.g., GYM20" 
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
                                placeholder="Brief description of the gym coupon offer..." 
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
                            loading={isSubmitting || createCouponMutation.isPending}
                            className="submit-button-compact"
                            block
                        >
                            {isSubmitting || createCouponMutation.isPending ? 'Creating Gym Coupon...' : 'Create Gym Discount Coupon'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}