import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Dropdown,
  Pagination,
  Modal,
} from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import "../../pages/Coach/LeadsManagement.css";

function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");

  const data = [
    {
      customer: "Mihir Saha",
      training: "Yoga",
      type: "Individual",
      rating: 4.0,
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type",
    },
    {
      customer: "Mihir Saha",
      training: "Yoga",
      type: "Academy",
      rating: 4.0,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
  ];

  const limitText = (text, limit = 40) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const handleOpenModal = (fullText) => {
    setSelectedReview(fullText);
    setShowModal(true);
  };

  return (
    <>
      <section>
        <Container className="container_wrapper py-4">
          <Row className="d-flex justify-content-between mb-3 align-items-center">
            <Col></Col>
            <Col className="d-flex justify-content-end gap-2">
              <Button  variant="outline-primary" className="top-btn">
                Export
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" className="top-btn">
                  Last Week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>This Week</Dropdown.Item>
                  <Dropdown.Item>Last Month</Dropdown.Item>
                  <Dropdown.Item>Last 3 Months</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* Table */}
          <Table responsive bordered={false} className="reviews-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Training Name</th>
                <th>Event Type</th>
                <th>Rating</th>
                <th>Reviews</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.customer}</td>
                  <td>{item.training}</td>
                  <td>{item.type}</td>

                  <td className="rating-col">
                    <BsStarFill className="star-icon" /> {item.rating}
                  </td>

                  {/* Clickable Review Text */}
                  <td
                    className="review-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(item.review)}
                  >
                    {limitText(item.review, 50)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>

      {/* Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Full Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedReview}</Modal.Body>
        
      </Modal>
    </>
  );
}

export default Reviews;
