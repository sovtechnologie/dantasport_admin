import "../../styelsheets/Manage/Member.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button, Select, Pagination, message, Skeleton, Spin, Tooltip, Modal, Image, Badge, List, Avatar, Table, Tag, Space, Typography, Collapse } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined, PhoneOutlined, IdcardOutlined, EyeOutlined, PlusOutlined, MoreOutlined, CalendarOutlined, FileTextOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchMembers } from "../../../../hooks/vendor/members/useFetchMembers";
import { useDeleteMember } from "../../../../hooks/vendor/members/useDeleteMember";
import { useMemberPermissions } from "../../../../services/vendor/members/useMemberPermissions";
import { getSingleMemberList, addingPermission, updatePermission } from "../../../../services/vendor/members/endpointApi";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import PermissionTreeView from "../../../../components/PermissionTreeView";

const { Option } = Select;

// Professional Shimmer Loading Component for Members
const MemberCardSkeleton = () => (
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
        <Skeleton.Input active size="small" style={{ width: '100%' }} />
      </div>
      <div className="skeleton-actions">
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
      </div>
    </div>
  </Card>
);

// Enterprise-level Member Card Component
const MemberCard = ({ 
  member, 
  index, 
  deletingMemberId, 
  onDelete, 
  onEdit, 
  onView,
  isProcessing = false
}) => {
  return (
    <Card
      className={`member-card enterprise-card ${deletingMemberId === member.id ? 'deleting' : ''} ${isProcessing ? 'processing' : ''}`}
      hoverable={deletingMemberId !== member.id && !isProcessing}
      title={
        <div className="member-title">
          <div className="member-avatar">
            <UserOutlined />
          </div>
          <div className="member-info">
            <span className="member-name">{member.name}</span>
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
            disabled={deletingMemberId === member.id || isProcessing}
            onClick={() => onView(member)}
            aria-label="View member details"
          />
        </Tooltip>,
        <Tooltip title="Edit Member" key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            className="member-action-btn edit-btn"
            size="small"
            disabled={deletingMemberId === member.id || isProcessing}
            onClick={() => onEdit(member)}
            aria-label="Edit member"
          />
        </Tooltip>,
        <Tooltip title={deletingMemberId === member.id ? "Deleting..." : "Delete Member"} key="delete">
          <Button 
            type="text" 
            danger
            icon={<DeleteOutlined />} 
            className="member-action-btn delete-btn"
            size="small"
            loading={deletingMemberId === member.id}
            disabled={deletingMemberId === member.id || isProcessing}
            onClick={() => onDelete(member)}
            aria-label="Delete member"
          />
        </Tooltip>
      ]}
    >
      <div className="member-details">
        <div className="member-detail-item">
          <IdcardOutlined className="detail-icon" />
          <span className="detail-label">Position:</span>
          <span className="detail-value">{member.position}</span>
        </div>
        
        <div className="member-detail-item">
          <PhoneOutlined className="detail-icon" />
          <span className="detail-label">Mobile:</span>
          <span className="detail-value">{member.mobile}</span>
        </div>
        
        <div className="member-detail-item">
          <IdcardOutlined className="detail-icon" />
          <span className="detail-label">Document Type:</span>
          <span className="detail-value">{member.docType}</span>
        </div>
        
        <div className="member-detail-item">
          <IdcardOutlined className="detail-icon" />
          <span className="detail-label">Document No:</span>
          <span className="detail-value">{member.docNo}</span>
        </div>
        
        <div className="member-document-section">
          <span className="detail-label">Document Photo:</span>
          <div className="document-image-container">
            <img 
              src={member.docImg} 
              alt={`${member.name} document`} 
              className="doc-img"
              loading="lazy"
              onError={(e) => {
                console.warn(`Failed to load document image for member ${member.id}:`, e);
                e.target.style.display = 'none';
              }}
            />
            {deletingMemberId === member.id && (
              <div className="delete-loading-overlay">
                <Spin size="small" />
                <span className="delete-loading-text">Deleting...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function MembersPage() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user.id);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [isVenueChanging, setIsVenueChanging] = useState(false);
  const [showMemberViewModal, setShowMemberViewModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [viewingMember, setViewingMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]); // All permissions hidden by default
  const [memberPermissions, setMemberPermissions] = useState({});
  const [permissionLoading, setPermissionLoading] = useState({});
  const [refreshingPermissions, setRefreshingPermissions] = useState(false);

  // Fetch venue list
  const { data: venueList, loading: venueLoading, error: venueError } = useFetchVendorVenueList();

  // Fetch members list
  const { data: membersList, loading: membersLoading, error: membersError, refetch: refetchMembers } = useFetchMembers({
    venueId: selectedVenueId,
    vendorId: id
  });

  // Delete member mutation
  const deleteMemberMutation = useDeleteMember(selectedVenueId, id);
  
  // Permission management service
  const { loading: permissionServiceLoading, fetchMemberPermissions, updateMemberPermissions } = useMemberPermissions();

  // Set default venue when venue list loads
  useEffect(() => {
    if (venueList?.resutl?.length && !selectedVenueId) {
      setSelectedVenueId(venueList.resutl[0].venue_id);
    }
  }, [venueList, selectedVenueId]);

  // Reset expanded rows when venue changes to hide all permissions by default
  useEffect(() => {
    setExpandedRows([]);
    setMemberPermissions({});
    setPermissionLoading({});
  }, [selectedVenueId]);

  // Ensure all permissions are hidden when members data changes
  useEffect(() => {
    if (membersList?.result) {
      setExpandedRows([]);
    }
  }, [membersList]);

  // Handle venue change with loading state
  const handleVenueChange = (venueId) => {
    setIsVenueChanging(true);
    setSelectedVenueId(venueId);
    setCurrentPage(1); // Reset to first page when venue changes
    // Reset loading state after a short delay to allow data to load
    setTimeout(() => {
      setIsVenueChanging(false);
    }, 500);
  };

  // Handle errors
  useEffect(() => {
    if (venueError) {
      message.error("Failed to load venue list");
    }
    if (membersError) {
      message.error("Failed to load members list");
    }
  }, [venueError, membersError]);

  // Memoized selected venue for performance
  const selectedVenue = useMemo(() => {
    return venueList?.resutl?.find(venue => venue.venue_id === selectedVenueId);
  }, [venueList?.resutl, selectedVenueId]);

  // Get members from API response (real fields mapping)
  const venueMembers = useMemo(() => {
    if (!membersList?.result) return [];
    return membersList.result.map(member => ({
      id: member.id ?? member.member_id ?? member.user_id,
      name: member.full_name,
      position: "Staff", // not provided by API
      mobile: member.mobile_number,
      docType: member.document_name,
      docNo: member.document_number,
      docImg: member.document_file || memberimage,
      venueId: member.venue_id || selectedVenueId,
      vendorId: member.vendor_id,
      raw: member
    }));
  }, [membersList?.result, selectedVenueId]);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMembers = venueMembers.slice(startIndex, startIndex + pageSize);

  // Enterprise-level memoized handlers for performance
  const handleAddMember = useCallback(() => {
    if (!selectedVenueId) {
      message.warning("Please select a venue first");
      return;
    }
    setShowAddMemberModal(true);
  }, [selectedVenueId]);

  const handleDeleteMember = async (member) => {
    try {
      setDeletingMemberId(member.id);
      setIsProcessing(true);
      console.log("🗑️ Deleting member:", member);
      
      // Use raw member data to get the correct user_id or member_id
      const memberId = member.raw?.user_id || member.raw?.member_id 
      
      console.log("🔍 Member ID resolution:", {
        'member.raw?.user_id': member.raw?.user_id,
        'member.raw?.member_id': member.raw?.member_id,
        'member.id': member.id,
        'resolved memberId': memberId
      });
      
      const payload = {
        memberId: memberId,
        status: 0
      };
      
      console.log("📤 Delete payload:", payload);
      await deleteMemberMutation.mutateAsync(payload);
      console.log("✅ Delete successful");
      
    } catch (error) {
      console.error("❌ Delete error:", error);
      // Error is handled by the mutation's onError
    } finally {
      setDeletingMemberId(null);
      setIsProcessing(false);
    }
  };

  const handleEditMember = useCallback((member) => {
    console.log("✏️ Editing member:", member);
    setEditingMember(member);
    setShowEditMemberModal(true);
  }, []);

  const handleViewMember = useCallback((member) => {
    console.log("👁️ Viewing member:", member);
    setViewingMember(member);
    setShowMemberViewModal(true);
  }, []);

  // Permission management functions
  const handleRowExpand = useCallback((expanded, record) => {
    const newExpandedRows = expanded 
      ? [...expandedRows, record.id]
      : expandedRows.filter(id => id !== record.id);
    
    setExpandedRows(newExpandedRows);
    
    // Load permissions if expanding (permissions are hidden by default)
    if (expanded && !memberPermissions[record.id]) {
      const actualMemberId = record.raw?.user_id || record.raw?.member_id || record.id;
      loadMemberPermissions(actualMemberId, record.id);
    }
  }, [expandedRows, memberPermissions]);

  const loadMemberPermissions = useCallback(async (actualMemberId, tableRecordId) => {
    try {
      setPermissionLoading(prev => ({ ...prev, [tableRecordId]: true }));
      console.log('🔄 Loading permissions for member:', { actualMemberId, tableRecordId });
      
      // Call the new API endpoint with the actual member ID
      const response = await getSingleMemberList({ memberId: actualMemberId });
      console.log('📡 API Response:', response);
      
      if (response.status === 200 && response.result && response.result.length > 0) {
        const memberData = response.result[0];
        const permissions = memberData.permissions || [];
        
        // Map permissions to the expected format with status mapping
        // Hide=0, Read=1, Write=2
        const mappedPermissions = permissions.map(permission => ({
          id: permission.id,
          name: permission.name,
          status: permission.status, // Already in correct format (0, 1, 2)
          create_at: permission.create_at,
          member_id: permission.member_id
        }));
        
        setMemberPermissions(prev => ({
          ...prev,
          [tableRecordId]: {
            permissions: mappedPermissions,
            memberInfo: {
              user_id: memberData.user_id,
              full_name: memberData.full_name,
              venue_id: memberData.venue_id,
              venue_name: memberData.venue_name,
              member_id: memberData.member_id,
              type: memberData.type
            }
          }
        }));
        
        console.log('✅ Loaded permissions for member:', { actualMemberId, tableRecordId }, mappedPermissions);
      } else {
        // If no permissions available, set default hidden status
        setMemberPermissions(prev => ({
          ...prev,
          [tableRecordId]: {
            permissions: [],
            memberInfo: {
              user_id: actualMemberId,
              full_name: 'Unknown Member',
              venue_id: selectedVenueId,
              venue_name: 'Unknown Venue',
              member_id: actualMemberId,
              type: 1
            }
          }
        }));
        console.log('⚠️ No permissions found for member:', { actualMemberId, tableRecordId });
      }
    } catch (error) {
      console.error('❌ Failed to load permissions:', error);
      message.error('Failed to load member permissions');
      
      // Set empty permissions on error
      setMemberPermissions(prev => ({
        ...prev,
        [tableRecordId]: {
          permissions: [],
          memberInfo: {
            user_id: actualMemberId,
            full_name: 'Unknown Member',
            venue_id: selectedVenueId,
            venue_name: 'Unknown Venue',
            member_id: actualMemberId,
            type: 1
          }
        }
      }));
    } finally {
      setPermissionLoading(prev => ({ ...prev, [tableRecordId]: false }));
    }
  }, [selectedVenueId]);

  const handleUpdatePermissions = useCallback(async (actualMemberId, permissions) => {
    // Find the table record ID for this member
    const tableRecordId = Object.keys(memberPermissions).find(key => 
      memberPermissions[key]?.memberInfo?.user_id === actualMemberId || 
      memberPermissions[key]?.memberInfo?.member_id === actualMemberId
    ) || actualMemberId;
    
    try {
      setPermissionLoading(prev => ({ ...prev, [tableRecordId]: true }));
      console.log('🔄 Updating permissions for member:', { actualMemberId, tableRecordId }, permissions);
      
      // Check if member has existing permissions
      const hasExistingPermissions = memberPermissions[tableRecordId]?.permissions?.length > 0;
      
      // Get the actual member_id following the same pattern as delete/update member
      // Use the same logic: raw?.user_id || raw?.member_id
      const memberInfo = memberPermissions[tableRecordId]?.memberInfo;
      const resolvedMemberId = memberInfo?.user_id || memberInfo?.member_id || actualMemberId;
      
      console.log('🔍 Member ID resolution (following delete/update pattern):', {
        'input actualMemberId': actualMemberId,
        'memberInfo.user_id': memberInfo?.user_id,
        'memberInfo.member_id': memberInfo?.member_id,
        'resolved resolvedMemberId': resolvedMemberId
      });
      
      const payload = {
        memberId: parseInt(resolvedMemberId), // Use the resolved member_id
        data: permissions
      };
      
      console.log('📤 Permission payload:', payload);
      
      let response;
      if (hasExistingPermissions) {
        // Update existing permissions
        console.log('📝 Updating existing permissions...');
        response = await updatePermission(payload);
      } else {
        // Add new permissions
        console.log('➕ Adding new permissions...');
        response = await addingPermission(payload);
      }
      
      console.log('📡 Permission API response:', response);
      
      if (response.status === 200 || response.status === 201) {
        // Refresh permissions for this member
        console.log('✅ Permission operation successful, refreshing...');
        setRefreshingPermissions(true);
        
        try {
          await loadMemberPermissions(resolvedMemberId, tableRecordId);
          
          // Also refetch the members list to ensure UI is up to date
          console.log('🔄 Refreshing members list...');
          await refetchMembers();
          
          message.success(hasExistingPermissions ? 'Permissions updated successfully' : 'Permissions added successfully');
        } finally {
          setRefreshingPermissions(false);
        }
      } else {
        throw new Error(response.message || 'Failed to update permissions');
      }
    } catch (error) {
      console.error('❌ Failed to update permissions:', error);
      
      // Show more specific error messages
      if (error.response?.data?.message) {
        message.error(`Failed to update permissions: ${error.response.data.message}`);
      } else if (error.message) {
        message.error(`Failed to update permissions: ${error.message}`);
      } else {
        message.error('Failed to update permissions. Please try again.');
      }
      
      throw error;
    } finally {
      setPermissionLoading(prev => ({ ...prev, [tableRecordId]: false }));
      setRefreshingPermissions(false);
    }
  }, [memberPermissions, loadMemberPermissions, refetchMembers]);

  // Show loading state for entire page when venues are loading
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

  // Show loading state when no venue is selected, when venue is changing, or when members are loading
  // Also show loading if we have a venue but no members data yet (prevents showing static data)
  if (!selectedVenueId || isVenueChanging || (selectedVenueId && membersLoading) || (selectedVenueId && !membersList)) {
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
            + Add Venue Member
          </Button>
        </div>

        <h3 className="venue-title">
          {selectedVenue?.venue_name || "Select a venue to view members"}
        </h3>

        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">
            {!selectedVenueId 
              ? "Please select a venue to view members" 
              : isVenueChanging 
                ? "Switching venue..." 
                : selectedVenueId && !membersList
                  ? "Fetching venue members..."
                  : "Loading members..."
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
          disabled={!selectedVenueId || isProcessing}
          onClick={handleAddMember}
        >
          + Add Venue Member
          {isProcessing && (
            <span className="processing-indicator"> (Processing...)</span>
          )}
        </Button>
      </div>

      <h3 className="venue-title">
        {selectedVenue?.venue_name || "Select a venue to view members"}
      </h3>

      <div className="members-table-container">
        {paginatedMembers?.length > 0 ? (
          <Table
            dataSource={paginatedMembers}
            expandable={{
              expandedRowKeys: expandedRows,
              onExpand: handleRowExpand,
              expandRowByClick: false,
              expandedRowRender: (record) => (
                <div className="expanded-row-content">
                  <PermissionTreeView
                    memberId={record.raw?.user_id || record.raw?.member_id || record.id}
                    memberName={record.name}
                    initialPermissions={memberPermissions[record.id] || { permissions: [], memberInfo: {} }}
                    onUpdatePermissions={handleUpdatePermissions}
                    loading={permissionLoading[record.id] || refreshingPermissions || false}
                  />
                </div>
              ),
            }}
            columns={[
              {
                title: 'Member',
                key: 'member',
                width: 250,
                render: (_, record, index) => (
                  <div className="member-info-cell">
                    <Avatar 
                      size={40} 
                      icon={<UserOutlined />} 
                      style={{ backgroundColor: '#1163C7', marginRight: 12 }}
                    />
                    <div className="member-details">
                      <div className="member-name">
                        <Typography.Text strong>{record.name}</Typography.Text>
                        <Badge 
                          count={startIndex + index + 1} 
                          style={{ backgroundColor: '#1163C7', marginLeft: 8 }}
                          size="small"
                        />
                      </div>
                      <div className="member-id">
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                          ID: {record.raw?.custom_id || record.id}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Contact',
                key: 'contact',
                width: 150,
                render: (_, record) => (
                  <div className="contact-cell">
                    <div className="contact-item">
                      <PhoneOutlined style={{ color: '#1163C7', marginRight: 6 }} />
                      <Typography.Text>{record.mobile}</Typography.Text>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Document',
                key: 'document',
                width: 200,
                render: (_, record) => (
                  <div className="document-cell">
                    <div className="document-info">
                      <div className="document-type">
                        <IdcardOutlined style={{ color: '#1163C7', marginRight: 6 }} />
                        <Typography.Text strong>{record.docType}</Typography.Text>
                      </div>
                      <div className="document-number">
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                          {record.docNo}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Status',
                key: 'status',
                width: 100,
                render: (_, record) => (
                  <Tag color="green" style={{ borderRadius: 12 }}>
                    Active
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
                      {record.raw?.created_at ? 
                        new Date(record.raw.created_at).toLocaleDateString() : 
                        'N/A'
                      }
                    </Typography.Text>
                  </div>
                ),
              },
              {
                title: 'Actions',
                key: 'actions',
                width: 160,
                render: (_, record) => (
                  <Space size="small">
                    <Tooltip title="View Details">
                      <Button 
                        type="text" 
                        icon={<EyeOutlined />} 
                        size="small"
                        disabled={deletingMemberId === record.id || isProcessing}
                        onClick={() => handleViewMember(record)}
                        className="action-btn view-btn"
                      />
                    </Tooltip>
                    <Tooltip title="Edit Member">
                      <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        size="small"
                        disabled={deletingMemberId === record.id || isProcessing}
                        onClick={() => handleEditMember(record)}
                        className="action-btn edit-btn"
                      />
                    </Tooltip>
                    <Tooltip title="Manage Permissions">
                      <Button 
                        type="text" 
                        icon={<SettingOutlined />} 
                        size="small"
                        disabled={deletingMemberId === record.id || isProcessing}
                        onClick={() => handleRowExpand(!expandedRows.includes(record.id), record)}
                        className={`action-btn permission-btn ${expandedRows.includes(record.id) ? 'active' : ''}`}
                      />
                    </Tooltip>
                    <Tooltip title={deletingMemberId === record.id ? "Deleting..." : "Delete Member"}>
                      <Button 
                        type="text" 
                        danger
                        icon={<DeleteOutlined />} 
                        size="small"
                        loading={deletingMemberId === record.id}
                        disabled={deletingMemberId === record.id || isProcessing}
                        onClick={() => handleDeleteMember(record)}
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
            loading={membersLoading}
          />
        ) : (
          // Show empty state message
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <UserOutlined />
              </div>
              <h3 className="empty-state-title">No Members Found</h3>
              <p className="empty-state-description">
                This venue doesn't have any members yet. Click the "ADD VENUE MEMBER" button to add your first member.
              </p>
              <div className="empty-state-info">
                <div className="info-item">
                  <span className="info-label">Member Types:</span>
                  <span className="info-value">Manager, Staff, Security</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Required Documents:</span>
                  <span className="info-value">ID Proof, Address Proof</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {paginatedMembers?.length > 0 && (
      <div className="members-footer">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
            total={venueMembers.length}
          onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            showQuickJumper={false}
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} of ${total} members`
            }
        />
      </div>
      )}

      {/* Member View Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserOutlined style={{ color: '#1163C7' }} />
            Member Details - {viewingMember?.name}
          </div>
        }
        open={showMemberViewModal}
        onCancel={() => {
          setShowMemberViewModal(false);
          setViewingMember(null);
        }}
        footer={null}
        width="auto"
        centered
        style={{ maxWidth: '90vw' }}
      >
        {viewingMember && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Member Header Card */}
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
                  icon={<UserOutlined />} 
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
                {viewingMember.name}
              </h2>
              <div style={{ 
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Member ID: {viewingMember.raw?.custom_id || viewingMember.id}
              </div>
            </div>
            
            {/* Member Details Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Contact Information */}
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
                  <PhoneOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  Contact Information
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Mobile Number</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {viewingMember.mobile}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Venue</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {selectedVenue?.venue_name}
                  </div>
                </div>
              </div>

              {/* Document Information */}
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
                  <IdcardOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  Document Information
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Document Type</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
                    {viewingMember.docType}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Document Number</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#212529',
                    fontFamily: 'monospace',
                    backgroundColor: '#e9ecef',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}>
                    {viewingMember.docNo}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Photo Section */}
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
                Document Photo
              </div>
              <div>
                {viewingMember.docImg && viewingMember.docImg !== 'memberimage' ? (
                  <Image
                    src={viewingMember.docImg}
                    alt={`${viewingMember.name} document`}
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
                ) : (
                  <div style={{ 
                    padding: '60px 40px', 
                    border: '2px dashed #dee2e6', 
                    borderRadius: '12px',
                    color: '#6c757d',
                    fontSize: '16px',
                    backgroundColor: '#ffffff'
                  }}>
                    <FileTextOutlined style={{ fontSize: '48px', marginBottom: '12px', display: 'block' }} />
                    No Document Photo Available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Member Modal */}
      <AddMemberModal
        isVisible={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        selectedVenueId={selectedVenueId}
      />

      {/* Edit Member Modal */}
      <EditMemberModal
        isVisible={showEditMemberModal}
        onClose={() => {
          setShowEditMemberModal(false);
          setEditingMember(null);
        }}
        selectedMember={editingMember}
        selectedVenueId={selectedVenueId}
        vendorId={id}
      />
    </div>
  );
}
