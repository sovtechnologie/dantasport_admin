import React from "react";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BookingsChart() {
  // Chart Data
  const data = {
    labels: ["Total Check-in", "Total Attendance"],
    datasets: [
      {
        data: [100, 150],
        backgroundColor: ["#0d6efd", "#ff3b30"], // blue & red
        borderWidth: 0,
        cutout: "70%", // donut thickness
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false }, // hide default legend
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card className="p-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h5 className="section_heading">Bookings</h5>
        </Col>
        <Col className="text-end">
          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm">
              Last Week
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Last Week</Dropdown.Item>
              <Dropdown.Item>This Week</Dropdown.Item>
              <Dropdown.Item>Last Month</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        {/* Chart */}
        <Col md={6} className="d-flex mb-4">
          <div style={{ width: "180px", height: "180px" }}>
            <Doughnut data={data} options={options} />
          </div>
        </Col>

        {/* Legend */}
        <Col md={12} className="d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <span
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: "#0d6efd",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <span className="fw-semibold me-auto">Total Check-in</span>
            <span className="fw-bold">100</span>
          </div>

          <div className="d-flex align-items-center">
            <span
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: "#ff3b30",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <span className="fw-semibold me-auto">Total Attendance</span>
            <span className="fw-bold">150</span>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
