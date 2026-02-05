import React, { useState } from "react";
import { Nav, Container, Row, Col } from "react-bootstrap";
import AdminCards from "../../features/Component/AdminCards";
import SalesChart from "../../features/Component/SalesChart";
import BookingsByVertical from "./BookingsByVertical";
import UserVendorGrowth from "./UserVendorGrowth";
import RatingDistribution from "./RatingDistribution";
import PayoutOverview from "./PayoutOverview";
import RevenueVerticals from "./RevenueVerticals";
import AdminSalesChart from "./AdminSalesChart";
import GlobalAdminCards from "./GlobalAdminCards";
import DashboardStats from "../../pages/vendor/DashboardStats";
import DashboardTabs from "../../pages/vendor/DashboardTabs";
import SlotUtilizationHeatmap from "../../pages/vendor/SlotUtilizationHeatmap";
import CouponUsageReport from "../../pages/vendor/CouponUsageReport ";
import DashboardCards from "../../pages/vendor/DashboardCards";
import TotalSalesByCategory from "../../pages/vendor/TotalSalesByCategory";
import BookingsChart from "../../pages/vendor/BookingsChart";
import FeedbackScores from "../../pages/vendor/FeedbackScores";
import EventsCharts from "../../pages/vendor/EventsCharts";
import ConversionFromCampaigns from "../../pages/vendor/ConversionFromCampaigns";
import DayPassSales from "../../pages/vendor/DayPassSales";
import UpcomingActivities from "../../pages/vendor/UpcomingActivities";
import ClientChat from "../../pages/vendor/ClientChat";
import ClientProgressTracker from "../../pages/vendor/ClientProgressTracker";
import HostPlayAdmin from "./HostPlayAdmin";
import PlayHostCards from "./PlayHostCards";

/* ===============================
   Tab Components
================================ */

const AdminOverview = () => (
  <div style={{ padding: 20, background: "#F1F3F2", borderRadius: 8 }}>
    <GlobalAdminCards />
    <AdminSalesChart />
    <Row className="my-4 g-4">
      <Col className="col-6">
        <BookingsByVertical />
      </Col>
      <Col className="col-6">
        <UserVendorGrowth />
      </Col>
      <Col className="col-6">
        <RevenueVerticals />
      </Col>

      <Col className="col-6">
        <PayoutOverview />
      </Col>
    </Row>
  </div>
);

const TurfCards = () => (
  <div style={{ padding: 20, background: "#F3E8FF", borderRadius: 8 }}>
    <AdminCards />
    <SalesChart />
    <div className="my-4">
      <DashboardStats />
    </div>
    <DashboardTabs />
    <CouponUsageReport />
    <SlotUtilizationHeatmap />
  </div>
);

const EventCards = () => (
  <div style={{ padding: 20, background: "#ea89d42b", borderRadius: 8 }}>
    <DashboardCards />
    <SalesChart />
    <Row>
      <Col className="col-7">
        <TotalSalesByCategory />
      </Col>
      <Col className="col-5">
        <BookingsChart />
      </Col>

    </Row>
    <Row className=" mt-4">
      <Col className="col-7">
        <FeedbackScores />
      </Col>
    </Row>
    <Row>
      <Col className="col-11">
        <EventsCharts />
      </Col>
    </Row>
    <Row>
      <Col>
        <CouponUsageReport />
      </Col>
    </Row>
  </div>
);

const RunCards = () => (
  <div style={{ padding: 20, background: "#F1F3F2", borderRadius: 8 }}>
    <DashboardCards />
    <SalesChart />
    <Row>
      <Col className='col-7'>
        <TotalSalesByCategory />
      </Col>
      <Col className='col-5'>
        <BookingsChart />
      </Col>
    </Row>
    <Row className='my-5'>
      <Col className='col-5'>
        <FeedbackScores />
      </Col>
      <Col className='col-7'>
        <ConversionFromCampaigns />
      </Col>

    </Row>
    <Row>
      <Col>
        <CouponUsageReport />
      </Col>
    </Row>
  </div>
);

const GymCards = () => (
  <div style={{ padding: 20, background: "#fce8e6", borderRadius: 8 }}>
    <DashboardCards />
    <SalesChart />
    <Row className='g-3'>
      <Col className='col-6'>
        <DayPassSales />
      </Col>
      <Col className='col-6'>
        <BookingsChart />
      </Col>
    </Row>
    <Row className='mt-5'>
      <Col className='col-5'>
        <FeedbackScores />
      </Col>
      <Col className='col-7'>
        <ConversionFromCampaigns />
      </Col>
    </Row>
    <Row>
      <Col>
        <CouponUsageReport />
      </Col>
    </Row>
    <Row>
      <Col className='col-12'>
        <DashboardTabs />
      </Col>
    </Row>
  </div>
);

const CoachCards = () => (
  <div style={{ padding: 20, background: "#ede7f6", borderRadius: 8 }}>
    <DashboardCards />
    <Row className='my-5'>
      <Col className="col-6">
        <UpcomingActivities />
      </Col>
      <Col className='col-6'>
        <Row className='g-3'>
          <Col className='col-12'>
            <FeedbackScores />
          </Col>
          <Col className='col-12'>
            <ClientChat />
          </Col>
        </Row>
      </Col>
    </Row>
    <ClientProgressTracker />
  </div>
);

const HostPlayCards = () => (
  <div style={{ padding: 20, background: "#e0f7fa", borderRadius: 8 }}>
    <div className="mb-3">
       <PlayHostCards/>
    </div>
    <HostPlayAdmin/>
   
  </div>
);

/* ===============================
   Tabs List
================================ */

const tabs = [
  "Global Overview",
  "Turf/Venue",
  "Event",
  "Run",
  "Gym",
  "Coach",
  "Host/Play",
];

/* ===============================
   Main Component
================================ */

function GlobalTabs() {
  const [activeTab, setActiveTab] = useState("Global Overview");

  const tabComponents = {
    "Global Overview": <AdminOverview />,

    "Turf/Venue": (
      <>
        <div>
          <TurfCards />
        </div>


      </>
    ),

    Event: <EventCards />,

    Run: <RunCards />,

    Gym: <GymCards />,

    Coach: <CoachCards />,

    "Host/Play": (
      <>
        <HostPlayCards />
      </>
    ),
  };

  return (
    <Container fluid className="bg-white py-3 rounded">

      {/* Animation */}
      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Tabs */}
      <Nav style={{ borderBottom: "1px solid #e5e5e5" }}>
        {tabs.map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              onClick={() => setActiveTab(tab)}
              style={{
                background: "transparent",
                border: "none",
                color: activeTab === tab ? "#1163C7" : "#6c757d",
                fontWeight: 500,
                padding: "10px 16px",
                position: "relative",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}
            >
              {tab}

              {/* underline */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-2px",
                  height: "3px",
                  width: activeTab === tab ? "100%" : "0%",
                  backgroundColor: "#1163C7",
                  transition: "width 0.35s ease",
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Content */}
      <div
        key={activeTab}
        style={{
          animation: "fadeSlide 0.35s ease",
        }}
      >
        {tabComponents[activeTab]}
      </div>

    </Container>
  );
}

export default GlobalTabs;
