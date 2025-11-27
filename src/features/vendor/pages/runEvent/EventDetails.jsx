import React from 'react'
import { Col, Container, Row,Form } from 'react-bootstrap';
import "../../styelsheets/EventPage/CreateEvent.css"
import { FiUpload } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function EventDetails() {
  const navigate = useNavigate();
  return (
   <>
    <section>
      <Container className='container_wrapper'>
     
         <h2 className='sub_title m-0'>Event Details</h2>
         <Row className='mt-5'>
           <Row>
            <Col className='col-6'>
            <Col className='col-12'>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Enter Event Title*</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Owner Name"/>
              </div>
          </Col>
            <Col className='col-12'>
              <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Event Type*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>
            </Col>
          <Col className='col-6'>
            <Col className='col-12'>
                <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Phone Number*</label>
               <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
              </div>
          </Col>
          
          </Col>
           </Row>
         </Row>
        <Row className='other_info'>
          <Col className='col-6'>
              <div className="mb-3">
                 <Form.Group controlId="gstUpload">
                  <label for="exampleFormControlInput1" class="form-label">Upload Event Poster/Banner (For Desktop)*</label>

                <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                  <FiUpload size={20} className="mb-1" />
                  <span className="text-muted">Upload Image</span>
                  <span className="text-muted">(Size 430px * 200px max 5MB)</span>
                  <Form.Control type="file" className="file-input" />
                </div>
              </Form.Group>
              </div>
          </Col>
          <Col className='col-6'>
               <div className="mb-3">
                <Form.Group controlId="gstUpload">
                  <label for="exampleFormControlInput1" class="form-label">Upload Event Poster/Banner (For Mobile)*</label>

                <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                  <FiUpload size={20} className="mb-1" />
                  <span className="text-muted">Upload Image</span>
                  <span className="text-muted">(Size 430px * 200px max 5MB)</span>
                  <Form.Control type="file" className="file-input" />
                </div>
              </Form.Group>
               </div>
          </Col>
          <Col className='col-6'>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Enter Event Video</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="eg: ( Youtube Link )"/>
              </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Add difficulty level*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>Select difficulty level</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>
          <Col className="event_calendar col-12">
           <div className="mb-3">
             <label htmlFor="exampleFormControlInput1" className="form-label">
            Event Calendar*
          </label>

          <div className="d-flex">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="eventType"
                id="oneTimeEvent"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="oneTimeEvent">
                One Time Event
              </label>
            </div>

            <div className="form-check ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="eventType"
                id="repetitiveEvent"
                
              />
              <label className="form-check-label" htmlFor="repetitiveEvent">
                Repetitive Event
              </label>
            </div>
          </div>
           </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Start Date*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>Select Start Date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">End Date*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>Select End Date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Start Time*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>Select Start Date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">End Time*</label>
                <select class="form-select" aria-label="Default select example">
                <option selected>OSelect End Date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
          </Col>

         
        </Row>
        <Row className='my-4 justify-end'>
          <Col className='col-4 text-end'>
             <div className="save_btn">
              <button>Save Listing</button>
             </div>
          </Col>
        </Row>
     </Container>
     </section>
   </>
  )
}

export default EventDetails
