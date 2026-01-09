
import React, { useState } from 'react';
import { Table, Input, Button, Select, Tooltip, Typography, Form,Popconfirm } from 'antd';
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";;
import "../Stylesheets/Enquires/VendorEnquiry.css";
import ExportFilter from '../../../Component/ExportFilter';

const { Option } = Select;

// Example sub-status options by status
const subStatusOptions = {
    'Not Connected': ['Switched Off', 'Out of Coverage', 'Invalid Number', 'Number Busy', 'No Answer', 'Call Later/Callback Requested'],
    'Connected(Not Interested)': ['Generic', 'Already Using Competitor', 'Not the Right Time', 'Not Relevant/Wrong Contact'],
    'Connected(Interested)': ['Send Details', 'Schedule Follow-up', 'Schedule Demo/Meeting', 'Wants to Discuss with Team', 'Ask to Call Letter'],
    'Follow-up': ['Follow-up Scheduled', 'Waiting for Client Response', 'Sent Proposal/Brochure'],
    'Closed Won': ['onboarded'],
    'Closed Lost': ['Lost', 'No Response', 'Not Interested After Demo', 'Pricing Too High', 'Chose Competior', 'Internal Reasons'],
    'Disqualified': ['Not Target Audience', 'Duplicate Entry', 'Fake Lead']
};

const generateData = (n = 20) =>
    Array.from({ length: n }, (_, i) => ({
        key: i,
        vendorName: 'Sahil Khan',
        phoneNumber: '+91 9284578663',
        email: `mihirs${i}@gmail.com`,
        location: 'Hinjewadi, Pune',
        remark: 'Hi want to connect scgjnjxbgcgcx',
        status: 'Not Connected',
        subStatus: 'Switched Off',
        // lastComment: 'Contacted, no response yet'
    }));


    

export default function VendorEnquiryPage() {
    const [data, setData] = useState(generateData());

    const handleStatusChange = (recordKey, newStatus) => {
        setData(prev =>
            prev.map(item =>
                item.key === recordKey
                    ? {
                        ...item,
                        status: newStatus,
                        subStatus: subStatusOptions[newStatus]?.[0] || '',
                    }
                    : item
            )
        );
    };

    const handleSubStatusChange = (recordKey, newSubStatus) => {
        setData(prev =>
            prev.map(item =>
                item.key === recordKey ? { ...item, subStatus: newSubStatus } : item
            )
        );
    };

    const columns = [
        { title: 'Vendor Name', dataIndex: 'vendorName', key: 'vendorName' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email ID', dataIndex: 'email', key: 'email' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Remark', dataIndex: 'remark', key: 'remark' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (val, record) => (
                <Select
                    value={val}
                    onChange={value => handleStatusChange(record.key, value)}
                    className="dropdown-status"
                >
                    {Object.keys(subStatusOptions).map(status => (
                        <Option key={status} value={status}>
                            {status}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Sub‑Status',
            dataIndex: 'subStatus',
            key: 'subStatus',
            render: (val, record) => (
                <Select
                    value={val}
                    onChange={value => handleSubStatusChange(record.key, value)}
                    className="dropdown-substatus"
                >
                    {(subStatusOptions[record.status] || []).map(ss => (
                        <Option key={ss} value={ss}>
                            {ss}
                        </Option>
                    ))}
                </Select>
            ),
        },
        // {
        //     title: 'Comment',
        //     dataIndex: 'lastComment',
        //     key: 'lastComment',
        //     ellipsis: { showTitle: false }, 
        //     render: (text) => (
        //         <Tooltip title={text}>
        //             <Typography.Text ellipsis>{text}</Typography.Text>
                    
        //         </Tooltip>
        //     ),
        //     width: 200,
        // },
    ];


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

            <div className="vendor-enquiry-page">
                <ExportFilter/>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    rowKey="key"
                    className="vendor-enquiry-table"
                    scroll={{ x: true }}
                />
            </div>
        </>
    );
}
