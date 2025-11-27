import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import "../../styelsheets/EventPage/CreateEvent.css";

function CelebratiesPerformers() {

  const [hasParticipants, setHasParticipants] = useState(true);

  const [performers, setPerformers] = useState([
    { name: "", role: "", file: null, new: false },
  ]);

  // ADD NEW BLOCK
  const addMore = () => {
    setPerformers([
      ...performers,
      { name: "", role: "", file: null, new: true },
    ]);
  };

  // DELETE BLOCK
  const deleteRow = (index) => {
    if (index === 0) return; // Prevent deleting first row
  
    const updated = performers.filter((_, i) => i !== index);
    setPerformers(updated);
  };

  // HANDLE INPUT CHANGES
  const handleChange = (index, field, value) => {
    const updated = [...performers];
    updated[index][field] = value;
    setPerformers(updated);
  };

  // SAVE LISTING (Confirm data)
  const handleSave = () => {
    setPerformers(performers.map((p) => ({ ...p, new: false })));
    console.log("Form Data:", performers);
  };

  return (
    <section>
      <Container className="container_wrapper Organisers">

        <h2 className="sub_title mb-4">Participants / Organisers</h2>

        {/* Celebrities Yes/No */}
        <Row>
          <Col>
            <div className="mb-3 event_calendar ">
              <label className="form-label">Any Participants / Organisers</label>

              <div className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={hasParticipants}
                    onChange={() => setHasParticipants(true)}
                  />
                  <label className="form-check-label">Yes</label>
                </div>

                <div className="form-check ms-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={!hasParticipants}
                    onChange={() => setHasParticipants(false)}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </Col>
        </Row>


        {/* Conditional Block */}
        {hasParticipants && performers.map((item, index) => (
          <div
            key={index}
            className="p-3 mb-4"
            style={{
              border: item.new ? "1px solid #ccc" : "1px solid transparent",
              borderRadius: "8px",
            }}
          >
            <Row>
              {/* Name */}
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Name of Participant / Organiser*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </div>
              </Col>

              {/* Role */}
              <Col md={6}>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>Enter Role/Title*</Form.Label>
                    <Form.Select
                      value={item.role}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Guide">Guide</option>
                      <option value="Performer">Performer</option>
                      <option value="Team">Team</option>
                      <option value="Celebrities">Celebrities</option>
                      <option value="Coach">Coach</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>

              {/* Upload */}
              <Col md={6}>
                <label className="form-label">
                  Upload Image (430×200px, max 5MB)
                </label>
                <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                  <FiUpload size={20} className="mb-1" />
                  <span className="text-muted">Upload Image</span>

                  <Form.Control
                    type="file"
                    className="file-input"
                    onChange={(e) =>
                      handleChange(index, "file", e.target.files[0])
                    }
                  />
                </div>

                {/* Image Preview */}
                {item.file && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(item.file)}
                      alt="Preview"
                      style={{
                        width: "140px",
                        height: "auto",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}
              </Col>


              {/* Delete Button */}
              {index > 0 && (
                <Col md={6} className="d-flex align-items-end justify-content-end">
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


        {/* Buttons */}
        {hasParticipants && (
          <Row>
            <Col className="d-flex justify-content-end">
              <div className="save_btn">
                <button onClick={addMore}>+ Add more</button>
              </div>
              <div className="save_btn ms-3">
                <button onClick={handleSave}>Save Listing</button>
              </div>
            </Col>
          </Row>
        )}

      </Container>
    </section>
  );
}

export default CelebratiesPerformers;
