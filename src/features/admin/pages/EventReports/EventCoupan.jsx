import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/EventReports/EventCoupan.css";
import { getEventCouponReports } from "../../../../services/admin/EventReports/endpointApi";

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function EventCouponAdminPage() {
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
    { title: "Coupon Code", dataIndex: "couponCode", key: "couponCode" },
    { title: "Coupon Type", dataIndex: "couponType", key: "couponType" },
    { title: "Event", dataIndex: "eventName", key: "eventName" },
    { title: "Usage", dataIndex: "usage", key: "usage" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span
          style={{ color: statusColors[val] || "black", fontWeight: "bold" }}
        >
          {val}
        </span>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div className="coupon-admin-container">
      <div className="search-bar-container">
        <div className="filter-section">
          <div className="filter-item">
            <Input
              placeholder="Search by Coupon / Event"
              prefix={<SearchOutlined />}
              className="search-input-field"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <Button type="primary" className="search-btn">
          SEARCH
        </Button>
      </div>

      <div className="coupon-page">
        <div className="export-section">
          <Button
            type="default"
            className="export-btn"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
        </div>

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
