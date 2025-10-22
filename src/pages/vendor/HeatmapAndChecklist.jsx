import React, { useState } from "react";
import { Container, Row, Col, ProgressBar, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HeatmapAndChecklist = () => {
  // Generate random heatmap intensity (0–5)
  const hours = [
    "12 AM","2 AM","4 AM","6 AM","8 AM","10 AM",
    "12 PM","2 PM","4 PM","6 PM","8 PM","10 PM"
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const heatmapData = hours.map(() =>
    days.map(() => Math.floor(Math.random() * 6))
  );

  // Checklist
  const [tasks, setTasks] = useState([
    { id: 1, text: "Lorem ipsum", done: true },
    { id: 2, text: "Lorem ipsum", done: false },
    { id: 3, text: "Lorem ipsum", done: false },
    { id: 4, text: "Lorem ipsum", done: false },
    { id: 5, text: "Lorem ipsum", done: false },
      { id: 5, text: "Lorem ipsum", done: false },
  ]);

  const handleCheck = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const progress = Math.round(
    (tasks.filter((t) => t.done).length / tasks.length) * 100
  );

  return (
    <>
    <Row>
        {/* Left Section - Heatmap */}
        <Col md={8} className="mb-4">
          <div className="p-3 bg-white rounded-3 shadow-sm">
            <h6 className="section_heading mb-3">Slot Utilization Heatmap</h6>

            <div className="row">
                <div className="col-8">
                    <div className="heatmap">
              <div className="heatmap-header">
                <div className="time-label"></div>
                {days.map((d) => (
                  <div key={d} className="day-label">{d}</div>
                ))}
              </div>

              {hours.map((hour, i) => (
                <div key={hour} className="heatmap-row">
                  <div className="time-label">{hour}</div>
                  {heatmapData[i].map((intensity, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`heatmap-cell intensity-${intensity}`}
                    ></div>
                  ))}
                </div>
              ))}
                </div>
                </div>

            {/* Stats Section */}
            <div className="col-4">
                <div className="mt-4">
              <div className="mb-2 custom_bdr">
                <div>
                  <h6 className="text-secondary mb-0">Today</h6>
                  <h5 className="fw-bold mb-0">6h 15m</h5>
                </div>
                <div className="text-success fw-semibold">2.3%</div>
              </div>

              <div className="mb-2 custom_bdr">
                <div>
                  <h6 className="text-secondary mb-0">This week</h6>
                  <h5 className="fw-bold mb-0">34h 12m</h5>
                </div>
                <div className="text-danger fw-semibold">10.1%</div>
              </div>

              <div className="mb-2 custom_bdr">
                <div>
                  <h6 className="text-secondary mb-0">This month</h6>
                  <h5 className="fw-bold mb-0">123h 47m</h5>
                </div>
                <div className="text-danger fw-semibold">3.2%</div>
              </div>
            </div>

            </div>
            </div>
            
          </div>
        </Col>

        {/* Right Section - Checklist */}
        <Col md={4}>
          <div className="p-3 bg-white rounded-3 shadow-sm">
            <h6 className="section_heading mb-3">Onboarding Checklist</h6>
            <div className="mb-2 fw-semibold text-secondary">Progress Status</div>

            <ProgressBar now={progress} className="mb-2" />
            <div className="small text-muted mb-3">
              {progress}% out of 100% Documents Submitted
            </div>

            {tasks.map((task) => (
              <Form.Check
                key={task.id}
                type="checkbox"
                id={`task-${task.id}`}
                label={task.text}
                checked={task.done}
                onChange={() => handleCheck(task.id)}
                className="mb-2"
              />
            ))}

            <Button className="complete-btn w-100 mt-3 rounded-2 fw-semibold">
  Complete Required Steps
</Button>

          </div>
        </Col>
      </Row>
    </>
  );
};

export default HeatmapAndChecklist;
