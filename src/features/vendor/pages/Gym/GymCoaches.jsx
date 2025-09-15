import "../../styelsheets/Manage/Member.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button, Select, Pagination, message, Skeleton, Spin, Tooltip, Modal, Image, Badge, List, Avatar, Table, Tag, Space, Typography } from "antd";
import { EditOutlined, UserOutlined, EyeOutlined, PlusOutlined, CalendarOutlined, FileTextOutlined, TrophyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchGymCoaches } from "../../../../hooks/vendor/gym/useFetchGymCoaches";
import { updateGymCoach } from "../../../../services/vendor/gym/endpointApi";

const { Option } = Select;

// Professional Shimmer Loading Component for Gym Coaches
const GymCoachCardSkeleton = () => (
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

// Enterprise-level Gym Coach Card Component
const GymCoachCard = ({ 
  coach, 
  index, 
  onEdit, 
  onView,
  isProcessing = false
}) => {
  return (
    <Card
      className={`member-card enterprise-card ${isProcessing ? 'processing' : ''}`}
      hoverable={!isProcessing}
      title={
        <div className="member-title">
          <div className="member-avatar">
            {coach.coaches_image && coach.coaches_image !== 'coachimage' ? (
              <img 
                src={coach.coaches_image} 
                alt={coach.coaches_name}
                className="coach-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <UserOutlined style={{ display: coach.coaches_image && coach.coaches_image !== 'coachimage' ? 'none' : 'block' }} />
          </div>
          <div className="member-info">
            <span className="member-name">{coach.coaches_name}</span>
            <Badge 
              count={index + 1} 
              style={{ backgroundColor: '#1163C7', fontSize: '10px' }}
              size="small"
            />
          </div>
        </div>
      }
      actions={[
        <Tooltip title="View Details" key="view">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            className="member-action-btn view-btn"
            size="small"
            disabled={isProcessing}
            onClick={() => onView(coach)}
            aria-label="View gym coach details"
          />
        </Tooltip>,
        <Tooltip title="Edit Gym Coach" key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            className="member-action-btn edit-btn"
            size="small"
            disabled={isProcessing}
            onClick={() => onEdit(coach)}
            aria-label="Edit gym coach"
          />
        </Tooltip>
      ]}
    >
      <div className="member-details">
        <div className="member-detail-item">
          <TrophyOutlined className="detail-icon" />
          <span className="detail-label">Type:</span>
          <span className="detail-value">{coach.coaches_type}</span>
        </div>
        
        <div className="member-detail-item">
          <UserOutlined className="detail-icon" />
          <span className="detail-label">Coach ID:</span>
          <span className="detail-value">{coach.id}</span>
        </div>
        
        <div className="member-detail-item">
          <CalendarOutlined className="detail-icon" />
          <span className="detail-label">Joined:</span>
          <span className="detail-value">
            {coach.created_at ? new Date(coach.created_at).toLocaleDateString() : 'N/A'}
          </span>
        </div>
        
        <div className="member-detail-item">
          <span className="detail-label">Status:</span>
          <Tag color={coach.status === 1 ? "green" : "red"} style={{ borderRadius: 12 }}>
            {coach.status === 1 ? "Active" : "Inactive"}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default function GymCoachesPage() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user.id);
  const [selectedGymId, setSelectedGymId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isGymChanging, setIsGymChanging] = useState(false);
  const [showCoachViewModal, setShowCoachViewModal] = useState(false);
  const [viewingCoach, setViewingCoach] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletingCoachId, setDeletingCoachId] = useState(null);

  // Fetch gym list
  const { data: gymList, isLoading: gymLoading, isFetching: gymFetching, error: gymError } = useFetchGymList(id);

  // Fetch gym coaches list
  const { data: coachesList, isLoading: coachesLoading, isFetching: coachesFetching, error: coachesError, refetch: refetchCoaches } = useFetchGymCoaches({
    gymId: selectedGymId,
    type: "gym"
  });

  // Set default gym when gym list loads
  useEffect(() => {
    if (gymList?.result?.length && !selectedGymId) {
      setSelectedGymId(gymList.result[0].Id);
    }
  }, [gymList, selectedGymId]);

  // Refetch coaches data when component mounts (for refresh after add)
  useEffect(() => {
    if (selectedGymId) {
      refetchCoaches();
    }
  }, [selectedGymId, refetchCoaches]);

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
    if (coachesError) {
      message.error("Failed to load gym coaches list");
    }
  }, [gymError, coachesError]);

  // Memoized selected gym for performance
  const selectedGym = useMemo(() => {
    return gymList?.result?.find(gym => gym.Id === selectedGymId);
  }, [gymList?.result, selectedGymId]);

  // Get coaches from API response
  const gymCoaches = useMemo(() => {
    if (!coachesList?.result) return [];
    return coachesList.result.map(coach => ({
      id: coach.id,
      coaches_name: coach.coaches_name,
      coaches_type: coach.coaches_type,
      coaches_image: coach.coaches_image,
      status: coach.status,
      created_at: coach.created_at,
      updated_at: coach.updated_at,
      gym_id: coach.gym_id,
      type: coach.type,
      raw: coach
    }));
  }, [coachesList?.result]);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCoaches = gymCoaches.slice(startIndex, startIndex + pageSize);

  // Enterprise-level memoized handlers for performance
  const handleAddCoach = useCallback(() => {
    if (!selectedGymId) {
      message.warning("Please select a gym first");
      return;
    }
    navigate('/vendor/gym/addcoach');
  }, [selectedGymId, navigate]);

  const handleEditCoach = useCallback((coachId) => {
    // Find the coach data from the current list
    const coachData = gymCoaches.find(coach => coach.id === coachId);
    if (coachData) {
      navigate(`/vendor/gym/editcoach/${coachId}`, {
        state: {
          coachData: coachData,
          coachId: coachId
        }
      });
    } else {
      // Fallback to URL-only navigation if coach data not found
      navigate(`/vendor/gym/editcoach/${coachId}`);
    }
  }, [navigate, gymCoaches]);

  const handleViewCoach = useCallback((coach) => {
    console.log("👁️ Viewing gym coach:", coach);
    setViewingCoach(coach);
    setShowCoachViewModal(true);
  }, []);

  const handleDeleteCoach = useCallback(async (coach) => {
    try {
      setDeletingCoachId(coach.id);
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("coachesId", coach.id);
      formData.append("status", "0");

      const response = await updateGymCoach(formData);
      if (response.status === 200 || response.status === 201) {
        message.success("Gym coach deleted successfully");
        await refetchCoaches();
      } else {
        message.error(response.message || "Failed to delete gym coach");
      }
    } catch (error) {
      console.error("❌ Failed to delete coach:", error);
      message.error(error?.response?.data?.message || "Failed to delete gym coach");
    } finally {
      setDeletingCoachId(null);
      setIsProcessing(false);
    }
  }, [refetchCoaches]);


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

  // Show loading state when no gym is selected, when gym is changing, or when coaches are loading
  if (!selectedGymId || isGymChanging || (selectedGymId && coachesLoading) || (selectedGymId && !coachesList)) {
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
            onClick={handleAddCoach}
          >
            + Add Gym Coach
          </Button>
        </div>

        <h3 className="venue-title">
          {selectedGym?.gym_name || "Select a gym to view coaches"}
        </h3>

        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">
            {!selectedGymId 
              ? "Please select a gym to view coaches" 
              : isGymChanging 
                ? "Switching gym..." 
                : selectedGymId && !coachesList
                  ? "Fetching gym coaches..."
                  : "Loading coaches..."
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
          disabled={!selectedGymId || isProcessing || coachesFetching}
          onClick={handleAddCoach}
        >
          + Add Gym Coach
          {isProcessing && (
            <span className="processing-indicator"> (Processing...)</span>
          )}
        </Button>
      </div>

      <h3 className="venue-title">
        {selectedGym?.gym_name || "Select a gym to view coaches"}
        {coachesFetching && !coachesLoading && (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )}
      </h3>

      <div className="members-table-container">
        {paginatedCoaches?.length > 0 ? (
          <Table
            dataSource={paginatedCoaches}
            columns={[
              {
                title: 'Coach',
                key: 'coach',
                width: 250,
                render: (_, record, index) => (
                  <div className="member-info-cell">
                    <Avatar 
                      size={40} 
                      src={record.coaches_image && record.coaches_image !== 'coachimage' ? record.coaches_image : null}
                      icon={<UserOutlined />} 
                      style={{ backgroundColor: '#1163C7', marginRight: 12 }}
                    />
                    <div className="member-details">
                      <div className="member-name">
                        <Typography.Text strong>{record.coaches_name}</Typography.Text>
                        <Badge 
                          count={startIndex + index + 1} 
                          style={{ backgroundColor: '#1163C7', marginLeft: 8 }}
                          size="small"
                        />
                      </div>
                      <div className="member-id">
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                          ID: {record.id}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Type',
                key: 'type',
                width: 150,
                render: (_, record) => (
                  <div className="type-cell">
                    <div className="type-item">
                      <TrophyOutlined style={{ color: '#1163C7', marginRight: 6 }} />
                      <Typography.Text>{record.coaches_type}</Typography.Text>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Status',
                key: 'status',
                width: 100,
                render: (_, record) => (
                  <Tag color={record.status === 1 ? "green" : "red"} style={{ borderRadius: 12 }}>
                    {record.status === 1 ? "Active" : "Inactive"}
                  </Tag>
                ),
              },
              {
                title: 'Joined',
                key: 'joined',
                width: 120,
                render: (_, record) => (
                  <div className="joined-cell">
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
                render: (_, record) => (
                  <Space size="small">
                    <Tooltip title="View Details">
                      <Button 
                        type="text" 
                        icon={<EyeOutlined />} 
                        size="small"
                        disabled={isProcessing}
                        onClick={() => handleViewCoach(record)}
                        className="action-btn view-btn"
                      />
                    </Tooltip>
                    <Tooltip title="Edit Gym Coach">
                      <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        size="small"
                        disabled={isProcessing}
                        onClick={() => handleEditCoach(record.id)}
                        className="action-btn edit-btn"
                      />
                    </Tooltip>
                    <Tooltip title={deletingCoachId === record.id ? "Deleting..." : "Delete Gym Coach"}>
                      <Button 
                        type="text" 
                        danger
                        icon={<DeleteOutlined />} 
                        size="small"
                        loading={deletingCoachId === record.id}
                        disabled={deletingCoachId === record.id || isProcessing}
                        onClick={() => handleDeleteCoach(record)}
                        className="action-btn delete-btn"
                      />
                    </Tooltip>
                  </Space>
                ),
              },
            ]}
            pagination={false}
            rowKey="id"
            className="enterprise-members-table"
            size="middle"
            loading={coachesLoading || coachesFetching}
          />
        ) : (
          // Show empty state message
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <TrophyOutlined />
              </div>
              <h3 className="empty-state-title">No Gym Coaches Found</h3>
              <p className="empty-state-description">
                This gym doesn't have any coaches yet. Click the "ADD GYM COACH" button to add your first coach.
              </p>
              <div className="empty-state-info">
                <div className="info-item">
                  <span className="info-label">Coach Types:</span>
                  <span className="info-value">Head Trainer, Personal Trainer, Yoga Instructor</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Requirements:</span>
                  <span className="info-value">Certification, Experience, Specialization</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {paginatedCoaches?.length > 0 && (
        <div className="members-footer">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={gymCoaches.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            showQuickJumper={false}
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} of ${total} coaches`
            }
          />
        </div>
      )}

      {/* Gym Coach View Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrophyOutlined style={{ color: '#1163C7' }} />
            Gym Coach Details - {viewingCoach?.coaches_name}
          </div>
        }
        open={showCoachViewModal}
        onCancel={() => {
          setShowCoachViewModal(false);
          setViewingCoach(null);
        }}
        footer={null}
        width="auto"
        centered
        style={{ maxWidth: '90vw' }}
      >
        {viewingCoach && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Coach Header Card */}
            <div style={{ 
              marginBottom: '24px',
              padding: '24px', 
              background: 'linear-gradient(135deg, #1163C7 0%, #0d4a9e 100%)',
              borderRadius: '16px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(17, 99, 199, 0.3)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <Avatar 
                  size={80} 
                  src={viewingCoach.coaches_image && viewingCoach.coaches_image !== 'coachimage' ? viewingCoach.coaches_image : null}
                  icon={<TrophyOutlined />} 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
              </div>
              <h2 style={{ 
                margin: '0 0 8px 0', 
                color: 'white',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                {viewingCoach.coaches_name}
              </h2>
              <div style={{ 
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Coach ID: {viewingCoach.id}
              </div>
            </div>
            
            {/* Coach Details Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Coach Information */}
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  color: '#1163C7',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  <TrophyOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  Coach Information
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Coach Type</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {viewingCoach.coaches_type}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Gym</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {selectedGym?.gym_name}
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  color: '#1163C7',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  <UserOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  Status Information
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Status</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    <Tag color={viewingCoach.status === 1 ? "green" : "red"} style={{ borderRadius: 12 }}>
                      {viewingCoach.status === 1 ? "Active" : "Inactive"}
                    </Tag>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Joined Date</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {viewingCoach.created_at ? 
                      new Date(viewingCoach.created_at).toLocaleDateString() : 
                      'N/A'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Coach Image Section */}
            {viewingCoach.coaches_image && viewingCoach.coaches_image !== 'coachimage' && (
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                textAlign: 'center'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#1163C7',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  <EyeOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  Coach Photo
                </div>
                <div>
                  <Image
                    src={viewingCoach.coaches_image}
                    alt={`${viewingCoach.coaches_name} photo`}
                    style={{ 
                      maxWidth: '250px', 
                      maxHeight: '250px',
                      objectFit: 'contain',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    preview={{
                      mask: <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: 'white',
                        fontWeight: '500'
                      }}>
                        <EyeOutlined />
                        Click to view full size
                      </div>
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}


