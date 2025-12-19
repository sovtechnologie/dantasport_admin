import React from 'react'
import { Col, Container,Row } from 'react-bootstrap'
import DashboardCards from './DashboardCards'
import DateExportBar from './DateExportBar'
import SalesChart from './SalesChart '
import DayPassSales from './DayPassSales'
import BookingsChart from './BookingsChart'
import FeedbackScores from './FeedbackScores'
import ConversionFromCampaigns from './ConversionFromCampaigns'
import CouponUsageReport from './CouponUsageReport '
import DashboardTabs from './DashboardTabs'

function GymDashboard() {
  return (
    <>
      <section>
        <Container>
             <DateExportBar/>
            <DashboardCards/>
            <SalesChart/>
            <Row className='g-3'>
                <Col className='col-6'>
                   <DayPassSales/>
                </Col>
                   <Col className='col-6'>
                   <BookingsChart/>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col className='col-5'>
                   <FeedbackScores/>
                </Col>
                <Col className='col-7'>
                  <ConversionFromCampaigns/>
                </Col>
            </Row>
            <Row>
                <Col>
                 <CouponUsageReport/>
                </Col>
            </Row>
            <Row>
              <Col className='col-10'>
                 <DashboardTabs/>
              </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default GymDashboard
