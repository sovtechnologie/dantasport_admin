import "../../styelsheets/Report/Revenue.css";
import { Table, Button, Select, Input, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

// in parent component or a config file
const columns = [
    { title: 'Txn. ID', dataIndex: 'txnId', key: 'txnId' },
    { title: 'Vendor Name', dataIndex: 'vendorName', key: 'vendorName' },
    { title: 'Venue Name', dataIndex: 'venueName', key: 'venueName' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Booking ID', dataIndex: 'bookingId', key: 'bookingId' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            const colorMap = { Completed: 'green', Upcoming: 'blue', Cancelled: 'red' };
            return <Tag color={colorMap[status]}>{status}</Tag>;
        },
    },
];

const Data = Array(8).fill(0).map((_, index) => ({
    key: 1,
    txnId: '105868743564',
    vendorName: 'Sahil Khan',
    venueName: 'Lions Turf',
    customerName: 'Mihir Saha',
    bookingId: '#12548796',
    date: '28 Jan, 12:30 AM',
    amount: '₹2500',
    status: index === 2 ? 'Cancelled' : index === 1 ? 'Upcoming' : 'Completed'
})
);

export default function RevenuePage() {

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


            <div className="revenue-table-container">
                <div className="table-header">
                    <Button icon={<DownloadOutlined />} className="export-button">
                        Export
                    </Button>
                    <Select defaultValue="Last Week" className="time-filter">
                        {['Last Week', 'Last Month', 'This Year'].map((v) => (
                            <Select.Option value={v} key={v}>
                                {v}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                <Table
                    className="styled-table"
                    columns={columns}
                    dataSource={Data}
                    pagination={{ pageSize: 7 }}
                    scroll={{ x: true }}
                />
            </div>
        </>

    );
}
