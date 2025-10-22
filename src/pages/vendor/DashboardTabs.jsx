import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardTabs = () => {
  const [activeKey, setActiveKey] = useState("Weekly");

  return (
    <section className="tabing_section pt-3 pb-3">
      <Row>
        <Col>
         <div className="d-flex justify-between">
           <div>
            <h2 className="section_heading">Peak Hours Distribution</h2>
            <p className="light_txt">Most Bookings Occur During: <span className="time">Evening (04:00 PM - 08:00 PM)</span></p>
           </div>
           <div className="text-end">
            <span className="section_heading">74</span>
            <p className="light_txt">Total Bookings</p>
           </div>
         </div>
        </Col>
      </Row>
         <Tabs
        id="dashboard-tabs"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="mb-4"
        transition={true}
      >
        {/* Today Tab */}
        <Tab eventKey="Today" title="Today">
          <Row className="custom_row">
            <Col className="col-2">
              <Card className="tab_card">
                <h5>Early Morning</h5>
                <p className="mb-2">04:00 AM - 08:00 AM</p>
                <span>4</span>
                <h6>%5</h6>
              </Card>
            </Col>
            <Col className="col-2">
              <Card className="tab_card">
                <h5>Morning</h5>
                <p className="mb-2">08:00 AM - 12:00 PM</p>
                <span>4</span>
                <h6>%5</h6>
              </Card>
            </Col>
            <Col className="col-2">
              <Card className="tab_card">
                <h5>Afternoon</h5>
                <p className="mb-2">12:00 PM - 04:00 PM</p>
                <span>4</span>
                <h6>%5</h6>
              </Card>
            </Col>
            <Col className="col-2">
              <Card className="tab_card">
                <h5>Evening</h5>
                <p className="mb-2">04:00 AM - 08:00 AM</p>
                <span>4</span>
                <h6>%5</h6>
              </Card>
            </Col>
             <Col className="col-2">
              <Card className="tab_card">
                <h5>Night</h5>
                <p className="mb-2">08:00 PM - 12:00 AM</p>
                <span>4</span>
                <h6>%5</h6>
              </Card>
            </Col>
            
          </Row>
        </Tab>

        {/* Weekly Tab */}
        <Tab eventKey="Weekly" title="Weekly">
          <Row className="gy-4">
            <Col md={6}>
              <Card className="tab_card">
                <h5>Weekly Sales</h5>
                <p>₹80,000</p>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="tab_card">
                <h5>Weekly Orders</h5>
                <p>265</p>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Monthly Tab */}
        <Tab eventKey="Monthly" title="Monthly">
          <Row className="gy-4">
            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 text-center">
                <h5>Active Users</h5>
                <p>1,250</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 text-center">
                <h5>New Signups</h5>
                <p>430</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 shadow-sm border-0 text-center">
                <h5>Churn Rate</h5>
                <p>3.2%</p>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Custom Tab */}
        <Tab eventKey="Custom" title="Custom">
          <Row className="gy-4">
            <Col md={12}>
              <Card className="p-4 shadow-sm border-0 text-center">
                <h5>Custom Report</h5>
                <p>Generate your own report by selecting filters.</p>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </section>
  );
};

export default DashboardTabs;
