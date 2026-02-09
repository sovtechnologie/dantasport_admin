import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Table,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { FiFilter, FiCalendar } from "react-icons/fi";
import "../../pages/Coach/LeadsManagement.css";
import "../../styelsheets/EventPage/CreateEvent.css";
import ReplyModal from "./ReplyModal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLeadMangementSystem, updateLeadMangmentSystem } from "../../../../services/vendor/coaches/endpointApi";

function LeadManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [filterStatus, setFilterStatus] = useState(null);
const [filterSubStatus, setFilterSubStatus] = useState(null);

  const [startDate, endDate] = dateRange;

   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const STATUS_MAP = {
  1: "New",
  2: "Active",
  3: "Converted",
  4: "Inactive",
  5: "Closed"
};

const STATUS_REVERSE_MAP = {
  New: 1,
  Active: 2,
  Converted: 3,
  Inactive: 4,
  Closed: 5
};


const SUB_STATUS_MAP = {
  0: "None",
  1: "Connect",
  2: "Pending",
  3: "Follow Up",
  4: "Closed"
};




 const fetchLeads = async (filters = {}) => {
  try {
    setLoading(true);

    let payload = {};

    if (filters.status || filterStatus) {
      payload.status = filters.status ?? filterStatus;
    }

    if (filters.subStatus || filterSubStatus) {
      payload.subStatus = filters.subStatus ?? filterSubStatus;
    }

    if (filters.startDate || startDate) {
      payload.startDate =
        filters.startDate ??
        (startDate ? startDate.toISOString().split("T")[0] : null);
    }

    if (filters.endDate || endDate) {
      payload.endDate =
        filters.endDate ??
        (endDate ? endDate.toISOString().split("T")[0] : null);
    }

    console.log("Final API Payload:", payload);

    const response = await getLeadMangementSystem(
      Object.keys(payload).length > 0 ? payload : undefined
    );

    if (response && response.result) {
      const formatted = response.result.map((item) => ({
  ...item,
  status: Number(item.status) || 1,
  remark: Number(item.sub_status) || 0
}));


      setData(formatted);
    } else {
      setData([]);
    }
  } catch (err) {
    console.log("Lead API Error:", err);
    setError(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchLeads();
}, []);

const updateLeadRow = (index, newStatus, newSubStatus) => {
  const updated = [...data];

  updated[index] = {
    ...updated[index],
    status: Number(newStatus),
    remark: Number(newSubStatus)
  };

  setData(updated);

  updateLeadStatus(
    updated[index].id,
    updated[index].status,
    updated[index].remark
  );
};



  const openModal = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

const handleStatusChange = (index, value) => {
  const statusValue = Number(value);

  updateLeadRow(
    index,
    statusValue,
    data[index].remark   // existing subStatus
  );
};


const handleFilterStatus = (value) => {
  setFilterStatus(value);

  fetchLeads({
    status: value,
    subStatus: filterSubStatus,
    startDate: startDate,
    endDate: endDate,
  });
};


const handleFilterSubStatus = (value) => {
  setFilterSubStatus(value);

  fetchLeads({
    status: filterStatus,
    subStatus: value,
    startDate: startDate,
    endDate: endDate,
  });
};

const handleDateChange = (update) => {
  setDateRange(update);

  const [start, end] = update;

  fetchLeads({
    status: filterStatus,
    subStatus: filterSubStatus,
    startDate: start ? start.toISOString().split("T")[0] : null,
    endDate: end ? end.toISOString().split("T")[0] : null,
  });
};


 const handleSubStatusChange = (index, value) => {
  const subStatusValue = Number(value);

  updateLeadRow(
    index,
    data[index].status,   // existing status
    subStatusValue
  );
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

const updateLeadStatus = async (leadId, status, subStatus) => {
  try {
    const payload = {
      QueryId: Number(leadId),
      status: Number(status) || 0,
      subStatus: Number(subStatus) || 0
    };

    console.log("Final Update Payload:", payload);

    await updateLeadMangmentSystem(payload);

    alert("Status Updated Successfully");

  } catch (err) {
    console.log("Update API Error:", err);
    alert("Failed to update status");
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
  <Dropdown.Item onClick={() => handleFilterStatus(null)}>
    All
  </Dropdown.Item>

  <Dropdown.Item onClick={() => handleFilterStatus(1)}>
    New
  </Dropdown.Item>

  <Dropdown.Item onClick={() => handleFilterStatus(2)}>
    Active
  </Dropdown.Item>

  <Dropdown.Item onClick={() => handleFilterStatus(3)}>
    Converted
  </Dropdown.Item>

  <Dropdown.Item onClick={() => handleFilterStatus(4)}>
    Inactive
  </Dropdown.Item>

  <Dropdown.Item onClick={() => handleFilterStatus(5)}>
    Closed
  </Dropdown.Item>
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
  <Dropdown.Item onClick={() => handleFilterSubStatus(null)}>
    All
  </Dropdown.Item>

  {Object.entries(SUB_STATUS_MAP).map(([key, value]) => (
    <Dropdown.Item
      key={key}
      onClick={() => handleFilterSubStatus(Number(key))}
    >
      {value}
    </Dropdown.Item>
  ))}
</Dropdown.Menu>

            </Dropdown>
          </div>

          <div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
onChange={handleDateChange}
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
{loading ? (
  <div className="text-center my-5">
    <Spinner animation="border" variant="primary" />
    <p className="mt-2">Loading leads...</p>
  </div>
) : error ? (
  <div className="text-center text-danger my-5">
    Failed to load data
  </div>
) : (
  <>
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
                  {row.full_name}
                  <br />
                  <small>{row.mobile_number}</small>
                </td>

                <td>{row.quer_created_on}</td>

                <td style={{width: "50px"}}>
           <Form.Select
  size="sm"
  value={row.status}
  className={getStatusClass(STATUS_MAP[row.status])}
  onChange={(e) => handleStatusChange(i, e.target.value)}
>
  {Object.entries(STATUS_MAP).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ))}
</Form.Select>


                </td>

                <td>
           <Form.Select
  size="sm"
  value={row.remark}
  onChange={(e) => handleSubStatusChange(i, e.target.value)}
>
  {Object.entries(SUB_STATUS_MAP).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ))}
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
          </>
)}

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
