import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function SettlementHistoryModal({ show, onClose, user }) {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton style={{background: "#1163C7", color:"#fff"}}>
        <Modal.Title>Settlement History</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user ? (
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Hosted Date</Form.Label>
                <Form.Control type="date"  style={{height:"50px", borderRadius:"12px"}} />
              </Col>

              <Col md={6}>
                <Form.Label>Sports</Form.Label>
                <Form.Control placeholder="Enter sports name" style={{height:"50px", borderRadius:"12px"}} />
              </Col>

              <Col md={6}>
                <Form.Label>No. of Players Joined</Form.Label>
                <Form.Control type="number" style={{height:"50px", borderRadius:"12px"}}/>
              </Col>

              <Col md={6}>
                <Form.Label>Host Payout Amount (₹)</Form.Label>
                <Form.Control type="number" style={{height:"50px", borderRadius:"12px"}}/>
              </Col>

              <Col md={6}>
                <Form.Label>Platform Fee (₹)</Form.Label>
                <Form.Control type="number" style={{height:"50px", borderRadius:"12px"}}/>
              </Col>

              <Col md={6}>
                <Form.Label>Payable Amount (₹)</Form.Label>
                <Form.Control type="number"  style={{height:"50px", borderRadius:"12px"}}/>
              </Col>

              <Col md={6}>
                <Form.Label>Payment Status</Form.Label>
                <Form.Select style={{height:"50px", borderRadius:"12px"}}>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>UTR Number</Form.Label>
                <Form.Control placeholder="Enter UTR number" style={{height:"50px", borderRadius:"12px"}}/>
              </Col>
            </Row>
          </Form>
        ) : (
          <p>No data available</p>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        
        <Button variant="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettlementHistoryModal;
