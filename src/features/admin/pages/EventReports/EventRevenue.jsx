import React, { useState, useEffect } from "react";
import { Table, Select, Spin, message } from "antd";
import dayjs from "dayjs";

import "../Stylesheets/EventReports/EventRevenue.css";
import { getEventRevenueReports } from "../../../../services/admin/EventReports/endpointApi";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const { Option } = Select;

/* ---------------- HELPERS (UI ONLY) ---------------- */

const formatDateTime = (date) =>
  date ? dayjs(date).format("DD MMM, hh:mm A") : "-";

const formatAmount = (amt) => `₹${amt}`;

const statusMap = {
  0: "Canceled",
  1: "Completed",
  2: "Upcoming",
};

/* ---------------- COMPONENT ---------------- */

export default function EventRevenueAdminPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("All");

  /* ---------------- FETCH API (UNCHANGED) ---------------- */

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
          bookingId: `#${item.booking_id}`,
          amount: formatAmount(item.amount),
          bookingDate: formatDateTime(item.created_at),
          status: statusMap[item.status] || "Completed",
        }));

        setData(rawData);
        setFilteredData(rawData);

        const uniqueEvents = [...new Set(rawData.map((d) => d.eventName))];
        setEvents(uniqueEvents);
      } else {
        message.error("Failed to fetch event revenue reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching revenue reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueReports();
  }, []);

  /* ---------------- FILTER LOGIC (UNCHANGED) ---------------- */

  useEffect(() => {
    let filtered = [...data];

    if (selectedEvent !== "All") {
      filtered = filtered.filter(
        (item) => item.eventName === selectedEvent
      );
    }

    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.txnId?.toLowerCase().includes(text) ||
          item.vendorName?.toLowerCase().includes(text) ||
          item.customer?.toLowerCase().includes(text) ||
          item.bookingId?.includes(text)
      );
    }

    setFilteredData(filtered);
  }, [selectedEvent, searchText, data]);

  /* ---------------- TABLE COLUMNS (UI MATCH) ---------------- */

const columns = [
  {
    title: "Txn. ID",
    dataIndex: "txnId",
    width: 220,
    ellipsis: true,
    render: (val) => <span>{val}</span>,
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
    width: 220,
    ellipsis: true,
  },
  {
    title: "Venue Name",
    dataIndex: "eventName",
    width: 300,
    ellipsis: true,
  },
  {
    title: "Customer Name",
    dataIndex: "customer",
    width: 220,
    ellipsis: true,
  },
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Date",
    dataIndex: "bookingDate",
    width: 220,
    ellipsis: true,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 200,
    ellipsis: true,
    render: (status) => {
      let cls = "";
      if (status === "Completed") cls = "status-completed";
      if (status === "Upcoming") cls = "status-upcoming";
      if (status === "Canceled") cls = "status-canceled";

      return (
        <span className={`status-pill rounded ${cls}`}>
          {status}
        </span>
      );
    },
  },
];


  /* ---------------- RENDER ---------------- */

  return (
    <div className="revenue-admin-container">
      <SearchBox onSearch={setSearchText} />

      <div className="revenue-page">
        <ExportFilter />

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
