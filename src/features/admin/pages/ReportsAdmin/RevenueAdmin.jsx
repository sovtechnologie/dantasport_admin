import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { getVenueRevenueReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import "../Stylesheets/ReportsAdmin/RevenueAdmin.css";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const statusClass = {
  Completed: "status-completed",
  Upcoming: "status-upcoming",
  Canceled: "status-canceled",
  Active: "status-completed",
  Deactive: "status-canceled",
};

export default function RevenueAdmin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchRevenueReports = async () => {
    try {
      setLoading(true);
      const res = await getVenueRevenueReports();

      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => ({
          id: item.id,
          txnId: item.transaction_id,
          vendorName: item.vendorName || "—",
          venueName: item.venue_name,
          customer: item.full_name,
          bookingId: item.booking_id,
          bookingDate: new Date(item.created_at).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: item.amount,
          status:
            item.status === 1
              ? "Completed"
              : item.status === 2
              ? "Upcoming"
              : "Canceled",
        }));

        setData(rawData);
        setFilteredData(rawData);
      } else {
        message.error("Failed to fetch revenue reports");
      }
    } catch (err) {
      message.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueReports();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchText) {
      setFilteredData(data);
      return;
    }

    const text = searchText.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.txnId?.toLowerCase().includes(text) ||
        item.venueName?.toLowerCase().includes(text) ||
        item.vendorName?.toLowerCase().includes(text) ||
        item.customer?.toLowerCase().includes(text) ||
        String(item.bookingId).includes(text)
    );

    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    { title: "Txn. ID", dataIndex: "txnId" },
    { title: "Vendor Name", dataIndex: "vendorName" },
    { title: "Venue Name", dataIndex: "venueName" },
    { title: "Customer Name & Num", dataIndex: "customer" },
    { title: "Booking ID", dataIndex: "bookingId" },
    { title: "Date", dataIndex: "bookingDate" },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (val) => <span className="amount-text">₹{val}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => (
        <span className={`status-badge ${statusClass[val]}`}>
          {val}
        </span>
      ),
    },
  ];

  return (
    <>
      <SearchBox setSearchText={setSearchText} />

      <div className="revenue-page">
        <ExportFilter />

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 7 }}
            className="revenue-table"
          />
        </Spin>
      </div>
    </>
  );
}
