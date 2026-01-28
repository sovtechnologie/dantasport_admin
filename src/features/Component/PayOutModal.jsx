import React, { useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function PayOutModal({ show, onClose, paymentData }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grossValue, setGrossValue] = useState("");
  const [gstValue, setGstValue] = useState("");
  const [netPayableAmount, setNetPayableAmount] = useState("");
  const [utr, setUtr] = useState("");
  const [payoutDate, setPayoutDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Calculate total pending payout from paymentData
  const totalNetPayable = useMemo(() => {
    return paymentData
      .filter((item) => item.status === "Pending")
      .reduce((sum, item) => sum + Number(item.netAmount.replace(",", "")), 0);
  }, [paymentData]);

  const handleConfirm = () => {
    const payload = {
      startDate,
      endDate,
      grossValue,
      gstValue,
      netPayableAmount,
      totalNetPayable,
      utr,
      payoutDate,
      remarks,
      file,
    };

    console.log("PAYOUT PAYLOAD 👉", payload);
    onClose();
  };

  const inputStyle = {
    height: "50px",
    borderRadius: "12px",
    color: "#6c757d",
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      {/* Header */}
      <Modal.Header
        closeButton
        style={{ background: "#1163C7", color: "white" }}
        closeVariant="white"
      >
        <Modal.Title style={{ fontSize: "20px" }}>Payout Settlement</Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        <p>Total Number of selected: <strong style={{color: "#1163C7"}}>10</strong></p>
        <Form>
        

          {/* Gross, GST, Net Payable, UTR */}
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Label>Date End</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                value={payoutDate}
                onChange={(e) => setPayoutDate(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                value={payoutDate}
                onChange={(e) => setPayoutDate(e.target.value)}
              />
            </Col>
            <Col className="col-6">
              <Form.Label>Total Taxable Value (₹)</Form.Label>
               <Form.Control
                style={inputStyle}
                placeholder="Taxable Value"
                value={grossValue}
                onChange={(e) => setGrossValue(e.target.value)}
                
              />
            </Col>
            
          </Row>
          <Row className="g-4">
            <Col className="col-6">
              <Form.Label>GST / Service Tax (₹)</Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="Enter GST / Service Tax %"
                value={gstValue}
                onChange={(e) => setGstValue(e.target.value)}
              />
            </Col>
            <Col className="col-6">
              <Form.Label>Total GST</Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="Total GST"
                value={gstValue}
                onChange={(e) => setGstValue(e.target.value)}
              />
            </Col>
             <Col className="col-6">
              <Form.Label>Total TDS Value (₹)</Form.Label>
               <Form.Control
                style={inputStyle}
                placeholder="Enter TDS Value %"
                value={grossValue}
                onChange={(e) => setGrossValue(e.target.value)}
                
              />
            </Col>
            <Col className="col-6">
              <Form.Label>Total TDS Value (₹)</Form.Label>
               <Form.Control
                style={inputStyle}
                placeholder="Total TDS Value "
                value={grossValue}
                onChange={(e) => setGrossValue(e.target.value)}
                
              />
            </Col>
          </Row>

          {/* Payout Date & Remarks */}
          <Row className="g-3 mt-2">
            <Col md={6} className="mt-3">
              <Form.Label>Net Payable Amount (₹)</Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="Enter Net Payable"
                value={netPayableAmount}
                onChange={(e) => setNetPayableAmount(e.target.value)}
              />
            </Col>
            <Col md={6} className="mt-3">
              <Form.Label>UTR Transaction ID</Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="Enter UTR"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Payout Date</Form.Label>
              <Form.Control
                type="date"
                style={inputStyle}
                value={payoutDate}
                onChange={(e) => setPayoutDate(e.target.value)}
              />
            </Col>
            
            <Col className="col-6">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="Optional remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Col>
            <Col  className=" col-12 mt-3">
              <Form.Label>Payment Attachment</Form.Label>
              <Form.Control
                type="file"
                
                accept=".pdf,.xls,.xlsx,.csv"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer className="border-top-0">
        <Button
          style={{ background: "#1163C7" }}
          disabled={
            !startDate ||
            !endDate ||
            !grossValue ||
            !netPayableAmount ||
            !utr ||
            !payoutDate
          }
          onClick={handleConfirm}
        >
          Confirm Payout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PayOutModal;
