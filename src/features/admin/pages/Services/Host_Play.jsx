import React, { useState, useEffect } from "react";
import { Input, Button, Table, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Host.css";
import { getUserTotalPlayGames } from "../../../../services/admin/ServicesAdmin/endpointApi";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBar from "../../../Component/SearchBar";
import SearchBox from "../../../Component/SearchBox";

const headerStyle = {
  color: "#2F80ED",
  fontWeight: 600,
  fontSize: "14px",
};

const columns = [
  {
    title: <span style={headerStyle}>User Name</span>,
    dataIndex: "full_name",
    key: "full_name",
    render: (text) => <span style={{ fontWeight: 400 }}>{text}</span>,
  },
  {
    title: <span style={headerStyle}>User ID</span>,
    dataIndex: "custom_id",
    key: "custom_id",
    render: (id) => <span style={{ color: "#6b7280" }}>#{id}</span>,
  },
  {
    title: <span style={headerStyle}>Phone Number</span>,
    dataIndex: "phone",
    key: "phone",
    render: (phone) => <span>{phone}</span>,
  },
  {
    title: <span style={headerStyle}>Email ID</span>,
    dataIndex: "email",
    key: "email",
  },
  {
    title: <span style={headerStyle}>Location</span>,
    dataIndex: "location",
    key: "location",
  },
  {
    title: <span style={headerStyle}>Event Type</span>,
    dataIndex: "event_type",
    key: "event_type",
    render: (type) => <span>{type || "—"}</span>,
  },
  {
    title: <span style={headerStyle}>Status</span>,
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
            backgroundColor: isActive ? "#E9F9F0" : "#EAF1FF",
            color: isActive ? "#27AE60" : "#2F80ED",
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
    title: <span style={headerStyle}>Game Played</span>,
    dataIndex: "booking_count",
    key: "booking_count",
    align: "center",
    render: (count) => (
      <span
        style={{
          padding: "6px 16px",
          border: "1px solid #2F80ED",
          borderRadius: "8px",
          color: "#2F80ED",
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
