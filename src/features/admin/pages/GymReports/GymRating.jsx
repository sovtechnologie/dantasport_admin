import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/GymReports/GymRating.css";
import { getGymRatingReports } from "../../../../services/admin/GymReports/endpointApi";

export default function GymRatingAdminPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getGymRatingReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const mappedData = res.result.map((item) => ({
          id: item.id,
          customerName: item.full_name,
          vendorName: item.vendor_name || "N/A",
          gymName: item.gym_name,
          rating: item.rating,
          review: item.comment,
          date: new Date(item.created_at).toLocaleDateString(),
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } else {
        message.error("Failed to fetch gym rating reports");
      }
    } catch (err) {
      console.error("Error fetching gym rating reports:", err);
      message.error("Something went wrong while fetching gym rating reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Search filter
  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    if (!text) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(
      (d) =>
        (d.customerName && d.customerName.toLowerCase().includes(text)) ||
        (d.vendorName && d.vendorName.toLowerCase().includes(text)) ||
        (d.gymName && d.gymName.toLowerCase().includes(text)) ||
        (d.review && d.review.toLowerCase().includes(text))
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  // Render stars
  const renderStars = (rating) => {
    const max = 5;
    const stars = [];
    for (let i = 1; i <= max; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "rating-star filled" : "rating-star"}
          aria-hidden
        >
          ★
        </span>
      );
    }
    return (
      <span className="rating-stars">
        {stars} <span className="rating-value">({rating})</span>
      </span>
    );
  };

  const columns = [
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Gym Name", dataIndex: "gymName", key: "gymName" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (val) => renderStars(val),
    },
    { title: "Review", dataIndex: "review", key: "review" },
  ];

  return (
    <div className="gym-rating-admin-container">
      {/* Search bar */}
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

      {/* Export section */}
      <div className="revenue-page export-wrapper">
        <div className="export-section">
          <Button
            type="default"
            className="export-btn"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
          <div className="timeframe-select">Last Week</div>
        </div>
      </div>

      {/* Table */}
      <div className="rating-page">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            className="rating-table"
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
