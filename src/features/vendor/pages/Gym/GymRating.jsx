import React, { useEffect, useState } from "react";
import { Table, Button, Select, Spin, message, Rate } from "antd";
import { useSelector } from "react-redux";
import "../../styelsheets/Manage/GymRevenue.css";
import { getGymRatingList } from "../../../../services/vendor/gym/endpointApi";
import dayjs from "dayjs";

const GymRating = () => {
  const [loading, setLoading] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [filter, setFilter] = useState("Last Week");
  const vendor = useSelector((state) => state.vendor);

  useEffect(() => {
    fetchRatings();
  }, [filter]);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const res = await getGymRatingList({
        vendor_id: vendor?.id,
        filter: filter,
      });
      if (res?.status === 200) {
        setRatingData(res?.result || []);
      } else {
        message.error(res?.message || "Failed to load ratings");
      }
    } catch (err) {
      message.error("Something went wrong while fetching ratings");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Gym Name",
      dataIndex: "gym_name",
      key: "gym_name",
    },
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      key: "booking_id",
      render: (id) => `#${id}`,
    },
    {
      title: "Item Type",
      dataIndex: "item_type",
      key: "item_type",
      render: (type) => type?.toUpperCase() || "-",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rate) => <Rate disabled defaultValue={Number(rate)} />,
    },
    {
      title: "Review",
      dataIndex: "comment",
      key: "comment",
      render: (text) =>
        text && text.length > 70 ? text.substring(0, 70) + "..." : text,
    },
    {
      title: "Review Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD MMM YYYY, hh:mm A"),
    },
  ];

  return (
    <div className="gym-revenue-container">
      <div className="header-section">
        <h2>Gym Ratings</h2>
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
            onClick={() => message.info("Exporting ratings...")}
          >
            Export
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={ratingData}
          pagination={{ pageSize: 8 }}
          rowKey="id"
          bordered
        />
      </Spin>
    </div>
  );
};

export default GymRating;
