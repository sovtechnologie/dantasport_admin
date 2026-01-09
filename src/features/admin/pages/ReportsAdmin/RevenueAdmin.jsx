import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, message,DatePicker  } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVenueRevenueReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import "../Stylesheets/ReportsAdmin/RevenueAdmin.css";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const { Option } = Select;
const { RangePicker } = DatePicker;
const statusColors = {
  Active: "green",
  Deactive: "red",
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
          venueName: item.venue_name,
          vendorName: item.vendorName,
          customer: item.full_name,
          bookingId: item.booking_id,
          amount: item.amount,
          bookingDate: new Date(item.created_at).toLocaleDateString(),
          status: item.status === 1 ? "Active" : "Deactive",
        }));

        setData(rawData);
        setFilteredData(rawData);
      } else {
        message.error("Failed to fetch revenue reports");
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

  // Search filter
  useEffect(() => {
    let filtered = data;
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.txnId && item.txnId.toLowerCase().includes(text)) ||
          (item.venueName && item.venueName.toLowerCase().includes(text)) ||
          (item.customer && item.customer.toLowerCase().includes(text)) ||
          (item.bookingId && String(item.bookingId).includes(text))
      );
    }
    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    { title: "Txn ID", dataIndex: "txnId", key: "txnId" },
    { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Customer Name & ID", dataIndex: "customer", key: "customer" },
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
    <>
      {/* Search bar */}
      <SearchBox/>
      {/* Table page */}
      <div className="revenue-page">
       
      <ExportFilter/>

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
    </>
  );
}
