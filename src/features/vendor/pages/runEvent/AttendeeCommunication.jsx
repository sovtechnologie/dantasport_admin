import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

function AttendeeCommunication() {
  return (
    <>
     <section>
        <Container className='container_wrapper'>
             <h2 className='sub_title mb-4'>Organiser Contact Info</h2>
         <Row>
            <Col className='col-4'>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter Customer Support Contact*</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Customer Support Contact*"/>
            </div>
            </Col>
             <Col className='col-4'>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            </Col>
            <Col className='col-4'>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter Alt Phone Number*</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Alt Phone Number*"/>
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

export default AttendeeCommunication
