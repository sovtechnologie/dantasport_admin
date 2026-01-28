import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

const payoutData = [
  {
    label: "Pending",
    amount: "₹3000",
    transactions: "45 Transactions",
    color: "#FF8C24",
  },
  {
    label: "Approved",
    amount: "₹30000",
    transactions: "45 Transactions",
    color: "#1163C7",
  },
  {
    label: "On-Hold",
    amount: "₹3000",
    transactions: "45 Transactions",
    color: "#FF3B3B",
  },
  {
    label: "Cleared",
    amount: "₹3000",
    transactions: "45 Transactions",
    color: "#22C55E",
  },
];

function PayoutOverview() {
  const [previousDate, setPreviousDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [range, setRange] = useState("last_week");

  return (
    <Card
      className="border-0 shadow-sm"
      style={{
        borderRadius: 16,
        padding: 16,
      }}
    >
      {/* Title */}
     

      {/* Filters */}
      <Row className="justify-content-between align-items-center mb-3">
   

        <Col className="col-4">
          <h5
        style={{
          fontWeight: 600,
          color: "#1163C7",
          
        }}
      >
        Payout Overview
      </h5>
        </Col>

     
      </Row>

      {/* List */}
      {payoutData.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#F6F7F9",
            borderRadius: 12,
            padding: "12px 14px",
            marginBottom: 10,
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>

          {/* Right */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1163C7",
              }}
            >
              {item.amount}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#475569",
              }}
            >
              {item.transactions}
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default PayoutOverview;
