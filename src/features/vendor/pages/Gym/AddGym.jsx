import { Container, Form, Col, Row, Card } from "react-bootstrap";
import "../../styelsheets/Manage/VendorInfo.css";
import "../../styelsheets/EventPage/CreateEvent.css";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

export default function AddGym() {
  return (
    <Container className="container_wrapper">
      <h2 className="section_title mb-3">GYM Information</h2>

      <Row>
        {/* Select Input */}
        <Col className="col-6">
          <Form.Group className="mb-3">
            <Form.Label>Enter GYM Venue*</Form.Label>
            <Form.Select className="uniform-height">
              <option>Select Area</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* File Upload */}
        <Col className="col-6">
          <Form.Group controlId="gstUpload" className="mb-3">
            <Form.Label>Upload Cover Image*</Form.Label>

            <div className="upload-box uniform-height d-flex align-items-center">
              <FiUpload size={20} />
              <span className="ms-2 text-muted">Upload Image</span>
              <Form.Control type="file" className="file-input" />
            </div>
          </Form.Group>
        </Col>
        <Col className="col-12">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Add About GYM*
            </label>
            <textarea
              class="form-control"
              id="GYM"
              rows="6"
              placeholder="Football..."
            ></textarea>
          </div>
        </Col>
        <Col className="col-5">
          <div class="mb-3">
            <label for="Timing" class="form-label">
              Timing*
            </label>
            <input
              type="text"
              class="form-control"
              id="Timing"
              placeholder="Timing"
            />
          </div>
        </Col>
        <Col className="col-4">
          <div className="mb-3 event_calendar ">
            <label className="form-label">Is Bookable*</label>

            <div className="d-flex">
              <div className="form-check">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">Yes</label>
              </div>

              <div className="form-check ms-3">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-3">
          <div class="mb-3">
            <label for="Amenities*" class="form-label">
              Amenities**
            </label>
            <input
              type="text"
              class="form-control"
              id="Amenities*"
              placeholder="Amenities*"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <div className="d-flex justify-between ">
            <h2 className="sub_title mb-4">Location Info</h2>
            <div className="edit_btn">
              <button>
                <FiEdit />
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <Col className="col-12">
            <div className="mb-3 position-relative">
              <FiSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "#6c757d",
                }}
              />

              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: "40px" }}
                placeholder="Serch locations" // Removed text
              />
            </div>
          </Col>
          <Col className="col-12">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </Col>

          <Row>
            <Col className="col-6">
              <div className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Area*</Form.Label>
                  <Form.Select>
                    <option>Select Area</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Col>
            <Col className="col-6">
              <div className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>City*</Form.Label>
                  <Form.Select>
                    <option>Select City</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Col>
            <Col className="col-6">
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
                <label for="exampleFormControlInput1" class="form-label">
                  Pincode*
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Pincode*"
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="col-6">
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
              PSA Ground Next To Shreeji Lawns Ganga Dham Road Bibwewadi Pune
              411037
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
      
      <Row className="mt-3">
        <Col className="col-6">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Terms and conditions*
            </label>
            <textarea
              class="form-control"
              id="GYM"
              rows="6"
              placeholder="terms and conditions"
            ></textarea>
          </div>
        </Col>
        <Col className="col-6">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Cancellation policy
            </label>
            <textarea
              class="form-control"
              id="GYM"
              rows="6"
              placeholder=" Cancellation policy"
            ></textarea>
          </div>
        </Col>
        <Col className="col-6">
          <div className="mb-3">
            <Form.Group controlId="gstUpload">
              <label for="exampleFormControlInput1" class="form-label">
                Upload GYM Poster/Banner (For Desktop)*
              </label>

              <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                <FiUpload size={20} className="mb-1" />
                <span className="text-muted">Upload Image</span>
                <span className="text-muted">(Size 430px * 200px max 5MB)</span>
                <Form.Control type="file" className="file-input" />
              </div>
            </Form.Group>
          </div>
        </Col>
        <Col className="col-6">
          <div className="mb-3">
            <Form.Group controlId="gstUpload">
              <label for="exampleFormControlInput1" class="form-label">
                Upload GYM Poster/Banner (For Mobile)*
              </label>

              <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                <FiUpload size={20} className="mb-1" />
                <span className="text-muted">Upload Image</span>
                <span className="text-muted">(Size 430px * 200px max 5MB)</span>
                <Form.Control type="file" className="file-input" />
              </div>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <div class="mb-3">
            <label for="Pricing" class="form-label">
              Enter Pricing/Passes*
            </label>
            <input
              type="text"
              class="form-control"
              id="Timing"
              placeholder="Pricing"
            />
          </div>
        </Col>
        <Col className="col-6">
          <div className="mb-3 event_calendar ">
            <label className="form-label">Only Women*</label>

            <div className="d-flex">
              <div className="form-check">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">Yes</label>
              </div>

              <div className="form-check ms-3">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 justify-items-end justify-end">
        <Col className="col-3   text-end">
          <div className="save_btn mb-3">
            <button>Save </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
