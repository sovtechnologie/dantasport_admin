import React, { useEffect } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import "../../styelsheets/EventPage/CreateEvent.css";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import { useFetchSportsByCategory } from '../../../../hooks/vendor/sports/useFetchSportsByCategory';

function EventDetails({ payload, updatePayload }) {
  const navigate = useNavigate();


  const {
    data: sportsCategoryResponse,
    isLoading,
    isError,
  } = useFetchSportsByCategory(4);

  const sportsCategoryList =
    Array.isArray(sportsCategoryResponse?.result)
      ? sportsCategoryResponse.result
      : [];



  /* ---------------- FILE HANDLER (UI SAME) ---------------- */
  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      updatePayload(field, file);
    }
  };



  useEffect(() => {
    if (
      payload.eventCalender === 2 &&
      Array.isArray(payload.repetitiveEventsDates) &&
      payload.repetitiveEventsDates.length
    ) {
      const newStart = payload.repetitiveEventsDates[0];
      const newEnd =
        payload.repetitiveEventsDates[payload.repetitiveEventsDates.length - 1];

      // 🔒 prevent infinite loop
      if (payload.startDate !== newStart) {
        updatePayload("startDate", newStart);
      }

      if (payload.endDate !== newEnd) {
        updatePayload("endDate", newEnd);
      }
    }
  }, [
    payload.eventCalender,
    payload.repetitiveEventsDates,
    payload.startDate,
    payload.endDate,
  ]);





  return (
    <>
      <section>
        <Container className='container_wrapper'>

          <h2 className='sub_title m-0'>Event Details</h2>

          <Row className='mt-5'>
            <Col className='col-6'>
              {/* EVENT TITLE */}
              <div className="mb-3">
                <label className="form-label">Enter Event Title*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Title"
                  value={payload.eventTitle}
                  onChange={(e) => updatePayload("eventTitle", e.target.value)}
                />
              </div>

              {/* EVENT TYPE */}
              <div className="mb-3">
                <label className="form-label">Event Type*</label>
                <select
                  className="form-select"
                  value={payload.eventType}
                  onChange={(e) =>
                    updatePayload("eventType", Number(e.target.value))
                  }
                >
                  <option value="">Select Event Type</option>
                  <option value={1}>Normal Event</option>
                  <option value={2}>Run Event</option>
                </select>
              </div>

              {/* SPORTS CATEGORY */}
              {payload.eventType === 1 && (
                <div className="mb-3">
                  <label className="form-label">Select Sports Category*</label>

                  <div className="sports-select-box">
                    {sportsCategoryList.map((cat) => {
                      const isSelected = payload.eventCateorySports?.includes(cat.id);

                      return (
                        <div
                          key={cat.id}
                          className={`sports-item ${isSelected ? "selected" : ""}`}
                        >
                          <span>{cat.sports_name}</span>

                          <button
                            type="button"
                            className={`btn btn-sm ${isSelected ? "btn-success" : "btn-outline-primary"
                              }`}
                            onClick={() => {
                              let updated = [...(payload.eventCateorySports || [])];

                              if (isSelected) {
                                updated = updated.filter((id) => id !== cat.id);
                              } else {
                                updated.push(cat.id);
                              }

                              updatePayload("eventCateorySports", updated);
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


            </Col>

            {/* ABOUT EVENT */}
            <Col className='col-6'>
              <div className="mb-3">
                <label className="form-label">About Event*</label>
                <textarea
                  className="form-control"
                  rows="6"
                  value={payload.aboutEvent}
                  onChange={(e) => updatePayload("aboutEvent", e.target.value)}
                />
              </div>
            </Col>
          </Row>

          {/* ------------------- FILE UPLOADS ------------------- */}
          <Row className='other_info g-3'>
            {/* DESKTOP IMAGE */}
            <Col className='col-6'>
              <Form.Group className="mb-3">
                <label className="form-label">
                  Upload Event Poster/Banner (Desktop)*
                </label>
                <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                  {payload.desktopImage && (
                    <img
                      src={URL.createObjectURL(payload.desktopImage)}
                      alt="desktop banner preview"
                      style={{ width: "10%", borderRadius: "6px", marginBottom: "10px", }}
                    />
                  )}

                  <FiUpload size={20} />
                  <span className="text-muted">Upload Image</span>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="file-input"
                    onChange={(e) => handleFileChange("desktopImage", e)}
                  />
                </div>
              </Form.Group>
            </Col>

            {/* MOBILE IMAGE */}
            <Col className='col-6'>
              <Form.Group className="mb-3">
                <label className="form-label">
                  Upload Event Poster/Banner (Mobile)*
                </label>
                <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                  {payload.mobileImage && (
                    <img
                      src={URL.createObjectURL(payload.mobileImage)}
                      alt="mobile banner preview"
                      style={{ width: "10%", borderRadius: "6px", marginBottom: "10px", }}
                    />
                  )}

                  <FiUpload size={20} />
                  <span className="text-muted">Upload Image</span>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="file-input"
                    onChange={(e) => handleFileChange("mobileImage", e)}
                  />
                </div>
              </Form.Group>
            </Col>

            {/* VIDEO URL */}
            <Col className='col-6'>
              <div className="mb-3">
                <label className="form-label">Enter Event Video</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Youtube Link"
                  value={payload.eventVideoURL}
                  onChange={(e) => updatePayload("eventVideoURL", e.target.value)}
                />
              </div>
            </Col>

            {/* DIFFICULTY */}
            <Col className='col-6'>
              <div className="mb-3">
                <label className="form-label">Add difficulty level*</label>
                <select
                  className="form-select"
                  value={payload.difficulty}
                  onChange={(e) =>
                    updatePayload("difficulty", Number(e.target.value))
                  }
                >
                  <option value="">Select difficulty level</option>
                  <option value={1}>Easy</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
              </div>
            </Col>

            {/* EVENT CALENDAR */}
            <Col className="col-12">
              <label className="form-label">Event Calendar*</label>
              <div className="d-flex align-items-center mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={payload.eventCalender === 1}
                    onChange={() => updatePayload("eventCalender", 1)}
                  />
                  <label className="form-check-label ms-2">One Time Event</label>
                </div>

                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={payload.eventCalender === 2}
                    onChange={() => updatePayload("eventCalender", 2)}
                  />
                  <label className="form-check-label ms-3">Repetitive Event</label>
                </div>
              </div>
            </Col>

            {/* ONE TIME */}
            {payload.eventCalender === 1 && (
              <>
                <Col className='col-6'>
                  <input
                    type="date"
                    className="form-control"
                    value={payload.startDate}
                    onChange={(e) => updatePayload("startDate", e.target.value)}
                  />
                </Col>

                <Col className='col-6'>
                  <input
                    type="date"
                    className="form-control"
                    value={payload.endDate}
                    onChange={(e) => updatePayload("endDate", e.target.value)}
                  />
                </Col>
              </>
            )}

            {/* REPETITIVE */}
            {payload.eventCalender === 2 && (
              <Col className='col-12'>
                <DatePicker
                  multiple
                  format="YYYY-MM-DD"
                  value={payload.repetitiveEventsDates}
                  onChange={(dates) =>
                    updatePayload(
                      "repetitiveEventsDates",
                      dates.map(d => d.format("YYYY-MM-DD"))
                    )
                  }
                />
              </Col>
            )}

            {/* TIME */}
            <Col className='col-6'>
              <input
                type="time"
                className="form-control"
                value={payload.startTime}
                onChange={(e) => updatePayload("startTime", e.target.value)}
              />
            </Col>

            <Col className='col-6'>
              <input
                type="time"
                className="form-control"
                value={payload.endTime}
                onChange={(e) => updatePayload("endTime", e.target.value)}
              />
            </Col>
          </Row>

        </Container>
      </section>
    </>
  );
}

export default EventDetails;
