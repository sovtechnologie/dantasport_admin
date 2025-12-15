import React from "react";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DayPassSales() {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Sales",
        data: [80, 85, 95, 78, 80, 82, 84],
        backgroundColor: "#007bff",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 120,
        ticks: { stepSize: 20 },
        grid: { color: "#e0e0e0" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <Card className="p-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <Row className="mb-3 align-items-center">
        <Col><h5 className="section_heading">Day Pass Sales</h5></Col>
        <Col className="text-end">
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle variant="light">Category</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>All</Dropdown.Item>
              <Dropdown.Item>Adults</Dropdown.Item>
              <Dropdown.Item>Kids</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="light">Last Week</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Last Week</Dropdown.Item>
              <Dropdown.Item>This Week</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Bar data={data} options={options} />
    </Card>
  );
}
