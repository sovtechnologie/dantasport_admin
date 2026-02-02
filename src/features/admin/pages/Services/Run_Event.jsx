import React, { useState, useEffect } from "react";
import { Input, Button, Table, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Event.css";
import { getUserTotalAttendEvents } from "../../../../services/admin/ServicesAdmin/endpointApi";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBar from "../../../Component/SearchBar";
import SearchBox from "../../../Component/SearchBox";

const columns = [
  {
    title: "User Name",
    dataIndex: "full_name",
    key: "full_name",
    render: (text) => (
      <span style={{ fontWeight: 400 }}>{text}</span>
    ),
  },
  {
    title: "User ID",
    dataIndex: "custom_id",
    key: "custom_id",
    render: (id) => (
      <span style={{ color: "#6b7280" }}>#{id}</span>
    ),
  },
  {
    title: "Phone Number",
    dataIndex: "mobile",
    key: "mobile",
    render: (mobile) => (
      <span>+91 {mobile}</span>
    ),
  },
  {
    title: "Email ID",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (loc) => (
      <span>{loc || "—"}</span>
    ),
  },
  {
    title: "Event Type",
    dataIndex: "event_type",
    key: "event_type",
    render: (type) => (
      <span>{type || "Running"}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const isActive = status === 1;
      return (
        <span
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            backgroundColor: isActive ? "#e7f7ef" : "#eaf1ff",
            color: isActive ? "#1a9b5d" : "#3b82f6",
            display: "inline-block",
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    title: "Events Attend",
    dataIndex: "booking_count",
    key: "booking_count",
    align: "center",
    render: (count) => (
      <span
        style={{
          padding: "6px 16px",
          border: "1px solid #3b82f6",
          borderRadius: "8px",
          color: "#3b82f6",
          fontWeight: 500,
          display: "inline-block",
          minWidth: "40px",
          textAlign: "center",
        }}
      >
        {count}
      </span>
    ),
  },
];


export default function EventPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getUserTotalAttendEvents();

        console.log("API Response:", res);

        if (res?.status === 200 && Array.isArray(res?.result)) {
          const formattedData = res.result.map((item) => ({
            ...item,
            key: item.id,
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
      <SearchBox/>
      <ExportFilter/>
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
