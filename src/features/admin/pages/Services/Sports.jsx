import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Input, Button } from "antd";
import "../Stylesheets/Services/Sports.css";
import { getUserTotalBookingTuf } from "../../../../services/admin/ServicesAdmin/endpointApi";
// import { SearchOutlined } from "@ant-design/icons";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBar from "../../../Component/SearchBar";
import SearchBox from "../../../Component/SearchBox";

export default function SportsPage() {
  //  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const columns = [
  {
    title: "User Name",
    width:200,
    dataIndex: "full_name",
    key: "full_name",
    render: (text) => (
      <span style={{ fontWeight: 400 }}>{text}</span>
    ),
  },
  {
    title: "User ID",
     width:200,
    dataIndex: "custom_id",
    key: "custom_id",
    render: (id) => (
      <span style={{ color: "#6b7280" }}>#{id}</span>
    ),
  },
  {
    title: "Phone Number",
     width:160,
    dataIndex: "mobile",
    key: "mobile",
    render: (mobile) => (
      <span>+91 {mobile}</span>
    ),
  },
  {
    title: "Email ID",
     width:200,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Location",
     width:220,
    dataIndex: "location",
    key: "location",
    render: (loc) => <span>{loc || "—"}</span>,
  },
  {
    title: "Status",
      width:120,
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
    title: "Game Played",
    width:120,
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


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getUserTotalBookingTuf();

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
        setLoading(false);
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
