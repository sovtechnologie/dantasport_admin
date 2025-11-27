import React from 'react'
import { Col, Container, Row, Form, Card } from 'react-bootstrap'
import { FiUpload } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import "../../styelsheets/EventPage/CreateEvent.css"
import { FiEdit } from "react-icons/fi";



function EventLocation() {

    return (
        <>
            <section>
                <Container className='container_wrapper'>
                    <Row>
                        <Col className='col-6'>
                            <div className="d-flex justify-between ">
                                <h2 className='sub_title mb-4'>Location Info</h2>
                                <div className="edit_btn">
                                    <button>
                                        <FiEdit />
                                    </button>
                                </div>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Row>
                            <Col className='col-6'>
                              <Col className='col-12'>
                                    <div class="mb-3">
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search for a location" />
                                    </div>
                                </Col>
                                <Col className='col-12'>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                    </div>
                                </Col>
                              
                                <Row>
                                    <Col className='col-6'>
                                        <div className="mb-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Area*</Form.Label>
                                                <Form.Select>
                                                    <option>Select Area</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col className='col-6'>
                                        <div className="mb-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>City*</Form.Label>
                                                <Form.Select>
                                                    <option>Select City</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col className='col-6'>
                                        <div className="mb-3">
                                            <Form.Group className="mb-3">
                                                <Form.Label>State*</Form.Label>
                                                <Form.Select>
                                                    <option>Select State*</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Pincode*</label>
                                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Pincode*" />
                                        </div>

                                    </Col>
                                </Row>
                            </Col>
                            <Col className='col-6'>
                                <Card
                                    style={{
                                        borderRadius: "14px",
                                        padding: "20px",
                                        border: "1px solid #e5e5e5",
                                    }}
                                >
                                    {/* Title */}
                                    <h5 className="fw-bold mb-2">Location</h5>

                                    {/* Address */}
                                    <p className="mb-3 text-secondary" style={{ fontSize: "15px" }}>
                                        PSA Ground Next To Shreeji Lawns Ganga Dham Road Bibwewadi Pune 411037
                                    </p>

                                    {/* Google Map */}
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
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.380154630509!2d73.858!3d18.494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea65c97f1fb7%3A0x123!2sBibwewadi%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000"
                                        ></iframe>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Row>
                    <Row className='mt-4 justify-items-end justify-end'>
                                    <Col className='col-4 text-end'>
                                      <div className="save_btn mb-3">
                                        <button>Save Listing</button>
                                      </div>
                                    </Col>
                                </Row>

                </Container>
            </section>
        </>
    )
}

export default EventLocation
