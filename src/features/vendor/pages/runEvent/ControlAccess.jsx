import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

function ControlAccess() {
    return (
        <>
            <section>
                <Container className="container_wrapper">
                    <h2 className='sub_title mb-4'>Celebraties/Performers</h2>
                    <Row>
                        <Col className="col-12 event_calendar">
                            <div className="mb-3">
                                <label className="form-label">Any Celebrities/Performers</label>

                                <div className="d-flex">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="celebType"
                                            id="free"
                                            defaultChecked
                                        />
                                        <label className="form-check-label" htmlFor="free">Free</label>
                                    </div>

                                    <div className="form-check ms-3">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="celebType"
                                            id="paid"
                                        />
                                        <label className="form-check-label" htmlFor="paid">Paid</label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                       <Row className='justify-end '>
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

export default ControlAccess
