import React, { useState } from "react";
import { Dropdown, Button, DropdownButton } from "react-bootstrap";
import { Calendar3, BoxArrowUp } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const DateExportBar = () => {
  const [selectedRange, setSelectedRange] = useState("17 May 2025 – 21 May 2025");

  return (
    <div className="d-flex justify-content-end align-items-center gap-2 mb-4 flex-wrap">

      {/* Date Range Dropdown */}
      <Dropdown className="bg-white">
        <Dropdown.Toggle
          variant="white"
          id="date-range-dropdown"
          className="shadow-sm border-0 rounded-3 px-3 py-2 d-flex align-items-center"
        >
          <div className="icon-circle me-2">
            <Calendar3 size={18} color="#1163C7" />
          </div>
          <span className="text-secondary fw-semibold">{selectedRange}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedRange("10 May 2025 – 15 May 2025")}>
            10 May 2025 – 15 May 2025
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedRange("17 May 2025 – 21 May 2025")}>
            17 May 2025 – 21 May 2025
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedRange("01 May 2025 – 07 May 2025")}>
            01 May 2025 – 07 May 2025
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Export Button */}
      <Button
        variant="white"
        className="shadow-sm border-0 rounded-3 px-3 py-2 d-flex align-items-center bg-white"
        onClick={() => alert("Export initiated")}
      >
        <div className="icon-circle me-2">
          <BoxArrowUp size={18} color="#1163C7" />
        </div>
        <span className="text-secondary fw-semibold">Export</span>
      </Button>

      {/* Filter Dropdown */}
      <DropdownButton
        id="filter-dropdown"
        title="Last Week"
        variant="white"
        className="shadow-sm border-0 rounded-3 px-2 py-1  fw-semibold text-secondary bg-white"
      >
        <Dropdown.Item as="button">1 Month</Dropdown.Item>
        <Dropdown.Item as="button">3 Months</Dropdown.Item>
        <Dropdown.Item as="button">1 Year</Dropdown.Item>
        <Dropdown.Item as="button">All Time</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DateExportBar;
