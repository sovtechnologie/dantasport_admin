import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message,DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getEventReviewReports } from "../../../../services/admin/EventReports/endpointApi";
import "../Stylesheets/EventReports/EventRating.css";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

export default function EventRatingAdminPage() {

   const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("All");

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getEventReviewReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const mappedData = res.result.map((item) => ({
          id: item.id,
          bookingId: item.booking_id,
          customerName: item.full_name,
          eventName: item.event_title,
          rating: Number(item.rating),
          review: item.comment,
          date: new Date(item.createdAt).toLocaleDateString(),
        }));

        setData(mappedData);
        setFilteredData(mappedData);

        const uniqueEvents = [...new Set(mappedData.map((d) => d.eventName))];
        setEvents(uniqueEvents);
      } else {
        message.error("Failed to fetch event review reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching event review reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (selectedEvent !== "All") {
      filtered = filtered.filter((item) => item.eventName === selectedEvent);
    }
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.customerName &&
            item.customerName.toLowerCase().includes(text)) ||
          (item.eventName && item.eventName.toLowerCase().includes(text)) ||
          (item.review && item.review.toLowerCase().includes(text)) ||
          (item.bookingId && String(item.bookingId).includes(text))
      );
    }
    setFilteredData(filtered);
  }, [selectedEvent, searchText, data]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "rating-star filled" : "rating-star"}
        >
          ★
        </span>
      );
    }
    return (
      <span className="rating-stars">
        {stars} ({rating})
      </span>
    );
  };

 const columns = [
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
    render: (text) => <span className="text-dark fw-500">{text}</span>,
  },
  {
    title: "Venue Name",
    dataIndex: "eventName",
    key: "eventName",
  },
  {
    title: "Venue ID",
    dataIndex: "bookingId",
    key: "bookingId",
    render: (id) => <span className="text-muted">#{id}</span>,
  },
  {
    title: "Sport",
    key: "sport",
    render: () => <span>Cricket</span>, // UI-only static (as shown in image)
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating) => (
      <div className="rating-ui">
        <span className="star">★</span>
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    title: "Reviews",
    dataIndex: "review",
    key: "review",
    render: (text) => (
      <span className="review-text">{text}</span>
    ),
  },
];


  return (
    <div className="rating-admin-container">
      <SearchBox/>

      <div className="rating-page">
        <ExportFilter/>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            className="rating-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
