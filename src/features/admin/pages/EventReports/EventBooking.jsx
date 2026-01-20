import React, { useState, useEffect } from "react";
import { Table, Select, Spin, message } from "antd";
import dayjs from "dayjs";

import "../Stylesheets/EventReports/EventBooking.css";
import { fetchVendorList } from "../../../../services/admin/CreateVendor/endpointApi";
import { getEventBookingReports } from "../../../../services/admin/EventReports/endpointApi";

import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const { Option } = Select;

/* ---------------- HELPERS ---------------- */

const formatDateTime = (date) =>
  date ? dayjs(date).format("DD MMM, hh:mm A") : "-";

const maskMobile = (mobile) =>
  mobile ? mobile.slice(0, 6) + "****" : "";

const statusMap = {
  0: "Upcoming",
  1: "Completed",
  2: "Canceled",
};

/* ---------------- COMPONENT ---------------- */

export default function EventBookingAdminPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);

  const [selectedVendor, setSelectedVendor] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [searchText, setSearchText] = useState("");

  /* ---------------- FETCH VENDORS ---------------- */

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

  /* ---------------- FETCH REPORTS ---------------- */

  const fetchReports = async (vendorList) => {
    try {
      setLoading(true);
      const res = await getEventBookingReports();

      if (res?.status === 200 && Array.isArray(res.result)) {
        const mappedData = res.result.map((item) => {
          const vendor = vendorList.find(
            (v) => Number(v.id) === Number(item.vendorId)
          );

          return {
            key: item.booking_id,
            bookingId: `#${item.booking_id}`,
            vendorId: item.vendorId,
            vendorName: vendor ? vendor.name : item.full_name,
            eventId: item.eventId,
            eventName: item.event_name,
            eventType: item.event_type,
            customerName: item.full_name,
            customerMobile: maskMobile(item.mobile),
            bookingDate: formatDateTime(item.created_at),
            eventDate: formatDateTime(item.event_date),
            duration: `${item.duration || 2} hours`,
            status: statusMap[item.status],
          };
        });

        setData(mappedData);
        setFilteredData(mappedData);

        const uniqueEvents = [
          ...new Set(mappedData.map((d) => d.eventName)),
        ];
        setEvents(uniqueEvents);
      } else {
        message.error("Failed to fetch booking reports");
      }
    } catch (err) {
      message.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    fetchVendors().then((vendorList) => fetchReports(vendorList));
  }, []);

  useEffect(() => {
    let filtered = [...data];

    if (selectedVendor !== "All") {
      filtered = filtered.filter(
        (item) => Number(item.vendorId) === Number(selectedVendor)
      );
    }

    if (selectedEvent !== "All") {
      filtered = filtered.filter(
        (item) => item.eventName === selectedEvent
      );
    }

    if (searchText) {
      const txt = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.customerName.toLowerCase().includes(txt) ||
          item.eventName.toLowerCase().includes(txt) ||
          item.vendorName.toLowerCase().includes(txt)
      );
    }

    setFilteredData(filtered);
  }, [selectedVendor, selectedEvent, searchText, data]);

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      render: (val) => <strong className="fw-light">{val}</strong>,
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
    },
    {
      title: "Customer Name",
      render: (_, row) => (
        <div>
          <div className="customer-name">{row.customerName}</div>
          <div className="customer-mobile">{row.customerMobile}</div>
        </div>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let cls = "";
        if (status === "Completed") cls = "status-completed";
        if (status === "Upcoming") cls = "status-upcoming";
        if (status === "Canceled") cls = "status-canceled";

        return (
          <span className={`status-pill ${cls}`}>
            {status}
          </span>
        );
      },
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <SearchBox onSearch={setSearchText} />

      <div className="bookings-page">
        <ExportFilter />

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </>
  );
}
