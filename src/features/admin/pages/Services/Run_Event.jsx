import React, { useState, useEffect } from "react";
import { Input, Button, Table, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Event.css";
import { getUserTotalAttendEvents } from "../../../../services/admin/ServicesAdmin/endpointApi";

const columns = [
  { title: "User Name", dataIndex: "full_name", key: "full_name" },
  { title: "User Id", dataIndex: "custom_id", key: "custom_id" },
  { title: "Email ID", dataIndex: "email", key: "email" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <span
        className={`status-select ${
          record.status === 1 ? "active" : "inactive"
        }`}
      >
        {record.status === 1 ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    title: "Events Attend",
    dataIndex: "booking_count",
    key: "booking_count",
    render: (text) => <span className="gamePlayed">{text}</span>,
  },
];

export default function EventPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getUserTotalAttendEvents();

        // API ka response console me check kar lo
        console.log("API Response:", res);

        // response structure ke hisab se result nikal lo
        const resultData = res?.result || res?.data?.result;

        if (resultData && resultData.length > 0) {
          const formattedData = resultData.map((item) => ({
            ...item,
            key: item.id,
          }));
          setData(formattedData);
        } else {
          setError("No data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="search-container">
        <div className="filter-box">
          <div className="filter-item">
            <Input
              placeholder="Search by Anything"
              prefix={<SearchOutlined />}
              className="search-input"
            />
          </div>
        </div>
        <Button type="primary" className="search-button">
          SEARCH
        </Button>
      </div>

      {loading ? (
        <Spin tip="Loading..." />
      ) : error ? (
        <Alert message={error} type="warning" />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className="sports-table"
        />
      )}
    </>
  );
}
