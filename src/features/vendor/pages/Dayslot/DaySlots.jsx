import "../../styelsheets/DaySlots.css";
import { Table, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Option } = Select;

const DaySlots = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Time Slot",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Total Courts",
      dataIndex: "totalCourts",
      key: "totalCourts",
      render: (text) => <span className="total-courts">{text}</span>,
    },
    {
      title: "Booked",
      dataIndex: "booked",
      key: "booked",
      render: (text, record) => (
        <Link
          className="booked clickable"
          to={`/vendor/dayslots/booked-details/${record.key}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (text, record) => (
        <Link
          className={`available clickable ${text === 0 ? "zero" : ""}`}
          to={`/vendor/dayslots/available-details/${record.key}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => <span className="action-dots">•••</span>,
    },
  ];

  const data = [
    {
      key: "1",
      time: "06:00 AM - 06:30 AM",
      totalCourts: 2,
      booked: 1,
      available: 1,
    },
    {
      key: "2",
      time: "06:30 AM - 07:00 AM",
      totalCourts: 2,
      booked: 1,
      available: 1,
    },
    {
      key: "3",
      time: "07:00 AM - 07:30 AM",
      totalCourts: 3,
      booked: 0,
      available: 1,
    },
    {
      key: "4",
      time: "07:30 AM - 08:00 AM",
      totalCourts: 3,
      booked: 1,
      available: 0,
    },
    {
      key: "5",
      time: "09:00 PM - 12:00 AM",
      totalCourts: 4,
      booked: 1,
      available: 0,
    },
    {
      key: "6",
      time: "09:00 PM - 12:00 AM",
      totalCourts: 4,
      booked: 1,
      available: 0,
    },
    {
      key: "7",
      time: "09:00 PM - 12:00 AM",
      totalCourts: 5,
      booked: 1,
      available: 0,
    },
    {
      key: "8",
      time: "09:00 PM - 12:00 AM",
      totalCourts: 5,
      booked: 1,
      available: 0,
    },
  ];

  return (
    <div className="day-slots-container">
      <div className="day-slots-filters">
        <div className="day-slots-selected-box">
          <Select placeholder="Select Sports" className="filter-select">
            <Option value="cricket">Cricket</Option>
            <Option value="badminton">Badminton</Option>
          </Select>
          <Select placeholder="Select Venue" className="filter-select">
            <Option value="venue1">Venue 1</Option>
            <Option value="venue2">Venue 2</Option>
          </Select>
        </div>
        <DatePicker.RangePicker className="date-picker" />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="day-slots-table"
      />
    </div>
  );
};

export default DaySlots;
