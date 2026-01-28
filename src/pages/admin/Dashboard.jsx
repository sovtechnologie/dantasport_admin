import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";

import SearchBar from "../../features/Component/SearchBar";

import SalesChart from "../../features/Component/SalesChart";
import AdminCards from "../../features/Component/AdminCards";
import CouponUsageReport from "../../features/Component/CouponUsageReport";
import BookingsAndRatings from "../../features/Component/BookingsAndRatings";
import PeakHoursDistribution from "../../features/Component/PeakHoursDistribution";
import "../../features/Component/admin.css";
import GlobalTabs from "../../features/Component/GlobalTabs";


const Dashboard = () => {
  

  return (
    <>
      <section className="mb-4">
        <Container>
          <SearchBar />
          <div className="mt-4">
            <GlobalTabs/>
          </div>
          
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
