import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function EventGuide({ payload, updatePayload }) {
  return (
    <section>
      <Container className="container_wrapper">
        <h2 className="sub_title mb-4">Event Guide</h2>

        <Row>
          {/* Language */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Event Language*</label>
              <input
                className="form-control"
                placeholder="E.g, english, hindi"
                value={payload.language ?? ""}
                onChange={(e) => updatePayload("language", e.target.value)}
              />
            </div>
          </Col>

          {/* Duration */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Enter Duration*</label>
              <input
                className="form-control"
                placeholder="e.g., 30 min"
                value={payload.duration ?? ""}
                onChange={(e) => updatePayload("duration", e.target.value)}
              />
            </div>
          </Col>

          {/* Ticket Needed For */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Ticket Needed For*</label>
              <input
                className="form-control"
                placeholder="e.g., 10yrs & above"
                value={payload.ticketNeedFor ?? ""}
                onChange={(e) =>
                  updatePayload("ticketNeedFor", e.target.value)
                }
              />
            </div>
          </Col>

          {/* Entry Allowed */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Entry Allowed for*</label>
              <input
                className="form-control"
                placeholder="e.g., 10yrs & above"
                value={payload.EntryAllowed ?? ""}
                onChange={(e) =>
                  updatePayload("EntryAllowed", e.target.value)
                }
              />
            </div>
          </Col>

          {/* Layout */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Enter Layout*</label>
              <input
                className="form-control"
                placeholder="e.g., outdoor"
                value={payload.layout ?? ""}
                onChange={(e) => updatePayload("layout", e.target.value)}
              />
            </div>
          </Col>

          {/* Kids Friendly */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Kids Friendly*</label>
              <select
                className="form-control"
                value={payload.kidsFridenly ?? ""}
                onChange={(e) =>
                  updatePayload("kidsFridenly", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </Col>

          {/* Pets Friendly */}
          <Col className="col-6">
            <div className="mb-3">
              <label className="form-label">Pets Friendly*</label>
              <select
                className="form-control"
                value={payload.petsFriendly ?? ""}
                onChange={(e) =>
                  updatePayload("petsFriendly", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </Col>
          {/* Things To Carry */}
          <Col className="col-12">
            <div className="mb-3">
              <label className="form-label">Things To Carry*</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="e.g., ID card, water bottle, yoga mat"
                value={payload.thingsToCarry ?? ""}
                onChange={(e) =>
                  updatePayload("thingsToCarry", e.target.value)
                }
              />
            </div>
          </Col>

          {/* Instructions */}
          <Col className="col-12">
            <div className="mb-3">
              <label className="form-label">Instructions*</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="e.g., Reach 15 minutes early, follow safety rules"
                value={payload.instruction ?? ""}
                onChange={(e) =>
                  updatePayload("instruction", e.target.value)
                }
              />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default EventGuide;
