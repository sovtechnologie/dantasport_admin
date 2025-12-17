import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";

function CancelationPolicy({ payload, updatePayload }) {

  const [form, setForm] = useState({
    termAndConditions: "",
    cancellationPolicy: ""
  });

  /* 🔹 SYNC PAYLOAD → FORM */
  useEffect(() => {
    setForm({
      termAndConditions: payload.termAndConditions || "",
      cancellationPolicy: payload.cancellationPolicy || ""
    });
  }, [payload.termAndConditions, payload.cancellationPolicy]);

  /* 🔹 HANDLE CHANGE */
  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));

    // 🔥 update main payload
    updatePayload(field, value);
  };

  /* 🔹 SAVE (OPTIONAL) */
  const handleSave = () => {
    console.log("✅ Cancellation Policy Saved:", form);
  };

  return (
    <section>
      <Container className="container_wrapper">
        <h2 className="sub_title mb-4">T&C/ Cancelation Policy</h2>

        <Row>
          {/* Terms & Conditions */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Terms & Condition*</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Terms & Condition*"
                value={form.termAndConditions}
                onChange={(e) =>
                  handleChange("termAndConditions", e.target.value)
                }
              />
            </div>
          </Col>

          {/* Cancellation Policy */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Cancellation Policy*</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Cancellation Policy*"
                value={form.cancellationPolicy}
                onChange={(e) =>
                  handleChange("cancellationPolicy", e.target.value)
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

export default CancelationPolicy;
