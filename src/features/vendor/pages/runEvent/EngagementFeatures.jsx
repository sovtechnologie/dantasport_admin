import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function EngagementFeatures() {
  return (
    <>
      <section>
        <Container>
              <h2 className='sub_title mb-4'>Engagement Features</h2>
          <Row>
          <Col className="event_calendar col-6">
            <div className="mb-3">
              <label className="form-label">Live Streaming Enabled?*</label>

              <div className="d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="celebType"
                    id="yesOption"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="yesOption">
                    Yes
                  </label>
                </div>

                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="celebType"
                    id="noOption"
                  />
                  <label className="form-check-label" htmlFor="noOption">
                    No
                  </label>
                </div>
              </div>
            </div>
          </Col>
          <Col className='col-6'>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">If yes, provide platform & link*</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="If yes, provide platform & link*"/>
            </div>
          </Col>
        </Row>
        <Row>
            <Col className='col-6'>
              <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">If applicable, upload form link or details*</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="If applicable, upload form link or details*"/>
            </div>
            </Col>
            <Col className='col-6'>
              <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Agenda Viewer*</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Agenda Viewer*"/>
            </div>
            </Col>
        </Row>
           <Row className='justify-end mt-4 '>
                  <Col className='col-4'> 
                     <div className="save_btn ms-3">
                        <button>Save Listing </button>
                     </div>
                  </Col>
                 </Row>
        </Container>
      </section>
    </>
  )
}

export default EngagementFeatures
