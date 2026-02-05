import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import dayjs from "dayjs";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";
import { getGymBookingReports } from "../../../../services/admin/GymReports/endpointApi";
import "../Stylesheets/GymReports/GymBooking.css";

const statusMap = {
  Completed: {
    bg: "#E6F9F0",
    color: "#22C55E",
  },
  Upcoming: {
    bg: "#EEF4FF",
    color: "#3B82F6",
  },
  Canceled: {
    bg: "#FFECEC",
    color: "#EF4444",
  },
};

export default function GymBookingAdminPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getGymBookingReports();

      if (res?.status === 200 && Array.isArray(res.result)) {
        const formatted = res.result.map((item) => ({
          id: item.id,
          bookingId: item.booking_id || "12548796",
          redeem: "2/10",
          gymName: item.gym_name || "Fitness Hub",
          customer: item.full_name || "Mihir Saha",
          userId: item.user_id || "123456",
          purchaseDate: dayjs(item.created_at).format(
            "DD MMM, hh:mm A"
          ),
          amount: item.amount || 500,
          status:
            item.status === 1
              ? "Completed"
              : item.status === 0
              ? "Upcoming"
              : "Canceled",
        }));

        setData(formatted);
      } else {
        message.error("Failed to load booking data");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      width: 160,
      render: (val) => <strong className="fw-light">#{val}</strong>,
    },
    {
      title: "Redeem Passes",
      dataIndex: "redeem",
      key: "redeem",
      width: 140,
    },
    {
      title: "Gym Name",
      dataIndex: "gymName",
      key: "gymName",
      width: 220,
    },
    {
      title: "User Details",
      key: "user",
      width: 220,
      render: (_, record) => (
        <div>
          <div className="user-name">{record.customer}</div>
          <div className="user-id">#{record.userId}</div>
        </div>
      ),
    },
    {
      title: "Date of Purchase",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (val) => `₹${val}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => (
        <span
          className="status-pill rounded"
          style={{
            backgroundColor: statusMap[status]?.bg,
            color: statusMap[status]?.color,
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <>
      <SearchBox />

      <div className="booking-page">
        <ExportFilter />

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{
              pageSize: 7,
              showSizeChanger: false,
            }}
            className="booking-table"
            tableLayout="fixed"
            scroll={{ x: "max-content" }}
          />
        </Spin>
      </div>
    </>
  );
}
