import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";

import SearchBar from "../../features/Component/SearchBar";

import SalesChart from "../../features/Component/SalesChart";
import AdminCards from "../../features/Component/AdminCards";
import CouponUsageReport from "../../features/Component/CouponUsageReport";
import BookingsAndRatings from "../../features/Component/BookingsAndRatings";
import PeakHoursDistribution from "../../features/Component/PeakHoursDistribution";
import "../../features/Component/admin.css";


const Dashboard = () => {
  

  return (
    <>
      <section className="mb-4">
        <Container>
          <SearchBar />
          <AdminCards/>
          <SalesChart/>
          <CouponUsageReport/>
          <BookingsAndRatings/>
          <PeakHoursDistribution/>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
