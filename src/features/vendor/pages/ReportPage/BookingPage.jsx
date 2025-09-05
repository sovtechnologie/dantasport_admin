import React from 'react';
import { Table, Input, Select, DatePicker, Tag, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import '../../styelsheets/Report/BookingPage.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const columns = [
  {
    title: 'Booking ID',
    dataIndex: 'bookingId',
  },
  {
    title: 'Venue Name',
    dataIndex: 'venueName',
  },
  {
    title: 'Sport',
    dataIndex: 'sport',
  },
  {
    title: 'Customer Details',
    dataIndex: 'customer',
    key: 'customer',
    render: customer => (
      <div>
        <div className="font-semibold">{customer.name}</div>
        <div className="text-gray-500 text-sm">{customer.contact}</div>
      </div>
    ),
  },
  {
    title: 'Booking Date',
    dataIndex: 'bookingDate',
  },
  {
    title: 'Event Date',
    dataIndex: 'eventDate',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => {
      const colorMap = {
        Completed: 'green',
        Upcoming: 'blue',
        Cancelled: 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  }
];

const data = Array(8).fill(0).map((_, index) => ({
  key: index,
  bookingId: '#12548796',
  venueName: 'Danta Sports Complex',
  sport: 'Cricket',
  customer: {
    name: 'Mihir Saha',
    contact: '12345******'
  },
  bookingDate: '28 Jan, 12:30 AM',
  eventDate: '29 Jan, 2:00 PM',
  duration: '2 hours',
  status: index === 2 ? 'Cancelled' : index === 1 ? 'Upcoming' : 'Completed'
}));

export default function BookingTable() {
  return (
    <>
      <div className="search-section">
        <div className="search-input-container">
          <label className="search-label">Search by Anything</label>
          <Input placeholder="Booking ID" className="custom-search-input" />
        </div>
        <Button className="custom-search-button">
          SEARCH
        </Button>
      </div>


      <div className="booking-table-container">
        <div className="filters">
          <Select defaultValue="Select Venue" className="filter-select">
            <Option value="venue1">Venue 1</Option>
            <Option value="venue2">Venue 2</Option>
          </Select>
          <Button className="filter-button" icon={<DownloadOutlined />} >Export</Button>
          <Select defaultValue="Last Week" className="time-filter">
            {['Last Week', 'Last Month', 'This Year'].map((v) => (
              <Select.Option value={v} key={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 7 }}
          bordered
        />
      </div>
    </>
  );
}
