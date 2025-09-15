import { Button, Table, Modal, Spin, Typography, Image, Tag, Tooltip, Input, Space, Card, Row, Col, Statistic, Dropdown, Menu, Checkbox, message } from "antd";
import { 
    EditOutlined, 
    PlusOutlined, 
    ClockCircleOutlined, 
    EnvironmentOutlined, 
    UserOutlined, 
    SearchOutlined, 
    FilterOutlined, 
    ReloadOutlined, 
    MoreOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { useFetchGymList, useDeleteGym } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import "./GymList.css";

export default function GymList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [bookableFilter, setBookableFilter] = useState('all');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [gymToDelete, setGymToDelete] = useState(null);
    const navigate = useNavigate();
    const { Option } = Select;
    const vendorId = useSelector((state) => state.auth.user.id);
    const { data: gymListResp, isLoading, isFetching, error, refetch } = useFetchGymList(vendorId);
    const deleteGymMutation = useDeleteGym();

    // Map backend response to table data format
    useEffect(() => {
        if (gymListResp?.result) {
            const mapped = gymListResp.result.map((g, index) => ({
                key: g.Id || index,
                id: g.Id,
                vendorId: g.vendor_id,
                gymName: g.gym_name,
                mobileImage: g.mobile_image,
                desktopImage: g.desktop_image,
                aboutGym: g.about_gym,
                onlyWomen: g.only_women === 1,
                lat: g.lat,
                lng: g.lng,
                city: g.city || 'N/A',
                state: g.state || 'N/A',
                area: g.area || 'N/A',
                fullAddress: g.full_address,
                startTime: g.start_time,
                endTime: g.end_time,
                isBookable: g.is_bookable === 1,
                status: g.status === 1 ? 'Active' : 'Inactive',
                isDelete: g.is_delete === 1,
                createdAt: g.create_at,
                termAndConditions: g.term_and_conditions,
                cancellationPolicy: g.cancellation_policy,
            }));
            setData(mapped);
            setFilteredData(mapped);
        }
    }, [gymListResp]);

    // Filter and search logic
    useEffect(() => {
        let filtered = [...data];

        // Search filter
        if (searchText) {
            filtered = filtered.filter(item =>
                item.gymName.toLowerCase().includes(searchText.toLowerCase()) ||
                item.city.toLowerCase().includes(searchText.toLowerCase()) ||
                item.state.toLowerCase().includes(searchText.toLowerCase()) ||
                item.area.toLowerCase().includes(searchText.toLowerCase()) ||
                (item.aboutGym && item.aboutGym.toLowerCase().includes(searchText.toLowerCase()))
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        // Type filter (women only)
        if (typeFilter !== 'all') {
            if (typeFilter === 'women-only') {
                filtered = filtered.filter(item => item.onlyWomen);
            } else if (typeFilter === 'mixed') {
                filtered = filtered.filter(item => !item.onlyWomen);
            }
        }

        // Bookable filter
        if (bookableFilter !== 'all') {
            filtered = filtered.filter(item => 
                bookableFilter === 'bookable' ? item.isBookable : !item.isBookable
            );
        }

        // Sorting
        if (sortField && sortOrder) {
            filtered.sort((a, b) => {
                let aVal = a[sortField];
                let bVal = b[sortField];
                
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (sortOrder === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }

        setFilteredData(filtered);
    }, [data, searchText, statusFilter, typeFilter, bookableFilter, sortField, sortOrder]);

    // Calculate statistics
    const statistics = useMemo(() => {
        const total = data.length;
        const active = data.filter(gym => gym.status === 'Active').length;
        const inactive = data.filter(gym => gym.status === 'Inactive').length;
        const bookable = data.filter(gym => gym.isBookable).length;
        const womenOnly = data.filter(gym => gym.onlyWomen).length;
        
        return { total, active, inactive, bookable, womenOnly };
    }, [data]);

    const handleStatusChange = (record, newStatus) => {
        setModalVisible(true);
    };
    
    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleFilterChange = (filterType, value) => {
        switch (filterType) {
            case 'status':
                setStatusFilter(value);
                break;
            case 'type':
                setTypeFilter(value);
                break;
            case 'bookable':
                setBookableFilter(value);
                break;
            default:
                break;
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleBulkAction = (action) => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please select gyms to perform this action');
            return;
        }
        
        switch (action) {
            case 'delete':
                message.info(`Delete ${selectedRowKeys.length} gyms - Feature coming soon`);
                break;
            case 'activate':
                message.info(`Activate ${selectedRowKeys.length} gyms - Feature coming soon`);
                break;
            case 'deactivate':
                message.info(`Deactivate ${selectedRowKeys.length} gyms - Feature coming soon`);
                break;
            default:
                break;
        }
    };

    const handleDeleteGym = (record) => {
        setGymToDelete(record);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!gymToDelete) return;

        try {
            await deleteGymMutation.mutateAsync({
                gymId: gymToDelete.id,
                isDelete: 1
            });
            
            message.success('Gym deleted successfully!');
            setDeleteModalVisible(false);
            setGymToDelete(null);
            refetch(); // Refresh the gym list
        } catch (error) {
            console.error('Error deleting gym:', error);
            message.error('Failed to delete gym. Please try again.');
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
        setGymToDelete(null);
    };


    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const columns = [
        {
            title: (
                <span 
                    className="sortable-header" 
                    onClick={() => handleSort('gymName')}
                    style={{ cursor: 'pointer' }}
                >
                    Gym Info
                    {sortField === 'gymName' && (
                        <span style={{ marginLeft: 4 }}>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </span>
            ),
            key: "gymInfo",
            sorter: (a, b) => a.gymName.localeCompare(b.gymName),
            render: (_, record) => (
                <div className="gym-info-cell">
                    {record.mobileImage && (
                        <Tooltip title="Click to view full image">
                            <Image
                                width={50}
                                height={50}
                                src={record.mobileImage}
                                alt={record.gymName}
                                className="gym-image"
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                            />
                        </Tooltip>
                    )}
                    <div className="gym-details">
                        <div className="gym-name">{record.gymName}</div>
                        <div className="gym-id">ID: {record.id}</div>
                        {record.aboutGym && (
                            <Tooltip title={record.aboutGym}>
                                <div className="gym-description">
                                    {record.aboutGym}
                                </div>
                            </Tooltip>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: "Location",
            key: "location",
            render: (_, record) => (
                <div className="location-cell">
                    <div className="location-main">
                        <EnvironmentOutlined style={{ fontSize: 12, color: '#666' }} />
                        <span>{record.city}, {record.state}</span>
                    </div>
                    {record.area && record.area !== 'N/A' && (
                        <div className="location-area">Area: {record.area}</div>
                    )}
                </div>
            ),
        },
        {
            title: "Timings",
            key: "timings",
            render: (_, record) => (
                <div className="timings-cell">
                    <ClockCircleOutlined style={{ fontSize: 12, color: '#666' }} />
                    <div>
                        <div className="timings-text">{record.startTime} - {record.endTime}</div>
                        <Tag color={record.isBookable ? 'green' : 'red'} size="small">
                            {record.isBookable ? 'Bookable' : 'Not Bookable'}
                        </Tag>
                    </div>
                </div>
            ),
        },
        {
            title: "Type",
            key: "type",
            render: (_, record) => (
                <div className="type-cell">
                    {record.onlyWomen && (
                        <Tag color="pink" icon={<UserOutlined />}>
                            Women Only
                        </Tag>
                    )}
                    <Tag color={record.status === 'Active' ? 'green' : 'red'}>
                        {record.status}
                    </Tag>
                </div>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(val) => handleStatusChange(record, val)}
                    className={`status-select ${text === 'Active' ? 'status-active' : 'status-inactive'}`}
                    style={{ width: 100 }}
                >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                const handleMenuClick = ({ key }) => {
                    switch (key) {
                        case 'edit':
                            navigate(`/vendor/gym/edit/${record.id}`, { 
                                state: { gymData: record } 
                            });
                            break;
                        case 'delete':
                            handleDeleteGym(record);
                            break;
                        default:
                            break;
                    }
                };

                const menu = (
                    <Menu onClick={handleMenuClick}>
                        <Menu.Item key="edit" icon={<EditOutlined />}>
                            Edit Gym
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                            Delete
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            type="text"
                            icon={<MoreOutlined />}
                            className="action-button"
                            title="More actions"
                        />
                    </Dropdown>
                );
            },
        },
    ];

    if (isLoading) {
        return (
            <div className="venue-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240, flexDirection: 'column' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: 8, color: '#666' }}>Loading gyms...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="venue-card gym-list-container">
            {/* Statistics Cards */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={6}>
                    <Card size="small">
                        <Statistic
                            title="Total Gyms"
                            value={statistics.total}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card size="small">
                        <Statistic
                            title="Active"
                            value={statistics.active}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card size="small">
                        <Statistic
                            title="Bookable"
                            value={statistics.bookable}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card size="small">
                        <Statistic
                            title="Women Only"
                            value={statistics.womenOnly}
                            valueStyle={{ color: '#eb2f96' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Header with Search and Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0 }}>
                        Gym List {isFetching && !isLoading && (<Spin size="small" style={{ marginLeft: 8 }} />)}
                    </h3>
                    <Input
                        placeholder="Search gyms..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Button
                        icon={<FilterOutlined />}
                        onClick={() => setShowFilters(!showFilters)}
                        type={showFilters ? 'primary' : 'default'}
                    >
                        Filters
                    </Button>
                </div>
                <Space>
                    {selectedRowKeys.length > 0 && (
                        <Dropdown
                            overlay={
                                <Menu onClick={({ key }) => handleBulkAction(key)}>
                                    <Menu.Item key="activate">Activate Selected</Menu.Item>
                                    <Menu.Item key="deactivate">Deactivate Selected</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item key="delete" danger>Delete Selected</Menu.Item>
                                </Menu>
                            }
                        >
                            <Button>
                                Bulk Actions ({selectedRowKeys.length})
                            </Button>
                        </Dropdown>
                    )}
                    <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
                        Refresh
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/vendor/gym/add')}>
                        Add Gym
                    </Button>
                </Space>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <Card size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                        <Col xs={24} sm={8} md={6}>
                            <div style={{ marginBottom: 8 }}>
                                <label>Status:</label>
                                <Select
                                    value={statusFilter}
                                    onChange={(value) => handleFilterChange('status', value)}
                                    style={{ width: '100%', marginTop: 4 }}
                                >
                                    <Option value="all">All Status</Option>
                                    <Option value="Active">Active</Option>
                                    <Option value="Inactive">Inactive</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col xs={24} sm={8} md={6}>
                            <div style={{ marginBottom: 8 }}>
                                <label>Type:</label>
                                <Select
                                    value={typeFilter}
                                    onChange={(value) => handleFilterChange('type', value)}
                                    style={{ width: '100%', marginTop: 4 }}
                                >
                                    <Option value="all">All Types</Option>
                                    <Option value="women-only">Women Only</Option>
                                    <Option value="mixed">Mixed</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col xs={24} sm={8} md={6}>
                            <div style={{ marginBottom: 8 }}>
                                <label>Booking:</label>
                                <Select
                                    value={bookableFilter}
                                    onChange={(value) => handleFilterChange('bookable', value)}
                                    style={{ width: '100%', marginTop: 4 }}
                                >
                                    <Option value="all">All</Option>
                                    <Option value="bookable">Bookable</Option>
                                    <Option value="not-bookable">Not Bookable</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6}>
                            <div style={{ marginBottom: 8, display: 'flex', alignItems: 'end', height: '100%' }}>
                                <Button 
                                    onClick={() => {
                                        setSearchText('');
                                        setStatusFilter('all');
                                        setTypeFilter('all');
                                        setBookableFilter('all');
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}

            {isFetching && !isLoading && (
                <div className="refresh-overlay">
                    <div className="refresh-content">
                        <Spin size="large" />
                        <div className="refresh-text">Refreshing gym list...</div>
                    </div>
                </div>
            )}

            {error ? (
                <div style={{ padding: 16 }}>
                    <Typography.Text type="danger">Failed to load gyms.</Typography.Text>
                    <div style={{ marginTop: 8 }}>
                        <Button onClick={() => refetch()} type="default">Retry</Button>
                    </div>
                </div>
            ) : (
                <>
                    {filteredData && filteredData.length > 0 ? (
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} gyms`,
                            }}
                            rowKey="key"
                            scroll={{ x: true }}
                            rowSelection={rowSelection}
                            size="middle"
                        />
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-title">
                                {data.length === 0 ? 'No Gyms Found' : 'No Gyms Match Your Filters'}
                            </div>
                            <div className="empty-state-description">
                                {data.length === 0 
                                    ? 'You have not added any gyms yet. Click the "Add Gym" button to create your first gym.'
                                    : 'Try adjusting your search criteria or filters to find gyms.'
                                }
                            </div>
                            <Space>
                                {data.length > 0 && (
                                    <Button onClick={() => {
                                        setSearchText('');
                                        setStatusFilter('all');
                                        setTypeFilter('all');
                                        setBookableFilter('all');
                                    }}>
                                        Clear Filters
                                    </Button>
                                )}
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/vendor/gym/add')}>
                                    Add Gym
                                </Button>
                            </Space>
                        </div>
                    )}
                </>
            )}

            <Modal
                open={modalVisible}
                title="Change Gym Status"
                onOk={() => {
                    message.success('Status change request sent to administrator');
                    setModalVisible(false);
                }}
                onCancel={handleModalCancel}
                okText="Send Request"
                cancelText="Cancel"
                width={500}
            >
                <div style={{ padding: '16px 0' }}>
                    <Typography.Paragraph>
                        To change the status of your gym, please contact your administrator. 
                        This ensures proper verification and compliance with platform policies.
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">
                        You can reach out to support or use the contact information provided in your dashboard.
                    </Typography.Text>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={deleteModalVisible}
                title="Delete Gym"
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ 
                    danger: true,
                    loading: deleteGymMutation.isPending 
                }}
                width={500}
            >
                <div style={{ padding: '16px 0' }}>
                    <Typography.Paragraph>
                        Are you sure you want to delete the gym <strong>"{gymToDelete?.gymName}"</strong>?
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">
                        This action cannot be undone. The gym will be permanently removed from your account.
                    </Typography.Text>
                </div>
            </Modal>
        </div>
    );
}
