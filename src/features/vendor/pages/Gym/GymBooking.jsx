import React, { useMemo, useState, useEffect } from "react";
import { Table, Input, DatePicker, Select, Card, Spin } from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { getBookingGymList } from "../../../../services/vendor/gym/endpointApi";

const { RangePicker } = DatePicker;

const GymBooking = () => {
  const vendorId = useSelector((state) => state.auth.user?.id);

  const [search, setSearch] = useState("");
  const [venueId, setVenueId] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBookingGymList();
      setRows(res?.result || []);
    } catch (err) {
      console.error("Error fetching gym bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [vendorId]);

  const filteredData = useMemo(() => {
    let data = [...rows];

    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (row) =>
          row.full_name?.toLowerCase().includes(s) ||
          row.mobile_number?.toLowerCase().includes(s) ||
          String(row.booking_id)?.includes(s)
      );
    }

    // venue filter
    if (venueId) {
      data = data.filter((row) => String(row.gym_name) === String(venueId));
    }

    // date filter
    if (dateRange?.length === 2) {
      const start = dateRange[0].startOf("day");
      const end = dateRange[1].endOf("day");
      data = data.filter((row) => {
        const d = new Date(row.booking_date);
        return d >= start && d <= end;
      });
    }

    return data;
  }, [rows, search, venueId, dateRange]);

  // ✅ Table rows
  const dataSource = useMemo(() => {
    return filteredData.map((row, idx) => ({
      key: row.booking_id ?? idx,
      bookingId: `#${row.booking_id}`,
      redeem: `${row.total_check_in}/${row.total_passes}`,
      gym: row.gym_name,
      user: `${row.full_name} \n ${row.mobile_number}`,
      date: row.booking_date
        ? new Date(row.booking_date).toLocaleString("en-GB")
        : "",
      amount: `₹${Number(row.amount).toFixed(0)}`,
    }));
  }, [filteredData]);

  // ✅ Columns
  const columns = [
    { title: "Booking ID", dataIndex: "bookingId" },
    { title: "Redeem Passes", dataIndex: "redeem" },
    { title: "Gym Name", dataIndex: "gym" },
    { title: "User Details", dataIndex: "user" },
    { title: "Date of Purchase", dataIndex: "date" },
    { title: "Amount", dataIndex: "amount" },
  ];

  return (
    <div className="venue-card">
      <h3 className="venue-title">Reports</h3>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search by Booking ID or customer name"
            style={{ width: 320 }}
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <Select
            allowClear
            placeholder="Select Venue"
            style={{ width: 200 }}
            value={venueId}
            onChange={(v) => {
              setPage(1);
              setVenueId(v ?? null);
            }}
            // 👇 Gym list dynamic laa sakte ho rows se
            options={[...new Set(rows.map((r) => r.gym_name))].map((g) => ({
              label: g,
              value: g,
            }))}
          />
          <RangePicker
            onChange={(rng) => {
              setPage(1);
              setDateRange(rng || []);
            }}
          />
          {loading && <Spin size="small" />}
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total: dataSource.length,
          onChange: (p, ps) => {
            setPage(p);
            setLimit(ps);
          },
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default GymBooking;
