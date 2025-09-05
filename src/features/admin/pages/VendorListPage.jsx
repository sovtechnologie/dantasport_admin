import './Stylesheets/VendorListPage.css';
import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Table, Spin } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFetchVendorList } from '../../../hooks/admin/CreateVendor/useFetchVendorList';
import { useStatusChange } from '../../../hooks/admin/CreateVendor/useStatusChange';


const { Option } = Select;

export default function VendorPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { data: vendorList, isloading: vendorListLoading, error: vendorListError } = useFetchVendorList();
    // hook
    const { mutate: changeStatus, isloading: statusloading } = useStatusChange();

    // Map Backend Response to Table Format
    useEffect(() => {
        if (vendorList && vendorList.result) {
            const mappedData = vendorList.result.map((vendor, index) => ({
                key: vendor.id || index,
                id: vendor.id,
                name: vendor.full_name || 'N/A',
                vendorId: vendor.id || 'N/A',
                services: Array.isArray(vendor.services) && vendor.services.length > 0
                    ? vendor.services.join(',')
                    : 'N/A',// backend doesn’t provide services yet
                venuesCount: vendor.venue_count || 0,
                venueLocation: vendor.cities || 'N/A',
                credentials: {
                    username: vendor.mobile_number || 'N/A',
                    password: vendor.nakedPassword || 'N/A',
                },
                status: vendor.status === 1 ? 'Active' : 'Inactive',
            }));
            setData(mappedData);
        }
    }, [vendorList]);

    // Handle Dropdown Change + API Call
    const handleStatusChange = (key, vendorId, newStatus) => {
        // Optimistic UI update
        setData(prev =>
            prev.map(item => item.key === key ? { ...item, status: newStatus } : item)
        );

        // API call
        changeStatus(
            { vendorId, status: newStatus === 'Active' ? 1 : 0 },
            {
                onSuccess: () => {
                    message.success('Vendor status updated successfully');
                },
                onError: () => {
                    message.error('Failed to update vendor status');
                    // rollback UI
                    setData(prev =>
                        prev.map(item =>
                            item.key === key ? { ...item, status: newStatus === 'Active' ? 'Inactive' : 'Active' } : item
                        )
                    );
                }
            }
        );
    }

    const columns = [
        { title: 'Vendor ID', dataIndex: 'vendorId', key: 'vendorId' },
        { title: 'Vendor Name', dataIndex: 'name', key: 'name' },
        { title: 'Services', dataIndex: 'services', key: 'services' },
        { title: 'VenuesCount', dataIndex: 'venuesCount', key: 'venuesCount' },
        {
            title: 'Venue Location',
            dataIndex: 'venueLocation',
            key: 'venueLocation',
            render: (text, record) => {
                // Extract unique cities for this vendor by splitting and trimming
                // Split cities by comma and trim whitespace, keep duplicates as is
                const cityList = record.venueLocation && record.venueLocation !== 'N/A'
                    ? record.venueLocation.split(',').map(city => city.trim())
                    : [];

                // You can use React state here to manage selected city per row if needed,
                // for now we just show dropdown with values

                return (
                    <Select
                        style={{ width: 150 }}
                        placeholder="Venue location"
                        defaultValue={cityList.length > 0 ? cityList[0] : undefined}
                    // onChange handler can be added to handle city selection
                    >
                        {cityList.map((city, index) => (
                            <Option key={`${city}-${index}`} value={city}>
                                {city}
                            </Option>
                        ))}
                    </Select>
                );
            }
        },

        {
            title: 'login credentials', dataIndex: 'credentials', key: 'credentials',
            render: (_, record) => (
                <div>
                    <div>{`Username  :${record.credentials.username}`}</div>
                    <div>{`Password  :${record.credentials.password}`}</div>
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Select
                    value={record.status}
                    onChange={(val) => handleStatusChange(record.key, record.id, val)}
                    // className="status-select"
                    className={`status-select ${record.status === 'Active' ? 'status-active' : 'status-inactive'}`}
                    loading={statusloading}
                >
                    <Option value="Active" >Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#1163C7' }} />}
                    className="action-readonly-button"
                    onClick={() => navigate(`/admin/vendors/edit-vendor/${record.id}`)}
                />
            ),
        },
    ];

    const handleAddVendor = () => {
        navigate('/admin/vendors/add-vendor');
    }

    if (vendorListLoading) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    if (vendorListError) {
        return <p>Error fetching vendor list!</p>;
    }


    return (

        <>
            <div className="search-container">
                <div className="filter-box">
                    <div className='filter-item'>
                        <Input
                            placeholder="Search by Anything"
                            prefix={<SearchOutlined />}
                            className="search-input" />
                    </div>
                </div>
                <Button type="primary" className="search-button">
                    SEARCH
                </Button>
            </div>



            <div className="vendor-page-container">
                <div className="vendor-header-form">
                    <Button type="primary" icon={<PlusOutlined />} className="add-vendor-button" onClick={handleAddVendor}>
                        Add Vendor
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    className="vendor-table"
                    rowKey="key"
                    scroll={{ x: true }}
                />
            </div>
        </>

    );
}
