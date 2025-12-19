import React, { useState, useEffect } from "react";
import "../../stylesheet/vendor/dashboard.css";

const UpcomingActivities = () => {
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState(null);

  // Generate 7 days starting from startDate
  const generateWeek = (baseDate) => {
    const tempDates = [];

    for (let i = 0; i < 7; i++) {
      const future = new Date(baseDate);
      future.setDate(baseDate.getDate() + i);

      tempDates.push({
        day: future.toLocaleString("en-US", { weekday: "short" }),
        date: future.getDate(),
        month: future.toLocaleString("en-US", { month: "long" }),
        year: future.getFullYear(),
        fullDate: future,
      });
    }

    setDates(tempDates);
    setSelected(tempDates[0].date);
  };

  useEffect(() => {
    generateWeek(startDate);
  }, [startDate]);

  // Arrow: Next Week
  const handleNext = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(startDate.getDate() + 7);
    setStartDate(nextWeek);
  };

  // Arrow: Previous Week
  const handlePrevious = () => {
    const previousWeek = new Date(startDate);
    previousWeek.setDate(startDate.getDate() - 7);
    setStartDate(previousWeek);
  };

  // Dummy activities for demo
  const activities = {
    default: [
      {
        time: "08:00 am",
        color: "#a6ddd2",
        border: "#39a78e",
        tasks: ["Meditation and mindfulness", "Running"],
      },
      {
        time: "09:45 am",
        color: "#ffe0d1",
        border: "#ff9f67",
        tasks: ["Breakfast with Bob", "Check your emails for 15 minutes"],
      },
      {
        time: "10:50 am",
        color: "#ffd0d0",
        border: "#ff6767",
        tasks: ["Online meeting"],
      },
      {
        time: "02:40 pm",
        color: "#e5d0ff",
        border: "#7c2aff",
        tasks: ["Cafe meetup", "Date with Thomas"],
      },
    ],
  };

  return (
    <div className="activity-container">
      <h2 className="section_heading">Upcoming Activities</h2>

      {/* Month + Year */}
      {dates.length > 0 && (
        <div className="month-row">
          <span className="arrow" onClick={handlePrevious}>◀</span>
          <h4>
            {dates[0].month} {dates[0].year}
          </h4>
          <span className="arrow" onClick={handleNext}>▶</span>
        </div>
      )}

      {/* Date Selector */}
      <div className="date-row">
        {dates.map((d, index) => (
          <div
            key={index}
            className={`date-box ${selected === d.date ? "active" : ""}`}
            onClick={() => setSelected(d.date)}
          >
            <span className="day">{d.day}</span>
            <span className="num">{d.date}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline">
        {activities.default.map((item, index) => (
          <div className="time-block" key={index}>
            <div className="time">{item.time}</div>
            <div
              className="task-box"
              style={{
                background: item.color,
                borderLeft: `5px solid ${item.border}`,
              }}
            >
              {item.tasks.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;
