import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVenueCouponReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import "../Stylesheets/ReportsAdmin/CoupanAdmin.css";

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function CouponAdmin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchCouponReports = async () => {
    try {
      setLoading(true);
      const res = await getVenueCouponReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => ({
          id: item.id,
          couponId: item.coupon_code,
          couponType: item.coupon_type,
          vendorName: item.vendor_name || "-",
          venueName: item.venue_name || "-",
          sport: item.sports ? item.sports.join(", ") : "-",
          date: new Date(item.created_at).toLocaleDateString(),
          status: item.status === 1 ? "Active" : "Deactive",
          usage: item.usage_count || 0,
        }));

        setData(rawData);
        setFilteredData(rawData);
      } else {
        message.error("Failed to fetch coupon reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching coupon reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponReports();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.couponId && item.couponId.toLowerCase().includes(text)) ||
          (item.couponType && item.couponType.toLowerCase().includes(text)) ||
          (item.vendorName && item.vendorName.toLowerCase().includes(text)) ||
          (item.venueName && item.venueName.toLowerCase().includes(text)) ||
          (item.sport && item.sport.toLowerCase().includes(text))
      );
    }
    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    { title: "Coupon ID", dataIndex: "couponId", key: "couponId" },
    { title: "Coupon Type", dataIndex: "couponType", key: "couponType" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    { title: "Sport", dataIndex: "sport", key: "sport" },
    { title: "Date", dataIndex: "date", key: "date" },
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
    { title: "Usage", dataIndex: "usage", key: "usage" },
  ];

  return (
    <div className="coupon-admin-container">
      <div className="search-bar-container">
        <Input
          placeholder="Search by Coupon ID / Vendor / Venue / Sport"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="search-input-field"
        />
        <Button
          icon={<DownloadOutlined />}
          className="export-btn"
          onClick={() => message.info("Export functionality coming soon")}
        >
          Export
        </Button>
      </div>

      <div className="coupon-page">
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
