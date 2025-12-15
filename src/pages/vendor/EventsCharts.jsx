import React from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventsCharts() {
  const revenueData = {
    labels: ["Event A", "Event B", "Event C", "Event D", "Event E"],
    datasets: [
      {
        data: [250, 170, 290, 370, 450],
        backgroundColor: [
          "#6f42c1",
          "#0d6efd",
          "#f4b400",
          "#00e396",
          "#ff3b30",
        ],
        borderWidth: 0,
      },
    ],
  };

  const ticketData = {
    labels: ["Regular Booking", "Team Booking", "VIP Booking"],
    datasets: [
      {
        data: [800, 700, 100],
        backgroundColor: ["#0d6efd", "#fd7e14", "#ff3b30"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
   <>
   <Row className="g-4 mt-4">
        {/* Revenue Breakdown */}
        <Col lg={6}>
          <Card className="shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold text-primary mb-0">
                Revenue Breakdown
              </h5>
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm">
                  Last Week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Last Month</Dropdown.Item>
                  <Dropdown.Item>Last Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Doughnut data={revenueData} options={options} />
              </Col>

              <Col md={6}>
                {revenueData.labels.map((label, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2"
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          revenueData.datasets[0].backgroundColor[index],
                        display: "inline-block",
                        marginRight: 10,
                      }}
                    />
                    <span className="me-auto">{label}</span>
                    <strong>{revenueData.datasets[0].data[index]}</strong>
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Ticket Category */}
        <Col lg={6}>
          <Card className="shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold text-primary mb-0">
                Ticket Category
              </h5>
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm">
                  Last Week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Last Month</Dropdown.Item>
                  <Dropdown.Item>Last Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Doughnut data={ticketData} options={options} />
              </Col>

              <Col md={6}>
                {ticketData.labels.map((label, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2"
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          ticketData.datasets[0].backgroundColor[index],
                        display: "inline-block",
                        marginRight: 10,
                      }}
                    />
                    <span className="me-auto">{label}</span>
                    <strong>{ticketData.datasets[0].data[index]}</strong>
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
   </>
  );
}
