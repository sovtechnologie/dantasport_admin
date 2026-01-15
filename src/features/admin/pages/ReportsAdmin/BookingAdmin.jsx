import React, { useState, useEffect } from "react";
import { Table, Select, Spin, message, DatePicker } from "antd";
import { getVenueBookingReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import { fetchVendorList } from "../../../../services/admin/CreateVendor/endpointApi";
import "../Stylesheets/ReportsAdmin/BookinAdmin.css";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const { Option } = Select;
const { RangePicker } = DatePicker;

/* ---------- STATUS UI CONFIG ---------- */
const statusLabels = {
  0: "Upcoming",
  1: "Complete",
  2: "Cancel",
};

const statusConfig = {
  Upcoming: { color: "#2f80ed", bg: "#eaf2ff" },
  Complete: { color: "#27ae60", bg: "#eafaf1" },
  Cancel: { color: "#eb5757", bg: "#fdecec" },
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
  const [dateRange, setDateRange] = useState([]);

  /* ---------- FETCH VENDORS ---------- */
  const fetchVendors = async () => {
    try {
      const res = await fetchVendorList();
      if (res?.result) {
        const vendorList = res.result.map((v) => ({
          id: Number(v.id),
          name: v.full_name,
        }));
        setVendors(vendorList);
        return vendorList;
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  /* ---------- FETCH REPORTS ---------- */
  const fetchReports = async (vendorList) => {
    try {
      setLoading(true);
      const res = await getVenueBookingReports();

      if (res?.status === 200 && Array.isArray(res.result)) {
        const mapped = res.result.map((item) => {
          const vendor = vendorList.find(
            (v) => Number(v.id) === Number(item.user_id)
          );

          return {
            id: item.id,
            bookingId: `#${item.id}`,
            vendorId: vendor?.id || null,
            vendorName: vendor?.name || item.full_name,
            venueId: item.venue_id,
            venueName: item.venue_name,
            sports: item.sports_name,
            customer: item.full_name,
            mobile: item.mobile_number,
            bookingDate: new Date(item.created_at).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
            eventDate: new Date(item.date).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
            eventDateRaw: new Date(item.date),
            duration: `${item.duration} mins`,
            status: statusLabels[item.status],
          };
        });

        setData(mapped);
        setFilteredData(mapped);

        const uniqueVenues = Array.from(
          new Map(mapped.map((d) => [d.venueId, d.venueName]))
        ).map(([id, name]) => ({ id, name }));

        setVenues(uniqueVenues);
      } else {
        message.error("Failed to fetch booking reports");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchVendors().then((vendorList) => fetchReports(vendorList));
  }, []);

  /* ---------- FILTER LOGIC ---------- */
  useEffect(() => {
    let filtered = data;

    if (selectedVendor !== "All") {
      filtered = filtered.filter(
        (item) => item.vendorId === Number(selectedVendor)
      );
    }

    if (selectedVenue !== "All") {
      filtered = filtered.filter(
        (item) => item.venueName === selectedVenue
      );
    }

    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.customer?.toLowerCase().includes(text) ||
          item.venueName?.toLowerCase().includes(text) ||
          item.sports?.toLowerCase().includes(text)
      );
    }

    if (dateRange?.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter(
        (item) =>
          item.eventDateRaw >= start.startOf("day").toDate() &&
          item.eventDateRaw <= end.endOf("day").toDate()
      );
    }

    setFilteredData(filtered);
  }, [selectedVendor, selectedVenue, searchText, dateRange, data]);

  /* ---------- TABLE COLUMNS (NEW DESIGN) ---------- */
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
     render: (val) => (
  <span style={{ fontWeight: 400 }}>
    {val}
  </span>
),

    },
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
    },
    {
      title: "Sport",
      dataIndex: "sports",
      key: "sports",
    },
    {
      title: "Customer Name",
      key: "customer",
      render: (_, record) => (
     <div>
  <div>{record.customer}</div>
  <div className="fs-12 text-muted">
    {record.mobile}
  </div>
</div>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const s = statusConfig[status] || {};
        return (
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              color: s.color,
              background: s.bg,
              display: "inline-block",
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  /* ---------- JSX ---------- */
  return (
    <>
      <SearchBox onSearch={setSearchText} />

      <div className="bookings-page">
        <ExportFilter onDateChange={setDateRange} />

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="bookings-table"
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </>
  );
}
