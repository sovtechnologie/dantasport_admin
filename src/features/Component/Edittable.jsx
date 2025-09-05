
import React, { useState } from 'react';
import { Table, Input, Button, Select, Tooltip, Typography, Form, Popconfirm } from 'antd';
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { EditableCell ,EditableContext} from '../../../Component/editableColumn';
import "../Stylesheets/Enquires/VendorEnquiry.css";

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
        lastComment: 'Contacted, no response yet'
    }));




export default function VendorEnquiryPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState(generateData());
    const [editingKey, setEditingKey] = useState(null);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ lastComment: record.lastComment });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey(null);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => item.key === key);
            if (index > -1) {
                newData[index] = { ...newData[index], ...row };
                setData(newData);
                setEditingKey(null);
            }
        } catch {
            // handle validation error
        }
    }

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
        {
            title: 'Comment',
            dataIndex: 'lastComment',
            key: 'lastComment',
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </>
                ) : (
                    <Typography.Link disabled={editingKey != null} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

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
                <div className="search-export-bar">
                    <Button type="default" className="export-button" icon={<DownloadOutlined />}>
                        Export
                    </Button>
                    <Select defaultValue="Last Week" className="">
                        {['Last Week', 'Last Month', 'This Year'].map((v) => (
                            <Select.Option value={v} key={v}>
                                {v}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    rowKey="key"
                    className="vendor-enquiry-table"
                    scroll={{ x: true }}
                /> */}
                <Form form={form} component={false}>
                    <EditableContext.Provider value={form}>
                        <Table
                            rowKey={(record) => record.key}
                            components={{ body: { cell: EditableCell } }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            className="vendor-enquiry-table"
                            pagination={{ onChange: cancel }}
                        />
                    </EditableContext.Provider>
                </Form>
            </div>
        </>
    );
}
