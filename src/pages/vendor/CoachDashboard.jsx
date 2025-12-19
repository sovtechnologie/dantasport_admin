import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DashboardCards from './DashboardCards'
import DateExportBar from './DateExportBar'
import UpcomingActivities from './UpcomingActivities'
import FeedbackScores from './FeedbackScores'
import ClientChat from './ClientChat'
import ClientProgressTracker from './ClientProgressTracker'

function CoachDashboard() {
  return (
    <>
      <section>
        <Container>
            <DateExportBar/>
            <DashboardCards/>
            <Row className='my-5'>
                <Col className="col-6">
                   <UpcomingActivities/>
                </Col>
                <Col className='col-6'>
                 <Row className='g-3'>
                    <Col className='col-12'>
                     <FeedbackScores/>
                    </Col>
                    <Col className='col-12'>
                     <ClientChat/>
                    </Col>
                 </Row>
                </Col>
            </Row>
            <ClientProgressTracker/>
        </Container>
      </section>
    </>
  )
}

export default CoachDashboard
