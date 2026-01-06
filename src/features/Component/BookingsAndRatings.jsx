import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";

const bookingData = [
  { name: "Total Bookings", value: 54, color: "#2563EB" },
  { name: "Total Refunds", value: 20, color: "#FB923C" },
  { name: "Total Cancellation", value: 26, color: "#EF4444" },
];

const ratingData = [
  { label: "Poor", value: 25, color: "#EF4444" },
  { label: "Fair", value: 29, color: "#FB923C" },
  { label: "Good", value: 18, color: "#2563EB" },
  { label: "Excellent", value: 45, color: "#22C55E" },
];

export default function BookingsRatingCard() {
  return (
    <Container className="mt-4">
      <Row className="g-4">

        {/* BOOKINGS */}
        <Col lg={6}>
          <Card className="border-0 shadow" style={{ borderRadius: 16 }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold text-primary mb-0">Bookings</h6>
                <Dropdown>
                  <Dropdown.Toggle size="sm" variant="light" className="border">
                    Last Week
                  </Dropdown.Toggle>
                </Dropdown>
              </div>

              {/* Donut */}
              <div className="d-flex  mb-3">
                <PieChart width={180} height={180}>
                  <Pie
                    data={bookingData}
                    innerRadius={65}
                    outerRadius={85}
                    dataKey="value"
                    stroke="none"
                  >
                    {bookingData.map((item, index) => (
                      <Cell key={index} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              {/* Legend */}
              {bookingData.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <small>{item.name}</small>
                  </div>
                  <small className="fw-semibold">
                    {item.value}%{" "}
                    <span
                      style={{
                        color:
                          item.value >= 25 ? "#22C55E" : "#EF4444",
                      }}
                    >
                      {item.value >= 25 ? "↑" : "↓"}
                    </span>
                  </small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* RATING DISTRIBUTION */}
        <Col lg={6}>
          <Card className="border-0 shadow" style={{ borderRadius: 16 }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-semibold text-primary mb-0">
                  Rating Distribution
                </h6>
                <Dropdown>
                  <Dropdown.Toggle size="sm" variant="light" className="border">
                    Last Week
                  </Dropdown.Toggle>
                </Dropdown>
              </div>

              {/* Header Row */}
              <div className="d-flex justify-content-between mb-2 text-muted">
                <small>Rating</small>
                <small>Popularity</small>
                <small>Sales</small>
              </div>

              {ratingData.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <small style={{ width: "20%" }}>{item.label}</small>

                    {/* Bar */}
                    <div
                      style={{
                        width: "55%",
                        height: 6,
                        background: "#E5E7EB",
                        borderRadius: 4,
                      }}
                    >
                      <div
                        style={{
                          width: `${item.value}%`,
                          height: "100%",
                          backgroundColor: item.color,
                          borderRadius: 4,
                        }}
                      />
                    </div>

                    {/* % */}
                    <span
                      className="px-2 py-1 rounded"
                      style={{
                        fontSize: 12,
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}
