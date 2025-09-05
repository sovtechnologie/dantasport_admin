import "../../styelsheets/Report/RatingPage.css";
import { Table, Select, Button ,Input} from "antd";
import { StarFilled, DownloadOutlined } from "@ant-design/icons";


const { Option } = Select;

const data = Array(7).fill({
  customerName: "Mihir Saha",
  venueName: "Sahil Khan",
  venueId: "#123456",
  sport: "Cricket",
  rating: 4.1,
  review: "Lorem Ipsum has been the industry's standard dummy"
});

const columns = [
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName"
  },
  {
    title: "Venue Name",
    dataIndex: "venueName",
    key: "venueName"
  },
  {
    title: "Venue ID",
    dataIndex: "venueId",
    key: "venueId"
  },
  {
    title: "Sport",
    dataIndex: "sport",
    key: "sport"
  },
  {
    title: "Rating",
    key: "rating",
    render: (_, record) => (
      <span>
        <StarFilled style={{ color: "#F7B801" }} /> {record.rating}
      </span>
    )
  },
  {
    title: "Reviews",
    dataIndex: "review",
    key: "review"
  }
];

export default function RatingReport() {
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

      <div className="rating-container">
        <div className="rating-header">
          <Button type="default" icon={<DownloadOutlined />} className="export-btn">
            Export
          </Button>
          <Select defaultValue="Last Week" className="select-week">
            <Option value="lastWeek">Last Week</Option>
            <Option value="thisWeek">This Week</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 7 }}
          className="custom-table"
        />
      </div>
    </>

  );
}
