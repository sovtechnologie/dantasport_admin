import React, { useEffect, useState } from "react";
import { Table, Spin, Select, Pagination } from "antd";
import { MoreOutlined,QrcodeOutlined } from "@ant-design/icons";
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
    location: "Banner,Pune",
    checkin: i % 2 === 0 ? "QR" : "Manual",
  }));

  const pendingChecking = Array.from({ length: 8 }).map((_, i) => ({
    key: i,
    userName: "Mihir Saha",
    userId: "#123456",
    bookingId: "#123456",
    dateTime: "28 Jan, 12:30 AM",
    location: "Banner,Pune",
  }));

  const commonColumns = [
    { title: "User Name", dataIndex: "userName" },
    { title: "User ID", dataIndex: "userId" },
    { title: "Booking ID", dataIndex: "bookingId" },
    { title: "Date & Time", dataIndex: "dateTime" },
    { title: "Location", dataIndex: "location" },
  ];

  const recentColumns = [
    ...commonColumns,
    {
      title: "Check-In",
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
      render: () => <MoreOutlined className="action-dots" />,
    },
  ];

  return (
    <div>
      <SearchBox/>
      
      <Spin spinning={loading}>
         <div className="coupon-wrapper">
          <ExportFilter/>
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
        />
       

        <div className="pagination-box">
          <Pagination current={2} total={200} />
        </div>
         </div>
      </Spin>
      
    </div>
  );
}
