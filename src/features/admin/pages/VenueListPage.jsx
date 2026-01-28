import { Input, Select, Button, Table, Pagination, Spin, message } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import "./Stylesheets/VenueListPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchVenueList } from "../../../hooks/admin/CreateVenue/useFetchVenueList";
import { useUpdateVenueStatus } from "../../../hooks/admin/CreateVenue/useUpdateVenueStatus";
import SearchBox from "../../Component/SearchBox";

const { Option } = Select;

export default function VenuePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { data: venueList, isLoading, error } = useFetchVenueList();

  // status change
  const { mutate: venueStatus, isloading: statusloading } =
    useUpdateVenueStatus();

  // Map backend response to table data format
  useEffect(() => {
    if (venueList && venueList.result) {
      const mappedData = venueList.result.map((vendor, index) => ({
        key: vendor.id || index,
        vendorId: vendor.vendor_id || "N/A",
        venueId: vendor.id,
        name: vendor.full_name || "N/A",
        mobileNumber: vendor.mobile_number || "N/A",
        venueName: vendor.venue_name || "N/A",
        area: vendor.area || "N/A",
        city: vendor.city || "N/A",
        state: vendor.state || "N/A",
        fullAddress: vendor.full_address || "N/A",
        status: vendor.status === 1 ? "Active" : "Inactive",
      }));
      setData(mappedData);
    }
  }, [venueList]);

  const handleStatusChange = (record, status) => {
    venueStatus(
      { venueId: record.venueId, status: status === "Active" ? 1 : 0 },
      {
        onSuccess: () => {
          message.success("Venue status updated successfully");
          setData((prev) =>
            prev.map((item) =>
              item.key === record.key ? { ...item, status } : item
            )
          );
        },
        onError: () => {
          message.error("Failed to update venue status");
        },
      }
    );
  };

  const columns = [
    { title: "Vendor ID", dataIndex: "vendorId", key: "vendorId" },
    { title: "Vendor Name", dataIndex: "name", key: "name" },
    { title: "VenueId", dataIndex: "venueId", key: "venueId" },
    { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    {
      title: "Location",
      key: "location",
      render: (_, record) => `${record.area},${record.city}, ${record.state}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(val) => handleStatusChange(record, val)}
          className={`status-select ${
            text === "Active" ? "status-active" : "status-inactive"
          }`}
          style={{ width: 100 }}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined style={{ color: "#1163C7" }} />}
          onClick={() => navigate(`/admin/venues/edit-venue/${record.venueId}`)}
        />
      ),
    },
  ];
  const handleAddVendor = () => {
    // Logic to navigate to Add Vendor page
    navigate("/admin/venues/add-venue");
  };

  if (error) {
    return <div className="error">Error loading venues</div>;
  }

  return (
    <>
      <Spin spinning={isLoading} size="large">
        {/* <div className="search-container">
          <div className="filter-box">
            <div className="filter-item">
              <Input
                placeholder="Search by Anything"
                prefix={<SearchOutlined />}
                className="search-input"
              />
            </div>
          </div>
          <Button type="primary" className="search-button">
            SEARCH
          </Button>
        </div> */}
        <SearchBox/>

        <div className="venue-page-container">
          <div className="venue-header-form">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-venue-button"
              onClick={handleAddVendor}
            >
              Add Venue
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            className="venue-table"
            rowKey="key"
            scroll={{ x: true }}
          />
        </div>
      </Spin>
    </>
  );
}
