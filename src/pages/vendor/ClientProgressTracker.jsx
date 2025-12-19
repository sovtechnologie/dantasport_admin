import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";

const ClientProgressTracker = () => {
  const clients = [
    {
      name: "Sahil Khan",
      progress: [
        { label: "Lorem ipsum", value: 5, total: 10 },
        { label: "Lorem ipsum", value: 4, total: 15 },
        { label: "Lorem ipsum", value: 2, total: 20 },
      ],
    },
    {
      name: "Sahil Khan",
      progress: [
        { label: "Lorem ipsum", value: 5, total: 10 },
        { label: "Lorem ipsum", value: 4, total: 15 },
        { label: "Lorem ipsum", value: 2, total: 20 },
      ],
    },
    {
      name: "Sahil Khan",
      progress: [
        { label: "Lorem ipsum", value: 5, total: 10 },
        { label: "Lorem ipsum", value: 4, total: 15 },
        { label: "Lorem ipsum", value: 2, total: 20 },
      ],
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="section_heading my-4">Client progress tracker</h2>

      <Row>
        {clients.map((client, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm border-primary" style={{ borderWidth: "1px" }}>
              <Card.Body>
                <Card.Title className="fw-semibold mb-4">{client.name}</Card.Title>

                {client.progress.map((item, i) => (
                  <div key={i} className="mb-3">
                    <div className="d-flex justify-content-between small text-secondary mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}/{item.total}</span>
                    </div>

                    <ProgressBar
                      now={(item.value / item.total) * 100}
                      style={{ height: "6px" }}
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ClientProgressTracker;
