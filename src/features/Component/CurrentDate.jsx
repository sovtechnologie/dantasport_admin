import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Card, Form, Row, Col } from "react-bootstrap";

function CurrentDate() {

  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState([]);

  return (
    <>
      <div className="bg-white">
       <Form.Label style={{ fontSize: 12 }}>Current Date</Form.Label>

        <RangePicker
          format="YYYY-MM-DD"
          value={dateRange}
          allowClear={{
            clearIcon: (
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#ff4d4f",
                }}
              >
                ✕
              </span>
            ),
          }}
          onChange={(dates) => setDateRange(dates || [])}
          style={{
            height: "50px",
          }}
        />
      </div>
    </>
  );
}

export default CurrentDate;
