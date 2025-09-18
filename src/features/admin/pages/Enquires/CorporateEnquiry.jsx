import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, Alert } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Enquires/CorporateEnquiry.css";
import { getBookingEnquires } from "../../../../services/admin/Enquiryes/endpintApi";

const { Option } = Select;

const subStatusOptions = {
  "Not Connected": [
    "Switched Off",
    "Out of Coverage",
    "Invalid Number",
    "Number Busy",
    "No Answer",
    "Call Later/Callback Requested",
  ],
  "Connected(Not Interested)": [
    "Generic",
    "Already Using Competitor",
    "Not the Right Time",
    "Not Relevant/Wrong Contact",
  ],
  "Connected(Interested)": [
    "Send Details",
    "Schedule Follow-up",
    "Schedule Demo/Meeting",
    "Wants to Discuss with Team",
    "Ask to Call Letter",
  ],
  "Follow-up": [
    "Follow-up Scheduled",
    "Waiting for Client Response",
    "Sent Proposal/Brochure",
  ],
  "Closed Won": ["onboarded"],
  "Closed Lost": [
    "Lost",
    "No Response",
    "Not Interested After Demo",
    "Pricing Too High",
    "Chose Competior",
    "Internal Reasons",
  ],
  Disqualified: ["Not Target Audience", "Duplicate Entry", "Fake Lead"],
};

export default function CorporateEnquiry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await getBookingEnquires();

        if (!response || !Array.isArray(response?.result)) {
          throw new Error("Invalid API response");
        }

        const formattedData = response.result.map((item, index) => ({
          key: item.enquiry_id || index,
          companyName: item.organization_name || "N/A",
          phoneNumber: item.mobile_number || "N/A",
          email: item.email || "N/A",
          location: item.booking_type === "1" ? "Corporate" : "Individual",
          remark: item.message || "",
          status: item.status || "Not Connected",
          subStatus: "Switched Off",
        }));

        setData(formattedData);
      } catch (err) {
        console.error("Error fetching corporate enquiries:", err);
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStatusChange = (recordKey, newStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.key === recordKey
          ? {
              ...item,
              status: newStatus,
              subStatus: subStatusOptions[newStatus]?.[0] || "",
            }
          : item
      )
    );
  };

  const handleSubStatusChange = (recordKey, newSubStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.key === recordKey ? { ...item, subStatus: newSubStatus } : item
      )
    );
  };

  const columns = [
    {
      title: <span className="corporate-header-blue">Organization Name</span>,
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => <span className="corporate-blue-text">{text}</span>,
    },
    {
      title: <span className="corporate-header-blue">Phone Number</span>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <span className="corporate-blue-text">{text}</span>,
    },
    {
      title: <span className="corporate-header-blue">Email ID</span>,
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="corporate-blue-text">{text}</span>,
    },
    {
      title: <span className="corporate-header-blue">Location</span>,
      dataIndex: "location",
      key: "location",
    },
    {
      title: <span className="corporate-header-blue">Remark</span>,
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: <span className="corporate-header-blue">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (val, record) => (
        <Select
          value={val}
          onChange={(value) => handleStatusChange(record.key, value)}
          className="corporate-dropdown-status"
        >
          {Object.keys(subStatusOptions).map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: <span className="corporate-header-blue">Sub-Status</span>,
      dataIndex: "subStatus",
      key: "subStatus",
      render: (val, record) => (
        <Select
          value={val}
          onChange={(value) => handleSubStatusChange(record.key, value)}
          className="corporate-dropdown-substatus"
        >
          {(subStatusOptions[record.status] || []).map((ss) => (
            <Option key={ss} value={ss}>
              {ss}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <>
      <div className="corporate-search-container">
        <div className="corporate-filter-box">
          <div className="corporate-filter-item">
            <Input
              placeholder="Search by Anything"
              prefix={<SearchOutlined />}
              className="corporate-search-input"
            />
          </div>
        </div>
        <Button type="primary" className="corporate-search-button">
          Search
        </Button>
      </div>

      <div className="corporate-enquiry-page">
        <div className="corporate-search-export-bar">
          <Button
            type="default"
            className="corporate-export-button"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
          <Select defaultValue="Last Week">
            {["Last Week", "Last Month", "This Year"].map((v) => (
              <Select.Option value={v} key={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "1rem" }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            rowKey="key"
            className="corporate-enquiry-table"
            scroll={{ x: true }}
          />
        )}
      </div>
    </>
  );
}
