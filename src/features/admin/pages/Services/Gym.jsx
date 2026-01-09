import React, { useEffect, useState } from "react";
import { Input, Button, Table, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Gym.css";
import { getUserTotalGymPassesAvailable } from "../../../../services/admin/ServicesAdmin/endpointApi";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBar from "../../../Component/SearchBar";
import SearchBox from "../../../Component/SearchBox";

const columns = [
  { title: "User Name", dataIndex: "name", key: "name" },
  { title: "User Id", dataIndex: "userId", key: "userId" },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Email ID", dataIndex: "email", key: "email" },
  { title: "Location", dataIndex: "venueLocation", key: "venueLocation" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <span
        className={`status-select ${
          record.status === "Active" ? "active" : "inactive"
        }`}
      >
        {record.status}
      </span>
    ),
  },
  {
    title: "Passes",
    dataIndex: "usedPasses",
    key: "passes",
    render: (_, record) => (
      <span className="gamePlayed">{record.usedPasses}</span>
    ),
  },
];

export default function GymPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getUserTotalGymPassesAvailable();

        if (res?.status === 200 && Array.isArray(res.result)) {
          const mappedData = res.result.map((item, index) => ({
            key: index,
            name: item.full_name || "N/A",
            userId: item.custom_id || item.id || "-",
            phoneNumber: item.mobile_number || "-",
            email: item.email || "-",
            venueLocation: "N/A",
            status: item.status === 1 ? "Active" : "Inactive",
            // boughtPasses: Number(item.total_quantity) || 0,
            usedPasses: Number(item.left_passes) || 0,
          }));
          setData(mappedData);
        }
      } catch (err) {
        console.error("Error fetching gym passes:", err);
        message.warning("Unable to fetch Gym Pass data at the moment.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     <SearchBox/>
      <ExportFilter/>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className="sports-table"
        />
      )}
    </>
  );
}
