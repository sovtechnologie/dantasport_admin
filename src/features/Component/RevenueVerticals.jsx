import React, { useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import CurrentDate from "./CurrentDate";
import PreviousDate from "./PreviousDate";

const data = [
  { name: "Turf", previous: 1800, current: 2200 },
  { name: "Gym", previous: 2200, current: 1700 },
  { name: "Event", previous: 900, current: 2600 },
  { name: "Run", previous: 2100, current: 1000 },
  { name: "Coach", previous: 1600, current: 1500 },
  { name: "Host/Play", previous: 2300, current: 1800 },
];

const maxValue = 3000;

function RevenueVerticals() {
  const [tooltip, setTooltip] = useState(null);
  const [range, setRange] = useState("last_week");
  const [previousDate, setPreviousDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  return (
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: 12, padding: 14 }}
    >
      {/* Header */}
      <Row className="align-items-center mb-2">
        <Col className="col-12">
          <h5 style={{ fontWeight: 600, color: "#1163C7" }}>
           Revenue Verticals Growth
          </h5>
        </Col>

       
         
        <Col className="col-6">
          
          <CurrentDate/>
        </Col>
        <Col className="col-6">
          <PreviousDate/>
        </Col>

       
      </Row>

      {/* Chart Section */}
      <div style={{ display: "flex", marginTop: 12 }}>
        {/* Y Axis */}
        <div
          style={{
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: 10,
            fontSize: 11,
            color: "#6c757d",
          }}
        >
          {[3000, 2500, 2000, 1500, 1000, 500].map((val) => (
            <div key={val}>₹{val}</div>
          ))}
        </div>

        {/* Chart */}
        <div
          style={{
            flex: 1,
            height: 220,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            background: "#F6F9FE",
            borderRadius: 8,
            padding: "10px 8px",
            position: "relative",
          }}
        >
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: `${(i / 5) * 100}%`,
                height: 1,
                backgroundColor: "#E6ECF5",
              }}
            />
          ))}

          {data.map((item, index) => (
            <div key={index} style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 200,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Previous */}
                <div
                  onMouseEnter={(e) =>
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      label: "Previous",
                      value: item.previous,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: 14,
                    height: `${(item.previous / maxValue) * 100}%`,
                    backgroundColor: "#1163C7",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                />

                {/* Current */}
                <div
                  onMouseEnter={(e) =>
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      label: "Current",
                      value: item.current,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: 14,
                    height: `${(item.current / maxValue) * 100}%`,
                    backgroundColor: "#ff3b00e3",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {item.name}
              </div>
            </div>
          ))}

          {/* Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "fixed",
                top: tooltip.y - 40,
                left: tooltip.x + 10,
                background: "#000",
                color: "#fff",
                padding: "6px 10px",
                fontSize: 12,
                borderRadius: 4,
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              {tooltip.label}: ₹{tooltip.value}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#1163C7",
            }}
          />
          <span style={{ fontSize: 12 }}>Previous</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ff3b00e3",
            }}
          />
          <span style={{ fontSize: 12 }}>Current</span>
        </div>
      </div>
    </Card>
  );
}

export default RevenueVerticals;
