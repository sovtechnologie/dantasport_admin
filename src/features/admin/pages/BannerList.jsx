import React, { useEffect, useState } from "react";
import { Table, Button, message, Image, Input, Select,DatePicker } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { fetchBannerList } from "../../../services/admin/Banners/endpointApi";
import dayjs from "dayjs";
import "./Stylesheets/BannerList.css";
import { useLocation, useNavigate } from "react-router-dom";
const { Option } = Select;

const Banners = () => {

  const { RangePicker } = DatePicker;
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/vendor")) {
      setActiveTab("vendor");
    } else {
      setActiveTab("admin");
    }
  }, [location.pathname]);

  useEffect(() => {
    getBanners(activeTab === "admin" ? 1 : 2);
  }, [activeTab]);

  const getBanners = async (type) => {
    try {
      setLoading(true);
      const res = await fetchBannerList({ payload: { type } });
      setBanners(res?.result || []);
    } catch (error) {
      message.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    navigate(`/admin/banners/edit/${record.id}`);
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "valid_from",
      key: "valid_from",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "End Date",
      dataIndex: "valid_to",
      key: "valid_to",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (loc) => {
        if (!loc) return "-";

        // Agar stringified array aa gaya hai
        if (
          typeof loc === "string" &&
          loc.startsWith("[") &&
          loc.endsWith("]")
        ) {
          try {
            const arr = JSON.parse(loc);
            return Array.isArray(arr) ? arr.join(", ") : loc;
          } catch {
            return loc; // agar parse na ho to as it is show karo
          }
        }

        // Agar array hi hai
        if (Array.isArray(loc)) {
          return loc.join(", ");
        }

        // Agar already string
        return loc;
      },
    },
    { title: "Link To Redirect", dataIndex: "url", key: "url" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (st) => (st === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Banner Image",
      dataIndex: "banner_image",
      key: "banner_image",
      render: (img) =>
        img ? <Image src={img} alt="banner" width={100} /> : "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="search-bar-container">
        <div className="filter-section">
          <div className="filter-item">
            <Input
              placeholder="Search by Anything"
              prefix={<SearchOutlined />}
              className="search-input-field"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <Button type="primary" className="search-btn">
          SEARCH
        </Button>
      </div>
      <div className="bookings-page">
         <div className="export-section">
                    <Button
                      type="default"
                      className="export-btn"
                      icon={<DownloadOutlined />}
        
                    >
                      Export
                    </Button>
                    <RangePicker
                      format="YYYY-MM-DD"
                      onChange={(dates) => setDateRange(dates || [])}
                      allowClear
                      style={{ marginLeft: 10 }}
                      className="datepiker"
                    />
                  </div>
        {/* 🔹 Tabs */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "10px" ,marginTop: "40px", justifyContent:"space-between" }}>
          <div
            onClick={() => setActiveTab("admin")}
            style={{
              cursor: "pointer",
              paddingBottom: "5px",
              color: activeTab === "admin" ? "#1677ff" : "#555",
              borderBottom:
                activeTab === "admin" ? "2px solid #1677ff" : "none",
              fontWeight: activeTab === "admin" ? "bold" : "normal",
            }}
          >
            Admin
          </div>
          <div
            onClick={() => setActiveTab("vendor")}
            style={{
              cursor: "pointer",
              paddingBottom: "5px",
              color: activeTab === "vendor" ? "#1677ff" : "#555",
              borderBottom:
                activeTab === "vendor" ? "2px solid #1677ff" : "none",
              fontWeight: activeTab === "vendor" ? "bold" : "normal",
            }}
          >
            Vendor
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              marginLeft: "70%",
            }}
          >
            <Button
              type="primary"
              onClick={() =>
                navigate(
                  activeTab === "admin"
                    ? "/admin/banners/home"
                    : "/admin/banners/vendorBanner"
                )
              }
            >
             + Add Banner
            </Button>
          </div>
        </div>

        {/* 🔹 Export Section */}

        <Table
          rowKey="id"
          dataSource={banners}
          columns={columns}
          loading={loading}
          bordered
        />
      </div>
    </>
  );
};

export default Banners;
