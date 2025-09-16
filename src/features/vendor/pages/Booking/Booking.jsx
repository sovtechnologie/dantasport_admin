import React, { useMemo, useState } from "react";
import { Card, Spin, Empty, Typography, Space, Select, Button, DatePicker, Table, Dropdown } from "antd";
import { CalendarOutlined, MoreOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useGetBookingDetails } from "../../../../hooks/vendor/booking/useGetBookingDetails";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchSportsByCategory } from "../../../../hooks/vendor/sports/useFetchSportsByCategory";
import "./Booking.css";

const { Text } = Typography;

const Booking = () => {
  const vendorId = useSelector((state) => state.auth.user?.id);
  const navigate = useNavigate();
  const [venueId, setVenueId] = useState(null);
  const [sportId, setSportId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { data: venueList, loading: venueLoading } = useFetchVendorVenueList();
  const { data: sportsData, loading: sportsLoading } = useFetchSportsByCategory(1);

  const { data, isLoading, isFetching } = useGetBookingDetails(sportId, venueId);

  const venues = useMemo(() => venueList?.resutl || [], [venueList]);
  const sports = useMemo(() => sportsData?.result || [], [sportsData]);

  const result = data?.result?.result;

  const formatTimeRange = (start, end) => {
    const to12h = (t) => {
      if (!t) return t;
      const [h, m] = t.split(":");
      const hours = Number(h);
      const suffix = hours >= 12 ? "PM" : "AM";
      const hour12 = ((hours + 11) % 12) + 1;
      return `${hour12.toString().padStart(2, '0')}:${m} ${suffix}`;
    };
    return `${to12h(start)} - ${to12h(end)}`;
  };

  const dataSource = useMemo(() => {
    if (!result?.slots) return [];
    return result.slots.map((slot) => {
      const totalCourts = result.total_courts ?? (slot.courts?.length || 0);
      const booked = (slot.courts || []).filter(c => c.booking_id || (c.status && String(c.status).toLowerCase() !== 'available')).length;
      const available = totalCourts - booked;
      return {
        key: `${slot.slot_start}-${slot.slot_end}`,
        time: formatTimeRange(slot.slot_start, slot.slot_end),
        totalCourts,
        booked,
        available,
      };
    });
  }, [result]);

  const handleCreateBooking = (slot) => {
    const payload = {
      courtIds: (slot?.courts || []).map(c => c.court_id).filter(Boolean),
      type: 2,
      startTime: slot.slot_start?.slice(0,5) + "0", // backend example uses 06:000
      endTime: slot.slot_end?.slice(0,5) + "0",
      date: selectedDate.format("YYYY-MM-DD"),
    };

    navigate('/vendor/manage/addcourt', {
      state: {
        availableCourtsPayload: payload,
        slot,
        context: {
          venueId,
          sportId,
        }
      }
    });
  };

  const columns = [
    {
      title: 'Time Slot',
      dataIndex: 'time',
      key: 'time',
      render: (text) => (
        <div className="booking-time-cell">{text}</div>
      )
    },
    {
      title: 'Total Courts',
      dataIndex: 'totalCourts',
      key: 'totalCourts',
      align: 'center',
      width: 140,
      render: (num) => <span className="pill neutral">{num}</span>
    },
    {
      title: 'Booked',
      dataIndex: 'booked',
      key: 'booked',
      align: 'center',
      width: 120,
      render: (num) => <span className="pill danger">{num}</span>
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      align: 'center',
      width: 130,
      render: (num) => <span className="pill success">{num}</span>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="action-cell">
          <Dropdown
            menu={{ items: [
              { key: 'create', label: 'Book court', onClick: () => {
                const slot = (result?.slots || []).find(s => `${s.slot_start}-${s.slot_end}` === record.key) || null;
                if (slot) handleCreateBooking(slot);
              } },
            ]}}
            trigger={["click"]}
          >
            <Button type="text" icon={<MoreOutlined />} className="action-btn" />
          </Dropdown>
        </div>
      )
    }
  ];

  return (
    <div className="venue-card">
      <div className="venue-toolbar booking-toolbar">
        <Space wrap>
          <Select
            placeholder="Select venue"
            loading={venueLoading}
            style={{ minWidth: 220 }}
            value={venueId}
            onChange={setVenueId}
            options={venues.map(v => ({ value: v.venue_id, label: v.venue_name }))}
          />
          <Select
            placeholder="Select sport"
            loading={sportsLoading}
            style={{ minWidth: 200 }}
            value={sportId}
            onChange={setSportId}
            options={sports.map(s => ({ value: s.id, label: s.sports_name }))}
          />
          <Button type="default" disabled={!venueId || !sportId || isFetching} onClick={() => { /* query auto-refetches by key */ }}>
            Refresh
          </Button>
        </Space>
      </div>

      

      <Card>
        {(isLoading || isFetching) && !result ? (
          <div className="page-loading-container"><Spin size="large" /></div>
        ) : !result ? (
          <Empty description="Select venue and sport to view slots" />
        ) : (
          <>
            <div className="booking-table-header">
              <Space>
                <CalendarOutlined />
                <Text>{formatTimeRange(result.start_time, result.end_time)}</Text>
              </Space>
              <DatePicker value={selectedDate} onChange={setSelectedDate} />
            </div>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              rowKey="key"
              className="booking-table"
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default Booking;


