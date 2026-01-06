import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin, Home } from "lucide-react";

const SearchBar = () => {
  return (
    <Container

      className="py-3"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #0b5ed7)",
        borderRadius: "12px",
      }}
    >
      <Container>
        <Row>
          <Col className="col-10">
            <Row
              className="align-items-center bg-white shadow p-2 rounded-2xl"

            >
              {/* Location */}
              <Col
                md={4}
                className="d-flex align-items-center"
                style={{
                  borderRight: "1px solid #e5e5e5",
                }}
              >
                <MapPin size={18} className="me-2 text-primary" />
                <Form.Select
                  className="border-0 p-2"
                  style={{ boxShadow: "none" }}
                >
                  <option>Select Location</option>
                  <option>Lucknow</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                </Form.Select>
              </Col>

              {/* Venue */}
              <Col
                md={4}
                className="d-flex align-items-center"
                style={{
                  borderRight: "1px solid #e5e5e5",
                }}
              >
                <Home size={18} className="me-2 text-primary" />
                <Form.Select
                  className="border-0 p-2"
                  style={{ boxShadow: "none" }}
                >
                  <option>Select Venue</option>
                  <option>Stadium</option>
                  <option>Banquet Hall</option>
                  <option>Playground</option>
                </Form.Select>
              </Col>

              {/* Search Button */}
              <Col md={4} className="text-end">
                <Button
                  className="fw-semibold"
                  style={{
                    backgroundColor: "#0d6efd",
                    border: "none",
                    padding: "10px 26px",
                    borderRadius: "8px",
                  }}
                >
                  SEARCH
                </Button>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SearchBar;
