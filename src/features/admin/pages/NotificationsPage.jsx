import React from 'react'
import { Container,Col, Row } from 'react-bootstrap'
import SearchBox from '../../Component/SearchBox'
import ExportFilter from '../../Component/ExportFilter'

function NotificationsPage() {
  return (
    <>
    <section>
         <SearchBox/>
        <Container className='bg-white shadow-sm rounded p-4'>
           <ExportFilter/>
            <Row className='mt-3 g-3'>
                {/* <Col className='col-6'>
                 <label for="events" class="form-label">Enter Name*</label>
                  <input type="text" className='form-control' style={{height: "56px"}} name="" id="" />
                </Col> */}
                <Col className='col-6'>
                  <label for="events" class="form-label">Select*</label>
                <select class="form-select" aria-label="Default select example" style={{height: "56px"}}>
                    <option selected>Coach</option>
                    <option value="1">Event</option>
                    <option value="2">Run</option>
                    <option value="3">Venue</option>
                     <option value="3">Gym</option>
                    </select>
                </Col>
                <Col className='col-6'>
                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control"  rows="5" placeholder='Type here..'></textarea>
                    </div>
                </Col>
                
            </Row>
            <Row className='justify-end text-end mt-4'>

              <Col className='col-4  '>
                  <button type="button" class="btn btn-primary w-100 p-2 fs-4 fw-semibold ">Send</button>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default NotificationsPage
