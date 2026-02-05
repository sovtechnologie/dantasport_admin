import React, { useState, useEffect } from "react";
import { Table, Input, Button, Spin, message, DatePicker } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVenueCouponReports } from "../../../../services/admin/ReportsAdmin/endpointApi";
import "../Stylesheets/ReportsAdmin/CoupanAdmin.css";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

const statusColors = {
  Active: "green",
  Deactive: "red",
};

export default function CouponAdmin() {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchCouponReports = async () => {
    try {
      setLoading(true);
      const res = await getVenueCouponReports();
      if (res?.status === 200 && Array.isArray(res.result)) {
        const rawData = res.result.map((item) => ({
          id: item.id,
          couponId: item.coupon_code,
          couponType: item.coupon_type,
          vendorName: item.vendor_name || "-",
          venueName: item.venue_name || "-",
          sport: item.sports ? item.sports.join(", ") : "-",
          date: new Date(item.created_at).toLocaleDateString(),
          status: item.status === 1 ? "Active" : "Deactive",
          usage: item.usage_count || 0,
        }));

        setData(rawData);
        setFilteredData(rawData);
      } else {
        message.error("Failed to fetch coupon reports");
      }
    } catch (err) {
      message.error("Something went wrong while fetching coupon reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponReports();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.couponId && item.couponId.toLowerCase().includes(text)) ||
          (item.couponType && item.couponType.toLowerCase().includes(text)) ||
          (item.vendorName && item.vendorName.toLowerCase().includes(text)) ||
          (item.venueName && item.venueName.toLowerCase().includes(text)) ||
          (item.sport && item.sport.toLowerCase().includes(text))
      );
    }
    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    { title: "Coupon ID", dataIndex: "couponId", key: "couponId",width:200 },
    { title: "Coupon Type", dataIndex: "couponType", key: "couponType",width:200  },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName",width:200  },
    { title: "Venue Name", dataIndex: "venueName", key: "venueName",width:400  },
    { title: "Sport", dataIndex: "sport", key: "sport",width:200  },
    { title: "Date", dataIndex: "date", key: "date",width:200  },
   {
  title: "Status",
  dataIndex: "status",
  key: "status",
  width: 200,
  render: (val) => (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 600,
        color: val === "Active" ? "#1f9254" : "#d32f2f",
        backgroundColor: val === "Active" ? "#e9f7ef" : "#fdecea",
        display: "inline-block",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      {val}
    </span>
  ),
},

    { title: "Usage", dataIndex: "usage", key: "usage",width:200 },
  ];

  return (
    <div className="coupon-admin-container">
      <SearchBox/>
      

      <div className="coupon-page">
       <ExportFilter/>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            className="coupon-table"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </div>
  );
}
