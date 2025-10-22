import React from "react";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
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
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardReports = () => {
  const data = [
    { name: "Monday", upto300: 2000, flat25: 1800, new50: 1500 },
    { name: "Tuesday", upto300: 1500, flat25: 1000, new50: 1200 },
    { name: "Wednesday", upto300: 1000, flat25: 2700, new50: 1300 },
    { name: "Thursday", upto300: 1900, flat25: 1400, new50: 2000 },
    { name: "Friday", upto300: 1600, flat25: 1500, new50: 1600 },
    { name: "Saturday", upto300: 2100, flat25: 1800, new50: 1700 },
    { name: "Sunday", upto300: 1900, flat25: 1600, new50: 1500 },
  ];

  const settlements = [
    {
      id: "06c1774-713d-46ad-90a8",
      status: "Paid",
      amount: "₹1200",
      date: "20-08-2025",
    },
    {
      id: "06c1774-713d-46ad-90a8",
      status: "Paid",
      amount: "₹1200",
      date: "20-08-2025",
    },
    {
      id: "06c1774-713d-46ad-90a8",
      status: "Paid",
      amount: "₹1200",
      date: "20-08-2025",
    },
       {
      id: "06c1774-713d-46ad-90a8",
      status: "Paid",
      amount: "₹1200",
      date: "20-08-2025",
    },
  ];

  return (
     <>
      <Row>
        {/* Coupon Usage Report */}
        <Col md={8} className="mb-4">
          <div className="p-3 rounded-3 shadow-sm bg-white">
            <h6 className="section_heading mb-3">Coupon Usage Report</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="upto300" fill="#1163C7" name="Upto ₹300 off"/>
                <Bar dataKey="flat25" fill="#F97316" name="Flat 25%" />
                <Bar dataKey="new50" fill="#22C55E" name="New user 50% Off" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>

        {/* Settlements & Exports */}
        <Col md={4}>
          <div className="p-3 rounded-3 shadow-sm bg-white">
            <h6 className="section_heading mb-3">Settlements & Exports</h6>
            <Table hover responsive className="align-middle report_table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Payment ID</th>

                </tr>
              </thead>
              <tbody>
                {settlements.map((s, index) => (
                  <tr key={index}>
                    <td>{s.date}</td>
                    
                    <td>
                      <Badge bg="success">{s.status}</Badge>
                    </td>
                    <td>{s.amount}</td>
                    <td>{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardReports;
