import React from "react";
import { Card, Container } from "react-bootstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import DateOnly from "./DateOnly";

const data = [
  { day: "Sunday", free: 1200, paid: 2200 },
  { day: "Monday", free: 14000, paid: 18000 },
  { day: "Tuesday", free: 9000, paid: 12000 },
  { day: "Wednesday", free: 3000, paid: 7000 },
  { day: "Thursday", free: 25000, paid: 30000 },
  { day: "Friday", free: 16000, paid: 21000 },
  { day: "Saturday", free: 18000, paid: 24000 },
];

const AdminSalesChart = () => {
  return (
    <Container className="mt-4 p-0">
     
      <Card className="border-0" style={{ borderRadius: "16px" }}>
        <Card.Body>
          {/* Header */}
           <DateOnly/>
          <div className="d-flex justify-content-between my-4">
            <h5 className="fw-semibold text-primary mb-0">
              Sales details
            </h5>
            <div>
              <small className="text-muted">Total Revenue</small>
              <div className="fw-bold">₹1,94,000</div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="freeSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="paidSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              {/* ✅ FIXED TOOLTIP */}
              <Tooltip
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.day || ""
                }
                formatter={(value, _name, item) => [
                  `₹${value}`,
                  item.dataKey === "free"
                    ? "Total Revenue"
                    : "Platform Fee",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />

              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{
                  paddingTop: 10,
                  fontSize: 16,
                }}
              />

              {/* Total Revenue */}
              <Area
                type="monotone"
                dataKey="free"
                name="Total Revenue"
                stroke="#2563EB"
                fill="url(#freeSales)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />

              {/* Platform Fee */}
              <Area
                type="monotone"
                dataKey="paid"
                name="Platform Fee"
                stroke="#16A34A"
                fill="url(#paidSales)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminSalesChart;
