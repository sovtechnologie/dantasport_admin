import React, { useState, useRef, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useFetchSportsByCategory } from "../../../../hooks/vendor/sports/useFetchSportsByCategory";

function SportsMultiSelect({ selectedIds = [], setSelectedSportsIds }){

  const [search, setSearch] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // --- Fetch sports dynamically ---
  const { data: sportsResponse, isLoading, isError } = useFetchSportsByCategory(); 
 const sportsList = useMemo(() => {
  return Array.isArray(sportsResponse?.result)
    ? sportsResponse.result.map((item) => ({
        id: item.id,
        name: item.sports_name,
        image: item.sports_images,
      }))
    : [];
}, [sportsResponse]);

useEffect(() => {
  if (!selectedIds.length || !sportsList.length) return;

  setSelectedSports((prev) => {
    const preSelected = sportsList.filter((sport) =>
      selectedIds.includes(sport.id)
    );

    // agar data same hai to state update mat karo
    if (JSON.stringify(prev) === JSON.stringify(preSelected)) {
      return prev;
    }

    return preSelected;
  });
}, [selectedIds, sportsList]);


  // --- Filter sports based on search safely ---
  const filteredSports = sportsList.filter(
    (item) => item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // --- Close dropdown on outside click ---
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Select sport ---
  const handleSelect = (sport) => {
    if (!selectedSports.find((s) => s.id === sport.id)) {
      const updated = [...selectedSports, sport];
      setSelectedSports(updated);

      // Pass selected IDs to parent (dynamic)
      setSelectedSportsIds(updated.map((s) => s.id));
    }

    setSearch("");
    setShowDropdown(true);
  };

  // --- Remove selected sport ---
  const removeSport = (sport) => {
    const updated = selectedSports.filter((s) => s.id !== sport.id);
    setSelectedSports(updated);
    setSelectedSportsIds(updated.map((s) => s.id));
  };

  return (
    <section>
      <Container className="p-0">
        <label className="mb-0">Search & Select Sports*</label>

        {/* Selected Tags */}
        <div className="mb-2 d-flex flex-wrap">
          {selectedSports.map((sport) => (
            <span
              key={sport.id}
              className="badge bg-primary me-2 mb-2 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeSport(sport)}
            >
              {sport.name} ✕
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
            placeholder={isLoading ? "Loading sports…" : "Search sports…"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onClick={() => setShowDropdown(true)}
            disabled={isLoading || isError}
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
                <div className="text-muted">
                  {isLoading ? "Loading…" : "No sports found"}
                </div>
              )}

              {filteredSports.map((sport) => (
                <div
                  key={sport.id}
                  className="p-2 hover-bg d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(sport)}
                >
                 
                  {sport.name}
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
