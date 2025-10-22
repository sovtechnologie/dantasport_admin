import "../../stylesheet/vendor/dashboard.css";
import StatsSection from"../../components/StatsSection";
import { Container,Col, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import date from"../../assets/Vendor/dashboard/date.svg";
import revenue from "../../assets/Vendor/dashboard/Revenue.svg";
import rating from "../../assets/Vendor/dashboard/Average-Rating.svg";
import Peakhours from "../../assets/Vendor/dashboard/Peak-hour.svg";
import SalesChart from "./SalesChart ";
import DashboardStats from "./DashboardStats";
import DashboardTabs from "./DashboardTabs";
import DashboardReports from "./DashboardReports";
import HeatmapAndChecklist from "./HeatmapAndChecklist";
import DateExportBar from "./DateExportBar";

const Dashboard = () => {
  // Sample data - later replace with real API calls
  const stats = [
    { label: 'Total Rating', value: 120 },
    { label: 'Revenue', value: 34 },
    { label: 'Bookings Today', value: 45 },
    { label: 'Reports Pending', value: 6 },
  ];

  return (
   <>
    <section>
      <Container>
        <DateExportBar/>
      </Container>
    </section>
     <section className="dashboard_section">
      <Container>
        {/* <div className="text-end mb-3">
           <DropdownButton id="dropdown-item-button" title="Last Week" className="fiter_custom_btn">
            <Dropdown.ItemText>1 Month</Dropdown.ItemText>
            <Dropdown.Item as="button">3 Months</Dropdown.Item>
            <Dropdown.Item as="button">1 Year</Dropdown.Item>
            <Dropdown.Item as="button">All Time</Dropdown.Item>
          </DropdownButton>
        </div> */}
        <Row>
          <Col className="col-3">
           <div className="inner_card card1">
            <div className="d-flex justify-content-between pb-3">
              <div className="title">
                <h2>Total Bookings</h2>
                <span>86</span>
              </div>
              <div className="icon">
                <img src={date} alt="" />
              </div>
            </div>
            <div className="info">
              <p>+8.5% Up from last week</p>
            </div>
           </div>
          </Col>
           <Col className="col-3">
           <div className="inner_card card2">
            <div className="d-flex justify-content-between pb-3">
              <div className="title">
                <h2>Revenue</h2>
                <span>₹7,200</span>
              </div>
              <div className="icon">
                <img src={revenue} alt="" />
              </div>
            </div>
            <div className="info">
              <p>+8.5% Up from last week</p>
            </div>
           </div>
          </Col>
           <Col className="col-3">
           <div className="inner_card card3">
            <div className="d-flex justify-content-between pb-3">
              <div className="title">
                <h2>Peak hour</h2>
                <span>11-12 AM</span>
              </div>
              <div className="icon">
                <img src={Peakhours} alt="" />
              </div>
            </div>
            <div className="info">
              <span>Number of booking 56</span>
            </div>
           </div>
          </Col>
            <Col className="col-3">
           <div className="inner_card card4">
            <div className="d-flex justify-content-between pb-3">
              <div className="title">
                <h2>Average Rating</h2>
                <span>4.2/5</span>
              </div>
              <div className="icon">
                <img src={rating} alt="" />
              </div>
            </div>
            <div className="info">
              <span>From 2 reviews</span>
            </div>
           </div>
          </Col>
        </Row>
      </Container>
     </section>
     <section className="sales_section">
      <Container>
        <SalesChart/>
      </Container>
     </section>

     <section>
      <Container className="p-0">
        <DashboardStats/>
      </Container>
     </section>
     <section>
      <Container className="p-0">
        <DashboardTabs/>
      </Container>
     </section>
     <section>
      <Container className="p-0">
        <DashboardReports/>
      </Container>
     </section>
     <section>
      <Container className="p-0">
        <HeatmapAndChecklist/>
      </Container>
     </section>
   </>
  );
};

export default Dashboard;