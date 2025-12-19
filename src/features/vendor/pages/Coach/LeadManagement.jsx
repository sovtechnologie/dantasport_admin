import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import { FiFilter, FiCalendar } from "react-icons/fi";
import "../../pages/Coach/LeadsManagement.css";
import "../../styelsheets/EventPage/CreateEvent.css";
import ReplyModal from "./ReplyModal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LeadManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [data, setData] = useState([
    {
      id: 1,
      name: "Sahil Khan",
      contact: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Active",
      remark: "Connect",
    },
    {
      id: 2,
      name: "Sahil Khan",
      contact: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "New",
      remark: "Pending",
    },
    {
      id: 3,
      name: "Sahil Khan",
      contact: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Converted",
      remark: "Follow Up",
    },
    {
      id: 4,
      name: "Sahil Khan",
      contact: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Inactive",
      remark: "Closed",
    },
  ]);

  const openModal = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleStatusChange = (index, value) => {
    const updated = [...data];
    updated[index].status = value;
    setData(updated);
  };

  const handleSubStatusChange = (index, value) => {
    const updated = [...data];
    updated[index].remark = value;
    setData(updated);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status-active";
      case "New":
        return "status-new";
      case "Converted":
        return "status-converted";
      case "Inactive":
        return "status-inactive";
      case "Closed":
        return "status-closed";
      default:
        return "";
    }
  };

  return (
    <section className="lead-section">
      <Container className="container_wrapper">

        {/* FILTERS */}
        <div className="d-flex justify-end mb-4">
          <div className="me-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                <FiFilter className="me-2" />
                Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>All</Dropdown.Item>
                <Dropdown.Item>Active</Dropdown.Item>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Converted</Dropdown.Item>
                <Dropdown.Item>Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="me-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                <FiFilter className="me-2" />
                Sub-Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Sub Status 1</Dropdown.Item>
                <Dropdown.Item>Sub Status 2</Dropdown.Item>
                <Dropdown.Item>Sub Status 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Select Date Range"
              customInput={
                <Button variant="outline-primary">
                  <FiCalendar className="me-2" />
                  {startDate && endDate
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : "Select Date Range"}
                </Button>
              }
            />
          </div>
        </div>

        {/* TABLE */}
        <Table bordered responsive className="align-middle coach_leads_table border-none">
          <thead>
            <tr>
              <th>Customer Details</th>
              <th>Created on</th>
              <th>Status</th>
              <th>Sub-Status</th>
              <th className="border-red-100">Message</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>
                  {row.name}
                  <br />
                  <small>{row.contact}</small>
                </td>

                <td>{row.date}</td>

                <td style={{width: "50px"}}>
                  <Form.Select
                    
                    size="sm"
                    value={row.status}
                    className={getStatusClass(row.status)}
                    onChange={(e) => handleStatusChange(i, e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="New">New</option>
                    <option value="Converted">Converted</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </td>

                <td>
                  <Form.Select
                    size="sm"
                    value={row.remark}
                    onChange={(e) => handleSubStatusChange(i, e.target.value)}
                  >
                    <option value="Connect">Connect</option>
                    <option value="Pending">Pending</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </td>

                {/* ⭐ MESSAGE WITH TEXT LIMIT */}
                <td>
                  <p
                    onClick={() => openModal(row)}
                    className="text-limit"
                  >
                    {row.message}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* PAGINATION */}
        <Row className="mt-3 align-items-center">
          <Col md="auto">
            <strong style={{ color: "#858585" }}>Show result:</strong>
          </Col>

          <Col md="auto">
            <Form.Select size="md">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Select>
          </Col>

          <Col className="text-end">
            <div className="d-inline-flex gap-2">
              <Button size="sm" variant="outline-secondary">
                &lt;
              </Button>
              <Button size="sm" variant="primary">
                1
              </Button>
              <Button size="sm" variant="outline-secondary">
                2
              </Button>
              <Button size="sm" variant="outline-secondary">
                3
              </Button>
              <Button size="sm" variant="outline-secondary">
                &gt;
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <ReplyModal show={showModal} onHide={closeModal} lead={selectedLead} />
    </section>
  );
}

export default LeadManagement;
