import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import dayjs from "dayjs";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";
import { getGymRevenueReports } from "../../../../services/admin/GymReports/endpointApi";
import "../Stylesheets/GymReports/GymRevenue.css";

const statusStyle = {
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

export default function GymRevenueAdminPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchRevenueReports = async () => {
    try {
      setLoading(true);
      const res = await getGymRevenueReports();

      if (res?.status === 200 && Array.isArray(res.result)) {
        const formattedData = res.result.map((item) => ({
          id: item.id,
          txnId: item.transaction_id || "105868743564",
          gymName: item.gym_name || "Sahil Khan",
          gymId: `#${item.gym_id || "123456"}`,
          customer: item.customer_name || "Mihir Saha",
          bookingId: `#${item.booking_id || "12548796"}`,
          date: dayjs(item.created_at).format("DD MMM, hh:mm A"),
          amount: item.amount || 2500,
          status:
            item.status === 1
              ? "Completed"
              : item.status === 0
              ? "Upcoming"
              : "Canceled",
        }));

        setData(formattedData);
      } else {
        message.error("Failed to load revenue reports");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueReports();
  }, []);

  const columns = [
    {
      title: "Txn. ID",
      dataIndex: "txnId",
      key: "txnId",
      width: 200,
    },
    {
      title: "Gym Name",
      dataIndex: "gymName",
      key: "gymName",
       width: 400,
    },
    {
      title: "Gym ID",
      dataIndex: "gymId",
      key: "gymId",
       width: 200,
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
       width: 200,
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
       width: 200,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
       width: 200,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
       width: 200,
      render: (val) => `₹${val}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
       width: 200,
      render: (status) => (
        <span
          className="status-pill rounded"
          style={{
            backgroundColor: statusStyle[status]?.bg,
            color: statusStyle[status]?.color,
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

      <div className="revenue-page">
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
            className="revenue-table"
          />
        </Spin>
      </div>
    </>
  );
}
