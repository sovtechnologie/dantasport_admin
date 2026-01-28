import React, { useState } from "react";
import { Dropdown, Button, DropdownButton } from "react-bootstrap";
import { Calendar3, BoxArrowUp } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import AllDashboard from "./AllDashboard";
import ExportFilter from "../../features/Component/ExportFilter";

const DateExportBar = () => {
  const [selectedRange, setSelectedRange] = useState("17 May 2025 – 21 May 2025");

  return (

    <>
      <div className="d-flex justify-between bg-white rounded mb-4 shadow-sm align-items-center ps-3">
        <AllDashboard />
        <ExportFilter />
      </div>
    </>

  );
};

export default DateExportBar;
