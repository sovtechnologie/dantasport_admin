import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message,DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/GymReports/GymCoupan.css";
import { getGymCouponReports } from "../../../../services/admin/GymReports/endpointApi";

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function GymCouponAdmin() {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchCouponReports = async () => {
    try {
      setLoading(true);
      const res = await getGymCouponReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => ({
          id: item.id,
          couponId: item.coupon_code,
          couponType: item.coupon_type,
          vendorName: item.vendor_name || "-",
          gymName: item.gym_name || "-",
          date: new Date(item.created_at).toLocaleDateString(),
          status: item.status === 1 ? "Active" : "Deactive",
          usage: item.usage_count || 0,
        }));

        setData(rawData);
        setFilteredData(rawData);
      } else {
        message.error("Failed to fetch gym coupon reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching gym coupon reports");
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
          (item.gymName && item.gymName.toLowerCase().includes(text))
      );
    }
    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    { title: "Coupon ID", dataIndex: "couponId", key: "couponId" },
    { title: "Coupon Type", dataIndex: "couponType", key: "couponType" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Gym Name", dataIndex: "gymName", key: "gymName" },
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
    <div className="gym-coupon-admin-container">
     <div className="search-bar-container">
               <div className="filter-section">
                 <div className="filter-item">
                   <Input
                     placeholder="Search by Customer / Vendor / Gym / Review"
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

      <div className="gym-coupon-page">
        <div className="export-section">
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
        </div>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            className="gym-coupon-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
