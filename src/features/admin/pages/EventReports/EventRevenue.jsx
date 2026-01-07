import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, message,DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/EventReports/EventRevenue.css";
import { getEventRevenueReports } from "../../../../services/admin/EventReports/endpointApi";

const { Option } = Select;

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function EventRevenueAdminPage() {

   const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("All");

  const fetchRevenueReports = async () => {
    try {
      setLoading(true);
      const res = await getEventRevenueReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => ({
          id: item.id,
          txnId: item.transaction_id,
          eventId: item.eventId,
          eventName: item.event_name,
          vendorName: item.vendor_name || "-",
          customer: item.customer_name,
          bookingId: item.booking_id,
          amount: item.amount,
          bookingDate: new Date(item.created_at).toLocaleDateString(),
          status: item.status === 1 ? "Active" : "Deactive",
        }));

        setData(rawData);
        setFilteredData(rawData);

        const uniqueEvents = [...new Set(rawData.map((d) => d.eventName))];
        setEvents(uniqueEvents);
      } else {
        message.error("Failed to fetch event revenue reports");
      }
    } catch (err) {
      message.error(
        "Something went wrong while fetching event revenue reports"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueReports();
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
          (item.txnId && item.txnId.toLowerCase().includes(text)) ||
          (item.vendorName && item.vendorName.toLowerCase().includes(text)) ||
          (item.customer && item.customer.toLowerCase().includes(text)) ||
          (item.bookingId && String(item.bookingId).includes(text))
      );
    }

    setFilteredData(filtered);
  }, [selectedEvent, searchText, data]);

  const columns = [
    { title: "Txn ID", dataIndex: "txnId", key: "txnId" },
    {
      title: (
        <Select
          value={selectedEvent}
          onChange={setSelectedEvent}
          className="dropdown-event"
          showSearch
          placeholder="Select Event"
          optionFilterProp="children"
        >
          <Option value="All">All Events</Option>
          {events.map((e, idx) => (
            <Option key={idx} value={e}>
              {e}
            </Option>
          ))}
        </Select>
      ),
      dataIndex: "eventName",
      key: "eventName",
    },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Booking ID", dataIndex: "bookingId", key: "bookingId" },
    { title: "Date", dataIndex: "bookingDate", key: "bookingDate" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
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
  ];

  return (
    <div className="revenue-admin-container">
      {/* Search bar */}
      <div className="search-bar-container">
        <div className="filter-section">
          <div className="filter-item">
            <Input
              placeholder="Search by Txn ID / Vendor / Customer / Booking ID"
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

      {/* Export + timeframe */}
      <div className="revenue-page">
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
            className="revenue-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
