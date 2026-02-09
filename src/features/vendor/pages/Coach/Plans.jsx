import React, { useState } from "react";
import { Container, Table, Button, Modal, Row, Col } from "react-bootstrap";
import "../../pages/Coach/LeadsManagement.css";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./customDatePicker";

function Plans() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [mealType, setMealType] = useState("");

  const data = [
    {
      id: "8429813814",
      name: "satish sahu",
      date: "06-12-25",
    },
    {
      id: "8429813814",
      name: "satish sahu",
      date: "06-12-25",
    },
    {
      id: "8429813814",
      name: "satish sahu",
      date: "06-12-25",
    },
  ];

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

  return (
    <section>
      <Container className="container_wrapper">
        {/* --------------------- Table --------------------- */}
        <Table className="coach_leads_table">
          <thead>
            <tr>
              <th>Client Details</th>
              <th>Onboarding Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.name} <br /> {row.id}
                </td>
                <td>{row.date}</td>
                <td className="text-end1 d-flex justify-between">
                  
                  <button size="sm"
                    className="w-100 me-3 btn btn-outline-primary"
                    onClick={() => handleOpenView(row)}>
                    View Plan
                  </button>


                  <button size="sm" onClick={() => handleOpenAdd(row)}    className="w-100 btn btn-outline-primary">
                        Add Plan
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* --------------------- Add Plan Modal --------------------- */}
        <Modal
          show={showAddModal}
          onHide={handleCloseAdd}
          centered
          dialogClassName="modal-lg"

        >
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
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#diet-tab"
                >
                  Diet
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#activity-tab"
                >
                  Activity
                </button>
              </li>
            </ul>

            <div
              className="tab-content p-4"
              style={{
                minHeight: "40vh",
              }}
            >
              {/* ------------------- Diet Tab ------------------- */}
              <div
                className="tab-pane fade show active container_wrapper"
                id="diet-tab"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3">Diet Plan Information</h5>
                <div class="row g-3">
                  <div className="col-6">
                     <label className="form-label">Selct Date</label>
                     <input type="date" className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Meal type</label>

                   <input type="text" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                  </div>
                </div>
                <div className="row mt-3 justify-end">
                  <div className="col-2">
                    <button className="btn btn-primary w-100">Save</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary w-100">+ Add More</button>
                  </div>
                </div>
              </div>

              {/* ------------------- Activity Tab ------------------- */}
              <div
                className="tab-pane fade container_wrapper"
                id="activity-tab"
                style={{ border: "1px solid #ccc" }}
              >
                <h5 className="mb-3">Activity Plan Information</h5>
                <div class="row g-3">
                  <div className="col-6">
                     <label className="form-label">Selct Date</label>
                     <input type="date" className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Training Type</label>

                   <input type="text" className="form-control" placeholder="Training Type" />
                  </div>
                  <div className="col-12">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                  </div>
                </div>
                <div className="row mt-3 justify-end">
                  <div className="col-2">
                    <button className="btn btn-primary w-100">Save</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary w-100">+ Add More</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* --------------------- View Plan Modal --------------------- */}
        <Modal
          show={showViewModal}
          onHide={handleCloseView}
          centered
          dialogClassName="modal-lg"
        >
          <Modal.Body className="p-0">
            <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: "25px", right: "25px", zIndex: 10 }}
              onClick={handleCloseView}
            ></button>

            <ul className="nav nav-tabs px-3 pt-4">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#diet-details"
                >
                  Diet Details
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#activity-details"
                >
                  Activity Details
                </button>
              </li>
            </ul>

            <div
              className="tab-content p-3"
              // style={{ maxHeight: "40vh", overflowY: "auto" }}
            >
              <div
                className="tab-pane fade show active container_wrapper shadow-sm"
                id="diet-details"
               
              >
                <label className="text-center">Select Date*</label>
                <CustomDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>

              <div
                className="tab-pane fade container_wrapper"
                id="activity-details"
                  
              >
                <label>Select Date*</label>
                <CustomDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
}

export default Plans;
