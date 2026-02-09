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
import ExportFilter from "../../../Component/ExportFilter";

function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");

  const data = [
    {
      customer: "Mihir Saha",
      width: 200,
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
      width: 200,
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
          <ExportFilter />

          {/* Table */}
          <Table responsive bordered={false} className="reviews-table">

            {/* Column Width Control */}


            <thead >
              <tr >
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
                  <td
                    style={{
                      width: "200px",

                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.customer}
                  </td>

                  <td
                    style={{
                      width: "200px",

                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.training}
                  </td>

                  <td
                    style={{
                      width: "200px",

                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.type}
                  </td>


                  <td className="rating-col" style={{
                    width: "200px",
                    maxWidth: "120px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}>
                    <BsStarFill className="star-icon" /> {item.rating}
                  </td>

                  <td
                    className="review-text"
                    style={{
                      cursor: "pointer",
                      whiteSpace: "normal",
                      wordBreak: "break-word",

                    }}
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
