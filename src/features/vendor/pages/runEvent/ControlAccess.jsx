import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function ControlAccess({ payload, updatePayload }) {

    // 🔹 ensure default boolean
    useEffect(() => {
        if (typeof payload.qrCodeCheckIn !== "boolean") {
            updatePayload("qrCodeCheckIn", false);
        }
    }, []);

    // 🔹 radio handler (UI SAME)
    const handleChange = (value) => {
        const booleanValue = value === "Paid"; // Paid => true, Free => false
        updatePayload("qrCodeCheckIn", booleanValue);
    };

    return (
        <section>
            <Container className="container_wrapper">
                <h2 className="sub_title mb-4">Celebraties/Performers</h2>

                <Row>
                    <Col className="col-12 event_calendar">
                        <div className="mb-3">
                            <label className="form-label">
                                QR Code Check-ins Required?*
                            </label>

                            <div className="d-flex">
                                {/* Free */}
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="qrCodeCheckIn"
                                        checked={payload.qrCodeCheckIn === false}
                                        onChange={() => handleChange("Free")}
                                    />
                                    <label className="form-check-label">Free</label>
                                </div>

                                {/* Paid */}
                                <div className="form-check ms-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="qrCodeCheckIn"
                                        checked={payload.qrCodeCheckIn === true}
                                        onChange={() => handleChange("Paid")}
                                    />
                                    <label className="form-check-label">Paid</label>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default ControlAccess;
