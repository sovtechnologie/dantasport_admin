import React, { useState } from "react";
import { Container, Table, Button, Modal, Row, Col } from "react-bootstrap";
import "../../pages/Coach/LeadsManagement.css";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "lucide-react";
import CustomDatePicker from "./customDatePicker";

function Plans() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const data = [
    {
      id: "8429813814",
      name: "satsih sahu",
      date: "06-12-25",
      dis: "Football (Soccer), Cricket, Basketball, Volleyball, Tennis, ",
    },
    {
      id: "8429813814",
      name: "satsih sahu",
      date: "06-12-25",
      dis: "Football (Soccer), Cricket, Basketball, Volleyball",
    },
    {
      id: "8429813814",
      name: "satsih sahu",
      date: "06-12-25",
      dis: "Volleyball, Tennis, Table Tennis, Badminton, Softball, Handball",
    },
  ];

  // ------------------ Diet & Activity Forms ------------------
  const [dietForms, setDietForms] = useState([
    { client: "", date: "", title: "", desc: "" },
  ]);

  const [activityForms, setActivityForms] = useState([
    { client: "", date: "", title: "", desc: "" },
  ]);

  // Update Diet
  const updateDiet = (i, field, value) => {
    const copy = [...dietForms];
    copy[i][field] = value;
    setDietForms(copy);
  };

  // Update Activity
  const updateActivity = (i, field, value) => {
    const copy = [...activityForms];
    copy[i][field] = value;
    setActivityForms(copy);
  };

  // Add More
  const addMoreDiet = () =>
    setDietForms([...dietForms, { client: "", date: "", title: "", desc: "" }]);

  const addMoreActivity = () =>
    setActivityForms([
      ...activityForms,
      { client: "", date: "", title: "", desc: "" },
    ]);

  // Delete
  const deleteDiet = (i) =>
    setDietForms(dietForms.filter((_, index) => index !== i));

  const deleteActivity = (i) =>
    setActivityForms(activityForms.filter((_, index) => index !== i));

  // Modal open / close
  const handleOpenAdd = (plan) => {
    setSelectedPlan(plan);
    setShowAddModal(true);
  };

  const handleOpenView = (plan) => {
    setSelectedPlan(plan);
    setSelectedDate("");
    setShowViewModal(true);
  };

  const handleCloseAdd = () => setShowAddModal(false);
  const handleCloseView = () => setShowViewModal(false);

  // Truncate text
  const truncateText = (text, limit = 50) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <section>
      <Container className="container_wrapper">
        {/* --------------------- Table --------------------- */}
        <Table className="coach_leads_table">
          <thead>
            <tr>
              <th>Client Details</th>
              <th>Onboarding Date</th>
              <th>Services</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.name} <br /> {row.id}
                </td>
                <td>{row.date}</td>
                <td>
                  <div className="d-flex justify-between align-items-center">
                    <span
                      className="wrap-text"
                      style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                    >
                      {truncateText(row.dis, 80)}
                    </span>

                    <span className="text-end ms-auto">
                      <Button
                        size="sm"
                        className="me-3"
                        onClick={() => handleOpenView(row)}
                      >
                        View Plan
                      </Button>

                      <Button size="sm" onClick={() => handleOpenAdd(row)}>
                        Add Plan
                      </Button>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* --------------------- Add Plan Modal --------------------- */}
        <Modal show={showAddModal} onHide={handleCloseAdd} centered dialogClassName="modal-lg">
          <Modal.Body className="p-0">
            <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: "25px", right: "25px", zIndex: 10 }}
              onClick={handleCloseAdd}
            ></button>

            {/* Tabs */}
            <ul className="nav nav-tabs px-3 pt-4">
              <li className="nav-item">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#diet-tab">
                  Diet
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#activity-tab">
                  Activity
                </button>
              </li>
            </ul>

            <div
              className="tab-content p-3"
              style={{
                maxHeight: "60vh",
                minHeight: "50vh",
                overflowY: "auto",
              }}
            >
              {/* ------------------- Diet Tab ------------------- */}
              <div
                className="tab-pane fade show active container_wrapper"
                id="diet-tab"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3 mt-2"> Add Diet Plans </h5>

                {dietForms.map((item, index) => (
                  <div key={index} className="position-relative p-3 mb-4 border rounded bg-white">
                    {dietForms.length > 1 && (
                      <button
                        className="btn position-absolute p-0"
                        style={{ top: "10px", right: "10px" }}
                        onClick={() => deleteDiet(index)}
                      >
                        <Trash2 size={18} color="red" />
                      </button>
                    )}

                    {/* Date Picker */}
                    <Row>
                      <Col className="col-12 mb-3">
                        <label>Select Date*</label>
                        <CustomDatePicker
                          value={item.date}
                          onChange={(date) => updateDiet(index, "date", date)}
                        />
                      </Col>
                    </Row>

                    {/* Show title & description ONLY after date selection */}
                    {item.date && (
                      <Row className="gy-3">
                        <Col className="col-12">
                          <label className="form-label">Enter Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={item.title}
                            onChange={(e) => updateDiet(index, "title", e.target.value)}
                          />
                        </Col>

                        <Col className="col-12">
                          <label className="form-label">Enter Description</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            value={item.desc}
                            onChange={(e) => updateDiet(index, "desc", e.target.value)}
                          ></textarea>
                        </Col>

                        {/* Only last block gets Save + Add More */}
                        {index === dietForms.length - 1 && (
                          <Col className="col-6">
                            <button className="btn btn-outline-primary me-3">save</button>

                            <button
                              className="btn btn-outline-primary"
                              onClick={addMoreDiet}
                            >
                              + add more
                            </button>
                          </Col>
                        )}
                      </Row>
                    )}
                  </div>
                ))}
              </div>

              {/* ------------------- Activity Tab ------------------- */}
              <div
                className="tab-pane fade container_wrapper"
                id="activity-tab"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3 mt-2">Add Activity  Plans</h5>

                {activityForms.map((item, index) => (
                  <div key={index} className="position-relative p-3 mb-4 border rounded bg-white">
                    {activityForms.length > 1 && (
                      <button
                        className="btn position-absolute p-0"
                        style={{ top: "10px", right: "10px" }}
                        onClick={() => deleteActivity(index)}
                      >
                        <Trash2 size={18} color="red" />
                      </button>
                    )}

                    {/* Date Picker */}
                    <Row>
                      <Col className="col-12 mb-3">
                        <label>Select Date*</label>
                        <CustomDatePicker
                          value={item.date}
                          onChange={(date) => updateActivity(index, "date", date)}
                        />
                      </Col>
                    </Row>

                    {/* Show only after date selection */}
                    {item.date && (
                      <Row className="gy-3">
                        <Col className="col-12">
                          <label className="form-label">Enter Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={item.title}
                            onChange={(e) => updateActivity(index, "title", e.target.value)}
                          />
                        </Col>

                        <Col className="col-12">
                          <label className="form-label">Enter Description</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            value={item.desc}
                            onChange={(e) => updateActivity(index, "desc", e.target.value)}
                          ></textarea>
                        </Col>

                        {index === activityForms.length - 1 && (
                          <Col className="col-6">
                            <button className="btn btn-outline-primary me-3">save</button>

                            <button
                              className="btn btn-outline-primary"
                              onClick={addMoreActivity}
                            >
                              + add more
                            </button>
                          </Col>
                        )}
                      </Row>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* --------------------- View Plan Modal --------------------- */}
        <Modal show={showViewModal} onHide={handleCloseView} centered dialogClassName="modal-lg">
          <Modal.Body className="p-0">
            <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: "25px", right: "25px", zIndex: 10 }}
              onClick={handleCloseView}
            ></button>

            {/* TABS */}
            <ul className="nav nav-tabs px-3 pt-4">
              <li className="nav-item">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#diet-details">
                  Diet Details
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#activity-details">
                  Activity Details
                </button>
              </li>
            </ul>

            <div
              className="tab-content p-3"
              style={{
                maxHeight: "40vh",
                minHeight: "40vh",
                overflowY: "auto",
              }}
            >
              {/* TAB 1 — Diet Details */}
              <div
                className="tab-pane fade show active container_wrapper"
                id="diet-details"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3 mt-2">View Diet Details</h5>

                <Row>
                  <Col className="col-12">
                    <label>Select Date*</label>
                    <CustomDatePicker value={selectedDate} onChange={setSelectedDate} />
                  </Col>
                </Row>

                {selectedDate && (
                  <Row className="mt-3 details_box">
                    <Col className="col-12 mb-3">
                      <div
                        className="d-flex justify-between align-items-center p-3 rounded-2xl mb-3"
                        style={{ border: "1px solid #dcdcdc" }}
                      >
                        <div className="pe-4">
                          <h2 style={{ color: "#000", fontSize: "20px" }}>
                            Lorem Ipsum is simply printing and typesetting industry.
                          </h2>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>

              {/* TAB 2 — Activity Details */}
              <div
                className="tab-pane fade container_wrapper"
                id="activity-details"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3 mt-2"> View Activity Details</h5>

                <Row>
                  <Col className="col-12">
                    <label>Select Date*</label>
                    <CustomDatePicker value={selectedDate} onChange={setSelectedDate} />
                  </Col>
                </Row>

                {selectedDate && (
                  <Row className="mt-3 details_box">
                    <Col className="col-12 mb-3">
                      <div
                        className="d-flex justify-between align-items-center p-3 rounded-2xl mb-3"
                        style={{ border: "1px solid #dcdcdc" }}
                      >
                        <div className="pe-4">
                          <h2 style={{ color: "#000", fontSize: "20px" }}>
                            Lorem Ipsum is simply printing and typesetting industry.
                          </h2>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
}

export default Plans;
