import React, { useEffect, useState } from "react";
import { Input, Button, Table, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Services/Coaching.css";
import { getCoachesOrAcademyDataByUsers } from "../../../../services/admin/ServicesAdmin/endpointApi";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBar from "../../../Component/SearchBar";
import SearchBox from "../../../Component/SearchBox";

const columns = [
  { title: "Coach Name", dataIndex: "name", key: "name" },
  { title: "Coach Id", dataIndex: "userId", key: "userId" },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Email ID", dataIndex: "email", key: "email" },
  { title: "Location", dataIndex: "venueLocation", key: "venueLocation" },
  { title: "Coach Type", dataIndex: "coachType", key: "coachType" },
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
    title: "Classes Attended",
    dataIndex: "countGames",
    key: "countGames",
    render: (text) => <span className="gamePlayed">{text}</span>,
  },
];

export default function CoachPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const res = await getCoachesOrAcademyDataByUsers();
        console.log("COACH API RESPONSE:", res);

        if (res?.status === 200 && Array.isArray(res.result)) {
          const mappedData = res.result.map((item, index) => ({
            key: index,
            name: item.full_name || "N/A",
            userId: item.custom_id || item.id || "-",
            phoneNumber: item.mobile_number || "-",
            email: item.email || "-",
            venueLocation: item.location || "N/A",
            coachType: item.type === 1 ? "Individual" : "Academy",
            status: item.status === 1 ? "Active" : "Inactive",
            countGames: Number(item.total_classes) || 0,
          }));
          console.log("MAPPED COACHES DATA:", mappedData);
          setData(mappedData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching coaches:", err);
        message.warning("Unable to fetch Coach data at the moment.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
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
