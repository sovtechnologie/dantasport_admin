import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ExportFilter() {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState([]);

  return (
    <>
      <div className="bg-white p-3 text-end">
        <Button
          type="default"
          icon={<DownloadOutlined />}
          style={{ height: "50px", fontWeight: "bold" }}
        >
          Export
        </Button>

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
            marginLeft: 10,
            height: "50px",
          }}
        />
      </div>
    </>
  );
}

export default ExportFilter;
