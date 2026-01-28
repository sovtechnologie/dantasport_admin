import { Filter } from "lucide-react";
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ratingsData = [
  {
    label: "Poor",
    value: 25,
    color: "#FF4D6D",
    bg: "#FFD6DE",
  },
  {
    label: "Fair",
    value: 29,
    color: "#FF8C24",
    bg: "#FFE1C2",
  },
  {
    label: "Good",
    value: 18,
    color: "#2F80ED",
    bg: "#D6E6FF",
  },
  {
    label: "Excellent",
    value: 45,
    color: "#27AE60",
    bg: "#DDF4E7",
  },
];

function RatingDistribution() {
  return (
    <Card
      className="border-0 shadow-sm"
      style={{
        borderRadius: 14,
        padding: 16,
      }}
    >
      {/* Title */}
      <h5
        style={{
          fontWeight: 600,
          color: "#1163C7",
          marginBottom: 16,
        }}
      >
        Rating Distribution
      </h5>
      

      {/* Header */}
      <Row
        style={{
          fontSize: 12,
          color: "#98A2B3",
          marginBottom: 10,
        }}
      >
        <Col xs={3}>Rating</Col>
        <Col xs={6}>Popularity</Col>
        <Col xs={3} className="text-end">
          Sales
        </Col>
      </Row>

      {/* Rows */}
      {ratingsData.map((item, index) => (
        <Row
          key={index}
          className="align-items-center"
          style={{
            padding: "12px 0",
            borderTop: "1px solid #F0F3F8",
          }}
        >
          {/* Label */}
          <Col xs={3} style={{ fontSize: 14, fontWeight: 500 }}>
            {item.label}
          </Col>

          {/* Progress Bar */}
          <Col xs={6}>
            <div
              style={{
                width: "100%",
                height: 6,
                backgroundColor: item.bg,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${item.value}%`,
                  height: "100%",
                  backgroundColor: item.color,
                  borderRadius: 20,
                }}
              />
            </div>
          </Col>

          {/* Percentage */}
          <Col xs={3} className="text-end">
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                color: item.color,
                border: `1px solid ${item.color}`,
                backgroundColor: "#fff",
              }}
            >
              {item.value}%
            </span>
          </Col>
        </Row>
      ))}
    </Card>
  );
}

export default RatingDistribution;
