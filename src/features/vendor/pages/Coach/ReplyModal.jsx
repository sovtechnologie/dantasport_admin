import React from "react";
import { Modal, Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import "../../pages/Coach/LeadsManagement.css";

function ReplyModal({ show, onHide, lead }) {
  // Dummy chat data for demonstration
  const chatData = [
    { type: "sent", message: "Let's get lunch. How about pizza?" },
    { type: "received", message: "Let's do it! I'm in a meeting until noon." },
    { type: "sent", message: "Let's get lunch. How about pizza?" },
    { type: "received", message: "Let's do it! I'm in a meeting until noon." },
    { type: "sent", message: "Let's get lunch. How about pizza?" },
    { type: "received", message: "Let's do it! I'm in a meeting until noon." },
  ];

  // Demo images
  const senderImg = "https://randomuser.me/api/portraits/men/75.jpg"; // sender
  const receiverImg = "https://randomuser.me/api/portraits/women/65.jpg"; // receiver

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{lead?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <p className="text-muted">
          {lead?.name}@gmail.com | +91 {lead?.contact} | Sent on {lead?.date}
        </p>

        <div className="chat-container">
          {chatData.map((chat, index) => (
            <Row
              key={index}
              className={`mb-2 ${chat.type === "sent" ? "justify-content-end" : "justify-content-start"}`}
            >
              {chat.type === "received" && (
                <Col xs="auto">
                  <Image
                    src={receiverImg}
                    roundedCircle
                    width={40}
                    height={40}
                  />
                </Col>
              )}

              <Col xs="auto">
                <div
                  className={`chat-bubble ${chat.type === "sent" ? "sent" : "received"}`}
                >
                  {chat.message}
                </div>
              </Col>

              {chat.type === "sent" && (
                <Col xs="auto">
                  <Image
                    src={senderImg}
                    roundedCircle
                    width={40}
                    height={40}
                  />
                </Col>
              )}
            </Row>
          ))}
        </div>

        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Type your message..."
          className="mt-3 p-3"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button className="w-100 py-2" onClick={onHide}>
          SEND REPLY
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReplyModal;
