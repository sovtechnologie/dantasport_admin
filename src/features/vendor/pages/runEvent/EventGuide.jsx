import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

function EventGuide() {
  return (
    <>
      <section>
        <Container className='container_wrapper'>
             <h2 className='sub_title mb-4'>Event  Guide</h2>
            <Row>
                <Col className="col-6">
                <div class="mb-3">
                    <label for="Language" class="form-label">Event Language*</label>
                    <input type="email" class="form-control" id="Language" placeholder="E.g, english,hindi"/>
                    </div>
                </Col>
                <Col className="col-6">
                <div class="mb-3">
                    <label for="Duration" class="form-label">Enter Duration*</label>
                    <input type="email" class="form-control" id="Duration" placeholder="e.g., 30 min"/>
                    </div>
                </Col>
                 <Col className="col-6">
                <div class="mb-3">
                    <label for="Duration" class="form-label">Ticket Needed For*</label>
                    <input type="email" class="form-control" id="Duration" placeholder="e.g., 10yrs & above"/>
                    </div>
                </Col>
                 <Col className="col-6">
                <div class="mb-3">
                    <label for="Allowed" class="form-label">Entry Allowed for*</label>
                    <input type="email" class="form-control" id="Allowed" placeholder="e.g., 10yrs & above"/>
                    </div>
                </Col>
                  <Col className="col-6">
                <div class="mb-3">
                    <label for="Layout" class="form-label">Enter Layout*</label>
                    <input type="email" class="form-control" id="Layout" placeholder="e.g., outdoor"/>
                    </div>
                </Col>
                 <Col className="col-6">
                <div class="mb-3">
                    <label for="Kids" class="form-label">Kids Friendly*</label>
                    <input type="email" class="form-control" id="Kids" placeholder="e.g., no"/>
                    </div>
                </Col>
                <Col className="col-6">
                <div class="mb-3">
                    <label for="Pets" class="form-label">Pets Friendly*</label>
                    <input type="email" class="form-control" id="Pets" placeholder="e.g., no"/>
                    </div>
                </Col>
                
            </Row>
            <Row className='mt-4'>
                <Col className='col-4'>
                  <div className="save_btn mb-3">
                    <button>Submit Event Listing</button>
                  </div>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default EventGuide
