import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";
import { FiTrash2 } from "react-icons/fi";

function TicketingInformation({ payload, updatePayload }) {

  /* 🔹 FREE / PAID STATE (FREE by default) */
  const [eventType, setEventType] = useState("Free");

  /* 🔹 LOCAL STATE (tickets) */
  const [tickets, setTickets] = useState(
    payload.tickets?.length
      ? payload.tickets.map(t => ({
        categoryName: t.categoryName || "",
        price: t.price || "",
        description: t.description || "",
        new: false
      }))
      : [
        {
          categoryName: "",
          price: "",
          description: "",
          new: false
        }
      ]
  );

  /* ✅ SYNC TO PAYLOAD */
  useEffect(() => {
    if (eventType === "Free") {
      updatePayload("tickets", []);
      return;
    }

    const payloadTickets = tickets.map(t => ({
      categoryName: t.categoryName,
      price: Number(t.price),
      description: t.description
    }));

    updatePayload("tickets", payloadTickets);
  }, [tickets, eventType]);

  /* 🔹 ADD ROW */
  const addMore = () => {
    setTickets([
      ...tickets,
      {
        categoryName: "",
        price: "",
        description: "",
        new: true
      }
    ]);
  };

  /* 🔹 DELETE ROW */
  const deleteRow = (index) => {
    const updated = tickets.filter((_, i) => i !== index);
    setTickets(updated);
  };

  /* 🔹 HANDLE CHANGE */
  const handleChange = (index, field, value) => {
    const updated = [...tickets];
    updated[index][field] = value;
    setTickets(updated);
  };

  return (
    <section>
      <Container className="container_wrapper">
        <h2 className="sub_title mb-4">Ticketing Information</h2>

        {/* FREE / PAID */}
        <Row>
          <Col className="col-12 event_calendar">
            <div className="mb-3">
              <label className="form-label">Event Type</label>

              <div className="d-flex">
                {/* FREE */}
                <div className="form-check">
                  <input
                    type="radio"
                    name="eventType"
                    className="form-check-input"
                    checked={eventType === "Free"}
                    onChange={() => setEventType("Free")}
                  />
                  <label className="form-check-label">Free</label>
                </div>

                {/* PAID */}
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="eventType"
                    className="form-check-input"
                    checked={eventType === "Paid"}
                    onChange={() => setEventType("Paid")}
                  />
                  <label className="form-check-label">Paid</label>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* 🚨 TICKETS — ONLY WHEN PAID */}
        {eventType === "Paid" && (
          <>
            {tickets.map((item, index) => (
              <div
                key={index}
                className="p-3 mb-4"
                style={{
                  border: item.new ? "1px solid #ccc" : "none",
                  borderRadius: "8px"
                }}
              >
                <Row>
                  {/* Category */}
                  <Col className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Ticket Category*</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.categoryName}
                        onChange={(e) =>
                          handleChange(index, "categoryName", e.target.value)
                        }
                      />
                    </div>
                  </Col>

                  {/* Price */}
                  <Col className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Price*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(index, "price", e.target.value)
                        }
                      />
                    </div>
                  </Col>

                  {/* Description */}
                  <Col className="col-4">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </Col>

                  {/* DELETE */}
                  {item.new && (
                    <Col className="col-12 d-flex justify-content-end">
                      <button
                        className="btn btn-danger d-flex align-items-center justify-content-center text-white"
                        onClick={() => deleteRow(index)}
                        style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </Col>
                  )}
                </Row>
              </div>
            ))}

            {/* ACTION BUTTONS */}
            <Row>
              <Col className="col-12 d-flex justify-content-end">
                <div className="save_btn">
                  <button onClick={addMore}>+ Add more</button>
                </div>
                <div className="save_btn ms-3">
                  <button>Save Listing</button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}

export default TicketingInformation;
