import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVenueReviewReports } from "../../../../services/admin/ReportsAdmin/endpointApi"; // create this API or replace with your endpoint
import "../Stylesheets/ReportsAdmin/RatingAdmin.css";

export default function RatingAdmin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getVenueReviewReports(); 
      if (res?.status === 200 && Array.isArray(res.result)) {
        const mappedData = res.result.map((item) => ({
          id: item.id,
          customerName: item.full_name,
          vendorName: item.user_name || "N/A",
          venueName: item.venue_name,
          sport: item.sports_name,
          rating: item.rating,
          review: item.comment,
          date: new Date(item.createdAt).toLocaleDateString(),
          status: item.status,
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } else {
        message.error("Failed to fetch venue review reports");
      }
    } catch (err) {
      console.error("Error fetching venue review reports:", err);
      message.error("Something went wrong while fetching venue review reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Search filter (Customer / Vendor / Venue / Sport)
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
        (d.venueName && d.venueName.toLowerCase().includes(text)) ||
        (d.sport && d.sport.toLowerCase().includes(text)) ||
        (d.review && d.review.toLowerCase().includes(text))
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  // Render stars (filled yellow for rating, outline for rest up to 5)
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
    { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    { title: "Sport", dataIndex: "sport", key: "sport" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (val) => renderStars(val),
    },
    { title: "Review", dataIndex: "review", key: "review" },
  ];

  return (
    <div className="rating-admin-container">
      {/* Search bar (keeps same visual as booking) */}
      <div className="search-bar-container">
        <div className="filter-section">
          <div className="filter-item">
            <Input
              placeholder="Search by Customer / Vendor / Venue / Sport / Review"
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

      {/* Export + timeframe controls (right aligned like booking) */}
      <div className="revenue-page export-wrapper">
        <div className="export-section">
          <Button
            type="default"
            className="export-btn"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
          {/* keep timeframe dropdown look consistent with BookingAdmin (optional) */}
          <div className="timeframe-select">Last Week</div>
        </div>
      </div>

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
