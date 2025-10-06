import React, { useEffect, useState } from "react";
import { Table, Button, Select, Spin, message } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "../../styelsheets/Manage/GymRevenue.css";
import { getGymRevenueGymList } from "../../../../services/vendor/gym/endpointApi";

const GymRevenue = () => {
  const [loading, setLoading] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [filter, setFilter] = useState("Last Week");
  const vendor = useSelector((state) => state.vendor);

  useEffect(() => {
    fetchRevenue();
  }, [filter]);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const res = await getGymRevenueGymList({
        vendor_id: vendor?.id,
        filter: filter,
      });

      console.log("Revenue Response:", res);

      if (res.status === 200) {
        setRevenueData(res.result || []);
      } else {
        message.error(res.message || "Failed to load revenue data");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while fetching revenue data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Txn. ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Gym Name",
      dataIndex: "gym_name",
      key: "gym_name",
    },
    {
      title: "Customer Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "Pass Name",
      dataIndex: "passes_name",
      key: "passes_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      key: "booking_id",
    },
    {
      title: "Date",
      dataIndex: "booking_date",
      key: "booking_date",
      render: (text) =>
        text ? dayjs(text).format("DD MMM YYYY, hh:mm A") : "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => `₹${amt}`,
    },
  ];

  return (
    <div className="gym-revenue-container">
      <div className="header-section">
        <h2>Gym Revenue Report</h2>
        <div className="actions">
          <Select
            value={filter}
            onChange={(val) => setFilter(val)}
            options={[
              { value: "Today", label: "Today" },
              { value: "This Week", label: "This Week" },
              { value: "Last Week", label: "Last Week" },
              { value: "This Month", label: "This Month" },
            ]}
            style={{ width: 150 }}
          />
          <Button
            type="primary"
            onClick={() => message.info("Exporting report...")}
          >
            Export
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={revenueData}
          pagination={{ pageSize: 8 }}
          rowKey="transaction_id"
          bordered
        />
      </Spin>
    </div>
  );
};

export default GymRevenue;
