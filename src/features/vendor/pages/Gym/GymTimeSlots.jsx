import "../../styelsheets/Manage/Member.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button, Select, Pagination, message, Skeleton, Spin, Tooltip, Badge, Table, Tag, Space, Typography, Row, Col, Statistic, Progress, Divider } from "antd";
import { EditOutlined, ClockCircleOutlined, PlusOutlined, CalendarOutlined, DeleteOutlined, ThunderboltOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchGymTimeSlots } from "../../../../hooks/vendor/gym/useFetchGymTimeSlots";
import { deleteGymTimeSlot } from "../../../../services/vendor/gym/endpointApi";
import moment from 'moment';

const { Option } = Select;

// Professional Shimmer Loading Component for Gym Time Slots
const GymTimeSlotCardSkeleton = () => (
  <Card className="professional-skeleton-card">
    <div className="skeleton-header">
      <Skeleton.Avatar active size="large" />
      <div className="skeleton-title">
        <Skeleton.Input active size="small" style={{ width: '120px' }} />
        <Skeleton.Input active size="small" style={{ width: '80px' }} />
      </div>
    </div>
    <div className="skeleton-content">
      <div className="skeleton-meta">
        <Skeleton.Input active size="small" style={{ width: '100%' }} />
        <Skeleton.Input active size="small" style={{ width: '100%' }} />
        <Skeleton.Input active size="small" style={{ width: '100%' }} />
      </div>
      <div className="skeleton-actions">
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
      </div>
    </div>
  </Card>
);

// Helper function to get days text - moved outside component
const getDaysTextShort = (timeSlot) => {
  const days = [];
  if (timeSlot.monday) days.push('Mon');
  if (timeSlot.tuesday) days.push('Tue');
  if (timeSlot.wednesday) days.push('Wed');
  if (timeSlot.thursday) days.push('Thu');
  if (timeSlot.friday) days.push('Fri');
  if (timeSlot.saturday) days.push('Sat');
  if (timeSlot.sunday) days.push('Sun');
  return days.join(', ');
};

// Helper function to get full days text - moved outside component
const getDaysText = (timeSlot) => {
  const days = [];
  if (timeSlot.monday) days.push('Monday');
  if (timeSlot.tuesday) days.push('Tuesday');
  if (timeSlot.wednesday) days.push('Wednesday');
  if (timeSlot.thursday) days.push('Thursday');
  if (timeSlot.friday) days.push('Friday');
  if (timeSlot.saturday) days.push('Saturday');
  if (timeSlot.sunday) days.push('Sunday');
  return days.join(', ');
};

// Enterprise-level Gym Time Slot Card Component - moved outside main component
const GymTimeSlotCard = ({ 
  timeSlot, 
  index, 
  onEdit,
  isProcessing = false
}) => {
  return (
    <Card
      className={`member-card enterprise-card ${isProcessing ? 'processing' : ''}`}
      hoverable={!isProcessing}
      title={
        <div className="member-title">
          <div className="member-avatar">
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#1163C7' }} />
          </div>
          <div className="member-info">
            <span className="member-name">Time Slot #{timeSlot.id}</span>
            <Badge 
              count={index + 1} 
              style={{ backgroundColor: '#1163C7', fontSize: '10px' }}
              size="small"
            />
          </div>
        </div>
      }
      actions={[
        <Tooltip title="Edit Time Slot" key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            className="member-action-btn edit-btn"
            size="small"
            disabled={isProcessing}
            onClick={() => onEdit(timeSlot)}
            aria-label="Edit time slot"
          />
        </Tooltip>
      ]}
    >
      <div className="member-details">
        <div className="member-detail-item">
          <ClockCircleOutlined className="detail-icon" />
          <span className="detail-label">Time:</span>
          <span className="detail-value">{timeSlot.start_time} - {timeSlot.end_time}</span>
        </div>
        
        <div className="member-detail-item">
          <CalendarOutlined className="detail-icon" />
          <span className="detail-label">Days:</span>
          <span className="detail-value">{getDaysTextShort(timeSlot)}</span>
        </div>
        
        <div className="member-detail-item">
          <span className="detail-label">Schedule Type:</span>
          <Tag color={timeSlot.days_schedule === 1 ? "blue" : "green"} style={{ borderRadius: 12 }}>
            {timeSlot.days_schedule === 1 ? "Daily" : "Custom"}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default function GymTimeSlotsPage() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user.id);
  const [selectedGymId, setSelectedGymId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isGymChanging, setIsGymChanging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletingTimeSlotId, setDeletingTimeSlotId] = useState(null);

  // Fetch gym list
  const { data: gymList, isLoading: gymLoading, isFetching: gymFetching, error: gymError } = useFetchGymList(id);

  // Fetch gym time slots list
  const { data: timeSlotsList, isLoading: timeSlotsLoading, isFetching: timeSlotsFetching, error: timeSlotsError, refetch: refetchTimeSlots } = useFetchGymTimeSlots({
    gymId: selectedGymId
  });

  // Set default gym when gym list loads
  useEffect(() => {
    if (gymList?.result?.length && !selectedGymId) {
      setSelectedGymId(gymList.result[0].Id);
    }
  }, [gymList, selectedGymId]);

  // Refetch time slots data when component mounts (for refresh after add)
  useEffect(() => {
    if (selectedGymId) {
      refetchTimeSlots();
    }
  }, [selectedGymId, refetchTimeSlots]);

  // Handle gym change with loading state
  const handleGymChange = (gymId) => {
    setIsGymChanging(true);
    setSelectedGymId(gymId);
    setCurrentPage(1); // Reset to first page when gym changes
    // Reset loading state after a short delay to allow data to load
    setTimeout(() => {
      setIsGymChanging(false);
    }, 500);
  };

  // Handle errors
  useEffect(() => {
    if (gymError) {
      message.error("Failed to load gym list");
    }
    if (timeSlotsError) {
      message.error("Failed to load gym time slots list");
    }
  }, [gymError, timeSlotsError]);

  // Memoized selected gym for performance
  const selectedGym = useMemo(() => {
    return gymList?.result?.find(gym => gym.Id === selectedGymId);
  }, [gymList?.result, selectedGymId]);

  // Get time slots from API response
  const gymTimeSlots = useMemo(() => {
    if (!timeSlotsList?.result) return [];
    return timeSlotsList.result.map(timeSlot => ({
      id: timeSlot.id,
      gym_id: timeSlot.gym_id,
      start_time: timeSlot.start_time,
      end_time: timeSlot.end_time,
      days_schedule: timeSlot.days_schedule,
      monday: timeSlot.monday,
      tuesday: timeSlot.tuesday,
      wednesday: timeSlot.wednesday,
      thursday: timeSlot.thursday,
      friday: timeSlot.friday,
      saturday: timeSlot.saturday,
      sunday: timeSlot.sunday,
      created_at: timeSlot.created_at,
      updated_at: timeSlot.updated_at,
      raw: timeSlot
    }));
  }, [timeSlotsList?.result]);

  // Calculate statistics - MOVED BEFORE CONDITIONAL RETURNS
  const timeSlotStats = useMemo(() => {
    if (!gymTimeSlots.length) return { total: 0, daily: 0, custom: 0, totalHours: 0 };
    
    const daily = gymTimeSlots.filter(slot => slot.days_schedule === 1).length;
    const custom = gymTimeSlots.filter(slot => slot.days_schedule === 0).length;
    
    const totalHours = gymTimeSlots.reduce((total, slot) => {
      const start = moment(slot.start_time, 'HH:mm:ss');
      const end = moment(slot.end_time, 'HH:mm:ss');
      const duration = moment.duration(end.diff(start));
      return total + duration.asHours();
    }, 0);

    return {
      total: gymTimeSlots.length,
      daily,
      custom,
      totalHours: Math.round(totalHours * 10) / 10
    };
  }, [gymTimeSlots]);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTimeSlots = gymTimeSlots.slice(startIndex, startIndex + pageSize);

  // Enterprise-level memoized handlers for performance
  const handleAddTimeSlot = useCallback(() => {
    if (!selectedGymId) {
      message.warning("Please select a gym first");
      return;
    }
    navigate('/vendor/gym/addtimeslot');
  }, [selectedGymId, navigate]);

  const handleEditTimeSlot = useCallback((timeSlotId) => {
    // Find the time slot data from the current list
    const timeSlotData = gymTimeSlots.find(timeSlot => timeSlot.id === timeSlotId);
    if (timeSlotData) {
      navigate(`/vendor/gym/edittimeslot/${timeSlotId}`, {
        state: {
          timeSlotData: timeSlotData,
          timeSlotId: timeSlotId
        }
      });
    } else {
      // Fallback to URL-only navigation if time slot data not found
      navigate(`/vendor/gym/edittimeslot/${timeSlotId}`);
    }
  }, [navigate, gymTimeSlots]);


  const handleDeleteTimeSlot = useCallback(async (timeSlot) => {
    try {
      setDeletingTimeSlotId(timeSlot.id);
      setIsProcessing(true);
      const payload = {
        gymTimeSlotId: timeSlot.id
      };

      const response = await deleteGymTimeSlot(payload);
      if (response.status === 200 || response.status === 201) {
        message.success("Gym time slot deleted successfully");
        await refetchTimeSlots();
      } else {
        message.error(response.message || "Failed to delete gym time slot");
      }
    } catch (error) {
      console.error("❌ Failed to delete time slot:", error);
      message.error(error?.response?.data?.message || "Failed to delete gym time slot");
    } finally {
      setDeletingTimeSlotId(null);
      setIsProcessing(false);
    }
  }, [refetchTimeSlots]);


  // Show loading state for entire page when gyms are loading
  if (gymLoading) {
    return (
      <div className="venue-card">
        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">Loading gyms...</div>
        </div>
      </div>
    );
  }

  // Show loading state when no gym is selected, when gym is changing, or when time slots are loading
  if (!selectedGymId || isGymChanging || (selectedGymId && timeSlotsLoading) || (selectedGymId && !timeSlotsList)) {
    return (
      <div className="venue-card">
        <div className="venue-toolbar">
          <Select
            placeholder="Select Gym"
            className="venue-select"
            loading={gymLoading}
            onChange={handleGymChange}
            value={selectedGymId || undefined}
            disabled={gymLoading || !gymList?.result?.length}
          >
            {gymList?.result?.map((gym) => (
              <Option key={gym.Id} value={gym.Id}>
                {gym.gym_name}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            className="add-btn"
            disabled={!selectedGymId}
            onClick={handleAddTimeSlot}
          >
            + Add Time Slot
          </Button>
        </div>

        <h3 className="venue-title">
          {selectedGym?.gym_name || "Select a gym to view time slots"}
        </h3>

        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">
            {!selectedGymId 
              ? "Please select a gym to view time slots" 
              : isGymChanging 
                ? "Switching gym..." 
                : selectedGymId && !timeSlotsList
                  ? "Fetching gym time slots..."
                  : "Loading time slots..."
            }
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="venue-card">
      {/* Enhanced Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '28px', 
              fontWeight: '700',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ClockCircleOutlined style={{ fontSize: '32px' }} />
              Time Slot Management
            </h2>
            <p style={{ 
              margin: '8px 0 0 0', 
              fontSize: '16px', 
              opacity: 0.9,
              color: 'white'
            }}>
              Manage your gym's operating hours and availability
            </p>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />}
            disabled={!selectedGymId || isProcessing || timeSlotsFetching}
            onClick={handleAddTimeSlot}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              height: '48px',
              padding: '0 24px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            Add Time Slot
            {isProcessing && (
              <span style={{ marginLeft: '8px', opacity: 0.8 }}>(Processing...)</span>
            )}
          </Button>
        </div>

        {/* Gym Selection */}
        <div style={{ marginBottom: '20px' }}>
          <Select
            placeholder="Select Gym"
            size="large"
            loading={gymLoading}
            onChange={handleGymChange}
            value={selectedGymId || undefined}
            disabled={gymLoading || !gymList?.result?.length}
            style={{ 
              width: '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px'
            }}
          >
            {gymList?.result?.map((gym) => (
              <Option key={gym.Id} value={gym.Id}>
                {gym.gym_name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Statistics Cards */}
        {selectedGymId && gymTimeSlots.length > 0 && (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card 
                size="small" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Total Slots</span>}
                  value={timeSlotStats.total}
                  valueStyle={{ color: 'white', fontSize: '24px', fontWeight: '700' }}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                size="small" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Daily Slots</span>}
                  value={timeSlotStats.daily}
                  valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: '700' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                size="small" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Custom Slots</span>}
                  value={timeSlotStats.custom}
                  valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: '700' }}
                  prefix={<ThunderboltOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                size="small" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Total Hours</span>}
                  value={timeSlotStats.totalHours}
                  valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: '700' }}
                  suffix="hrs"
                />
              </Card>
            </Col>
          </Row>
        )}
      </div>

      {/* Gym Title */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px',
        padding: '0 4px'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '600',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CalendarOutlined style={{ color: '#1163C7', fontSize: '20px' }} />
          {selectedGym?.gym_name || "Select a gym to view time slots"}
          {timeSlotsFetching && !timeSlotsLoading && (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </h3>
        {selectedGymId && gymTimeSlots.length > 0 && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px 16px',
            background: '#f0f9ff',
            borderRadius: '20px',
            border: '1px solid #e0f2fe'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#10b981' 
            }} />
            <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>
              {gymTimeSlots.length} Active Slots
            </span>
          </div>
        )}
      </div>

      <div className="members-table-container">
        {paginatedTimeSlots?.length > 0 ? (
          <Card 
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0'
            }}
            bodyStyle={{ padding: '0' }}
          >
            <Table
              dataSource={paginatedTimeSlots}
              columns={[
                {
                  title: (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      <ClockCircleOutlined style={{ color: '#1163C7' }} />
                      Time Slot
                    </div>
                  ),
                  key: 'timeSlot',
                  width: 320,
                  render: (_, record, index) => (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '8px 0'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                      }}>
                        <ClockCircleOutlined style={{ fontSize: '20px', color: 'white' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <Typography.Text strong style={{ fontSize: '16px', color: '#1f2937' }}>
                            Time Slot #{record.id}
                          </Typography.Text>
                          <Badge 
                            count={startIndex + index + 1} 
                            style={{ 
                              backgroundColor: '#1163C7',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}
                            size="small"
                          />
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px'
                        }}>
                          <Typography.Text 
                            type="secondary" 
                            style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#6b7280'
                            }}
                          >
                            {record.start_time} - {record.end_time}
                          </Typography.Text>
                          <Tag 
                            color={record.days_schedule === 1 ? "blue" : "green"} 
                            style={{ 
                              borderRadius: '6px',
                              fontSize: '10px',
                              fontWeight: '500',
                              margin: 0
                            }}
                          >
                            {record.days_schedule === 1 ? "Daily" : "Custom"}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  ),
                },
              {
                title: (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    <CalendarOutlined style={{ color: '#1163C7' }} />
                    Active Days
                  </div>
                ),
                key: 'days',
                width: 280,
                render: (_, record) => (
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <CalendarOutlined style={{ color: '#1163C7', fontSize: '16px' }} />
                      <Typography.Text style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        {getDaysText(record)}
                      </Typography.Text>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '4px',
                      flexWrap: 'wrap'
                    }}>
                      {[
                        { key: 'monday', label: 'M', value: record.monday },
                        { key: 'tuesday', label: 'T', value: record.tuesday },
                        { key: 'wednesday', label: 'W', value: record.wednesday },
                        { key: 'thursday', label: 'T', value: record.thursday },
                        { key: 'friday', label: 'F', value: record.friday },
                        { key: 'saturday', label: 'S', value: record.saturday },
                        { key: 'sunday', label: 'S', value: record.sunday },
                      ].map((day) => (
                        <div
                          key={day.key}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: day.value ? '#1163C7' : '#f3f4f6',
                            color: day.value ? 'white' : '#9ca3af',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}
                        >
                          {day.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                title: (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    <ThunderboltOutlined style={{ color: '#1163C7' }} />
                    Duration
                  </div>
                ),
                key: 'duration',
                width: 140,
                render: (_, record) => {
                  const start = moment(record.start_time, 'HH:mm:ss');
                  const end = moment(record.end_time, 'HH:mm:ss');
                  const duration = moment.duration(end.diff(start));
                  const hours = Math.floor(duration.asHours());
                  const minutes = duration.minutes();
                  const totalMinutes = duration.asMinutes();
                  
                  return (
                    <div style={{ padding: '8px 0' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '4px'
                      }}>
                        <ClockCircleOutlined style={{ color: '#1163C7', fontSize: '16px' }} />
                        <Typography.Text style={{ 
                          fontSize: '16px', 
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {hours}h {minutes}m
                        </Typography.Text>
                      </div>
                      <Progress 
                        percent={Math.min((totalMinutes / 1440) * 100, 100)} 
                        size="small" 
                        showInfo={false}
                        strokeColor={{
                          '0%': '#667eea',
                          '100%': '#764ba2',
                        }}
                        style={{ marginTop: '4px' }}
                      />
                    </div>
                  );
                },
              },
              {
                title: (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    <CheckCircleOutlined style={{ color: '#1163C7' }} />
                    Actions
                  </div>
                ),
                key: 'actions',
                width: 120,
                render: (_, record) => (
                  <div style={{ padding: '8px 0' }}>
                    <Space size="small">
                      <Tooltip title="Edit Time Slot">
                        <Button 
                          type="text" 
                          icon={<EditOutlined />} 
                          size="small"
                          disabled={isProcessing}
                          onClick={() => handleEditTimeSlot(record.id)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f0f9ff',
                            border: '1px solid #e0f2fe',
                            color: '#1163C7'
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={deletingTimeSlotId === record.id ? "Deleting..." : "Delete Time Slot"}>
                        <Button 
                          type="text" 
                          danger
                          icon={<DeleteOutlined />} 
                          size="small"
                          loading={deletingTimeSlotId === record.id}
                          disabled={deletingTimeSlotId === record.id || isProcessing}
                          onClick={() => handleDeleteTimeSlot(record)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626'
                          }}
                        />
                      </Tooltip>
                    </Space>
                  </div>
                ),
              },
            ]}
            pagination={false}
            rowKey="id"
            size="middle"
            loading={timeSlotsLoading || timeSlotsFetching}
            style={{
              background: 'white'
            }}
            rowClassName={(record, index) => 
              `time-slot-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`
            }
          />
          </Card>
        ) : (
          <Card style={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f0f0f0',
            textAlign: 'center',
            padding: '60px 40px'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}>
                <ClockCircleOutlined style={{ fontSize: '48px', color: 'white' }} />
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#1f2937',
                margin: '0 0 12px 0'
              }}>
                No Time Slots Configured
              </h3>
              <p style={{ 
                fontSize: '16px', 
                color: '#6b7280',
                margin: '0 0 32px 0',
                lineHeight: '1.6'
              }}>
                This gym doesn't have any operating time slots yet. Create time slots to define when your gym is available for bookings.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                width: '100%',
                marginBottom: '32px'
              }}>
                <div style={{
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <ThunderboltOutlined style={{ color: '#1163C7', fontSize: '16px' }} />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Flexible Hours</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    Set custom start and end times
                  </p>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <CalendarOutlined style={{ color: '#1163C7', fontSize: '16px' }} />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Multiple Days</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    Choose specific days or all days
                  </p>
                </div>
                <div style={{
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <CheckCircleOutlined style={{ color: '#1163C7', fontSize: '16px' }} />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Peak Management</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    Optimize your gym's availability
                  </p>
                </div>
              </div>
              <Button 
                type="primary" 
                size="large"
                icon={<PlusOutlined />}
                onClick={handleAddTimeSlot}
                disabled={!selectedGymId}
                style={{
                  height: '48px',
                  padding: '0 32px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                Create Your First Time Slot
              </Button>
            </div>
          </Card>
        )}
      </div>

      {paginatedTimeSlots?.length > 0 && (
        <Card style={{ 
          marginTop: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px 0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }} />
              <Typography.Text style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Showing {startIndex + 1}-{Math.min(startIndex + pageSize, gymTimeSlots.length)} of {gymTimeSlots.length} time slots
              </Typography.Text>
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={gymTimeSlots.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper={false}
              showTotal={(total, range) => 
                `${range[0]}-${range[1]} of ${total} time slots`
              }
              style={{
                margin: 0
              }}
            />
          </div>
        </Card>
      )}

    </div>
  );
}
