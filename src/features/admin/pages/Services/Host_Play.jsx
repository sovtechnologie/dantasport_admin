import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';
import "../Stylesheets/Services/Host.css";


const initialData = Array.from({ length: 40 }, (_, i) => ({
    key: i,
    name: 'Sahil Khan',
    userId: '#123456',
    phoneNumber: '+91 9876543210',
    email: 'sahilKhan23@gmail.com',
    venueLocation: 'Hinjewadi, Pune',
    status: i % 3 === 0 ? 'Active' : 'Inactive',
    countGames: Math.floor(Math.random() * 6) + 1,
    gameHosted: Math.floor(Math.random() * 6) + 1,
}));


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
        title: 'Games Played',
        dataIndex: 'countGames',
        key: 'countGames',
        render: (text) => <span className='gamePlayed'>{text}</span>
    },
    {
        title: 'Game Hosted',
        dataIndex: 'gameHosted',
        key: 'gameHosted',
        render: (text) => <span className='gamePlayed'>{text}</span>
    },
];

export default function EventPage() {
    const [data, setData] = useState(initialData);

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