import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { day: "Sunday", revenue: 10000 },
  { day: "Monday", revenue: 15000 },
  { day: "Tuesday", revenue: 90000 },
  { day: "Wednesday", revenue: 20000 },
  { day: "Thursday", revenue: 50000 },
  { day: "Friday", revenue: 40000 },
  { day: "Saturday", revenue: 30000 },
];

const SalesChart = () => {
  return (
    <section>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section_heading">Sales Details</h2>
          <p className="text-end text-muted mb-0">
            <h2 className="section_heading">Total Revenue</h2>
            <span className="fw-light text-dark">₹1940</span>
          </p>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#999" }} />
            <YAxis
              tickFormatter={(v) => `₹${v / 1000}k`}
              tick={{ fill: "#999" }}
            />
            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString()}.00`,
                "Revenue",
              ]}
              contentStyle={{ borderRadius: "10px" }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesChart;
