import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DateExportBar from "./DateExportBar";
import DashboardCards from "./DashboardCards";
import SalesChart from "./SalesChart ";
import TotalSalesByCategory from "./TotalSalesByCategory";
import BookingsChart from "./BookingsChart";
import EventsCharts from "./EventsCharts";
import FeedbackScores from "./FeedbackScores";
import CouponUsageReport from "./CouponUsageReport ";

function EventDashboard() {
  return (
    <>
      <section>
        <Container>
          <DateExportBar />
          <div className="bg-white p-2 rounded-2xl mb-1">
            <h2 className="section_heading mb-1">Today’s Sales</h2>
            <p>Sales Summery</p>
          </div>
          <DashboardCards />
          <SalesChart />
          <Row>
            <Col className="col-7">
              <TotalSalesByCategory/>
            </Col>
            <Col className="col-5">
              <BookingsChart/>
            </Col>
            
          </Row>
          <Row className=" mt-4">
            <Col className="col-7">
               <FeedbackScores/>
            </Col>
          </Row>
          <Row>
            <Col className="col-11">
             <EventsCharts/>
            </Col>
          </Row>
          <Row>
            <Col>
              <CouponUsageReport/>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default EventDashboard;
