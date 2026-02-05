import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import DateOnly from "./DateOnly";

const data = [
  { name: "Football", GamesHoted: 1800, GamesPlayed: 2200 },
  { name: "Basketball", GamesHoted: 2200, GamesPlayed: 1700 },
  { name: "Swimming", GamesHoted: 900, GamesPlayed: 2600 },
  { name: "Cricket", GamesHoted: 2100, GamesPlayed: 1000 },
  { name: "Boxing", GamesHoted: 1600, GamesPlayed: 1500 },
  { name: "Cycling", GamesHoted: 2300, GamesPlayed: 1800 },
];

const maxValue = 3000;

function HostPlayAdmin() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: 12, padding: 14 }}>
      {/* Header */}
      <div className=" mb-3 d-flex justify-between align-items-center">
        <div className="col-6">
          <h5 style={{ fontWeight: 600, color: "#1163C7" }}>
            Host & Play Verticals
          </h5>
        </div>
        <div className="col-6 justify-end ">
          <DateOnly />
        </div>
      </div>

      {/* Chart Container */}
      <div
        style={{
          background: "#F6F9FE",
          borderRadius: 8,
          padding: 12,
        }}
      >
        {data.map((item, index) => {
          const hostedWidth = (item.GamesHoted / maxValue) * 100;
          const playedWidth = (item.GamesPlayed / maxValue) * 100;
          const maxRowValue = Math.max(
            item.GamesHoted,
            item.GamesPlayed
          );
          const linePosition = (maxRowValue / maxValue) * 100;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: 12,
                marginBottom: 12,
                position: "relative",
                borderBottom:
                  index !== data.length - 1
                    ? "1px solid #DEE2E6"
                    : "none",
              }}
            >
              {/* Label */}
              <div style={{ width: 90, fontSize: 12, fontWeight: 500 }}>
                {item.name}
              </div>

              {/* Bars Area */}
              <div style={{ flex: 1, position: "relative" }}>
                {/* Reference Vertical Line */}
                <div
                  style={{
                    position: "absolute",
                    left: `${linePosition}%`,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: "#ADB5BD",
                  }}
                />

                {/* Games Hosted */}
                <div
                  onMouseEnter={(e) =>
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      label: "Games Hosted",
                      value: item.GamesHoted,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    height: 25,
                    width: `${hostedWidth}%`,
                    background: "#1163C7",
                    marginBottom: 6,
                    cursor: "pointer",
                  }}
                />

                {/* Games Played */}
                <div
                  onMouseEnter={(e) =>
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      label: "Games Played",
                      value: item.GamesPlayed,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    height: 25,
                    width: `${playedWidth}%`,
                    background: "#12B981",
                    cursor: "pointer",
                  }}
                />

                {/* Value at End */}
                <div
                  style={{
                    position: "absolute",
                    left: `calc(${linePosition}% + 6px)`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#495057",
                  }}
                >
                  {maxRowValue}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 40,
            left: tooltip.x + 10,
            background: "#000",
            color: "#fff",
            padding: "6px 10px",
            fontSize: 12,
            borderRadius: 4,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {tooltip.label}: ₹{tooltip.value}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#1163C7",
            }}
          />
          <span style={{ fontSize: 12 }}>Games Hosted</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#12B981",
            }}
          />
          <span style={{ fontSize: 12 }}>Games Played</span>
        </div>
      </div>
    </Card>
  );
}

export default HostPlayAdmin;
