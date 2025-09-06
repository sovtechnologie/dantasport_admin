import "../../styelsheets/Manage/Discount.css";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Button, Tag, Radio, Popconfirm, message, Spin, Tooltip, Space, Typography, Card, Badge, Select } from "antd";
import { DeleteOutlined, PlusOutlined, CalendarOutlined, PercentageOutlined, TagOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCouponList } from "../../../../hooks/vendor/coupons/useGetCouponList";
import { useDeleteCoupon } from "../../../../hooks/vendor/coupons/useDeleteCoupon";
import { useSoftDeleteCoupon } from "../../../../hooks/vendor/coupons/useUpdateCoupon";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";

const { Option } = Select;

const DiscountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = useSelector((state) => state.auth.user.id);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletingCouponId, setDeletingCouponId] = useState(null);

  // Fetch venue list
  const { data: venueList, loading: venueLoading, error: venueError } = useFetchVendorVenueList();

  // Fetch coupons data using getCouponList API
  const { data: couponsData, loading: couponsLoading, error: couponsError, isFetching: couponsFetching, refetch: refetchCoupons } = useGetCouponList(id, 1);
  
  // Delete coupon mutation
  const deleteCouponMutation = useDeleteCoupon();
  
  // Soft delete coupon mutation
  const softDeleteCouponMutation = useSoftDeleteCoupon();

  // Set default venue when venue list loads
  useEffect(() => {
    if (venueList?.resutl?.length && !selectedVenueId) {
      setSelectedVenueId(venueList.resutl[0].venue_id);
    }
  }, [venueList, selectedVenueId]);

  // Handle venue change
  const handleVenueChange = useCallback((venueId) => {
    setSelectedVenueId(venueId);
    setCurrentPage(1); // Reset to first page when venue changes
  }, []);

  // Memoized selected venue for performance
  const selectedVenue = useMemo(() => {
    return venueList?.resutl?.find(venue => venue.venue_id === selectedVenueId);
  }, [venueList?.resutl, selectedVenueId]);

  // Memoized coupons data source
  const dataSource = useMemo(() => {
    if (!couponsData?.result) return [];
    
    return couponsData.result.map(coupon => ({
      key: coupon.id,
      id: coupon.id,
      venue: coupon.venue?.venue_name || 'All Venues', // Since venue_id can be null for all venues
      venueId: coupon.linked_id, // Using linked_id as venueId
      coupon: coupon.coupon_code,
      type: coupon.coupon_type === 'percentage' ? 'Upto' : 'Fixed',
      value: coupon.coupon_type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`,
      banner: 'No', // Not provided in API response
      expiry: coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString('en-GB') : 'N/A',
      status: coupon.status === 1 ? 'Active' : 'Inactive',
      created_at: coupon.created_at ? new Date(coupon.created_at).toLocaleDateString('en-GB') : 'N/A',
      description: coupon.coupon_description || 'No description',
      maxDiscount: coupon.maximum_discount_value,
      minBookingValue: coupon.minium_booking_value,
      sportsIds: coupon.sports_id || [],
      isAllSports: coupon.isAllSports === 1,
      // Additional fields for editing
      startDate: coupon.start_date || null,
      rawExpiryDate: coupon.expiry_date || null,
      rawStatus: coupon.status,
      rawCouponType: coupon.coupon_type,
      rawValue: coupon.value
    }));
  }, [couponsData?.result]);

  // Handle errors
  useEffect(() => {
    if (venueError) {
      message.error("Failed to load venue list");
    }
    if (couponsError) {
      message.error("Failed to load coupons");
    }
  }, [venueError, couponsError]);

  // Refetch coupons when component mounts (user navigates back from add/edit forms)
  useEffect(() => {
    if (selectedVenueId) {
      console.log("🔄 Component mounted, refetching coupons...");
      refetchCoupons();
    }
  }, [refetchCoupons, selectedVenueId]);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCoupons = dataSource.slice(startIndex, startIndex + pageSize);

  // Enterprise-level memoized handlers for performance
  const handleAddCoupon = useCallback(() => {
    navigate('/vendor/manage/adddiscount');
  }, [navigate]);

  const handleDeleteCoupon = useCallback(async (coupon) => {
    try {
      setIsProcessing(true);
      setDeletingCouponId(coupon.id);
      
      // Use soft delete with PUT API call
      const response = await softDeleteCouponMutation.mutateAsync(coupon.id);
      
      if (response.status === 200) {
        message.success("Coupon deleted successfully");
        // Explicitly refetch the coupons list
        console.log("🔄 Refreshing coupons list after delete...");
        await refetchCoupons();
        message.loading("Refreshing list...", 1);
      } else {
        throw new Error(response.message || 'Failed to delete coupon');
      }
      
    } catch (error) {
      message.error(error.message || "Failed to delete coupon");
    } finally {
      setIsProcessing(false);
      setDeletingCouponId(null);
    }
  }, [softDeleteCouponMutation, refetchCoupons]);

  const handleEditCoupon = useCallback((coupon) => {
    navigate('/vendor/manage/editcoupon', { state: { couponData: coupon } });
  }, [navigate]);

  const columns = [
    {
      title: 'Coupon',
      key: 'coupon',
      width: 250,
      render: (_, record, index) => (
        <div className="coupon-info-cell">
          <div className="coupon-icon">
            <TagOutlined style={{ color: '#1163C7', fontSize: '20px' }} />
          </div>
          <div className="coupon-details">
            <div className="coupon-name">
              <Typography.Text strong>{record.coupon}</Typography.Text>
              <Badge 
                count={startIndex + index + 1} 
                style={{ backgroundColor: '#1163C7', marginLeft: 8 }}
                size="small"
              />
            </div>
            <div className="coupon-description">
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                {record.description}
              </Typography.Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type & Value',
      key: 'typeValue',
      width: 150,
      render: (_, record) => (
        <div className="type-value-cell">
          <div className="coupon-type">
            <Tag color="blue" style={{ borderRadius: 12 }}>
              {record.type}
            </Tag>
          </div>
          <div className="coupon-value">
            <PercentageOutlined style={{ color: '#1163C7', marginRight: 4 }} />
            <Typography.Text strong style={{ color: '#1163C7' }}>
              {record.value}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Sports',
      key: 'sports',
      width: 150,
      render: (_, record) => (
        <div className="sports-cell">
          {record.isAllSports ? (
            <Tag color="blue" style={{ borderRadius: 12 }}>
              All Sports
            </Tag>
          ) : (
            <div>
              {record.sportsIds?.length > 0 ? (
                record.sportsIds.map(sportId => (
                  <Tag key={sportId} color="green" style={{ borderRadius: 12, margin: '2px' }}>
                    Sport {sportId}
                  </Tag>
                ))
              ) : (
                <Typography.Text type="secondary">No sports</Typography.Text>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Banner Display',
      key: 'banner',
      width: 120,
      render: (_, record) => (
        <div className="banner-cell">
          <Radio.Group value={record.banner} disabled>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </div>
      ),
    },
    {
      title: 'Expiry',
      key: 'expiry',
      width: 120,
      render: (_, record) => (
        <div className="expiry-cell">
          <CalendarOutlined style={{ color: '#1163C7', marginRight: 4 }} />
          <Typography.Text>{record.expiry}</Typography.Text>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 100,
      render: (_, record) => (
        <Tag color="green" style={{ borderRadius: 12 }}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Created',
      key: 'created',
      width: 120,
      render: (_, record) => (
        <div className="created-cell">
          <CalendarOutlined style={{ color: '#1163C7', marginRight: 4 }} />
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            {record.created_at ? 
              new Date(record.created_at).toLocaleDateString() : 
              'N/A'
            }
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => {
        const isDeletingThisCoupon = deletingCouponId === record.id;
        const isAnyProcessing = isProcessing || softDeleteCouponMutation.isPending || couponsFetching;
        
        return (
          <Space size="small">
            <Tooltip title="Edit Coupon">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                size="small"
                disabled={isAnyProcessing}
                onClick={() => handleEditCoupon(record)}
                className="action-btn edit-btn"
              />
            </Tooltip>
            <Tooltip title={isDeletingThisCoupon ? "Deleting..." : "Delete Coupon"}>
              <Popconfirm
                title="Are you sure you want to delete this coupon?"
                description="This action cannot be undone."
                onConfirm={() => handleDeleteCoupon(record)}
                okText="Yes, Delete"
                cancelText="Cancel"
                disabled={isAnyProcessing}
              >
                <Button 
                  type="text" 
                  danger
                  icon={isDeletingThisCoupon ? <Spin size="small" /> : <DeleteOutlined />} 
                  size="small"
                  loading={isDeletingThisCoupon}
                  disabled={isAnyProcessing}
                  className="action-btn delete-btn"
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  // Show loading state when venues are loading
  if (venueLoading) {
    return (
      <div className="venue-card">
        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">Loading venues...</div>
        </div>
      </div>
    );
  }

  // Show loading state when no venue is selected or when coupons are loading
  if (!selectedVenueId || couponsLoading) {
    return (
      <div className="venue-card">
        <div className="venue-toolbar">
          <Select
            placeholder="Select Venue"
            className="venue-select"
            loading={venueLoading}
            onChange={handleVenueChange}
            value={selectedVenueId || undefined}
            disabled={venueLoading || !venueList?.resutl?.length}
          >
            {venueList?.resutl?.map((venue) => (
              <Option key={venue.venue_id} value={venue.venue_id}>
                {venue.venue_name}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            className="add-btn"
            disabled={true}
          >
            + Add Discount Coupon
          </Button>
        </div>

        <h3 className="venue-title">
          {selectedVenue?.venue_name || "Select a venue to view coupons"}
        </h3>

        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">
            {!selectedVenueId 
              ? "Please select a venue to view coupons" 
              : "Loading coupons..."
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-card">
      <div className="venue-toolbar">
        <Select
          placeholder="Select Venue"
          className="venue-select"
          loading={venueLoading}
          onChange={handleVenueChange}
          value={selectedVenueId || undefined}
          disabled={venueLoading || !venueList?.resutl?.length}
        >
          {venueList?.resutl?.map((venue) => (
            <Option key={venue.venue_id} value={venue.venue_id}>
              {venue.venue_name}
            </Option>
          ))}
        </Select>
        <Button 
          type="primary" 
          className="add-btn"
          disabled={!selectedVenueId || isProcessing || softDeleteCouponMutation.isPending || couponsFetching}
          onClick={handleAddCoupon}
        >
          + Add Discount Coupon
          {(isProcessing || softDeleteCouponMutation.isPending || couponsFetching) && (
            <span className="processing-indicator"> (Processing...)</span>
          )}
        </Button>
      </div>

      <h3 className="venue-title">
        Discount Coupons - {selectedVenue?.venue_name || 'Select a venue'}
        {couponsFetching && !couponsLoading && (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )}
      </h3>

      <div className="coupons-table-container" style={{ position: 'relative' }}>
        {couponsFetching && !couponsLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: '6px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
              <div style={{ marginTop: 8, color: '#666' }}>Refreshing coupon list...</div>
            </div>
          </div>
        )}
        {paginatedCoupons?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={paginatedCoupons}
            pagination={false}
            rowKey="id"
            className="enterprise-coupons-table"
            size="middle"
            loading={couponsLoading || softDeleteCouponMutation.isPending}
          />
        ) : (
          // Show empty state message
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <TagOutlined />
              </div>
              <h3 className="empty-state-title">No Discount Coupons Found</h3>
              <p className="empty-state-description">
                This venue doesn't have any discount coupons yet. Click the "ADD DISCOUNT COUPON" button to create your first coupon.
              </p>
              <div className="empty-state-info">
                <div className="info-item">
                  <span className="info-label">Coupon Types:</span>
                  <span className="info-value">Percentage, Fixed Amount, Buy One Get One</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Features:</span>
                  <span className="info-value">Expiry dates, Banner display, Usage limits</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {paginatedCoupons?.length > 0 && (
        <div className="coupons-footer">
          <div className="pagination-info">
            <Typography.Text type="secondary">
              Showing {startIndex + 1}-{Math.min(startIndex + pageSize, dataSource.length)} of {dataSource.length} coupons
            </Typography.Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountPage;
