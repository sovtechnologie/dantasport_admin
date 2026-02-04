import './Stylesheets/VendorListPage.css';
import React, { useEffect, useState } from 'react';
import { Select, Button, Table, Spin, message } from 'antd';
import { PlusOutlined,EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFetchVendorList } from '../../../hooks/admin/CreateVendor/useFetchVendorList';
import { useStatusChange } from '../../../hooks/admin/CreateVendor/useStatusChange';
import SearchBox from '../../Component/SearchBox';

const { Option } = Select;

export default function VendorPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const {
    data: vendorList,
    isloading: vendorListLoading,
    error: vendorListError,
  } = useFetchVendorList();

  const { mutate: changeStatus, isloading: statusloading } = useStatusChange();

  /* ============================
     MAP API RESPONSE
  ============================= */
  useEffect(() => {
    if (vendorList && vendorList.result) {
      const mappedData = vendorList.result.map((vendor, index) => ({
        key: vendor.id || index,
        id: vendor.id,
        name: vendor.full_name || 'N/A',
        vendorId: vendor.id || 'N/A',
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

  /* ============================
     STATUS CHANGE
  ============================= */
  const handleStatusChange = (key, vendorId, newStatus) => {
    setData(prev =>
      prev.map(item =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );

    changeStatus(
      { vendorId, status: newStatus === 'Active' ? 1 : 0 },
      {
        onSuccess: () => message.success('Vendor status updated'),
        onError: () => {
          message.error('Failed to update status');
          setData(prev =>
            prev.map(item =>
              item.key === key
                ? {
                    ...item,
                    status: newStatus === 'Active' ? 'Inactive' : 'Active',
                  }
                : item
            )
          );
        },
      }
    );
  };

  /* ============================
     TABLE COLUMNS
  ============================= */
  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      key: 'name',
      width:200,
    },
    {
      title: 'Vendor ID',
      dataIndex: 'vendorId',
      key: 'vendorId',
       width:100,
    },
    {
      title: 'Mobile Number',
      dataIndex: ['credentials', 'username'],
      key: 'mobile',
    },
    {
      title: 'Password',
      dataIndex: ['credentials', 'password'],
      key: 'password',
    },
    {
      title: 'No. of Venues',
      dataIndex: 'venuesCount',
      key: 'venuesCount',
      align: 'center',
      width:200,
    },
    {
      title: 'Venue Location',
      dataIndex: 'venueLocation',
      key: 'venueLocation',
      width:300,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Select
          value={record.status}
          bordered={false}
          loading={statusloading}
          onChange={val =>
            handleStatusChange(record.key, record.id, val)
          }
          className={`status-pill ${
            record.status === 'Active' ? 'active' : 'inactive'
          }`}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      ),
    },
   {
  title: 'Action',
  key: 'action',
  align: 'center',
  render: (_, record) => (
    <Button
      type="text"
      icon={<EditOutlined />}
      className="edit-action-btn"
      onClick={() =>
        navigate(`/admin/vendors/edit-vendor/${record.id}`)
      }
    />
  ),
},

  ];

  const handleAddVendor = () => {
    navigate('/admin/vendors/add-vendor');
  };

  /* ============================
     LOADING / ERROR
  ============================= */
  if (vendorListLoading) {
    return (
      <Spin
        size="large"
        style={{ display: 'block', margin: '50px auto' }}
      />
    );
  }

  if (vendorListError) {
    return <p>Error fetching vendor list</p>;
  }

  /* ============================
     RENDER
  ============================= */
  return (
    <>
      <SearchBox />

      <div className="vendor-page-container">
        <div className="vendor-header-form">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-vendor-button"
            onClick={handleAddVendor}
          >
            Add Vendor
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          className="vendor-table"
          scroll={{ x: true }}
        />
      </div>
    </>
  );
}
