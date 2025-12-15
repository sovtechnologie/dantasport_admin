import React from "react";
import "../../stylesheet/vendor/dashboard.css";
const FeedbackScores = () => {
  const data = [
    {
      rating: "Poor",
      color: "#ff4d6d",
      bg: "#ffccd5",
      value: 25,
      barWidth: "40%",
    },
    {
      rating: "Fair",
      color: "#ffa600",
      bg: "#ffdd99",
      value: 29,
      barWidth: "60%",
    },
    {
      rating: "Good",
      color: "#0057ff",
      bg: "#cce0ff",
      value: 18,
      barWidth: "80%",
    },
      {
      rating: "Excellent",
      color: "#0CAF60",
      bg: "#E7F7EF",
      value: 70,
      barWidth: "80%",
    },
  ];

  return (
    <div className="feedback-card">
      <h2 className="section_heading mb-3">Feedback Scores Per Session</h2>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Popularity</th>
            <th className="text-center">Sales</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}  style={{ borderBottom: "1px solid #EDF2F6" }} className="py-3">
              <td>{item.rating}</td>

              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: item.barWidth,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </td>

              <td className="text-center">
                <span
                  className="badge"
                  style={{
                    backgroundColor: item.bg,
                    color: item.color,
                    border: `1px solid ${item.color}`,
                  }}
                >
                  {item.value}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackScores;
