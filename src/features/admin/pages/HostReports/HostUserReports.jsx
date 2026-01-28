import React, { useState } from "react";
import { Container, Table, Badge, Form } from "react-bootstrap";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

function HostUserReports() {
  const [hostReportData, setHostReportData] = useState([
    {
      hostName: "Satish Sahu",
      userno: "8429813814",
      totalGames: 42,
      completionRate: "88%",
      completeNumber: "100",
      cancelRate: "12%",
      cancelCount: "100",
      paidGameRatio: "76%",
      paidNumber: "100",
      revenue: "₹1,25,000",
      complaints: 2,
      noShowCount: 10,
      noShowParcentage: "100%",
      avgRating: 4.5,
      flag: "low-rating",
    },
    {
      hostName: "Rahul Verma",
      userno: "8429813814",
      totalGames: 30,
      completionRate: "65%",
      completeNumber: "100",
      cancelRate: "35%",
      cancelCount: "100",
      paidGameRatio: "40%",
      paidNumber: "100",
      revenue: "₹58,000",
      complaints: 6,
      noShowCount: 4,
      noShowParcentage: "100%",
      avgRating: 3.2,
      flag: "high-cancel",
    },
    {
      hostName: "Amit Singh",
      userno: "8429813814",
      totalGames: 55,
      completionRate: "92%",
      completeNumber: "100",
      cancelRate: "8%",
      cancelCount: "100",
      paidGameRatio: "90%",
      paidNumber: "100",
      revenue: "₹2,10,000",
      complaints: 0,
      noShowCount: 0,
      noShowParcentage: "100%",
      avgRating: 4.8,
      flag: "",
    },
  ]);

  const flagOptions = [
    { value: "", label: "— No Flag —" },
    { value: "high-cancel", label: "High cancellation host" },
    { value: "payment-dispute", label: "Payment dispute host" },
    { value: "low-rating", label: "Low rating host" },
  ];

  const thStyle = {
    color: "#1163C7",
    fontWeight: 600,
    background: "#fff",
    padding: "12px 14px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    fontSize: "16px",
  };

  const tdStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    fontSize: "14px",
  };

  const handleFlagChange = (index, value) => {
    const updatedData = [...hostReportData];
    updatedData[index].flag = value;
    setHostReportData(updatedData);
  };

  const getDropdownStyle = (flag) => {
    switch (flag) {
      case "high-cancel":
        return {
          backgroundColor: "#fef2f2",
          border: "1px solid #ef4444",
          color: "#b91c1c",
        };
      case "payment-dispute":
        return {
          backgroundColor: "#ebdb34",
          border: "1px solid #f59e0b",
          color: "#92400e",
        };
      case "low-rating":
        return {
          backgroundColor: "#e61c2c",
          border: "1px solid #9ca3af",
          color: "#fff",
        };
      default:
        return {
          backgroundColor: "#f9fafb",
          border: "1px solid #d1d5db",
          color: "#374151",
        };
    }
  };

  return (
    <>
      <Container>
        <SearchBox />

        <div
          className="bg-white p-3 rounded shadow-sm"
          style={{ overflowX: "auto", maxWidth: "1200px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontWeight: 600 }} className="mb-0">
              Host User Reports
            </h5>
            <ExportFilter />
          </div>

          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={thStyle}>User Name & Number</th>
                <th style={thStyle}>Total Games Hosted</th>
                <th style={thStyle}>Completion Rate</th>
                <th style={thStyle}>Cancel Rate</th>
                <th style={thStyle}>Paid Games Ratio %</th>
                <th style={thStyle}>Revenue Generated</th>
                <th style={thStyle}>Player Complaints</th>
                <th style={thStyle}>No-Show Count</th>
                <th style={thStyle}>Avg Rating</th>
                <th style={thStyle}>Admin Flags</th>
              </tr>
            </thead>

            <tbody>
              {hostReportData.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    {item.hostName}
                    <br />
                    <small className="text-muted">{item.userno}</small>
                  </td>
                  <td style={tdStyle}>{item.totalGames}</td>
                  <td style={tdStyle}>
                    {item.completionRate}
                    <br />
                    <small>{item.completeNumber}</small>
                  </td>
                  <td style={tdStyle}>
                    {item.cancelRate}
                    <br />
                    <small>{item.cancelCount}</small>
                  </td>
                  <td style={tdStyle}>
                    {item.paidGameRatio}
                    <br />
                    <small>{item.paidNumber}</small>
                  </td>
                  <td style={tdStyle}>{item.revenue}</td>
                  <td style={tdStyle}>{item.complaints}</td>
                  <td style={tdStyle}>
                    {item.noShowCount}
                    <br />
                    {item.noShowParcentage}
                  </td>
                  <td style={tdStyle}>⭐ {item.avgRating}</td>
                  <td style={tdStyle}>
                    <Form.Select
                      size="sm"
                      value={item.flag}
                      onChange={(e) => handleFlagChange(index, e.target.value)}
                      style={{
                        minWidth: "170px",
                        padding: "8px 12px",
                        fontSize: "13px",
                        fontWeight: 600,
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ...getDropdownStyle(item.flag),
                      }}
                      onFocus={(e) =>
                        (e.target.style.boxShadow =
                          "0 0 0 3px rgba(13,110,253,.25)")
                      }
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    >
                      {flagOptions.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default HostUserReports;
