import React, { useState, useEffect } from "react";
import { Input, Button, Table, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Host.css";
import { getUserTotalPlayGames } from "../../../../services/admin/ServicesAdmin/endpointApi";

const columns = [
  { title: "User Name", dataIndex: "full_name", key: "full_name" },
  { title: "User Id", dataIndex: "custom_id", key: "custom_id" },
  { title: "Phone Number", dataIndex: "phone", key: "phone" },
  { title: "Email ID", dataIndex: "email", key: "email" },
  { title: "Location", dataIndex: "location", key: "location" },
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
    title: "Games Played",
    dataIndex: "booking_count",
    key: "booking_count",
    render: (text) => <span className="gamePlayed">{text}</span>,
  },
  {
    title: "Game Hosted",
    dataIndex: "game_hosted",
    key: "game_hosted",
    render: (text) => <span className="gamePlayed">{text}</span>,
  },
];

export default function HostPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getUserTotalPlayGames();

        console.log("API Response:", res);

        if (res?.status === 200 && Array.isArray(res?.result)) {
          const formattedData = res.result.map((item) => ({
            ...item,
            key: item.id,
            phone: item.phone || "-",
            location: item.location || "-",
            game_hosted: item.game_hosted || 0,
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
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
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Spin size="large" />
        </div>
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
