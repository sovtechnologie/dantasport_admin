import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

function ConvenienceFree() {
    return (
        <>
            <section>
                <Container className='bg-white p-5 rounded shadow-sm'>
                    <h2 style={{ fontSize: "23px",color:"#1163C7" }} className='mb-3'>Convenience Free</h2>
                    <Row className='g-3'>
                        <Col className='col-6'>
                            <label htmlFor="" className='form-label'>Select Venue</label>
                            <select class="form-select" aria-label="Default select example" style={{ height: "50px", borderRadius: "12px" }}>
                                <option selected>Selcet</option>
                                <option value="venue">venue</option>
                                <option value="gym">Gym</option>
                                <option value="events">Events</option>
                            </select>
                        </Col>
                        <Col className='col-6'>
                            <label for="gst" class="form-label">GST</label>
                            <input type="number" class="form-control" id="gst" placeholder="GST" style={{ height: "50px", borderRadius: "12px" }}></input>
                        </Col>
                        <Col className='col-6'>
                            <label for="gst" class="form-label">Convenience Fees %</label>
                            <input type="number" class="form-control" id="gst" placeholder="Convenience Fees %" style={{ height: "50px", borderRadius: "12px" }}></input>
                        </Col>
                        
                        <Col className='col-6'>
                            <label for="gst" class="form-label">Upto Limit</label>
                            <input type="text" class="form-control" id="gst" placeholder="upto Limit" style={{ height: "50px", borderRadius: "12px" }}></input>
                        </Col>
                        <Col>
                         <button className='btn btn-outline-primary '>Updates</button>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default ConvenienceFree
