import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

function SearchBox() {
  return (
    <section className="py-4">
      <Container>
        {/* Outer Blue Box */}
        <div className="bg-primary rounded-3 p-3 shadow">
          <Row className="g-3">
            <Col className="col-7">
              <InputGroup className="h-100">
                <InputGroup.Text className="bg-white border-0 ps-3">
                  <Search className="text-primary" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search By anything"
                  className="border-0 shadow-none"
                />
              </InputGroup>
            </Col>
            {/* Search Button */}
            <Col  className="col-5 text-end">
              <Button
                variant="light"
                className="fw-semibold h-100 border-start"
              >
                SEARCH
              </Button>
            </Col>

          </Row>
        </div>
      </Container>
    </section>
  );
}

export default SearchBox;
