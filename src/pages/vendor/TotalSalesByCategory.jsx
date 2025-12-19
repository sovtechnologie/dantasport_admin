import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalSalesByCategory() {
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const data = {
    labels,
    datasets: [
      {
        label: "18 - 30",
        backgroundColor: "#1E74FD",
        data: [2000, 2150, 1000, 2000, 1500, 2100, 2200],
        barThickness: 18,
      },
      {
        label: "30 - 45",
        backgroundColor: "#FF8A00",
        data: [1500, 1600, 2600, 1100, 1450, 1700, 1750],
        barThickness: 18,
      },
      {
        label: "45+",
        backgroundColor: "#00A75D",
        data: [1200, 950, 1500, 1800, 1600, 1650, 1700],
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          font: { size: 12 },
        },
        grid: { color: "#eee" },
      },
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
    },
  };

  return (
    <Container
      className="p-4 bg-white shadow-sm rounded"
      style={{ border: "1px solid #e5e7eb", maxWidth: "100%" }}
    >
      {/* HEADER */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h5 className="section_heading mb-0 fs-5">Total Sales By Category</h5>

          <div className="d-flex gap-2">
            <Form.Select
              style={{
                width: "140px",
                borderColor: "#d1d5db",
                padding: "6px 10px",
                fontSize: "14px",
              }}
            >
              <option>Category</option>
            </Form.Select>

            <Form.Select
              style={{
                width: "140px",
                borderColor: "#d1d5db",
                padding: "6px 10px",
                fontSize: "14px",
              }}
            >
              <option>Last Week</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* CHART */}
      <div style={{ height: "330px" }}>
        <Bar data={data} options={options} />
      </div>
    </Container>
  );
}
