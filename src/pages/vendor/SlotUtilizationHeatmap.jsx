import React from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const hours = [
  "12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM",
  "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Randomized utilization values (0–1)
const generateData = () => {
  return hours.map(() =>
    days.map(() => Math.random())
  );
};

// Color intensity based on value (0–1)
const getColor = (value) => {
  if (value > 0.8) return "#4B0C0C"; // dark red
  if (value > 0.6) return "#FF3D00"; // bright orange
  if (value > 0.4) return "#FF6E40"; // medium orange
  if (value > 0.2) return "#FFAB91"; // light orange
  return "#FFE0CC"; // very light
};

const SlotUtilizationHeatmap = () => {
  const data = generateData();

  return (
    <div className="bg-white shadow rounded-4 p-4 w-75 mt-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col xs={12} md={8}>
          <h2 className="section_heading">
            Slot Utilization Heatmap
          </h2>
        </Col>
        <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
          <Form.Select size="sm" className="w-auto ms-md-auto">
            <option>Last Week</option>
            <option>This Week</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Heatmap Section */}
        <Col xs={12} lg={9}>
          <div className="table-responsive">
            <Table borderless className="align-middle text-center mb-0">
              <thead>
                <tr>
                  <th></th>
                  {days.map((day) => (
                    <th key={day} className="text-muted small fw-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, i) => (
                  <tr key={hour}>
                    <td className="text-muted small text-end pe-2">{hour}</td>
                    {days.map((day, j) => (
                      <td key={day}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            backgroundColor: getColor(data[i][j]),
                            borderRadius: "6px",
                            transition: "0.2s ease",
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Stats Section */}
        <Col xs={12} lg={3}>
          <div className="d-flex flex-column justify-content-center h-100">
            <div className="mb-3">
              <p className="text-muted small mb-0">Today</p>
              <h5 className="fw-semibold mb-0">6h 15m</h5>
              <span className="text-success small fw-semibold">↑ 2.3%</span>
            </div>

            <div className="mb-3">
              <p className="text-muted small mb-0">This Week</p>
              <h5 className="fw-semibold mb-0">34h 12m</h5>
              <span className="text-danger small fw-semibold">↓ 10.1%</span>
            </div>

            <div>
              <p className="text-muted small mb-0">This Month</p>
              <h5 className="fw-semibold mb-0">123h 47m</h5>
              <span className="text-danger small fw-semibold">↓ 3.2%</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SlotUtilizationHeatmap;
