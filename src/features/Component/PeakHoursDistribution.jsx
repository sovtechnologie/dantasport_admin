import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const PeakHoursDistribution = () => {
  const slots = [
    {
      title: "Morning",
      time: "08:00 AM - 12:00 PM",
      count: 9,
      percent: "9%",
      active: true,
    },
    {
      title: "Afternoon",
      time: "12:00 PM - 04:00 PM",
      count: 17,
      percent: "5%",
    },
    {
      title: "Evening",
      time: "04:00 PM - 08:00 PM",
      count: 23,
      percent: "5%",
    },
    {
      title: "Evening",
      time: "04:00 PM - 08:00 PM",
      count: 23,
      percent: "5%",
    },
  ];

  return (
    <Container className="mt-4">
      <Card className="border-0 shadow" style={{ borderRadius: 16 }}>
        <Card.Body>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="fw-semibold text-primary mb-1">
                Peak Hours Distribution
              </h6>
              <small className="text-muted">
                Most Bookings Occur During:{" "}
                <span className="text-primary fw-semibold">
                  Evening (04:00 PM - 08:00 PM)
                </span>
              </small>
            </div>

            <div className="text-end">
              <small className="text-muted">Total Bookings</small>
              <div className="fw-bold text-primary">74</div>
            </div>
          </div>

          {/* Slots */}
          <Row className="g-3 mt-3">
            {slots.map((slot, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                <div
                  className="text-center p-3 h-100"
                  style={{
                    borderRadius: 12,
                    border: slot.active
                      ? "1.5px solid #3B82F6"
                      : "1px solid #D1D5DB",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <div className="fw-semibold mb-1">
                    {slot.title}
                  </div>

                  <div
                    className="fw-semibold mb-2"
                    style={{ color: "#2563EB" }}
                  >
                    {slot.time}
                  </div>

                  <div className="fw-bold fs-5 mb-1">
                    {slot.count}
                  </div>

                  <small className="fw-semibold text-primary">
                    {slot.percent}
                  </small>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PeakHoursDistribution;
