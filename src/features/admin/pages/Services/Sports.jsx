import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Input, Button } from "antd";
import "../Stylesheets/Services/Sports.css";
import { getUserTotalBookingTuf } from "../../../../services/admin/ServicesAdmin/endpointApi";
import { SearchOutlined } from "@ant-design/icons";

export default function SportsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    { title: "User Name", dataIndex: "full_name", key: "full_name" },
    { title: "User Id", dataIndex: "custom_id", key: "custom_id" },
    { title: "Email ID", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`status-select ${status === 1 ? "active" : "inactive"}`}
        >
          {status === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Games Played",
      dataIndex: "booking_count",
      key: "booking_count",
      render: (text) => <span className="gamePlayed">{text}</span>,
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getUserTotalBookingTuf();

        // Check kar lo console me res structure
        console.log("API Response:", res);

        // Agar res.result hai
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

  if (loading) return <Spin tip="Loading..." className="table-loading" />;
  if (error) return <Alert message={error} type="error" showIcon />;

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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="sports-table"
      />
    </>
  );
}
