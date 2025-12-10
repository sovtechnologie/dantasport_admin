import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";

const allSports = [
  "Football (Soccer)",
  "Cricket",
  "Basketball",
  "Volleyball",
  "Tennis",
  "Badminton",
  "Hockey",
  "Swimming",
  "Table Tennis",
  "Baseball",
  "Rugby",
  "Boxing",
  "Wrestling",
  "Athletics",
];

function SportsMultiSelect() {
  const [search, setSearch] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const filteredSports = allSports.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click ONLY
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sport) => {
    if (!selectedSports.includes(sport)) {
      setSelectedSports([...selectedSports, sport]); // Add sport
    }

    // Clear search but DO NOT close dropdown
    setSearch("");
    setShowDropdown(true);
  };

  const removeSport = (sport) => {
    setSelectedSports(selectedSports.filter((s) => s !== sport));
  };

  return (
    <section>
      <Container className="p-0">
        <label className="mb-0">Search & Select Sports*</label>

        {/* Selected Tags */}
        <div className="mb-2 d-flex flex-wrap">
          {selectedSports.map((sport, index) => (
            <span
              key={index}
              className="badge bg-primary me-2 mb-2 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeSport(sport)}
            >
              {sport} ✕
            </span>
          ))}
        </div>

        <div className="position-relative" ref={wrapperRef}>
          {/* Search Icon */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#bfbfbf"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          {/* Search Input */}
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search sports…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onClick={() => setShowDropdown(true)}
          />

          {/* Dropdown */}
          {showDropdown && (
            <div
              className="border bg-white position-absolute w-100 mt-1 p-2"
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                zIndex: 10,
                borderRadius: "4px",
              }}
            >
              {filteredSports.length === 0 && (
                <div className="text-muted">No sports found</div>
              )}

              {filteredSports.map((sport, index) => (
                <div
                  key={index}
                  className="p-2 hover-bg"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(sport)}
                >
                  {sport}
                </div>
              ))}
            </div>
          )}
        </div>

        <style>
          {`
            .hover-bg:hover {
              background: #f5f5f5;
            }
          `}
        </style>
      </Container>
    </section>
  );
}

export default SportsMultiSelect;
