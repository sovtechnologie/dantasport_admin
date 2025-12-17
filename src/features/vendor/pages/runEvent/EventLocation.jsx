import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import "../../styelsheets/EventPage/CreateEvent.css";
import GooglePlacesAutocomplete from "../../../../components/GooglePlacesAutocomplete";

/* 🔹 STATIC LOCATION (API REQUIRED FORMAT) */
const STATIC_LOCATION = {
    lat: 28.5452545,
    lng: 77.5545487,
    fullAddress: "Bharat colony",
    area: "Faridabad",
    city: "Faridabad",
    state: "HR",
    pincode: 121002,
};

function EventLocation({ payload, updatePayload }) {
    /* 🔹 Always fallback to static location */
    const location = payload?.locations?.[0] || STATIC_LOCATION;

    /* 🔹 Map state only */
    const [mapLocation, setMapLocation] = useState({
        latitude: location.lat,
        longitude: location.lng,
    });

    /* ✅ AUTO SET STATIC LOCATION ON LOAD */
    useEffect(() => {
        if (!payload?.locations || payload.locations.length === 0) {
            updatePayload("locations", [STATIC_LOCATION]);
        }
    }, []);

    /* 🔹 Google Place Select (Optional Override) */
    const onPlaceSelect = ({
        address,
        area,
        city,
        state,
        pincode,
        latitude,
        longitude,
    }) => {
        const updatedLocation = {
            lat: latitude,
            lng: longitude,
            fullAddress: address,
            area,
            city,
            state,
            pincode: Number(pincode),
        };

        updatePayload("locations", [updatedLocation]);

        if (latitude && longitude) {
            setMapLocation({
                latitude,
                longitude,
            });
        }
    };

    /* 🔹 Google Map iframe */
    const mapSrc = `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=15&output=embed`;

    return (
        <section>
            <Container className="container_wrapper">
                <Row>
                    <Col className="col-6">
                        <div className="d-flex justify-between">
                            <h2 className="sub_title mb-4">Location Info</h2>
                            <div className="edit_btn">
                                <button type="button">
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {/* LEFT SIDE */}
                    <Col className="col-6">
                        {/* 🔍 SEARCH (OPTIONAL) */}
                        <div className="mb-3">
                            <GooglePlacesAutocomplete
                                placeholder="Search for a location"
                                value={location.fullAddress}
                                onPlaceSelect={onPlaceSelect}
                                border
                            />
                        </div>

                        {/* EMAIL (UNCHANGED) */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                            />
                        </div>

                        <Row>
                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Area*</Form.Label>
                                    <Form.Select value={location.area} disabled>
                                        <option>{location.area}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>City*</Form.Label>
                                    <Form.Select value={location.city} disabled>
                                        <option>{location.city}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>State*</Form.Label>
                                    <Form.Select value={location.state} disabled>
                                        <option>{location.state}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">Pincode*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location.pincode}
                                        readOnly
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    {/* RIGHT SIDE MAP */}
                    <Col className="col-6">
                        <Card
                            style={{
                                borderRadius: "14px",
                                padding: "20px",
                                border: "1px solid #e5e5e5",
                            }}
                        >
                            <h5 className="fw-bold mb-2">Location</h5>

                            <p className="mb-3 text-secondary" style={{ fontSize: "15px" }}>
                                {location.fullAddress}
                            </p>

                            <div
                                style={{
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    width: "100%",
                                    height: "260px",
                                }}
                            >
                                <iframe
                                    title="location-map"
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    style={{ border: "0" }}
                                    src={mapSrc}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* SAVE BUTTON (UI SAME) */}
                <Row className="mt-4 justify-content-end">
                    <Col className="col-4 text-end">
                        <div className="save_btn mb-3">
                            <button type="button">Save Listing</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default EventLocation;
