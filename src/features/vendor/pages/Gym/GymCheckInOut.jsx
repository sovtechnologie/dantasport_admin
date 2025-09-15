import React, { useState, useEffect, useMemo } from "react";
import { 
  Table, 
  Select, 
  Card, 
  Typography, 
  Tag, 
  Spin, 
  Radio, 
  Button, 
  Space, 
  Avatar,
  message,
  Modal,
  QRCode
} from "antd";
import { 
  UserOutlined, 
  QrcodeOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  MoreOutlined,
  QrcodeOutlined as QrCodeOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchPendingGymCheckins } from "../../../../hooks/vendor/gym/useFetchPendingGymCheckins";
import { useFetchRecentGymCheckins } from "../../../../hooks/vendor/gym/useFetchRecentGymCheckins";
import { useGymCheckIn } from "../../../../hooks/vendor/gym/useGymCheckIn";
import "./GymCheckInOut.css";

const { Title } = Typography;
const { Option } = Select;

const GymCheckInOut = () => {
  const vendorId = useSelector((state) => state.auth.user?.id);
  const [selectedGymId, setSelectedGymId] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedCheckInType, setSelectedCheckInType] = useState({});

  // Fetch gym list
  const { data: gymList, loading: gymLoading } = useFetchGymList(vendorId);

  // Fetch pending check-ins
  const { 
    data: pendingData, 
    isLoading: pendingLoading, 
    refetch: refetchPending 
  } = useFetchPendingGymCheckins({ gymId: selectedGymId });

  // Fetch recent check-ins
  const { 
    data: recentData, 
    isLoading: recentLoading, 
    refetch: refetchRecent 
  } = useFetchRecentGymCheckins({ gymId: selectedGymId });

  // Check-in mutation
  const checkInMutation = useGymCheckIn();

  // Set default gym when gym list loads
  useEffect(() => {
    if (gymList?.result?.length && !selectedGymId) {
      setSelectedGymId(gymList.result[0].Id);
    }
  }, [gymList, selectedGymId]);

  // Handle gym change
  const handleGymChange = (gymId) => {
    setSelectedGymId(gymId);
    setSelectedCheckInType({});
  };

  // Get selected gym info
  const selectedGym = useMemo(() => {
    return gymList?.result?.find(gym => gym.Id === selectedGymId);
  }, [gymList?.result, selectedGymId]);

  // Process pending check-ins data
  const pendingCheckins = useMemo(() => {
    if (!pendingData?.result) return [];
    return pendingData.result.map((item, index) => ({
      key: item.booking_id,
      bookingId: `#${item.booking_id}`,
      userId: `#${item.user_id}`,
      userName: item.full_name,
      location: `${item.city}, ${item.state}`,
      dateTime: new Date(item.booking_date).toLocaleString("en-GB", {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      checkInType: selectedCheckInType[item.booking_id] || null,
      raw: item
    }));
  }, [pendingData?.result, selectedCheckInType]);

  // Process recent check-ins data
  const recentCheckins = useMemo(() => {
    if (!recentData?.result) return [];
    return recentData.result.map((item, index) => ({
      key: item.booking_id,
      bookingId: `#${item.booking_id}`,
      userId: `#${item.user_id}`,
      userName: item.full_name,
      location: `${item.city}, ${item.state}`,
      dateTime: new Date(item.check_in_time).toLocaleString("en-GB", {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      checkInType: item.check_in_type === 1 ? 'QR' : 'Manual',
      raw: item
    }));
  }, [recentData?.result]);

  // Handle check-in type selection
  const handleCheckInTypeChange = (bookingId, type) => {
    setSelectedCheckInType(prev => ({
      ...prev,
      [bookingId]: type
    }));
  };

  // Handle check-in action
  const handleCheckIn = async (record) => {
    if (!selectedCheckInType[record.raw.booking_id]) {
      message.warning("Please select a check-in method first");
      return;
    }
    
    try {
      const payload = {
        gymId: selectedGymId,
        bookingId: record.raw.booking_id,
        userId: record.raw.user_id,
        checkInType: selectedCheckInType[record.raw.booking_id] === 'QR' ? 1 : 2 // 1 for QR, 2 for Manual
      };
      
      await checkInMutation.mutateAsync(payload);
      
      // Remove from selected types
      setSelectedCheckInType(prev => {
        const newState = { ...prev };
        delete newState[record.raw.booking_id];
        return newState;
      });
    } catch (error) {
      console.error('Check-in error:', error);
    }
  };

  // Show QR code modal
  const showQRCode = () => {
    setShowQRModal(true);
  };

  // Pending check-ins columns
  const pendingColumns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1163C7' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.userId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      width: 120,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 150,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Check-In',
      key: 'checkIn',
      width: 200,
      render: (_, record) => (
        <div className="checkin-type-selection">
          <Radio.Group 
            value={record.checkInType}
            onChange={(e) => handleCheckInTypeChange(record.raw.booking_id, e.target.value)}
          >
            <Space direction="vertical" size="small">
              <Radio value="QR">
                <QrcodeOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                QR
              </Radio>
              <Radio value="Manual">
                <CheckCircleOutlined style={{ color: '#1890ff', marginRight: 4 }} />
                M Check-In
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small"
            disabled={!selectedCheckInType[record.raw.booking_id] || checkInMutation.isPending}
            loading={checkInMutation.isPending}
            onClick={() => handleCheckIn(record)}
          >
            Check In
          </Button>
          <Button 
            type="text" 
            icon={<MoreOutlined />} 
            size="small"
          />
        </Space>
      ),
    },
  ];

  // Recent check-ins columns
  const recentColumns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1163C7' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.userId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      width: 120,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 150,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Check-In',
      dataIndex: 'checkInType',
      key: 'checkInType',
      width: 120,
      render: (type) => (
        <Tag 
          color={type === 'QR' ? 'green' : 'blue'}
          icon={type === 'QR' ? <QrcodeOutlined /> : <CheckCircleOutlined />}
        >
          {type}
        </Tag>
      ),
    },
  ];

  if (gymLoading) {
    return (
      <div className="venue-card">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>Loading gyms...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-card">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1163C7' }}>
          Check-in/Check-out
        </Title>
        <Button 
          type="primary" 
          icon={<QrCodeOutlined />}
          onClick={showQRCode}
          style={{ 
            backgroundColor: '#1163C7', 
            borderColor: '#1163C7',
            borderRadius: '8px',
            height: '40px',
            padding: '0 20px',
            fontWeight: '600'
          }}
        >
          Show QR Code
        </Button>
      </div>

      {/* Gym Selection */}
      <div style={{ marginBottom: '24px' }}>
        <Card style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: 500, fontSize: '16px' }}>Select Gym:</span>
            <Select
              placeholder="Select Gym"
              style={{ width: 300 }}
              value={selectedGymId}
              onChange={handleGymChange}
              loading={gymLoading}
              size="large"
            >
              {gymList?.result?.map((gym) => (
                <Option key={gym.Id} value={gym.Id}>
                  {gym.gym_name}
                </Option>
              ))}
            </Select>
            {selectedGym && (
              <Tag color="blue" style={{ marginLeft: 'auto', fontSize: '14px', padding: '4px 12px' }}>
                {selectedGym.gym_name}
              </Tag>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Checking Section */}
      <div className="table-container">
        <div className="table-header">
          <ClockCircleOutlined />
          <span>Recent Checking</span>
        </div>
        <Table
          columns={recentColumns}
          dataSource={recentCheckins}
          loading={recentLoading}
          pagination={false}
          size="middle"
          scroll={{ x: 1200 }}
          style={{ margin: 0 }}
        />
      </div>

      {/* Pending Checking Section */}
      <div className="table-container">
        <div className="table-header">
          <CheckCircleOutlined />
          <span>Pending Checking</span>
        </div>
        <Table
          columns={pendingColumns}
          dataSource={pendingCheckins}
          loading={pendingLoading}
          pagination={false}
          size="middle"
          scroll={{ x: 1400 }}
          style={{ margin: 0 }}
        />
      </div>

      {/* Professional QR Code Modal */}
      <Modal
        title="QR Code for Check-in"
        open={showQRModal}
        onCancel={() => setShowQRModal(false)}
        footer={null}
        centered
        width={500}
        className="qr-modal"
      >
        <div className="qr-container">
          <div className="qr-code-wrapper">
            <QRCode 
              value={`gym-checkin-${selectedGymId || 'default'}`}
              size={220}
              color="#1163C7"
              bgColor="#ffffff"
            />
          </div>
          
          <div className="qr-info">
            <div className="qr-title">Scan to Check-in</div>
            <div className="qr-subtitle">Point your camera at the QR code above</div>
            
            <div className="qr-gym-info">
              <div className="qr-gym-name">
                {selectedGym?.gym_name || 'Gym Not Selected'}
              </div>
              <div className="qr-gym-location">
                Quick Check-in • {new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div className="qr-status">
              <CheckCircleOutlined />
              <span>Ready for Check-in</span>
            </div>
            
            <div className="qr-actions">
              <button 
                className="qr-action-btn"
                onClick={() => {
                  // Copy QR data to clipboard
                  navigator.clipboard.writeText(`gym-checkin-${selectedGymId || 'default'}`);
                  message.success('QR code data copied to clipboard');
                }}
              >
                Copy QR Data
              </button>
              <button 
                className="qr-action-btn secondary"
                onClick={() => setShowQRModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GymCheckInOut;
