import React from "react";
import { Card, Container, Dropdown } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { day: "Sunday", value: 1200 },
  { day: "Monday", value: 14000 },
  { day: "Tuesday", value: 9000 },
  { day: "Wednesday", value: 3000 },
  { day: "Thursday", value: 25000 },
  { day: "Friday", value: 16000 },
  { day: "Saturday", value: 18000 },
];

const SalesChart = () => {
  return (
    <Container className="mt-4 p-0">
      <Card
        className="border-0"
        style={{ borderRadius: "16px" }}
      >
        <Card.Body>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h5 className="fw-semibold text-primary mb-0">
              Sales Details
            </h5>

            <div className="d-flex align-items-center gap-4">
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

              <div>
                <small className="text-primary fw-semibold">
                  Total Revenue
                </small>
                <div className="fw-bold">₹1940</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [`₹${value}.00`, "Sales"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                fill="url(#colorSales)"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563EB" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalesChart;
