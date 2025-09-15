import "../../styelsheets/Report/CouponPage.css";
import { Tag, Button, Select,Table,Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const columns = [
  { title: 'Coupon ID', dataIndex: 'couponId', key: 'couponId' },
  { title: 'Coupon Type', dataIndex: 'couponType', key: 'couponType' },
  { title: 'Venue Name', dataIndex: 'venueName', key: 'venueName' },
  { title: 'Venue ID', dataIndex: 'venueId', key: 'venueId' },
  { title: 'Sports', dataIndex: 'sport', key: 'sport' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      const colors = { Upcoming: 'blue', Ongoing: 'green', Completed: 'red' };
      return <Tag color={colors[status]}>{status}</Tag>;
    },
  },
  {
    title: 'Usage',
    dataIndex: 'usage',
    key: 'usage',
    render: usage => <Tag color="blue">{usage}</Tag>,
  },
];

const data = Array.from({ length: 7 }, (_, i) => ({
  key: i,
  couponId: '#123456',
  couponType: 'Flat 45% Off',
  venueName: 'Sahil Khan',
  venueId: '#123456',
  sport: 'Cricket',
  date: '20‑06‑2025',
  status: i % 3 === 0 ? 'Completed' : i % 2 === 0 ? 'Upcoming' : 'Ongoing',
  usage: 12,
}));

export default function CouponReport() {
  return (
    <>
    <div className="search-section">
      <div className="search-input-container">
        <label className="search-label">Search by Anything</label>
        <Input placeholder="Booking ID" className="custom-search-input" />
      </div>
      <Button  className="custom-search-button">
        SEARCH
      </Button>
    </div>


    <div className="coupon-report-container">
      <div className="table-header">
        <Button icon={<DownloadOutlined />} className="btn-export">
          Export
        </Button>
        <Select defaultValue="Last Week" className="select-time-range">
          {['Last Week', 'This Week', 'This Month'].map(v => (
            <Select.Option value={v} key={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table
        className="coupon-table"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 7 }}
        scroll={{ x: true }}
      />
    </div>
    </>
  );
}
