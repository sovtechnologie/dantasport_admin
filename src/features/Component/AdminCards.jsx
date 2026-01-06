import React from 'react'
import { useState } from "react";
import { Calendar, TrendingUp, BarChart2, Star } from "lucide-react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
function AdminCards() {

    const stats = [
    {
      title: "Total Bookings",
      value: "86",
      sub: "+8.5% Up from last week",
      bg: "#FFE4E6",
      iconBg: "#E9D5FF",
      icon: <Calendar size={20} />,
      valueColor: "#2563EB",
    },
    {
      title: "Revenue",
      value: "₹7,200",
      sub: "+8.5% Up from last week",
      bg: "#FEF3C7",
      iconBg: "#FDE68A",
      icon: <TrendingUp size={20} />,
      valueColor: "#111827",
    },
    {
      title: "Peak hour",
      value: "11–12 AM",
      sub: "Number of booking 56",
      bg: "#DCFCE7",
      iconBg: "#BBF7D0",
      icon: <BarChart2 size={20} />,
      valueColor: "#111827",
    },
    {
      title: "Average Rating",
      value: "4.2/5",
      sub: "From 2 reviews",
      bg: "#F3E8FF",
      iconBg: "#FBCFE8",
      icon: <Star size={20} />,
      valueColor: "#111827",
    },
  ];
  return (
    <>
    <Card className='border-0 mt-4 py-4 ' style={{ borderRadius: "16px" }}>
        <Container className="mb-3 d-flex justify-content-end align-items-center" >

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
      </Container>

      {/* Cards */}
      <Container>
       <Row className="g-3">
        {stats.map((item, index) => {
          const [hover, setHover] = useState(false);

          return (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card
                className="h-100 border-0"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: item.bg,
                  borderRadius: "16px",
                  cursor: "pointer",
                  transform: hover ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  {/* Top */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-semibold">{item.title}</span>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: item.iconBg,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Value */}
                  <h3 className="fw-bold mb-2" style={{ color: item.valueColor }}>
                    {item.value}
                  </h3>

                  {/* Sub text */}
                  <small className="text-muted">
                    {item.sub}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      </Container>
    </Card>
    </>
  )
}

export default AdminCards
