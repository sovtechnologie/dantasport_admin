import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaRupeeSign, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

function TotalListingPrice() {
  const cardData = [
    {
      title: "Total Listing Price",
      amount: 250,
      icon: <FaRupeeSign size={24} color="#FF5E5E" />,
      bgColor: "#FFE2E5",
    },
    {
      title: "Taxable Value",
      amount: 250,
      icon: <FaShoppingCart size={24} color="#FFB74D" />,
      bgColor: "#FFF3E0",
    },
    {
      title: "Net Payable Amount",
      amount: 250,
      icon: <FaMoneyBillWave size={24} color="#4CAF50" />,
      bgColor: "#E8F5E9",
    },
  ];

  return (
    <section>
      <Container>
        <Row className="g-4 mb-4">
          {cardData.map((card, index) => (
            <Col key={index} lg={4} md={6} sm={12}>
              <div
                className="card p-2 border-0 shadow-sm card-hover"
                style={{ background: card.bgColor, borderRadius: "12px", transition: "all 0.3s ease" }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">{card.icon}</div>
                  <h5
                    style={{
                      fontWeight: "600",
                      color: "#172A39",
                      fontSize: "16px",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h5>
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1163C7" }}>
                  ₹ {card.amount}
                </h2>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Inline CSS for hover effect */}
      <style>
        {`
          .card-hover:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </section>
  );
}

export default TotalListingPrice;
