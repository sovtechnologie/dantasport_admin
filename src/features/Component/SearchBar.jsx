import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { MapPin, Home,Store } from "lucide-react";

const vendorOptions = [
  { value: "satish", label: "Satish" },
  { value: "shivam", label: "Shivam" },
  { value: "binod", label: "Binod" },
];

const locationOptions = [
  { value: "lucknow", label: "Lucknow" },
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
];

const venueOptions = [
  { value: "stadium", label: "Stadium" },
  { value: "banquet", label: "Banquet Hall" },
  { value: "playground", label: "Playground" },
];

const SearchBar = () => {
  const [vendor, setVendor] = useState(null);
  const [location, setLocation] = useState(null);
  const [venue, setVenue] = useState(null);

  const handleSearch = () => {
    console.log({
      vendor,
      location,
      venue,
    });
  };

  return (
    <Container
      className="py-3"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #0b5ed7)",
        borderRadius: "12px",
      }}
    >
      <Row className="bg-white shadow p-2 m-2 align-items-center rounded">

        {/* Location */}
        <Col md={3} className="d-flex align-items-center">
          <MapPin size={18} className="me-2 text-primary" />
          <Select
            options={locationOptions}
            placeholder="Search Location"
            value={location}
            onChange={setLocation}
            className="w-100"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                minHeight: "auto",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
          />
        </Col>

        {/* Vendor */}
        <Col md={3} className="d-flex align-items-center">
         <Store size={18} className="me-2 text-primary" />
          <Select
            options={vendorOptions}
            placeholder="Search Vendor"
            value={vendor}
            onChange={setVendor}
            className="w-100"
            isClearable
            styles={{
      control: (base) => ({
        ...base,
        border: "none",
        boxShadow: "none",
        minHeight: "auto",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
          />
        </Col>



        {/* Venue */}
        <Col md={3} className="d-flex align-items-center">
          <Home size={18} className="me-2 text-primary" />
          <Select
            options={venueOptions}
            placeholder="Search Venue"
            value={venue}
            onChange={setVenue}
            className="w-100"
            isClearable 
            styles={{
      control: (base) => ({
        ...base,
        border: "none",
        boxShadow: "none",
        minHeight: "auto",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
          />
        </Col>

        {/* Search Button */}
        <Col md={3} className="text-end">
          <Button
            onClick={handleSearch}
            style={{
              backgroundColor: "#0d6efd",
              border: "none",
              padding: "10px 26px",
              borderRadius: "8px",
            }}
          >
            SEARCH
          </Button>
        </Col>

      </Row>
    </Container>
  );
};

export default SearchBar;
