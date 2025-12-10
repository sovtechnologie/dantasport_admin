import React from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import SportsSearch from "./SportsSearch";
function CoachesAcademy() {
    return (
        <>
            <section>
                <Container className="container_wrapper">
                    <Row>
                        <Col className="col-12">
                            <h2 className="sub_title mb-4">Coaches / Academy</h2>
                        </Col>
                        <Col className="col-12 mb-3">
                            <div className="mb-3 event_calendar">
                                <label className="form-label">Select Services As?*</label>

                                <div className="d-flex">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Coach</label>
                                    </div>

                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Academy</label>
                                    </div>

                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row className="my-5">
                        <Col className="col-6">
                            <div className="mb-3">
                               <SportsSearch/>
                            </div>
                        </Col>
                        
                         
                    </Row>
                    <Row>
                        <Col>
                            <h2 className="sub_title mb-4">About Trainer/Academy</h2>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">
                                    Add About Trainer*
                                </label>
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1" placeholder="Eg:Hi I am Ashish & I have 6 years of experience in fitness & nutritional coaching"
                                    rows="6"
                                ></textarea>
                            </div>
                        </Col>
                    </Row>
                    <Row className="my-5">
                        <h2 className="sub_title mb-4">About Trainer/Academy</h2>
                        <Col className="col-8">
                            <div className="mb-3 event_calendar">
                                <label className="form-label">Batch*</label>

                                <div className="d-flex">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">1-on-1 Classes</label>
                                    </div>

                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Online Classes</label>
                                    </div>
                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Group Classes</label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="mb-3 event_calendar">
                                <label className="form-label">Age*</label>

                                <div className="d-flex">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Kids</label>
                                    </div>

                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            name="participants"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Adults</label>
                                    </div>

                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <label className="form-check-label mb-3">Days*</label>
                        <Col className="d-flex">
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Monday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Tuesday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Wednesday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Thursday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Friday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Saturaday
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 event_calendar me-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Sunday
                                    </label>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h2 className="sub_title mb-4">About Fee & Packages</h2>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">
                                    Add Fee & Packages*
                                </label>
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1" placeholder="Eg:Personal Coaching & Lifestyle Best Practices"
                                    rows="6"
                                ></textarea>
                            </div>
                        </Col>
                    </Row>
                    <div className="my-5">
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

                    </div>
                    <Row>
                        <Col className="col-12">
                            <h2 className="sub_title mb-4">Achievements</h2>
                        </Col>
                        <Col className="col-6">
                            <div className="mb-3">
                                <label htmlFor="Certificate Name*" className="mb-3">Certificate Name*</label>
                                <input type="text" className="form-control" />
                            </div>
                        </Col>
                        <Col className='col-6'>
                            <div className="mb-3">
                                <Form.Group controlId="gstUpload">
                                    <label for="exampleFormControlInput1" class="form-label mb-3">Upload Certificate*</label>

                                    <div className="upload-box d-flex flex-column justify-content-center align-items-center" style={{ height: "55px" }}>
                                        <FiUpload size={20} className="mb-1" />
                                        <span className="text-muted">Upload Image</span>

                                        <Form.Control type="file" className="file-input" />
                                    </div>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="mb-3">
                                <label htmlFor="Certificate Name*" className="mb-3">Certificate Name*</label>
                                <input type="text" className="form-control" />
                            </div>
                        </Col>
                        <Col className='col-6'>
                            <div className="mb-3">
                                <Form.Group controlId="gstUpload">
                                    <label for="exampleFormControlInput1" class="form-label mb-3">Upload Certificate*</label>

                                    <div className="upload-box d-flex flex-column justify-content-center align-items-center" style={{ height: "55px" }}>
                                        <FiUpload size={20} className="mb-1" />
                                        <span className="text-muted">Upload Image</span>

                                        <Form.Control type="file" className="file-input" />
                                    </div>
                                </Form.Group>
                            </div>
                        </Col>
                        <Row className="d-flex justify-end mt-3 p-0">
                            <Col className='col-3 p-0  '>
                                <div className="save_btn">
                                    <button>+ Add More</button>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                    <div className="my-5">
                        <Row>
                            <Col className='col-6'>
                                <div className="d-flex justify-between ">
                                    <h2 className='sub_title mb-4'>Other Serviceable Locations</h2>
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
                        <Row className="d-flex justify-end mt-3">
                            <Col className='col-3'>
                                <div className="save_btn">
                                    <button>+ Add More</button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <h2 className="sub_title">Trainer Name</h2>
                            </Col>
                            <Col className="col-6">
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">
                                     Trainer Name*
                                </label>
                                <input type="text" placeholder="Trainer Name*" className="form-control
                                                    " />
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">
                                     Trainer postion*
                                </label>
                                <input type="text" className="form-control
                                                    " placeholder="Trainer postion"/>
                            </div>
                        </Col>
                         <Col className='col-6'>
                            <div className="mb-3">
                                <Form.Group controlId="gstUpload">
                                    <label for="exampleFormControlInput1" class="form-label mb-2">Trainer Photo*</label>

                                    <div className="upload-box d-flex flex-column justify-content-center align-items-center" style={{ height: "55px" }}>
                                        <FiUpload size={20} className="mb-1" />
                                        <span className="text-muted">Upload Image</span>

                                        <Form.Control type="file" className="file-input" />
                                    </div>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col className='col-3 m-auto'>
                                <div className="save_btn">
                                    <button>+ Add more</button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-end my-5">
                            <Col className='col-5 m-auto'>
                                <div className="save_btn">
                                    <button>Save</button>
                                </div>
                            </Col>
                        </Row>
                        
                    </div>

                </Container>
            </section>
        </>
    );
}

export default CoachesAcademy;
