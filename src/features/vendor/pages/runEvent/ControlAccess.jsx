import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function ControlAccess({ payload, updatePayload }) {

    const [celebType, setCelebType] = useState("Free");

    /* 🔹 SYNC PAYLOAD → STATE (EDIT MODE FIX) */
    useEffect(() => {
        if (payload?.celebType) {
            setCelebType(payload.celebType);
        }
    }, [payload?.celebType]);

    /* 🔹 HANDLE CHANGE */
    const handleChange = (value) => {
        setCelebType(value);
        updatePayload("celebType", value); // 🔥 backend sync
    };

    /* 🔹 SAVE (OPTIONAL) */
    const handleSave = () => {
        console.log("✅ Celeb/Performer Type Saved:", celebType);
    };

    return (
        <section>
            <Container className="container_wrapper">
                <h2 className="sub_title mb-4">Celebraties/Performers</h2>

                <Row>
                    <Col className="col-12 event_calendar">
                        <div className="mb-3">
                            <label className="form-label">
                                Any Celebrities/Performers
                            </label>

                            <div className="d-flex">
                                {/* Free */}
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="celebType"
                                        value="Free"
                                        checked={celebType === "Free"}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    <label className="form-check-label">Free</label>
                                </div>

                                {/* Paid */}
                                <div className="form-check ms-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="celebType"
                                        value="Paid"
                                        checked={celebType === "Paid"}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    <label className="form-check-label">Paid</label>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Save Button */}
                <Row className="justify-end">
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

export default ControlAccess;
