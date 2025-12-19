import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Card, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import "../../styelsheets/EventPage/CreateEvent.css";
import GooglePlacesAutocomplete from "../../../../components/GooglePlacesAutocomplete";

/* 🔒 STATIC LAT/LNG */
const STATIC_LAT = "18.5204";
const STATIC_LNG = "73.8567";

/* 🔒 EMPTY LOCATION WITH STATIC LAT/LNG */
const EMPTY_LOCATION = {
    lat: STATIC_LAT,
    lng: STATIC_LNG,
    fullAddress: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
};

function EventLocation({ payload, updatePayload }) {
    const [locations, setLocations] = useState(() => {
        if (payload?.locations?.length) {
            return payload.locations.map((loc) => ({
                lat: STATIC_LAT,
                lng: STATIC_LNG,
                fullAddress: loc.fullAddress || "",
                area: loc.area || "",
                city: loc.city || "",
                state: loc.state || "",
                pincode: loc.pincode || "",
            }));
        }
        return [{ ...EMPTY_LOCATION }];
    });

    /* 🔹 ALWAYS SYNC TO PAYLOAD WITH STATIC LAT/LNG */
    useEffect(() => {
        const payloadLocations = locations.map((loc) => ({
            ...loc,
            lat: STATIC_LAT,
            lng: STATIC_LNG,
        }));
        updatePayload("locations", payloadLocations);
    }, [locations]);

    /* 🔹 ADD LOCATION (STATIC LAT/LNG AUTO) */
    const addLocation = () => {
        setLocations([...locations, { ...EMPTY_LOCATION }]);
    };

    /* 🔹 DELETE LOCATION */
    const deleteLocation = (index) => {
        const updated = locations.filter((_, i) => i !== index);
        setLocations(updated.length ? updated : [{ ...EMPTY_LOCATION }]);
    };

    /* 🔹 MANUAL INPUT CHANGE */
    const handleChange = (index, field, value) => {
        const updated = [...locations];
        updated[index] = {
            ...updated[index],
            [field]: value,
            lat: STATIC_LAT,
            lng: STATIC_LNG,
        };
        setLocations(updated);
    };

    /* 🔹 GOOGLE SEARCH (UI SAME, BUT LAT/LNG STATIC) */
    const onPlaceSelect = (index, place) => {
        const updated = [...locations];
        updated[index] = {
            ...updated[index],
            fullAddress: place.address || "",
            area: place.area || "",
            city: place.city || "",
            state: place.state || "",
            pincode: place.pincode || "",
            lat: STATIC_LAT,
            lng: STATIC_LNG,
        };
        setLocations(updated);
    };

    return (
        <section>
            <Container className="container_wrapper">
                <h2 className="sub_title mb-4">Location Info</h2>

                {locations.map((loc, index) => (
                    <Card key={index} className="p-4 mb-4">
                        {/* GOOGLE SEARCH */}
                        <Row className="mb-3">
                            <Col md={12}>
                                <GooglePlacesAutocomplete
                                    placeholder="Search location (required for map)"
                                    value={loc.fullAddress}
                                    onPlaceSelect={(place) =>
                                        onPlaceSelect(index, place)
                                    }
                                />
                            </Col>
                        </Row>

                        {/* MANUAL FIELDS */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Address*</Form.Label>
                                    <Form.Control
                                        value={loc.fullAddress}
                                        onChange={(e) =>
                                            handleChange(index, "fullAddress", e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Area*</Form.Label>
                                    <Form.Control
                                        value={loc.area}
                                        onChange={(e) =>
                                            handleChange(index, "area", e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control
                                        value={loc.city}
                                        onChange={(e) =>
                                            handleChange(index, "city", e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State*</Form.Label>
                                    <Form.Control
                                        value={loc.state}
                                        onChange={(e) =>
                                            handleChange(index, "state", e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pincode*</Form.Label>
                                    <Form.Control
                                        value={loc.pincode}
                                        onChange={(e) =>
                                            handleChange(index, "pincode", e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* DELETE */}
                        {locations.length > 1 && (
                            <div className="text-end">
                                <Button
                                    variant="danger"
                                    onClick={() => deleteLocation(index)}
                                >
                                    <FiTrash2 /> Remove Location
                                </Button>
                            </div>
                        )}
                    </Card>
                ))}

                {/* ADD LOCATION */}
                <div className="d-flex justify-content-end">
                    <Button onClick={addLocation}>+ Add Another Location</Button>
                </div>
            </Container>
        </section>
    );
}

export default EventLocation;
