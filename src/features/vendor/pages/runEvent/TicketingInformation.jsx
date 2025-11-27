import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";
import { FiTrash2 } from "react-icons/fi";

function TicketingInformation() {
  const [performers, setPerformers] = useState([
    { name: "", role: "" } // first row (no delete)
  ]);

  // ADD NEW ROW
  const addMore = () => {
    setPerformers([
      ...performers,
      { name: "", role: "", new: true } // new row with delete icon
    ]);
  };

  // DELETE ROW
  const deleteRow = (index) => {
    const updated = performers.filter((_, i) => i !== index);
    setPerformers(updated);
  };

  // HANDLE TEXT INPUT CHANGES
  const handleChange = (index, field, value) => {
    const updated = [...performers];
    updated[index][field] = value;
    setPerformers(updated);
  };

  return (
    <section>
      <Container className="container_wrapper">
          <h2 className='sub_title mb-4'>Ticketing Information</h2>

        {/* Static: Free/Paid Radio */}
        <Row>
          <Col className="col-12 event_calendar">
            <div className="mb-3">
              <label className="form-label">Any Celebrities/Performers</label>

              <div className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="celebType"
                    id="free"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="free">Free</label>
                </div>

                <div className="form-check ms-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="celebType"
                    id="paid"
                  />
                  <label className="form-check-label" htmlFor="paid">Paid</label>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Dynamic Rows */}
        {performers.map((item, index) => (
          <div
            key={index}
            className="p-3 mb-4"
            style={{
              border: item.new ? "1px solid #ccc" : "none",
              borderRadius: "8px"
            }}
          >
            <Row>
              {/* Name Field */}
              <Col className="col-6">
                <div className="mb-3">
                  <label className="form-label">Enter Name of Speakers/Performers*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={item.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                </div>
              </Col>

              {/* Role Field */}
              <Col className="col-6">
                <div className="mb-3">
                  <label className="form-label">Enter Role/Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Role/Title"
                    value={item.role}
                    onChange={(e) => handleChange(index, "role", e.target.value)}
                  />
                </div>
              </Col>

              {/* Delete Icon (ONLY for new rows) */}
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

        {/* Add More Button */}
        <Row>
          <Col className="col-12 d-flex justify-content-end">
            <div className="save_btn">
                <button  onClick={addMore}>
              + Add more
            </button>
            </div>
             <div className="save_btn ms-3">
                <button>Save Listing </button>
             </div>
          </Col>
        </Row>

      </Container>
    </section>
  );
}

export default TicketingInformation;
