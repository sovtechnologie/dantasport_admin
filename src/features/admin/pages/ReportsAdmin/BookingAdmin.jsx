import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVenueBookingReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import { fetchVendorList } from "../../../../services/admin/CreateVendor/endpointApi";
import "../Stylesheets/ReportsAdmin/BookinAdmin.css";

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

export default function BookingAdminPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [searchText, setSearchText] = useState("");

  const fetchVendors = async () => {
    try {
      const res = await fetchVendorList();
      if (res?.result && Array.isArray(res.result)) {
        const vendorOptions = res.result.map((v) => ({
          id: Number(v.id), // ensure number type
          name: v.full_name,
        }));
        setVendors(vendorOptions);
        return vendorOptions;
      }
      return [];
    } catch (err) {
      console.error("Error fetching vendors", err);
      return [];
    }
  };

  const fetchReports = async (vendorList) => {
    try {
      setLoading(true);
      const res = await getVenueBookingReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => {
          const vendor = vendorList.find(
            (v) => Number(v.id) === Number(item.user_id)
          );
          return {
            id: item.id,
            vendorId: vendor ? vendor.id : null,
            vendorName: vendor ? vendor.name : item.full_name,
            bookingId: item.id,
            venueName: item.venue_name,
            sports: item.sports_name,
            customer: item.full_name,
            bookingDate: new Date(item.created_at).toLocaleDateString(),
            eventDate: new Date(item.date).toLocaleDateString(),
            duration: `${item.duration} mins`,
            status: statusLabels[item.status] || "Unknown",
          };
        });

        setData(rawData);
        setFilteredData(rawData);

        const uniqueVenues = [...new Set(rawData.map((d) => d.venueName))];
        setVenues(uniqueVenues);
      } else {
        message.error("Failed to fetch booking reports");
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

    // Vendor filter only if specific vendor selected
    if (selectedVendor !== "All") {
      filtered = filtered.filter(
        (item) => item.vendorId === Number(selectedVendor)
      );
    }

    // Venue filter
    if (selectedVenue !== "All") {
      filtered = filtered.filter((item) => item.venueName === selectedVenue);
    }

    // Search filter
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.customer && item.customer.toLowerCase().includes(text)) ||
          (item.sports && item.sports.toLowerCase().includes(text)) ||
          (item.venueName && item.venueName.toLowerCase().includes(text)) ||
          (item.vendorName && item.vendorName.toLowerCase().includes(text))
      );
    }

    setFilteredData(filtered);
  }, [selectedVendor, selectedVenue, data, searchText]);

  const columns = [
    {
      title: (
        <Select
          value={selectedVendor}
          onChange={(val) => setSelectedVendor(val)}
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
          value={selectedVenue}
          onChange={(val) => setSelectedVenue(val)}
          className="dropdown-venue"
          showSearch
          placeholder="Select Venue"
          optionFilterProp="children"
        >
          <Option value="All">All Venues</Option>
          {venues.map((v) => (
            <Option key={v} value={v}>
              {v}
            </Option>
          ))}
        </Select>
      ),
      dataIndex: "venueName",
      key: "venueName",
    },
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    { title: "Sports", dataIndex: "sports", key: "sports" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" },
    { title: "Event Date", dataIndex: "eventDate", key: "eventDate" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
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
              placeholder="Search by Anything"
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
          <Select defaultValue="Last Week">
            {["Last Week", "Last Month", "This Year"].map((v) => (
              <Option key={v} value={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record.id}
            className="bookings-table"
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </>
  );
}
