import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";

function RulesRegulation({ payload, updatePayload }) {

  const [form, setForm] = useState({
    safetyProtocols: "",
    FAQ: ""
  });

  /* 🔹 SYNC PAYLOAD → UI */
  useEffect(() => {
    setForm({
      safetyProtocols: payload.safetyProtocols || "",
      FAQ: payload.FAQ || ""
    });
  }, [payload.safetyProtocols, payload.FAQ]);

  /* 🔹 HANDLE CHANGE */
  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));

    // 🔥 update main payload immediately
    updatePayload(field, value);
  };

  /* 🔹 SAVE (OPTIONAL) */
  const handleSave = () => {
    console.log("✅ Rules & Regulation Saved:", form);
  };

  return (
    <section>
      <Container className="container_wrapper">
        <h2 className="sub_title mb-4">Rules & Regulation</h2>

        <Row>
          {/* Safety Protocols */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Safety Protocols*</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Safety Protocols*"
                value={form.safetyProtocols}
                onChange={(e) =>
                  handleChange("safetyProtocols", e.target.value)
                }
              />
            </div>
          </Col>

          {/* FAQ */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">
                FAQs or General Guidelines
              </label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="FAQs or General Guidelines"
                value={form.FAQ}
                onChange={(e) =>
                  handleChange("FAQ", e.target.value)
                }
              />
            </div>
          </Col>
        </Row>

        {/* SAVE BUTTON */}
        <Row className="justify-end mt-4">
          <Col className="col-4">
            <div className="save_btn ms-3">
              <button onClick={handleSave}>Save Listing</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RulesRegulation;
