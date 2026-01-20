import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message,DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/EventReports/EventCoupan.css";
import { getEventCouponReports } from "../../../../services/admin/EventReports/endpointApi";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function EventCouponAdminPage() {
   const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await getEventCouponReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const mappedData = res.result.map((item) => ({
          id: item.id,
          couponCode: item.coupon_code,
          couponType: item.coupon_type,
          eventName: item.event_title,
          usage: item.usage_count || 0,
          status: item.status === 1 ? "Active" : "Deactive",
          date: new Date(item.created_at).toLocaleDateString(),
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } else {
        message.error("Failed to fetch event coupon reports");
      }
    } catch (err) {
      console.error("Error fetching event coupon reports:", err);
      message.error("Something went wrong while fetching event coupon reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredData(data);
      return;
    }
    const text = searchText.toLowerCase();
    const filtered = data.filter(
      (d) =>
        (d.couponCode && d.couponCode.toLowerCase().includes(text)) ||
        (d.couponType && d.couponType.toLowerCase().includes(text)) ||
        (d.eventName && d.eventName.toLowerCase().includes(text))
    );
    setFilteredData(filtered);
  }, [searchText, data]);

 const columns = [
  {
    title: "Coupon ID",
    dataIndex: "couponCode",
    key: "couponCode",
    render: (code) => <span className="fw-500">#{code}</span>,
  },
  {
    title: "Coupon Type",
    dataIndex: "couponType",
    key: "couponType",
  },
  {
    title: "Venue Name",
    dataIndex: "eventName",
    key: "eventName",
  },
  {
    title: "Venue ID",
    key: "venueId",
    render: (_, record) => (
      <span className="text-muted">#{record.id}</span>
    ),
  },
  {
    title: "Sports",
    key: "sports",
    render: () => <span>Cricket</span>, // UI-only (as per design)
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span className={`status-pill ${status.toLowerCase()}`}>
        {status === "Active" ? "Ongoing" : "Completed"}
      </span>
    ),
  },
  {
    title: "Usage",
    dataIndex: "usage",
    key: "usage",
    render: (val) => <span className="usage-pill">{val}</span>,
  },
];


  return (
    <div className="coupon-admin-container">
      <SearchBox/>

      <div className="coupon-page">
       <ExportFilter/>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            className="coupon-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
