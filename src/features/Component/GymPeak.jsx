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
import SearchBox from "./SearchBox";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GymPeak() {
  const { RangePicker } = DatePicker;

  /* ================= CHART DATA ================= */
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
        data: [66, 15, 90, 100, 80, 100],
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

  /* ================= TABLE DATA ================= */
  const tableData = [
    {
      bookingId: "BK-10231",
      redeemPasses: "Gold Pass",
      gymName: "Lions Turf",
      userDetails: "Rahul Sharma",
      purchaseDate: "20-06-2025",
      amount: "₹1,200",
    },
    {
      bookingId: "BK-10232",
      redeemPasses: "Silver Pass",
      gymName: "Lions Turf",
      userDetails: "Amit Verma",
      purchaseDate: "20-06-2025",
      amount: "₹800",
    },
    {
      bookingId: "BK-10233",
      redeemPasses: "Platinum Pass",
      gymName: "Arena Sports",
      userDetails: "Neha Singh",
      purchaseDate: "21-06-2025",
      amount: "₹1,500",
    },
    {
      bookingId: "BK-10234",
      redeemPasses: "Gold Pass",
      gymName: "Arena Sports",
      userDetails: "Rohit Mehta",
      purchaseDate: "21-06-2025",
      amount: "₹1,200",
    },
    {
      bookingId: "BK-10235",
      redeemPasses: "Silver Pass",
      gymName: "Lions Turf",
      userDetails: "Pooja Patel",
      purchaseDate: "22-06-2025",
      amount: "₹900",
    },
  ];

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        <SearchBox/>
        {/* ================= CHART CARD ================= */}
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

        {/* ================= TABLE CARD ================= */}
        <Card className="border-0 shadow-sm mt-4">
          <Card.Body className="p-3">
            <Table responsive hover className="mb-0 align-middle">
              <thead>
                <tr>
                  <th className="text-primary fw-medium">Booking ID</th>
                  <th className="text-primary fw-medium">Redeem Passes</th>
                  <th className="text-primary fw-medium">Gym Name</th>
                  <th className="text-primary fw-medium">User Details</th>
                  <th className="text-primary fw-medium">
                    Date of Purchase
                  </th>
                  <th className="text-primary fw-medium">Amount</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.bookingId}</td>
                    <td>{row.redeemPasses}</td>
                    <td>{row.gymName}</td>
                    <td>{row.userDetails}</td>
                    <td>{row.purchaseDate}</td>
                    <td className="fw-semibold">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* ================= PAGINATION ================= */}
            <Row className="align-items-center mt-3">
              <Col md={6} className="d-flex align-items-center gap-2">
                <span className="text-muted">Show result:</span>
                <Form.Select
                  size="sm"
                  style={{ width: "90px" }}
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </Form.Select>
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
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
                    onClick={() => setCurrentPage(currentPage + 1)}
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

export default GymPeak;
