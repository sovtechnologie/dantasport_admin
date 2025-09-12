import React, { useMemo, useState } from "react";
import { Table, Input, DatePicker, Select, Card, Badge, Typography, Tag, Spin } from "antd";
import { useSelector } from "react-redux";
import { useFetchGymBookingList } from "../../../../hooks/vendor/gym/useFetchGymBookingList";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const GymBooking = () => {
  const vendorId = useSelector((state) => state.auth.user?.id);

  const [search, setSearch] = useState("");
  const [venueId, setVenueId] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startDate = dateRange?.[0]?.startOf("day").toISOString();
  const endDate = dateRange?.[1]?.endOf("day").toISOString();

  const { data, isLoading, isFetching } = useFetchGymBookingList({
    vendorId,
    search,
    venueId,
    startDate,
    endDate,
    page,
    limit,
  });

  const dataSource = useMemo(() => {
    const rows = data?.result ?? [];
    return rows.map((row, idx) => ({
      key: row.booking_id ?? idx,
      bookingId: `#${row.booking_id}`,
      redeem: `${row.total_check_in}/${row.total_passes}`,
      gym: row.gym_name,
      user: `${row.full_name}\n${row.mobile_number}`,
      date: row.booking_date ? new Date(row.booking_date).toLocaleString("en-GB") : "",
      amount: `₹${Number(row.amount).toFixed(0)}`,
    }));
  }, [data?.result]);

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
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <Select
            allowClear
            placeholder="Select Venue"
            style={{ width: 200 }}
            onChange={(v) => {
              setPage(1);
              setVenueId(v ?? null);
            }}
            options={[]}
          />
          <RangePicker
            onChange={(rng) => {
              setPage(1);
              setDateRange(rng || []);
            }}
          />
          {isFetching && <Spin size="small" />}
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
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


