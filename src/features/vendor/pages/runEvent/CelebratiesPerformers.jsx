import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import "../../styelsheets/EventPage/CreateEvent.css";

function CelebratiesPerformers({ payload, updatePayload }) {
  const [hasParticipants, setHasParticipants] = useState(true);
  const isInitialMount = useRef(true);

  const [performers, setPerformers] = useState([
    {
      id: Date.now(),
      name: "",
      role: "",
      bio: "",
      file: null,
      preview: null,
      new: false,
    },
  ]);

  /* ✅ SYNC ONLY FIRST TIME (edit / api case) */
  useEffect(() => {
    if (!payload?.performers?.length) return;
    if (!isInitialMount.current) return;

    const mapped = payload.performers.map((p, index) => {
      const file = payload.performerImages?.[index] || null;
      return {
        id: Date.now() + index,
        name: p.name || "",
        role: p.title || "",
        bio: p.bio || "",
        file,
        preview: file ? URL.createObjectURL(file) : null,
        new: false,
      };
    });

    setPerformers(mapped);
    isInitialMount.current = false;
  }, [payload.performers, payload.performerImages]);

  /* 🔹 AUTO SYNC PAYLOAD */
  const syncPayload = (data) => {
    const valid = data.filter((p) => p.name && p.role);

    updatePayload(
      "performers",
      valid.map((p) => ({
        name: p.name,
        title: p.role,
        bio: p.bio,
      }))
    );

    updatePayload(
      "performerImages",
      valid.map((p) => p.file).filter(Boolean)
    );
  };

  /* 🔹 CHANGE HANDLER */
  const handleChange = (index, field, value) => {
    const updated = [...performers];

    if (field === "file") {
      updated[index].file = value;
      updated[index].preview = value
        ? URL.createObjectURL(value)
        : null;
    } else {
      updated[index][field] = value;
    }

    setPerformers(updated);
    syncPayload(updated);
  };

  /* 🔹 ADD MORE */
  const addMore = () => {
    setPerformers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        role: "",
        bio: "",
        file: null,
        preview: null,
        new: true,
      },
    ]);
  };

  /* 🔹 DELETE */
  const deleteRow = (index) => {
    if (index === 0) return;
    const updated = performers.filter((_, i) => i !== index);
    setPerformers(updated);
    syncPayload(updated);
  };

  return (
    <section>
      <Container className="container_wrapper Organisers">
        <h2 className="sub_title mb-4">Participants / Organisers</h2>

        {/* YES / NO */}
        <Row>
          <Col>
            <div className="mb-3 event_calendar">
              <label className="form-label">
                Any Participants / Organisers
              </label>

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
                    onChange={() => {
                      setHasParticipants(false);
                      updatePayload("performers", []);
                      updatePayload("performerImages", []);
                    }}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* BLOCKS */}
        {hasParticipants &&
          performers.map((item, index) => (
            <div
              key={item.id}
              className="p-3 mb-4"
              style={{
                border: item.new
                  ? "1px solid #ccc"
                  : "1px solid transparent",
                borderRadius: "8px",
              }}
            >
              <Row>
                {/* NAME */}
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">
                      Enter Name of Participant / Organiser*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                </Col>

                {/* ROLE */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Role/Title*</Form.Label>
                    <Form.Select
                      value={item.role}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Chief Guest">Chief Guest</option>
                      <option value="Performer">Performer</option>
                      <option value="Team">Team</option>
                      <option value="Celebrities">Celebrities</option>
                      <option value="Coach">Coach</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* BIO */}
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.bio}
                      onChange={(e) =>
                        handleChange(index, "bio", e.target.value)
                      }
                    />
                  </div>
                </Col>

                {/* IMAGE */}
                <Col md={6}>
                  <label className="form-label">
                    Upload Image (430×200px, max 5MB)
                  </label>

                  <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                    {item.preview ? (
                      <img
                        src={item.preview}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <>
                        <FiUpload size={20} className="mb-1" />
                        <span className="text-muted">Upload Image</span>
                      </>
                    )}

                    <Form.Control
                      type="file"
                      className="file-input"
                      onChange={(e) =>
                        handleChange(index, "file", e.target.files[0])
                      }
                    />
                  </div>
                </Col>

                {/* DELETE */}
                {index > 0 && (
                  <Col
                    md={6}
                    className="d-flex align-items-end justify-content-end"
                  >
                    <button
                      type="button"
                      className="btn btn-danger d-flex align-items-center justify-content-center text-white"
                      onClick={() => deleteRow(index)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </Col>
                )}
              </Row>
            </div>
          ))}

        {/* ONLY ADD MORE */}
        {hasParticipants && (
          <Row>
            <Col className="d-flex justify-content-end">
              <div className="save_btn">
                <button type="button" onClick={addMore}>
                  + Add more
                </button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default CelebratiesPerformers;
