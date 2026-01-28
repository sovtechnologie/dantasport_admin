import React, { useState } from "react";
import { Container, Table, Badge, Form } from "react-bootstrap";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

function PlayUserReports() {
  const flagOptions = [
    { value: "", label: "— No Flag —" },
    { value: "high-cancel", label: "High cancellation host" },
    { value: "payment-dispute", label: "Payment dispute host" },
    { value: "low-rating", label: "Low rating host" },
  ];

  const [playUserData, setPlayUserData] = useState([
    {
      playerName: "Satish Sahu",
      totalGames: 38,
      completionRate: "90%",
      repeatParticipation: "72%",
      paidGameRatio: "80%",
      totalSpent: 12400,
      refundAmount: 600,
      hostComplaints: 1,
      noShowCount: 0,
      avgRating: 4.6,
      flag: "",
    },
    {
      playerName: "Rahul Verma",
      totalGames: 22,
      completionRate: "61%",
      repeatParticipation: "40%",
      paidGameRatio: "55%",
      totalSpent: 5200,
      refundAmount: 1200,
      hostComplaints: 5,
      noShowCount: 4,
      avgRating: 3.1,
      flag: "low-rating",
    },
    {
      playerName: "Amit Singh",
      totalGames: 47,
      completionRate: "95%",
      repeatParticipation: "88%",
      paidGameRatio: "92%",
      totalSpent: 19800,
      refundAmount: 0,
      hostComplaints: 0,
      noShowCount: 0,
      avgRating: 4.9,
      flag: "",
    },
  ]);

  const handleFlagChange = (index, value) => {
    const updatedData = [...playUserData];
    updatedData[index].flag = value;
    setPlayUserData(updatedData);
  };

  const thStyle = {
    color: "#1163C7",
    fontWeight: 600,
    background: "#fff",
    padding: "12px 14px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  };

  const tdStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
    fontSize: "14px",
    whiteSpace: "nowrap",
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
      <section>
        <Container>
          <SearchBox />

          <div
            className="bg-white p-3 rounded shadow-sm"
            style={{ overflowX: "auto", maxWidth: "1200px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ fontWeight: 600, margin: 0 }}>
                Play User Reports
              </h5>
              <ExportFilter />
            </div>

            <Table bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th style={thStyle}>Player Name</th>
                  <th style={thStyle}>Total Games Played</th>
                  <th style={thStyle}>Completion Rate</th>
                  <th style={thStyle}>Repeat Participation %</th>
                  <th style={thStyle}>Paid Games Ratio %</th>
                  <th style={thStyle}>Total Spent (₹)</th>
                  <th style={thStyle}>Refund Amount (₹)</th>
                  <th style={thStyle}>Host Complaints</th>
                  <th style={thStyle}>No-show Count</th>
                  <th style={thStyle}>Avg Rating</th>
                  <th style={thStyle}>Admin Flags</th>
                </tr>
              </thead>

              <tbody>
                {playUserData.map((item, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{item.playerName}</td>
                    <td style={tdStyle}>{item.totalGames}</td>
                    <td style={tdStyle}>{item.completionRate}</td>
                    <td style={tdStyle}>{item.repeatParticipation}</td>
                    <td style={tdStyle}>{item.paidGameRatio}</td>
                    <td style={tdStyle}>
                      {item.totalSpent.toLocaleString()}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          color:
                            item.refundAmount > 0
                              ? "#DC2626"
                              : "#16A34A",
                          fontWeight: 500,
                        }}
                      >
                        {item.refundAmount.toLocaleString()}
                      </span>
                    </td>
                    <td style={tdStyle}>{item.hostComplaints}</td>
                    <td style={tdStyle}>{item.noShowCount}</td>
                    <td style={tdStyle}>⭐ {item.avgRating}</td>

                    {/* ✅ FIXED Admin Flag Dropdown */}
                    <td style={tdStyle}>
                      <Form.Select
                        size="sm"
                        value={item.flag}
                        onChange={(e) =>
                          handleFlagChange(index, e.target.value)
                        }
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
      </section>
    </>
  );
}

export default PlayUserReports;
