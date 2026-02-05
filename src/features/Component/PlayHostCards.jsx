import React from 'react'
import { useState } from "react";
import { Calendar, TrendingUp, BarChart2, Star } from "lucide-react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
function PlayHostCards() {

    const stats = [
    {
      title: "Total hosted Games ",
      value: "86",
      bg: "#FFE4E6",
      iconBg: "#E9D5FF",
      icon: <Calendar size={20} />,
      valueColor: "#111827",
    },
    {
      title: "Total Games played ",
      value: "₹7,200",
      bg: "#FEF3C7",
      iconBg: "#FDE68A",
      icon: <TrendingUp size={20} />,
      valueColor: "#111827",
    },
    {
      title: "Total Review",
      value: "1086",
      bg: "#DCFCE7",
      iconBg: "#BBF7D0",
      icon: <BarChart2 size={20} />,
      valueColor: "#111827",
    },
    {
      title: "Active player",
      value: "15k",
      bg: "#F3E8FF",
      iconBg: "#FBCFE8",
      icon: <Star size={20} />,
      valueColor: "#111827",
    },
  ];
  return (
    <>
    <Card className='border-0 mt-4 py-4 ' style={{ borderRadius: "16px" }}>
      

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

export default PlayHostCards
