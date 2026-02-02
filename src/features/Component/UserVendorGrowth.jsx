import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import DateOnly from "./DateOnly";

const data = [
  { name: "1D", Vendors: 1800, Users: 2200 },
  { name: "1Week", Vendors: 2200, Users: 1700 },
  { name: "3Months", Vendors: 900, Users: 2600 },
  { name: "6Months", Vendors: 2100, Users: 1000 },
  { name: "End Of Year", Vendors: 1600, Users: 1500 },
  { name: "All Time", Vendors: 2300, Users: 1800 },
];

const maxValue = 3000;
const chartHeight = 260;
const chartWidth = 700;
const padding = 50;

const getX = (i) =>
  padding + (i * (chartWidth - padding * 2)) / (data.length - 1);

const getY = (value) =>
  chartHeight - padding - (value / maxValue) * (chartHeight - padding * 2);

const createSmoothPath = (key) => {
  return data
    .map((d, i) => {
      const x = getX(i);
      const y = getY(d[key]);
      if (i === 0) return `M ${x} ${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1][key]);
      const midX = (prevX + x) / 2;
      return `C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
    })
    .join(" ");
};

function UserVendorGrowth() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: 14, padding: 16 }}>
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h5 style={{ fontWeight: 600, color: "#1163C7" }}>
            User & Vendor Growth
          </h5>
        </Col>
        <Col className="text-end">
          <DateOnly />
        </Col>
      </Row>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height={chartHeight}
        style={{ background: "#F6F9FE", borderRadius: 10 }}
      >
        {/* Grid Lines */}
        {[0, 500, 1000, 1500, 2000, 2500, 3000].map((val) => (
          <line
            key={val}
            x1={padding}
            x2={chartWidth - padding}
            y1={getY(val)}
            y2={getY(val)}
            stroke="#E6ECF5"
          />
        ))}

        {/* Y Axis Labels */}
        {[3000, 2500, 2000, 1500, 1000, 500].map((val) => (
          <text
            key={val}
            x={10}
            y={getY(val) + 4}
            fontSize="16"
            fill="#6c757d"
          >
            {val}
          </text>
        ))}

        {/* Vendor Line */}
        <path
          d={createSmoothPath("Vendors")}
          fill="none"
          stroke="#1163C7"
          strokeWidth="3"
        />

        {/* User Line */}
        <path
          d={createSmoothPath("Users")}
          fill="none"
          stroke="#12B981"
          strokeWidth="3"
        />

        {/* Data Points */}
        {data.map((d, i) => (
          <g key={i}>
            {/* Vendor Dot */}
            <circle
              cx={getX(i)}
              cy={getY(d.Vendors)}
              r="5"
              fill="#1163C7"
              onMouseEnter={(e) =>
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  label: "Vendors",
                  value: d.Vendors,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />

            {/* User Dot */}
            <circle
              cx={getX(i)}
              cy={getY(d.Users)}
              r="5"
              fill="#12B981"
              onMouseEnter={(e) =>
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  label: "Users",
                  value: d.Users,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />
          </g>
        ))}
      </svg>

      {/* X Axis Labels */}
      <div className="d-flex justify-content-between px-4 mt-2">
        {data.map((d) => (
          <span key={d.name} style={{ fontSize: 12 }}>
            {d.name}
          </span>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 45,
            left: tooltip.x + 12,
            background: "#000",
            color: "#fff",
            padding: "6px 10px",
            fontSize: 16,
            borderRadius: 6,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {tooltip.label}: ₹{tooltip.value}
        </div>
      )}

      {/* Legend */}
      <div className="d-flex justify-content-center gap-4 mt-3">
        <div className="d-flex align-items-center gap-2">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#1163C7",
            }}
          />
          <span style={{ fontSize: 12 }}>Vendors</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#12B981",
            }}
          />
          <span style={{ fontSize: 12 }}>Users</span>
        </div>
      </div>
    </Card>
  );
}

export default UserVendorGrowth;
