import { Container, Form, Col, Row, Card } from "react-bootstrap";
import "../../styelsheets/Manage/VendorInfo.css";
import "../../styelsheets/EventPage/CreateEvent.css";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useAddGyme } from "../../../../hooks/vendor/gym/useAddGyme";
import { useEffect, useState } from "react";
import { addGyme } from "../../../../services/vendor/gym/endpointApi";
import { useNavigate } from "react-router-dom";
import { useFetchActiveAmenities } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { TimePicker, Form as AntForm } from "antd";
import dayjs from "dayjs";
import GooglePlacesAutocomplete from "../../../../components/GooglePlacesAutocomplete";
import GoogleMapPicker from "../../../../components/GoogleMapPicker";





export default function AddGym() {
 


const navigate = useNavigate();
const { RangePicker } = TimePicker;
   const { mutate: addGym, isLoading } = useAddGyme();
   const { data: amenitiesData } = useFetchActiveAmenities();
 const amenitiesOptions = amenitiesData?.resutl || [];
  const [formData, setFormData] = useState({
    gymName: "",
    aboutGym: "",
    startTime: "",
    endTime: "",
    isBookable: true,
    amenities: [],
    fullAddress: "",
    area: "",
    city: "",
    state: "",
     pincode: "",  
    termAndConditions: "",
    cancellationPolicy: "",
    onlyWomen: 0,
    gymPasses: [{ passes_name: "One day passes", price: "" }],
    mobileImage: null,
    desktopImage: null,
    // coverImage: null
  });
  const [location, setLocation] = useState({
  fullAddress: "",
  area: "",
  city: "",
  state: "",
  lat: null,
  lng: null,
  mapUrl: ""
});


const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
  setFormData((prev) => ({ ...prev, [key]: value }));

  setErrors((prev) => {
    const newErrors = { ...prev };

    // Timing error clear karna agar startTime/endTime change hua
    if (key === "startTime" || key === "endTime") {
      delete newErrors.timing;
    } else {
      delete newErrors[key];
    }

    return newErrors;
  });
};




const handleFileChange = (key, file) => {
  setFormData((prev) => ({ ...prev, [key]: file }));

  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[key];
    return newErrors;
  });
};


 const validateForm = () => {
    let newErrors = {};
   if (!formData.startTime || !formData.endTime) {
  newErrors.timing = "Start time & End time required";
} else if (formData.startTime >= formData.endTime) {
  newErrors.timing = "End time must be greater than start time";
}


    if (!formData.gymName.trim())
      newErrors.gymName = "Gym name is required";

    if (!formData.aboutGym.trim())
      newErrors.aboutGym = "About gym is required";

    if (formData.amenities.length === 0)
      newErrors.amenities = "Select at least one amenity";

    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim())
  newErrors.pincode = "Pincode is required";

    if (!formData.fullAddress.trim()) {
  newErrors.fullAddress = "Full address is required";
}


    if (!formData.termAndConditions.trim())
      newErrors.termAndConditions = "Terms & conditions required";

    if (!formData.cancellationPolicy.trim())
      newErrors.cancellationPolicy = "CancellationPolicy required";

    if (!formData.desktopImage)
      newErrors.desktopImage = "Desktop image required";

    if (!formData.mobileImage)
      newErrors.mobileImage = "Mobile image required";

    if (
      !formData.gymPasses[0].price ||
      Number(formData.gymPasses[0].price) <= 0
    ) {
      newErrors.price = "Enter valid price greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const payload = new FormData();

    payload.append("gymName", formData.gymName);
    payload.append("aboutGym", formData.aboutGym);
    payload.append("onlyWomen", formData.onlyWomen);
    payload.append("lat", 25.25451);
    payload.append("lng", 75.5545);
    payload.append("fullAddress", formData.fullAddress);
    payload.append("state", formData.state);
    payload.append("city", formData.city);
    payload.append("area", formData.area);
    // payload.append("pincode", formData.pincode); // ✅

    payload.append("termAndConditions", formData.termAndConditions);
    payload.append("cancellationPolicy", formData.cancellationPolicy);
    payload.append("amenitiesType", "gym");
    payload.append("startTime", formData.startTime);
payload.append("endTime", formData.endTime);
// payload.append("fullAddress", formData.fullAddress);


    payload.append("isBookable", formData.isBookable);
  payload.append("amenities", JSON.stringify(formData.amenities));
  
 
  // ✅ Gym passes as JSON string
  payload.append("gymPasses", JSON.stringify(formData.gymPasses));
    if (formData.mobileImage) payload.append("mobileImage", formData.mobileImage);
    // if (formData.coverImage) payload.append("mobileImage", formData.coverImage);
    if (formData.desktopImage) payload.append("desktopImage", formData.desktopImage);

  addGym(payload, {
  onSuccess: (data) => {
    console.log("Gym added successfully", data);

   
    navigate("/vendor/gym/list");
  },
  onError: (error) => {
    console.error("Add gym error", error);
    alert("Something went wrong");
  },
});

  };

const AMENITIES_OPTIONS = [
  { id: 1, name: "Parking" },
  { id: 2, name: "Locker" },
  { id: 3, name: "Shower" },
  { id: 4, name: "AC" },
  { id: 5, name: "Trainer" },
  { id: 6, name: "Music" },
];

const handleAmenityToggle = (id) => {
  setFormData((prev) => ({
    ...prev,
    amenities: prev.amenities.includes(id)
      ? prev.amenities.filter((a) => a !== id)
      : [...prev.amenities, id],
  }));

  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.amenities;
    return newErrors;
  });
};

useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Map iframe
      setLocation((prev) => ({
        ...prev,
        lat,
        lng,
        mapUrl: `https://www.google.com/maps?q=${lat},${lng}&output=embed`,
        fullAddress: "Current Location"
      }));
    },
    (err) => {
      console.warn("Location permission denied");
    }
  );
}, []);


  return (
    <Container className="container_wrapper">
      <h2 className="section_title mb-3">GYM Information</h2>

      <Row>
        {/* Select Input */}
        <Col className="col-6">
          <Form.Group className="mb-3">
            <Form.Label>Enter GYM Name*</Form.Label>
            
             <Form.Control
             className="uniform-height"
              type="text"
              value={formData.gymName}
              onChange={(e) => handleChange("gymName", e.target.value)}
           isInvalid={!!errors.gymName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.gymName}
            </Form.Control.Feedback>
          
          </Form.Group>
        </Col>

        {/* File Upload */}
        {/* <Col className="col-6">
          <Form.Group controlId="gstUpload" className="mb-3">
            <Form.Label>Upload Cover Image*</Form.Label>

            <div className="upload-box uniform-height d-flex align-items-center">
              <FiUpload size={20} />
              <span className="ms-2 text-muted">Upload Image</span>
   <Form.Control
                type="file"
                onChange={(e) => handleFileChange("coverImage", e.target.files[0])}
              />            </div>
          </Form.Group>
        </Col> */}
        <Col className="col-12">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Add About GYM*
            </label>
            <Form.Control
              as="textarea"
              rows={6}
              value={formData.aboutGym}
              onChange={(e) => handleChange("aboutGym", e.target.value)}
               isInvalid={!!errors.aboutGym}
            />
            <Form.Control.Feedback type="invalid">
              {errors.aboutGym}
            </Form.Control.Feedback>
          </div>
        </Col>
      <Col className="col-5">
  <AntForm.Item
  label="Timing*"
  validateStatus={errors.timing ? "error" : ""}
  help={errors.timing}
>
  <TimePicker.RangePicker
    format="HH:mm"
    minuteStep={5}
    value={
      formData.startTime && formData.endTime
        ? [
            dayjs(formData.startTime, "HH:mm"),
            dayjs(formData.endTime, "HH:mm"),
          ]
        : null
    }
    onChange={(times) => {
      if (!times) {
        handleChange("startTime", null);
        handleChange("endTime", null);
        return;
      }

      handleChange("startTime", times[0].format("HH:mm"));
      handleChange("endTime", times[1].format("HH:mm"));
    }}
  />
</AntForm.Item>

</Col>

        
        {/* <Col className="col-4">
          <div className="mb-3 event_calendar ">
            <label className="form-label">Is Bookable*</label>

            <div className="d-flex">
              <div className="form-check">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">Yes</label>
              </div>

              <div className="form-check ms-3">
                <input type="radio" className="form-check-input" />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
        </Col> */}
         <Col className="col-4">
          <Form.Group className="mb-3">
            <Form.Label>Is Bookable*</Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                label="Yes"
                checked={formData.isBookable === true}
                onChange={() => handleChange("isBookable", true)}
              />
              <Form.Check
                type="radio"
                label="No"
                checked={formData.isBookable === false}
                onChange={() => handleChange("isBookable", false)}
                className="ms-3"
              />
            </div>
          </Form.Group>
        </Col>
   <Col className="col-3">
  <Form.Group className="mb-3">
    <Form.Label>Amenities*</Form.Label>

    <div className="dropdown">
      <button
        className={`form-control text-start dropdown-toggle ${
          errors.amenities ? "is-invalid" : ""
        }`}
        type="button"
        data-bs-toggle="dropdown"
      >
        {formData.amenities.length
          ? `${formData.amenities.length} Selected`
          : "Select Amenities"}
      </button>

      <ul className="dropdown-menu w-100 px-2" style={{ maxHeight: 220, overflowY: "auto" }}>
        {amenitiesOptions.map((item) => (
          <li key={item.id} className="dropdown-item">
            <Form.Check
              type="checkbox"
              label={item.amenities_name}
              checked={formData.amenities.includes(item.id)}
              onChange={() => handleAmenityToggle(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>

    {errors.amenities && (
      <small className="text-danger">{errors.amenities}</small>
    )}
  </Form.Group>
</Col>


      </Row>
      <Row>
        <Col className="col-6">
          <div className="d-flex justify-between ">
            <h2 className="sub_title mb-4">Location Info</h2>
            <div className="edit_btn">
              <button>
                <FiEdit />
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <Col className="col-12">
            <div className="mb-3 position-relative">
              <FiSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "#6c757d",
                }}
              />

   <GooglePlacesAutocomplete
  placeholder="Search location, pincode, village"
  onPlaceSelect={(place) => {
    setLocation({
      lat: place.latitude,
      lng: place.longitude,
      fullAddress: place.address,
    });

    handleChange("fullAddress", place.address);
    handleChange("area", place.area);
    handleChange("city", place.city);
    handleChange("state", place.state);
        handleChange("pincode", place.pincode); // ✅ ADD

  }}
/>




            </div>
          </Col>
          {/* <Col className="col-12">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </Col> */}

          <Row>
            <Col className="col-6">
  <Form.Group className="mb-3">
    <Form.Label>Full Address*</Form.Label>
    <Form.Control
     type="text"
      rows={3}
      placeholder="Enter complete address"
      value={formData.fullAddress}
      onChange={(e) => handleChange("fullAddress", e.target.value)}
      isInvalid={!!errors.fullAddress}
    />
    <Form.Control.Feedback type="invalid">
      {errors.fullAddress}
    </Form.Control.Feedback>
  </Form.Group>
</Col>

            <Col className="col-6">
              <div className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Area*</Form.Label>
                  <Form.Control
              type="text"
              placeholder="Enter Area"
              value={formData.area}
              onChange={(e) => handleChange("area", e.target.value)}
          isInvalid={!!errors.area}
            />
            <Form.Control.Feedback type="invalid">
              {errors.area}
            </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
            <Col className="col-6">
              <div className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>City*</Form.Label>
                   <Form.Control
              type="text"
               placeholder="Enter City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
            <Col className="col-6">
              <div className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>State*</Form.Label>
                    <Form.Control
              type="text"
               placeholder="Enter State"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
             isInvalid={!!errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
            <Col>
           <Form.Group className="mb-3">
  <Form.Label>Pincode*</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter Pincode"
    value={formData.pincode}
    onChange={(e) => handleChange("pincode", e.target.value)}
    isInvalid={!!errors.pincode}
  />
  <Form.Control.Feedback type="invalid">
    {errors.pincode}
  </Form.Control.Feedback>
</Form.Group>

            </Col>
          </Row>
        </Col>
        <Col className="col-6">
          <Card
            style={{
              borderRadius: "14px",
              padding: "20px",
              border: "1px solid #e5e5e5",
            }}
          >
            {/* Title */}
            <h5 className="fw-bold mb-2">Location</h5>

            {/* Address */}
          <p className="mb-3 text-secondary" style={{ fontSize: "15px" }}>
  {location.fullAddress || "Select a location"}
</p>


            {/* Google Map */}
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                width: "100%",
                height: "260px",
              }}
            >
           {/* <iframe
  title="location-map"
  width="100%"
  height="100%"
  loading="lazy"
  style={{ border: "0" }}
  src={
    location.mapUrl ||
    "https://www.google.com/maps?q=India&output=embed"
  }
/> */}

<GoogleMapPicker
  location={location}
  onSelect={(place) => {
    setLocation({
      lat: place.latitude,
      lng: place.longitude,
      fullAddress: place.address,
    });

    handleChange("fullAddress", place.address);
    handleChange("area", place.area);
    handleChange("city", place.city);
    handleChange("state", place.state);
        handleChange("pincode", place.pincode); // ✅ ADD

  }}
/>


            </div>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col className="col-6">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Terms and conditions*
            </label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.termAndConditions}
              onChange={(e) => handleChange("termAndConditions", e.target.value)}
         isInvalid={!!errors.termAndConditions}
            />
            <Form.Control.Feedback type="invalid">
              {errors.termAndConditions}
            </Form.Control.Feedback>
          </div>
        </Col>
        <Col className="col-6">
          <div class="mb-3">
            <label for="GYM" class="form-label">
              Cancellation policy
            </label>
           <Form.Control
              as="textarea"
              rows={4}
              value={formData.cancellationPolicy}
              onChange={(e) => handleChange("cancellationPolicy", e.target.value)}
                 isInvalid={!!errors.cancellationPolicy}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cancellationPolicy}
            </Form.Control.Feedback>
          </div>
        </Col>
        <Col className="col-6">
          <div className="mb-3">
            <Form.Group controlId="gstUpload">
              <label for="exampleFormControlInput1" class="form-label">
                Upload GYM Poster/Banner (For Desktop)*
              </label>

              <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                {/* <FiUpload size={20} className="mb-1" /> */}
                {/* <span className="text-muted">Upload Image</span>
                <span className="text-muted">(Size 430px * 200px max 5MB)</span> */}
                 <Form.Control
                type="file"
                onChange={(e) => handleFileChange("desktopImage", e.target.files[0])}
             isInvalid={!!errors.desktopImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.desktopImage}
            </Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>
        </Col>
        <Col className="col-6">
          <div className="mb-3">
            <Form.Group controlId="gstUpload">
              <label for="exampleFormControlInput1" class="form-label">
                Upload GYM Poster/Banner (For Mobile)*
              </label>

              <div className="upload-box d-flex flex-column justify-content-center align-items-center">
                {/* <FiUpload size={20} className="mb-1" /> */}
                {/* <span className="text-muted">Upload Image</span>
                <span className="text-muted">(Size 430px * 200px max 5MB)</span> */}
                <Form.Control
                type="file"
                onChange={(e) => handleFileChange("mobileImage", e.target.files[0])}
         isInvalid={!!errors.mobileImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobileImage}
            </Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-6">
          <div class="mb-3">
            <label for="Pricing" class="form-label">
              Enter Pricing/Passes*
            </label>
          <Form.Control
  type="number"
  value={formData.gymPasses[0].price}
  onChange={(e) => {
    handleChange("gymPasses", [
      {
        passes_name: "One day passes",
        price: Number(e.target.value),
      },
    ]);

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.price;
      return newErrors;
    });
  }}
  isInvalid={!!errors.price}
/>

            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </div>
        </Col>
         <Col className="col-6">
          <Form.Group className="mb-3">
            <Form.Label>Only Women*</Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                label="Yes"
                checked={formData.onlyWomen === 1}
                onChange={() => handleChange("onlyWomen", 1)}
              />
              <Form.Check
                type="radio"
                label="No"
                checked={formData.onlyWomen === 0}
                onChange={() => handleChange("onlyWomen", 0)}
                className="ms-3"
              />
            </div>
          </Form.Group>
        </Col>

      </Row>
      <Row className="mt-4 justify-items-end justify-end">
        <Col className="col-3   text-end">
          <div className="save_btn mb-3">
             <button
              className="btn btn-primary w-100"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
