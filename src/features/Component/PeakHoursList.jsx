import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Pagination,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ExportFilter from "./ExportFilter";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PeakHoursList() {
  const { RangePicker } = DatePicker;

  /* ---------------- CHART DATA ---------------- */
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
      },
      x: {
        grid: { display: false },
      },
    },
  };

  /* ---------------- TABLE DATA ---------------- */
  const tableData = [
    {
      date: "20-06-2025",
      slot: "Wed | 12 PM - 1 PM",
      sport: "Cricket",
      venue: "Lions Turf",
      slots: "10 / 15",
      utilization: "66%",
      revenue: "7200",
    },
    {
      date: "20-06-2025",
      slot: "Wed | 1 PM - 2 PM",
      sport: "Cricket",
      venue: "Lions Turf",
      slots: "4 / 15",
      utilization: "15%",
      revenue: "2200",
    },
    {
      date: "20-06-2025",
      slot: "Wed | 3 PM - 4 PM",
      sport: "Cricket",
      venue: "Lions Turf",
      slots: "14 / 15",
      utilization: "90%",
      revenue: "9200",
    },
    {
      date: "20-06-2025",
      slot: "Wed | 4 PM - 5 PM",
      sport: "Cricket",
      venue: "Lions Turf",
      slots: "15 / 15",
      utilization: "100%",
      revenue: "10000",
    },
    {
      date: "21-06-2025",
      slot: "Thu | 5 PM - 6 PM",
      sport: "Football",
      venue: "Arena Sports",
      slots: "12 / 15",
      utilization: "80%",
      revenue: "8500",
    },
    {
      date: "21-06-2025",
      slot: "Thu | 6 PM - 7 PM",
      sport: "Football",
      venue: "Arena Sports",
      slots: "15 / 15",
      utilization: "100%",
      revenue: "11000",
    },
  ];

  /* ---------------- PAGINATION ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  return (
    <section className="py-4">
      <Container>

        {/* ---------------- CHART CARD ---------------- */}
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-4">
              <Col>
                <h5 className="fw-semibold text-primary mb-0">
                  Peak Hour Distribution
                </h5>
              </Col>
              <Col className="text-end">
                <ExportFilter />
              </Col>
            </Row>

            <div style={{ height: "280px" }}>
              <Bar data={chartData} options={options} />
            </div>
          </Card.Body>
        </Card>

        {/* ---------------- TABLE CARD ---------------- */}
        <Card className="border-0 shadow-sm mt-4">
          <Card.Body className="p-3">
            <Table responsive hover className="mb-0 align-middle">
              <thead className="table-white">
                <tr>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>Date</th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Day & Time Slot
                  </th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Sport Type
                  </th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Venue Name
                  </th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Slots Booked / Total
                  </th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Utilization %
                  </th>
                  <th style={{ color: "#1163C7", fontWeight: 500 }}>
                    Revenue
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.slot}</td>
                    <td>{row.sport}</td>
                    <td>{row.venue}</td>
                    <td>{row.slots}</td>
                    <td>{row.utilization}</td>
                    <td>{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* ---------------- PAGINATION FOOTER ---------------- */}
            <Row className="align-items-center mt-3">
              <Col md={6} className="d-flex align-items-center gap-2">
                <span className="text-muted">Show result:</span>
                <Form.Select
                  size="sm"
                  style={{ width: "80px" }}
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                </Form.Select>
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(currentPage - 1)
                    }
                  />

                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i}
                      active={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage(currentPage + 1)
                    }
                  />
                </Pagination>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default PeakHoursList;
