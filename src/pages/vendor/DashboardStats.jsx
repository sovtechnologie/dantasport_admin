import React from "react";
import {
  Row,
  Col,
  Card,
  ProgressBar,
  Container,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardStats = () => {
  // Donut chart data
  const bookingData = [
    { name: "Total Bookings", value: 54, color: "#007bff" },
    { name: "Total Refunds", value: 20, color: "#ff9800" },
    { name: "Total Cancellation", value: 26, color: "#f44336" },
  ];

  // Rating distribution data
  const ratingData = [
    { label: "Poor", value: 25, color: "#ff6384", bg: "#ffe4ea" },
    { label: "Fair", value: 29, color: "#ff9800", bg: "#ffeacb" },
    { label: "Good", value: 18, color: "#007bff", bg: "#dceaff" },
  ];

  return (
    <>
    <section>
        <Row>
      {/* ===== LEFT CARD (Bookings) ===== */}
      <Col className="col-6">
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title
              className="text-primary fw-semibold mb-3"
              style={{ fontSize: "16px" }}
            >
              Bookings
            </Card.Title>

            <Row>
              {/* Donut chart */}
              <Col sm={6}>
                <div style={{ width: "100%", height: 180 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={bookingData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                      >
                        {bookingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          background: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Col>

              {/* Legends */}
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {bookingData.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          marginRight: "8px",
                        }}
                      ></span>
                      {item.name}
                    </div>
                    <span
                      style={{
                        color:
                          item.name === "Total Cancellation"
                            ? "#f44336"
                            : item.name === "Total Refunds"
                            ? "#28a745"
                            : "#007bff",
                        fontWeight: "600",
                      }}
                    >
                      {item.value}%{" "}
                      {item.name === "Total Cancellation" ? "↓" : "↑"}
                    </span>
                  </div>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      {/* ===== RIGHT CARD (Rating Distribution) ===== */}
      <Col className="col-6">
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title
              className="text-primary fw-semibold mb-4"
              style={{ fontSize: "16px" }}
            >
              Rating Distribution
            </Card.Title>

            <Row className="mb-2">
              <Col xs={6}>
                <small className="fw-medium">Rating</small>
              </Col>
              <Col xs={6} className="text-end">
                <small className="fw-medium">Sales</small>
              </Col>
            </Row>

            {ratingData.map((item, i) => (
              <Row
                key={i}
                className="align-items-center mb-4"
                style={{ fontSize: "14px" }}
              >
                <Col xs={3}>{item.label}</Col>
                <Col xs={7}>
                  <ProgressBar
                    now={item.value}
                    style={{
                      height: "8px",
                      backgroundColor: item.bg,
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </ProgressBar>
                </Col>
                <Col xs={2} className="text-end">
                  <span
                    style={{
                      backgroundColor: item.bg,
                      color: item.color,
                      fontWeight: "600",
                      borderRadius: "8px",
                      padding: "3px 8px",
                      fontSize: "13px",
                    }}
                  >
                    {item.value}%
                  </span>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </section>
    </>
  );
};

export default DashboardStats;
