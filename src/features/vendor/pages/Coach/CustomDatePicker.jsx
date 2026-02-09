import React, { useState, useMemo } from "react";
import { Button, Container } from "react-bootstrap";
import dayjs from "dayjs";
import "../../pages/Coach/LeadsManagement.css";

const CustomDatePicker = () => {
  // 🔹 current month state (dynamic)
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = dayjs().format("YYYY-MM-DD");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 🔹 Generate dates dynamically (keeps your old logic style)
  const dates = useMemo(() => {
    const daysInMonth = currentMonth.daysInMonth();
    const year = currentMonth.year();
    const month = currentMonth.month();

    const temp = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = dayjs(new Date(year, month, i));
      temp.push({
        day: i,
        weekDay: weekDays[date.day()],
        fullDate: date.format("YYYY-MM-DD"),
      });
    }
    return temp;
  }, [currentMonth]);

  return (
    <Container className="mt-3" >
      {/* 🔹 Month Navigation */}
      <div className="d-flex align-items-center justify-content-center mb-4">
        <Button
          variant=""
          style={{border: "1px solid #B1B1B1"}}
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          &lt;
        </Button>

        <strong className="mx-2 fs-4 text-primary">
          {currentMonth.format("MMMM YYYY")}
        </strong>

        <Button
          variant=""
           style={{border: "1px solid #B1B1B1"}}
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          &gt;
        </Button>
      </div>

      {/* 🔹 Dates (YOUR UI KEPT SAME) */}
      <div className="d-flex overflow-auto custom-scrollbar pb-2">
        {dates.map((date) => {
          let variant = "outline-secondary";

          if (date.fullDate === today) {
            variant = "primary"; // today
          }
          if (date.fullDate === selectedDate) {
            variant = "primary"; // selected
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

      {/* 🔹 Title Box (UNCHANGED LOGIC) */}
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
