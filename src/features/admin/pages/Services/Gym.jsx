import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';
import "../Stylesheets/Services/Gym.css";


const generateData = () =>
  Array.from({ length: 40 }, (_, i) => {
    const bought = Math.floor(Math.random() * 10) + 1;
    const used = Math.floor(Math.random() * (bought + 1)); 
    return {
      key: i,
      name: 'Sahil Khan',
      userId: '#123456',
      phoneNumber: '+91 9876543210',
      email: 'sahilKhan23@gmail.com',
      venueLocation: 'Hinjewadi, Pune',
      status: i % 3 === 0 ? 'Active' : 'Inactive',
      boughtPasses: bought,
      usedPasses: used,
    };
  });


const columns = [
    { title: 'User Name', dataIndex: 'name', key: 'name' },
    { title: 'User Id', dataIndex: 'userId', key: 'userId' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Email ID', dataIndex: 'email', key: 'email' },
    { title: 'Location', dataIndex: 'venueLocation', key: 'venueLocation' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
            <span className={`status-select ${record.status === 'Active' ? 'active' : 'inactive'}`}>
                {record.status}
            </span>
        )
    },
    {
      title: 'Passes',
      dataIndex: 'usedPasses',
      key: 'passes',
      render: (_, record) => (
        <span className="gamePlayed">
          {record.usedPasses}/{record.boughtPasses}
        </span>
      ),
    },
];

export default function GymPage() {
     const [data] = useState(generateData());

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

            <Table 
            columns={columns}
            dataSource={data}
            pagination={{pageSize:10}}
            className="sports-table"        
            />
        </>
    )
}