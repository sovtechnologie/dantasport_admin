import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AdminAddCoupon() {
  return (
    <section className="py-4">
      <Container>
        <div className="border rounded bg-white p-4">

          {/* Heading */}
          <h5 className="text-primary fw-semibold mb-4">
            Add Discount Coupon
          </h5>

          <Form>

            {/* Row 1 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Location *</Form.Label>
                <Form.Select style={{height: "56px", borderRadius:"12px"}}>
                  <option value="venue">Select Location</option>
                   <option value="Turf">Lucknow</option>
                    <option value="gym">Delhi</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Enter Coupon Code Name*</Form.Label>
                <Form.Control type="text" placeholder="SA012" style={{height: "56px", borderRadius:"12px"}}/>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mb-3">
              <Col md={6}>
                <div>
                  <Form.Label>Coupon Type*</Form.Label>
                </div>
                <div className="d-inline-flex me-3 gap-4 mt-2" style={{ borderRadius:"6px", border: "1px solid #B1B1B1",padding:"10px"}}>
                  <Form.Check
                    type="radio"
                    label="Upto"
                    name="couponType"
                    
                  />
                 
                </div>
                <div className="d-inline-flex" style={{ borderRadius:"6px", border: "1px solid #B1B1B1",padding:"10px"}}>
                   <Form.Check
                    type="radio"
                    label="Flat"
                    name="couponType"
                  />
                </div>
              </Col>

              <Col md={6}>
                <Form.Label>Enter Value in ₹*</Form.Label>
                <Form.Control placeholder="Eg: ₹100 or 10%" style={{height: "56px", borderRadius:"12px"}}/>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Enter Maximum Discount Amount*</Form.Label>
                <Form.Control style={{height: "56px", borderRadius:"12px"}} placeholder="Maximum Discount"/>
              </Col>

              <Col md={6}>
                <Form.Label>Enter Minimum Booking Value*</Form.Label>
                <Form.Control style={{height: "56px", borderRadius:"12px"}} placeholder="Minimum Booking"/>
              </Col>
            </Row>
            {/* Dates */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Enter Start Date*</Form.Label>
                <Form.Control type="date"style={{height: "56px", borderRadius:"12px"}} />
              </Col>

              <Col md={6}>
                <Form.Label>Enter Expiry Date*</Form.Label>
                <Form.Control type="date" style={{height: "56px", borderRadius:"12px"}}/>
              </Col>
            </Row>
            {/* Description */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Enter Coupon Description*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Eg: Applicable to only for first user"
                />
              </Col>

            </Row>



            {/* Applicable To */}
            <Row className="mb-4">
              <Col>
                <Form.Label>Applicable To*</Form.Label>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <Button variant="outline-secondary" size="sm">
                   Turfs
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Gyms
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Events
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Runs
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Submit */}
            <div className="text-center">
              <Button className="px-5 fw-semibold">
                CREATE DISCOUNT COUPON
              </Button>
            </div>

          </Form>
        </div>
      </Container>
    </section>
  );
}

export default AdminAddCoupon;
