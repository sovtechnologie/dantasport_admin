import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, message,DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";

import "../Stylesheets/EventReports/EventBooking.css";
import { fetchVendorList } from "../../../../services/admin/CreateVendor/endpointApi";
import { getEventBookingReports } from "../../../../services/admin/EventReports/endpointApi";

const { Option } = Select;

const statusColors = {
  Upcoming: "blue",
  Complete: "green",
  Cancel: "red",
};

const statusLabels = {
  0: "Upcoming",
  1: "Complete",
  2: "Cancel",
};

export default function EventBookingAdminPage() {


    const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Vendors fetch
  const fetchVendors = async () => {
    try {
      const res = await fetchVendorList();
      if (res?.result && Array.isArray(res.result)) {
        const vendorOptions = res.result.map((v) => ({
          id: Number(v.id),
          name: v.full_name,
        }));
        setVendors(vendorOptions);
        return vendorOptions;
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Event bookings fetch
  const fetchReports = async (vendorList) => {
    try {
      setLoading(true);
      const res = await getEventBookingReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => {
          const vendor = vendorList.find(
            (v) => Number(v.id) === Number(item.vendorId)
          );
          return {
            id: item.eventId + "-" + item.vendorId,
            vendorId: item.vendorId,
            vendorName: vendor ? vendor.name : item.full_name,
            eventId: item.eventId,
            eventName: item.event_name,
            customer: item.full_name,
            bookingDate: new Date(item.created_at).toLocaleDateString(),
            status: statusLabels[item.status] || "Unknown",
          };
        });
        setData(rawData);
        setFilteredData(rawData);
        const uniqueEvents = [...new Set(rawData.map((d) => d.eventName))];
        setEvents(uniqueEvents);
      } else {
        message.error("Failed to fetch event booking reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors().then((vendorList) => fetchReports(vendorList));
  }, []);

  useEffect(() => {
    let filtered = data;
    if (selectedVendor !== "All") {
      filtered = filtered.filter(
        (item) => item.vendorId === Number(selectedVendor)
      );
    }
    if (selectedEvent !== "All") {
      filtered = filtered.filter(
        (item) => item.eventId === Number(selectedEvent)
      );
    }
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.customer && item.customer.toLowerCase().includes(text)) ||
          (item.eventName && item.eventName.toLowerCase().includes(text)) ||
          (item.vendorName && item.vendorName.toLowerCase().includes(text))
      );
    }
    setFilteredData(filtered);
  }, [selectedVendor, selectedEvent, searchText, data]);

  const columns = [
    {
      title: (
        <Select
          value={selectedVendor}
          onChange={setSelectedVendor}
          className="dropdown-vendor"
          showSearch
          placeholder="Select Vendor"
          optionFilterProp="children"
        >
          <Option value="All">All Vendors</Option>
          {vendors.map((v) => (
            <Option key={v.id} value={v.id}>
              {v.name}
            </Option>
          ))}
        </Select>
      ),
      dataIndex: "vendorName",
      key: "vendorName",
    },
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
            <Option key={idx} value={idx + 1}>
              {e}
            </Option>
          ))}
        </Select>
      ),
      dataIndex: "eventName",
      key: "eventName",
    },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" },
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
    <>
      <div className="search-bar-container">
        <div className="filter-section">
          <div className="filter-item">
            <Input
              placeholder="Search by Customer / Vendor / Event"
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

      <div className="bookings-page">
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
            className="bookings-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </>
  );
}
