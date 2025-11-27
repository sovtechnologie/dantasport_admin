import React from 'react'
import { Container, Row,Col } from 'react-bootstrap';
import "../../styelsheets/EventPage/CreateEvent.css";

function RulesRegulation() {
  return (
   
    <>
      <section>
        <Container className="container_wrapper">
             <h2 className='sub_title mb-4'>Rules & Regulation</h2>
            <Row>
                <Col className="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Safety Protocols*</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder='Safety Protocols*'/>
                    </div>
                </Col>
                <Col className="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">FAQs or General Guidelines</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder='FAQs or General Guidelines'/>
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

export default RulesRegulation
