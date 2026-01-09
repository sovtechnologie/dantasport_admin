import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Input, Button } from "antd";
import "../Stylesheets/Services/Sports.css";
import { getUserTotalBookingTuf } from "../../../../services/admin/ServicesAdmin/endpointApi";
// import { SearchOutlined } from "@ant-design/icons";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import ExportFilter from "../../../Component/ExportFilter";

export default function SportsPage() {
  //  const { RangePicker } = DatePicker;
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
        {/* <div className="export-section bg-white p-3 text-end">
          <Button
            type="default"
            className="export-btn"
            icon={<DownloadOutlined />}

          >
            Export
          </Button>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(dates) => setDateRange(dates || [])}
            allowClear
            style={{ marginLeft: 10 }}
            className="datepiker"
          />
        </div> */}
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
