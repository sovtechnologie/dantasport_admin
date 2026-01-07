import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Table, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {  DatePicker } from "antd";

import {
  CalendarOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function PeakHoursList() {
   const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const chartData = {
    labels: [
      "12 PM - 1 PM",
      "1 PM - 2 PM",
      "3 PM - 4 PM",
      "4 PM - 5 PM",
      "5 PM - 6 PM",
      "6 PM - 7 PM",
    ],
    datasets: [
      {
        label: "Utilization %",
        data: [66, 15, 90, 100, 95, 70],
        backgroundColor: "#1565d8",
        borderRadius: 6,
        barThickness: 42,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
        grid: { drawBorder: false },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <section className="py-4">
      <Container>
        {/* Chart Card */}
        <Card className="border-0 shadow-sm">
          <Card.Body>
            {/* Header */}
            <Row className="align-items-center mb-4">
              <Col>
                <h5 className="fw-semibold text-primary mb-0">
                  Peak Hour Distribution
                </h5>
              </Col>

              {/* <Col className="text-end">
                <Button variant="outline-primary" size="sm" className="me-2">
                  Export
                </Button>
                 <label htmlFor="" className="text-gray-400">Start Date</label>
                <Form.Control
                  type="date"
                  size="sm"
                  className="d-inline w-auto me-2 ms-3"
                  
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
                  <label htmlFor="" className="text-gray-400">End Date</label>
                <Form.Control
                  type="date"
                  size="sm"
                  className="d-inline w-auto ms-3"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </Col> */}
              <Col>
                     <div className="export-section mb-3 text-end">
                  <Button variant="outline-primary" size="lg" className="me-2">
  <i className="bi bi-download me-2"></i>
  Export
</Button>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates) => setDateRange(dates || [])}
          allowClear
          style={{ marginLeft: 10 , padding: "10px"}}
          className="datepiker"
        />
      </div>
              </Col>
            </Row>

            {/* Chart */}
            <div style={{ height: "280px" }}>
              <Bar data={chartData} options={options} />
            </div>
          </Card.Body>
        </Card>

        {/* Table Card */}
        <Card className="border-0 shadow-sm mt-4">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0 align-middle">
              <thead className="table-white shadow-sm">
                <tr className="bg-white">
                  <th style={{color: "#1163C7"}}>Date</th>
                  <th style={{color: "#1163C7"}}>Day & Time Slot</th>
                  <th style={{color: "#1163C7"}}>Sport Type</th>
                  <th style={{color: "#1163C7"}}>Venue Name</th>
                  <th style={{color: "#1163C7"}}>Slots Booked / Total</th>
                  <th style={{color: "#1163C7"}}>Utilization %</th>
                  <th style={{color: "#1163C7"}}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20-06-2025</td>
                  <td>Wed | 12 PM - 1 PM</td>
                  <td>Cricket</td>
                  <td>Lions Turf</td>
                  <td>10 / 15</td>
                  <td>66%</td>
                  <td>7200</td>
                </tr>
                <tr>
                  <td>20-06-2025</td>
                  <td>Wed | 1 PM - 2 PM</td>
                  <td>Cricket</td>
                  <td>Lions Turf</td>
                  <td>4 / 15</td>
                  <td>15%</td>
                  <td>2200</td>
                </tr>
                <tr>
                  <td>20-06-2025</td>
                  <td>Wed | 3 PM - 4 PM</td>
                  <td>Cricket</td>
                  <td>Lions Turf</td>
                  <td>14 / 15</td>
                  <td>90%</td>
                  <td>9200</td>
                </tr>
                <tr>
                  <td>20-06-2025</td>
                  <td>Wed | 4 PM - 5 PM</td>
                  <td>Cricket</td>
                  <td>Lions Turf</td>
                  <td>15 / 15</td>
                  <td>100%</td>
                  <td>10000</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default PeakHoursList;
