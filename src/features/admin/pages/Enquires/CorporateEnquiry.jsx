import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Spin, Alert, message } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../Stylesheets/Enquires/CorporateEnquiry.css";
import {
  getBookingEnquires,
  updateEnquiryStatus,
} from "../../../../services/admin/Enquiryes/endpintApi";

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

// ✅ Numeric mapping for backend
const statusMapping = {
  "Not Connected": 1,
  "Connected(Not Interested)": 2,
  "Connected(Interested)": 3,
  "Follow-up": 4,
  "Closed Won": 5,
  "Closed Lost": 6,
  Disqualified: 7,
};

const subStatusMapping = {
  // Not Connected
  "Switched Off": 1,
  "Out of Coverage": 2,
  "Invalid Number": 3,
  "Number Busy": 4,
  "No Answer": 5,
  "Call Later/Callback Requested": 6,

  // Connected (Not Interested)
  Generic: 7,
  "Already Using Competitor": 8,
  "Not the Right Time": 9,
  "Not Relevant/Wrong Contact": 10,

  // Connected (Interested)
  "Send Details": 11,
  "Schedule Follow-up": 12,
  "Schedule Demo/Meeting": 13,
  "Wants to Discuss with Team": 14,
  "Ask to Call Letter": 15,

  // Follow-up
  "Follow-up Scheduled": 16,
  "Waiting for Client Response": 17,
  "Sent Proposal/Brochure": 18,

  // Closed Won
  onboarded: 19,

  // Closed Lost
  Lost: 20,
  "No Response": 21,
  "Not Interested After Demo": 22,
  "Pricing Too High": 23,
  "Chose Competior": 24,
  "Internal Reasons": 25,

  // Disqualified
  "Not Target Audience": 26,
  "Duplicate Entry": 27,
  "Fake Lead": 28,
};

export default function CorporateEnquiry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await getBookingEnquires();

        if (response?.status === 200 && Array.isArray(response?.result)) {
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
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching corporate enquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStatusChange = async (recordKey, newStatus) => {
    const updatedSubStatus = subStatusOptions[newStatus]?.[0] || "";

    setData((prev) =>
      prev.map((item) =>
        item.key === recordKey
          ? { ...item, status: newStatus, subStatus: updatedSubStatus }
          : item
      )
    );

    try {
      const res = await updateEnquiryStatus({
        enquiryId: recordKey,
        status: statusMapping[newStatus],
        subStatus: subStatusMapping[updatedSubStatus],
      });

      if (
        (res?.messsage === true || res?.message === true) &&
        res?.status === 200
      ) {
        alert("Status updated successfully");
      } else {
        alert("Failed to update status");
      }
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleSubStatusChange = async (recordKey, newSubStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.key === recordKey ? { ...item, subStatus: newSubStatus } : item
      )
    );

    try {
      const res = await updateEnquiryStatus({
        enquiryId: recordKey,
        subStatus: subStatusMapping[newSubStatus],
      });

      if (
        (res?.messsage === true || res?.message === true) &&
        res?.status === 200
      ) {
        alert(" Sub-Status updated successfully");
      } else {
        message.error("Failed to update status");
      }
    } catch {
      message.error("Failed to update sub-status");
    }
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
