import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "../../pages/Coach/LeadsManagement.css";

const CustomDatePicker = () => {
  const month = 11; // December
  const year = 2025;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date().toISOString().split("T")[0]; // current date
  const [selectedDate, setSelectedDate] = useState(null); // initially hidden

  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    dates.push({
      day: i,
      weekDay: weekDays[date.getDay()],
      fullDate: date.toISOString().split("T")[0],
    });
  }

  return (
    <Container className="mt-3">
      {/* Month Navigation */}
      <div className="d-flex align-items-center justify-center mb-2">
        <Button variant="link">&lt;</Button>
        <strong className="mx-2 fs-4 text-primary">December 2025</strong>
        <Button variant="link">&gt;</Button>
      </div>

      {/* Dates */}
      <div className="d-flex overflow-auto custom-scrollbar pb-2">
        {dates.map((date) => {
          let variant = "outline-secondary";

          if (date.fullDate === today) {
            variant = "primary"; // today = blue
          }
          if (date.fullDate === selectedDate) {
            variant = "primary"; // selected date = red
          }

          return (
            <Button
              key={date.fullDate}
              variant={variant}
              className="flex-shrink-0 mx-1 text-center custm_btns"
              style={{ minWidth: "60px" }}
              onClick={() => setSelectedDate(date.fullDate)}
            >
              <div>{date.day}</div>
              <small>{date.weekDay}</small>
            </Button>
          );
        })}
      </div>

      {/* Title Box - shows only when a date is selected */}
      {selectedDate && (
        <div
          className="title_box mb-3 p-3 rounded-2xl mt-3"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h3 style={{ fontSize: "20px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur perspiciatis
              </h3>
              <p className="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur perspiciatis nesciunt pariatur harum similique,
                commodi eaque voluptatibus necessitatibus asperiores
                consequatur beatae minima quos animi corrupti sapiente.
                Accusantium, aut! Rerum, pariatur.
              </p>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CustomDatePicker;
