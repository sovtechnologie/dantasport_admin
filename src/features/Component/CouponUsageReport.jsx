import React from "react";
import { Card, Container, Row, Col, Dropdown } from "react-bootstrap";

const CouponUsageReport = () => {
  const stats = [
    {
      value: 36,
      label: "Flat 50%",
      bg: "#FFE4E6",
    },
    {
      value: 36,
      label: "Total Sales",
      bg: "#FEF3C7",
    },
    {
      value: 36,
      label: "Total Sales",
      bg: "#DCFCE7",
    },
    {
      value: 36,
      label: "Total Sales",
      bg: "#F3E8FF",
    },
  ];

  return (
    <Container className="mt-4">
      <Card
        className="border-0 shadow"
        style={{ borderRadius: "16px" }}
      >
        <Card.Body>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-semibold text-primary mb-0">
              Coupon Usage Report
            </h5>

            <Dropdown>
              <Dropdown.Toggle variant="light" className="border">
                Last Week
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>This Week</Dropdown.Item>
                <Dropdown.Item>This Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Stats */}
          <Row className="g-3">
            {stats.map((item, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                <div
                  className="p-3"
                  style={{
                    backgroundColor: item.bg,
                    borderRadius: "14px",
                  }}
                >
                  <h4 className="fw-bold text-primary mb-1">
                    {item.value}
                  </h4>
                  <small className="fw-semibold text-muted">
                    {item.label}
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

export default CouponUsageReport;
