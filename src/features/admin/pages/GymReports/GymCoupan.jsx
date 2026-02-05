import React, { useEffect, useState } from "react";
import { Table, Spin, Select, Pagination } from "antd";
import { MoreOutlined, QrcodeOutlined, EditOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import "../Stylesheets/GymReports/GymCoupan.css";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

const { Option } = Select;

export default function GymCouponAdmin() {
  const [loading, setLoading] = useState(false);

  // Dummy data shaped exactly like UI (replace with API)
  const recentChecking = Array.from({ length: 5 }).map((_, i) => ({
    key: i,
    userName: "Mihir Saha",
    userId: "#123456",
    bookingId: "#123456",
    dateTime: "28 Jan, 12:30 AM",
    location: "Banner, Pune",
    checkin: i % 2 === 0 ? "QR" : "Manual",
  }));

  const pendingChecking = Array.from({ length: 8 }).map((_, i) => ({
    key: i,
    userName: "Mihir Saha",
    userId: "#123456",
    bookingId: "#123456",
    dateTime: "28 Jan, 12:30 AM",
    location: "Banner, Pune",
  }));

  const commonColumns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: 200,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 140,
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      width: 160,
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      width: 200,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
    },
  ];

  const recentColumns = [
    ...commonColumns,
    {
      title: "Check-In",
      key: "checkin",
      width: 160,
      render: (_, record) => (
        <div className="checkin-success">
          <span className="green-dot" />
          {record.checkin}
        </div>
      ),
    },
  ];

  const pendingColumns = [
    ...commonColumns,
    {
      title: "Check-In",
      key: "checkin",
      width: 200,
      render: () => (
        <div className="checkin-options">
          <label>
            <input type="radio" /> QR
          </label>
          <label>
            <input type="radio" /> M Check-In
          </label>
        </div>
      ),
    },
    {
  title: "Action",
  width: 80,
  align: "center",
  render: () => (
    <EditOutlined
      className="edit-icon"
      style={{
        fontSize: "18px",
        color: "#1677ff",
        cursor: "pointer",
      }}
    />
  ),
},

  ];

  return (
    <div>
      <SearchBox />

      <Spin spinning={loading}>
        <div className="coupon-wrapper">
          <ExportFilter />

          {/* Header */}
          <div className="top-bar my-3">
            <Select className="gym-select" defaultValue="Select Gym">
              <Option>Select Gym</Option>
              <Option value="1">Fitness Hub</Option>
            </Select>

            <div className="qr-box">
              <QrcodeOutlined />
            </div>
          </div>

          {/* Recent Checking */}
          <h3 className="section-title">Recent Checking</h3>
          <Table
            columns={recentColumns}
            dataSource={recentChecking}
            pagination={false}
            className="coupon-table"
            tableLayout="fixed"
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Pending Checking */}
        <div className="coupon-wrapper mt-4">
          <h3 className="section-title">Pending Checking</h3>
          <Table
            columns={pendingColumns}
            dataSource={pendingChecking}
            pagination={false}
            className="coupon-table"
            tableLayout="fixed"
            scroll={{ x: "max-content" }}
          />

          <div className="pagination-box">
            <Pagination current={2} total={200} />
          </div>
        </div>
      </Spin>
    </div>
  );
}
