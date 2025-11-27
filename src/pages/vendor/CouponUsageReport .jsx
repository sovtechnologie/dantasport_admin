import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Monday", upto300: 2000, flat25: 1800, new50: 1500 },
  { day: "Tuesday", upto300: 2200, flat25: 1600, new50: 1400 },
  { day: "Wednesday", upto300: 900, flat25: 2800, new50: 1500 },
  { day: "Thursday", upto300: 2100, flat25: 1200, new50: 1900 },
  { day: "Friday", upto300: 1700, flat25: 1600, new50: 1800 },
  { day: "Saturday", upto300: 2000, flat25: 1800, new50: 1900 },
  { day: "Sunday", upto300: 2100, flat25: 1900, new50: 1800 },
];

const CouponUsageReport = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl  mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section_heading">
          Coupon Usage Report
        </h2>
        <select className="border border-gray-300 text-sm rounded-md px-3 py-1 focus:outline-none">
          <option>Last Week</option>
          <option>This Week</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
          <Bar dataKey="upto300" fill="#0066FF" name="Upto ₹300 off" radius={[6, 6, 0, 0]} />
          <Bar dataKey="flat25" fill="#FF7A00" name="Flat 25%" radius={[6, 6, 0, 0]} />
          <Bar dataKey="new50" fill="#28C76F" name="New user 50% Off" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CouponUsageReport;
