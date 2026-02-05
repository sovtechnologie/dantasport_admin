import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import { FiUpload, FiEdit, FiSearch } from "react-icons/fi";
import SportsSearch from "./SportsSearch";
import GooglePlacesAutocomplete from "../../../../components/GooglePlacesAutocomplete";
import GoogleMapPicker from "../../../../components/GoogleMapPicker";
import { message } from "antd";
import { useCreateCoachesAndAcademy } from "../../../../hooks/vendor/couches/useCreateCoaches";
import { createCoachesAndAcademy } from "../../../../services/vendor/coaches/endpointApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCoachById } from "../../../../hooks/vendor/couches/useGetCoachById";
import { useUpdateCoachesAndAcademy } from "../../../../hooks/vendor/couches/useUpdateCoaches";

function CoachesAcademy() {
  // === STATES ===

  const [selectedType, setSelectedType] = useState(1); // 1=Coach, 2=Academy
  const [selectedSportsIds, setSelectedSportsIds] = useState([]);
  const [academyName, setAcademyName] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [feesText, setFeesText] = useState("");
  const [trainingType, setTrainingType] = useState("");   // "Adults" | "Kids"
  const [classesType, setClassesType] = useState([]);    // ["1on1", "group", "online"]
  const [mobileImage, setMobileImage] = useState(null);
  const [desktopImage, setDesktopImage] = useState(null);
  const [existingMobileImage, setExistingMobileImage] = useState(null);
const [existingDesktopImage, setExistingDesktopImage] = useState(null);


  const [searchParams] = useSearchParams();
const editId = searchParams.get("id");

const isEditMode = !!editId;

const { data: editData } = useGetCoachById(editId);

const { mutate: updateCoach } = useUpdateCoachesAndAcademy();


  const navigate = useNavigate();

  const [daysSelected, setDaysSelected] = useState({
    monday: false,
    tuesday: false,
    wednessday: false,
    thusday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day) => {
    setDaysSelected((prev) => {
      const updated = {
        ...prev,
        [day]: !prev[day],
      };

      const anySelected = Object.values(updated).some(v => v);
      if (anySelected) clearError("days");

      return updated;
    });
  };





  const [locations, setLocations] = useState([
    { fullAddress: "", area: "", city: "", state: "", pincode: "", lat: null, lng: null },
  ]);

  const [achievements, setAchievements] = useState([{ certificateName: "", certificateFile: null }]);
  const [errors, setErrors] = useState({});

  // === HOOK ===
  const { mutate: createCoach, isLoading } = useCreateCoachesAndAcademy();

  // === LOCATION HANDLERS ===
  const handleLocationChange = (index, key, value) => {
    const updated = [...locations];
    updated[index][key] = value;
    setLocations(updated);
  };

  const addMoreLocation = () => {
     if (isEditMode) return;
    setLocations([...locations, { lat: null, lng: null, fullAddress: "", area: "", city: "", state: "", pincode: "" }]);
  };

  const removeLocation = (index) => {
     if (isEditMode) return;
    if (locations.length === 1) return;
    setLocations(locations.filter((_, i) => i !== index));
  };

  // === ACHIEVEMENT HANDLERS ===
  const handleAchievementChange = (index, key, value) => {
    const updated = [...achievements];
    updated[index][key] = value;
    setAchievements(updated);
  };

  const addMoreAchievement = () => {
    setAchievements([...achievements, { certificateName: "", certificateFile: null }]);
  };

  const toggleTrainingType = (type) => {
    setTrainingType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleItem = (_, setState, value) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };


  const classesMap = {
    "1on1": "1-on-1 Classes",
    "group": "Group Classes",
    "online": "Online Classes",
  };

  const classesString = classesType
    .map((c) => classesMap[c])
    .join(" , ");



  const removeAchievement = (index) => {
    if (achievements.length === 1) return;
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const clearError = (key) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };


  const validateForm = () => {
    const newErrors = {};

    // Basic Fields
    if (!academyName.trim()) newErrors.academyName = "Name is required";

    if (selectedSportsIds.length === 0)
      newErrors.sports = "At least one sport must be selected";

    if (!aboutText.trim()) newErrors.aboutText = "About is required";

    if (!feesText.trim()) newErrors.feesText = "Fees & Packages required";

    // Classes Type (Array Validation)
    if (classesType.length === 0)
      newErrors.classesType = "Select at least one class type";

    // Training Type
    if (!trainingType)
      newErrors.trainingType = "Training type required";

    // Days Validation – at least one day must be selected
    const anyDaySelected = Object.values(daysSelected).some((v) => v === true);
    if (!anyDaySelected)
      newErrors.days = "Select at least one day";

    // Locations Validation
    locations.forEach((l, i) => {
      if (!l.fullAddress)
        newErrors[`fullAddress_${i}`] = "Full address required";

      if (!l.area)
        newErrors[`area_${i}`] = "Area required";

      if (!l.city)
        newErrors[`city_${i}`] = "City required";

      if (!l.state)
        newErrors[`state_${i}`] = "State required";

      if (!l.pincode)
        newErrors[`pincode_${i}`] = "Pincode required";
    });

    // Achievements Validation
    // Image Upload Validation
   if (!isEditMode) {
  if (!mobileImage)
    newErrors.mobileImage = "Mobile image required";

  if (!desktopImage)
    newErrors.desktopImage = "Desktop image required";
}


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const getPreviewUrl = (file) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const buildFormData = () => {
    const formData = new FormData();

  if (isEditMode) {
    formData.append("coachesAcaademyId", editId);
  }
    /* ===== BASIC FIELDS ===== */
    formData.append("type", selectedType);
    formData.append("name", academyName); // now dynamic
    formData.append("about", aboutText);
    formData.append("feesAndPackages", feesText);
    formData.append("training_type", trainingType);
    formData.append("classes", classesString);

    /* ===== SPORTS IDS (ARRAY AS JSON) ===== */
    if (selectedSportsIds.length > 0) {
      formData.append("sportsId", JSON.stringify(selectedSportsIds)); // send as JSON array
    }

    /* ===== DAYS (1 / 0) ===== */
    Object.entries(daysSelected).forEach(([key, value]) => {
      formData.append(key, value ? 1 : 0);
    });

    /* ===== LOCATIONS ===== */
    formData.append("locations", JSON.stringify(locations));

    /* ===== ACHIEVEMENTS (ARRAY AS JSON) ===== */
    const certNames = achievements.map((a) => a.certificateName);
    formData.append("certificationNames", JSON.stringify(certNames)); // send as JSON array

    // Attach files separately
    achievements.forEach((a, index) => {
      if (a.certificateFile) {
        formData.append(`certificateUrl`, a.certificateFile); // keep binary separate
      }
    });

    /* ===== IMAGES ===== */
    if (mobileImage) formData.append("mobileImage", mobileImage);
    if (desktopImage) formData.append("desktopImage", desktopImage);

    return formData;
  };

const handleSave = () => {
  if (!validateForm()) {
    message.error("Please fill all required fields!");
    return;
  }

  const formData = buildFormData();

  if (isEditMode) {
    updateCoach(formData, {
      onSuccess: () => {
        message.success("Updated Successfully!");
        navigate("/vendor/vendor/coach/coaches-academy-list");
      },
      onError: () => message.error("Something went wrong!"),
    });
  } else {
    createCoach(formData, {
      onSuccess: () => {
        message.success("Coach/Academy created successfully!");
        navigate("/vendor/vendor/coach/coaches-academy-list");
      },
      onError: () => message.error("Something went wrong!"),
    });
  }
};


 useEffect(() => {
  if (isEditMode && editData) {

    const data = editData?.data.result?.[0];
console.log("datadata",data);
    if (!data) return;

    setSelectedType(data.type);
    setAcademyName(data.name);
    setAboutText(data.about);
    setFeesText(data.fees_and_packages);
    setTrainingType(data.training_type);
setExistingMobileImage(data.mobile_image);
setExistingDesktopImage(data.desktop_image);
    // Sports IDs
if (data.sports) {
  const sportIds = Array.isArray(data.sports)
    ? data.sports.map((s) => (typeof s === "object" ? s.id : s))
    : [];

  setSelectedSportsIds(sportIds);
}

    // Classes
    setClassesType(
      data.classes
        ? data.classes.split(",").map((c) => {
            if (c.trim() === "1-on-1 Classes") return "1on1";
            if (c.trim() === "Group Classes") return "group";
            if (c.trim() === "Online Classes") return "online";
            return c.trim();
          })
        : []
    );

    // Days Mapping
    setDaysSelected({
      monday: !!data.monday,
      tuesday: !!data.tuesday,
      wednessday: !!data.wednesday,
      thusday: !!data.thursday,
      friday: !!data.friday,
      saturday: !!data.saturday,
      sunday: !!data.sunday,
    });

    // Locations
    if (data.locations && data.locations.length > 0) {
  const mappedLocations = data.locations.map((loc) => ({
    lat: loc.lat,
    lng: loc.lng,
    area: loc.area,
    city: loc.city,
    state: loc.state,
    pincode: loc.pincode,
    fullAddress: loc.full_address,   // 🔥 KEY FIX HERE
  }));

  setLocations(mappedLocations);
}

    // Achievements
    if (data.award_certificate) {
      setAchievements(
        data.award_certificate.map((c) => ({
          certificateName: c.certificate_name,
          certificateFile: null,
          existingUrl: c.certificate_url,
        }))
      );
    }

  }
}, [editData, isEditMode]);



  return (
    <>
      <section>
        <Container className="container_wrapper">
          {/* --- Existing UI kept intact --- */}
          <Row>
            <Col className="col-12">
              <h2 className="sub_title mb-4">Coaches / Academy</h2>
            </Col>
            <Col className="col-12 mb-3">
              <div className="mb-3 event_calendar">
                <label className="form-label">Select Services As?*</label>
                <div className="d-flex">
                  <div className="form-check">
                    <input type="radio" className="form-check-input" name="participants" onChange={() => setSelectedType(1)} checked={selectedType === 1}   disabled={isEditMode}/>
                    <label className="form-check-label">Coach</label>
                  </div>
                  <div className="form-check ms-3">
                    <input type="radio" className="form-check-input" name="participants" onChange={() => setSelectedType(2)} checked={selectedType === 2}  disabled={isEditMode}/>
                    <label className="form-check-label">Academy</label>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="col-6">
              <div className="mb-3">
                <label className="form-label">Coaches Name*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={academyName}              // dynamic state
                  onChange={(e) => {
                    setAcademyName(e.target.value);
                    clearError("academyName");
                  }}
                    disabled={isEditMode}
 />
                {errors.academyName && (
                  <p className="text-danger">{errors.academyName}</p>
                )}
              </div>
            </Col>
          </Row>


          <Row className="my-5">
            <Col className="col-6">
              <div className="mb-3">
             <SportsSearch
  selectedIds={selectedSportsIds}
  setSelectedSportsIds={(ids) => {
    setSelectedSportsIds(ids);
    clearError("sports");
  }}
/>

                {errors.sports && (
                  <p className="text-danger">{errors.sports}</p>
                )}


              </div>
            </Col>
          </Row>

          {/* --- About Trainer/Academy --- */}
          <Row>
            <Col>
              <h2 className="sub_title mb-4">About Trainer/Academy</h2>
              <div className="mb-3">
                <label className="form-label">Add About Trainer*</label>
                <textarea className="form-control" placeholder="Eg:Hi I am Ashish & I have 6 years of experience in fitness & nutritional coaching"
                  rows="6" value={aboutText} onChange={(e) => {
                    setAboutText(e.target.value);
                    clearError("aboutText");
                  }}
                ></textarea>
                {errors.aboutText && <p className="text-danger">{errors.aboutText}</p>}
              </div>
            </Col>
          </Row>

          <Row className="my-5"> <h2 className="sub_title mb-4">About Trainer/Academy</h2>
            <Col className="col-8">
              <div className="mb-3 event_calendar">
                <label className="form-label">Batch*</label>


                <div className="d-flex">

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" checked={classesType.includes("1on1")}
                      onChange={() => {
                        toggleItem(classesType, setClassesType, "1on1");
                        clearError("classesType");
                      }}

                    />
                    <label className="form-check-label">1-on-1 Classes</label>
                  </div> <div className="form-check ms-3">
                    <input type="checkbox" className="form-check-input" checked={classesType.includes("online")}
                      onChange={() => { toggleItem(classesType, setClassesType, "online"); clearError("classesType") }
                      }
                    />
                    <label className="form-check-label">Online Classes</label>
                  </div> <div className="form-check ms-3">
                    <input type="checkbox" className="form-check-input" checked={classesType.includes("group")}
                      onChange={() => { toggleItem(classesType, setClassesType, "group"); clearError("classesType") }
                      } />
                    <label className="form-check-label">Group Classes</label> </div>

                </div> {errors.classesType && (
                  <p className="text-danger">{errors.classesType}</p>
                )}</div> </Col>
            <Col className="col-4">
              <div className="mb-3 event_calendar">
                <label className="form-label">Age*</label>


                <div className="d-flex"> <div className="form-check">
                  <input type="radio" className="form-check-input" checked={trainingType === "Kids"}
                    onChange={() => {
                      setTrainingType("Kids");
                      clearError("trainingType");
                    }}
                  />
                  <label className="form-check-label">Kids</label>
                </div> <div className="form-check ms-3">
                    <input type="radio" className="form-check-input" checked={trainingType === "Adults"}
                      onChange={() => {
                        setTrainingType("Adults");
                        clearError("trainingType");
                      }}
                    />
                    <label className="form-check-label">Adults</label>
                  </div> </div>  {errors.trainingType && (
                    <p className="text-danger">{errors.trainingType}</p>
                  )}</div> </Col> </Row> <Row>
            <label className="form-check-label mb-3">Days*</label>


            <Col className="d-flex flex-wrap">
              {[
                ["monday", "Monday"],
                ["tuesday", "Tuesday"],
                ["wednessday", "Wednesday"],
                ["thusday", "Thursday"],
                ["friday", "Friday"],
                ["saturday", "Saturday"],
                ["sunday", "Sunday"],
              ].map(([key, label]) => (
                <div key={key} className="mb-3 event_calendar me-3">

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={key}
                      checked={daysSelected[key]}
                      onChange={() => toggleDay(key)}
                    />
                    <label className="form-check-label" htmlFor={key}>
                      {label}
                    </label>
                  </div>

                </div>
              ))}
              {errors.days && (
                <p className="text-danger">{errors.days}</p>
              )}
            </Col>

          </Row>

          {/* --- Fees & Packages --- */}
          <Row className="mt-5">
            <Col>
              <h2 className="sub_title mb-4">About Fee & Packages</h2>
              <div className="mb-3">
                <label className="form-label">Add Fee & Packages*</label>
                <textarea className="form-control" placeholder="Eg:Personal Coaching & Lifestyle Best Practices" rows="6" value={feesText} onChange={(e) => {
                  setFeesText(e.target.value);
                  clearError("feesText");
                }}
                ></textarea>
                {errors.feesText && <p className="text-danger">{errors.feesText}</p>}
              </div>
            </Col>
          </Row>

          <div className="my-5">
            <Row>
              <Col className="col-6">
                <div className="d-flex justify-between">
                  <h2 className="sub_title mb-4">Location Info</h2>
                  <div className="edit_btn">
                    <button><FiEdit /></button>
                  </div>
                </div>
              </Col>
            </Row>

            {locations.map((location, index) => (
              <div key={index} className="mb-3 position-relative">

                {/* ❌ CROSS (top right like achievements) */}
                {index > 0 && (
                  <div
                   
                  >
                    
                  </div>
                )}

                <Row>
                  {/* LEFT */}
                  <Col className="col-6">
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
                      disabled={isEditMode}
                        placeholder="Search location, pincode, village"
                        onPlaceSelect={(place) => {
                          handleLocationChange(index, "lat", place.latitude);
                          handleLocationChange(index, "lng", place.longitude);
                          handleLocationChange(index, "fullAddress", place.address);
                          handleLocationChange(index, "area", place.area);
                          handleLocationChange(index, "city", place.city);
                          handleLocationChange(index, "state", place.state);
                          handleLocationChange(index, "pincode", place.pincode);

                          clearError(`fullAddress_${index}`);
                          clearError(`area_${index}`);
                          clearError(`city_${index}`);
                          clearError(`state_${index}`);
                          clearError(`pincode_${index}`);

                        }}

                      />
                    </div>

                    <Row>
                      <Col className="col-6">
                        <Form.Group className="mb-3">
                          <Form.Label>Full Address*</Form.Label>
                          <Form.Control
                            value={location.fullAddress}
                            disabled={isEditMode}
                            onChange={(e) => {
                              handleLocationChange(index, "fullAddress", e.target.value);
                              clearError(`fullAddress_${index}`);
                            }}

                          />
                          {errors[`fullAddress_${index}`] && (
                            <p className="text-danger">{errors[`fullAddress_${index}`]}</p>
                          )}

                        </Form.Group>
                      </Col>

                      <Col className="col-6">
                        <Form.Group className="mb-3">
                          <Form.Label>Area*</Form.Label>
                          <Form.Control
                            value={location.area}
                           disabled={isEditMode}
                            onChange={(e) => {
                              handleLocationChange(index, "area", e.target.value);
                              clearError(`area_${index}`);
                            }}

                          />
                          {errors[`area_${index}`] && (
                            <p className="text-danger">{errors[`area_${index}`]}</p>
                          )}

                        </Form.Group>
                      </Col>

                      <Col className="col-6">
                        <Form.Group className="mb-3">
                          <Form.Label>City*</Form.Label>
                          <Form.Control
                            value={location.city}
                            disabled={isEditMode}
                            onChange={(e) => {
                              handleLocationChange(index, "city", e.target.value);
                              clearError(`city_${index}`);
                            }}

                          />
                          {errors[`city_${index}`] && (
                            <p className="text-danger">{errors[`city_${index}`]}</p>
                          )}
                        </Form.Group>
                      </Col>

                      <Col className="col-6">
                        <Form.Group className="mb-3">
                          <Form.Label>State*</Form.Label>
                          <Form.Control
                            value={location.state}
                            disabled={isEditMode}
                            onChange={(e) => {
                              handleLocationChange(index, "state", e.target.value);
                              clearError(`state_${index}`);
                            }}

                          />
                          {errors[`state_${index}`] && (
                            <p className="text-danger">{errors[`state_${index}`]}</p>
                          )}
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Pincode*</Form.Label>
                          <Form.Control
                            value={location.pincode}
                           disabled={isEditMode}
                            onChange={(e) => {
                              handleLocationChange(index, "pincode", e.target.value);
                              clearError(`pincode_${index}`);
                            }}

                          />
                          {errors[`pincode_${index}`] && (
                            <p className="text-danger">{errors[`pincode_${index}`]}</p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  {/* RIGHT */}
                  <Col className="col-6">
                    <Card style={{ borderRadius: "14px", padding: "20px" }}>
                      <h5 className="fw-bold mb-2">Location</h5>
                      <p className="mb-3 text-secondary">
                        {location.fullAddress || "Select a location"}
                      </p>

                      <div style={{ height: "260px" }}>
                        <GoogleMapPicker
                          location={location}
                          onSelect={(place) => {
                            handleLocationChange(index, "lat", place.latitude);
                            handleLocationChange(index, "lng", place.longitude);
                            handleLocationChange(index, "fullAddress", place.address);
                            handleLocationChange(index, "area", place.area);
                            handleLocationChange(index, "city", place.city);
                            handleLocationChange(index, "state", place.state);
                            handleLocationChange(index, "pincode", place.pincode);
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            ))}
            <Row className="d-flex justify-end mt-3 p-0">
              <Col className="col-3 p-0 d-flex gap-2">
                <div className="save_btn">
                  <button type="button" onClick={addMoreLocation}>
                    + Add More
                  </button>
                </div>

                {locations.length > 1 && (
                  <div className="save_btn">
                    <button
                      type="button"
                      style={{ background: "#dc3545", color: "#fff" }}
                      onClick={() => removeLocation(locations.length - 1)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Col>
            </Row>


          </div>
          <Row>
            <Col className="col-12">
              <h2 className="sub_title mb-4">Achievements</h2>
            </Col>

            {achievements.map((item, index) => (
              <React.Fragment key={index}>
                {/* CERTIFICATE NAME */}
                <Col className="col-6 position-relative">
                  {/* ❌ CROSS */}
                  {index > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "-5px",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#dc3545",
                        fontWeight: "bold",
                      }}
                      onClick={() => removeAchievement(index)}
                    >
                      ✕
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="mb-3">Certificate Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.certificateName}
                      onChange={(e) => {
                        const updated = [...achievements];
                        updated[index].certificateName = e.target.value;
                        setAchievements(updated);
                      }}
                    />
                  </div>
                </Col>

                {/* UPLOAD */}
                <Col className="col-6">
                  <div className="mb-3">
                    <Form.Group>
                      <label className="form-label mb-3">
                        Upload Certificate*
                      </label>

                      <div
                        className="upload-box d-flex flex-column justify-content-center align-items-center"
                        style={{ height: "55px", cursor: "pointer", position: "relative" }}
                      >
                        {item.certificateFile ? (
                          <img
                            src={getPreviewUrl(item.certificateFile)}
                            alt="Certificate Preview"
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "contain",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <>
                            <FiUpload size={22} className="mb-1" />
                            <span className="text-muted">Upload Certificate</span>
                          </>
                        )}

                        <Form.Control
                          type="file"
                          accept="image/*"
                          style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0,
                            cursor: "pointer",
                          }}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[index].certificateFile = e.target.files[0];
                            setAchievements(updated);

                            clearError(`certificateFile_${index}`);
                          }}
                        />
                      </div>

                    </Form.Group>
                  </div>
                </Col>
              </React.Fragment>
            ))}

            {/* ADD MORE */}
            <Row className="d-flex justify-end mt-3 p-0">
              <Col className="col-3 p-0">
                <div className="save_btn">
                  <button type="button" onClick={addMoreAchievement}>
                    + Add More
                  </button>
                </div>
              </Col>
            </Row>
          </Row>
          <Row className="my-4">
            <Col className="col-12">
              <h2 className="sub_title mb-4">Upload Images</h2>
            </Col>

            {/* MOBILE IMAGE */}
            <Col className="col-6">
              <Form.Group className="mb-3">
                <label className="form-label mb-2">Mobile Image*</label>



                <div
                  className="upload-box d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "120px", cursor: "pointer", position: "relative" }}
                >
                  {/* {mobileImage ? (
                    <img
                      src={getPreviewUrl(mobileImage)}
                      alt="Mobile Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <>
                      <FiUpload size={22} className="mb-1" />
                      <span className="text-muted">Upload Mobile Image</span>
                    </>
                  )} */}
                  {mobileImage ? (
  <img src={getPreviewUrl(mobileImage)} alt="Mobile Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}/>
) : existingMobileImage ? (
  <img src={existingMobileImage} alt="Mobile Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}/>
) : (
  <>
    <FiUpload size={22} className="mb-1" />
    <span className="text-muted">Upload Mobile Image</span>
  </>
)}


                  <Form.Control
                    type="file"
                    accept="image/*"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      cursor: "pointer",
                    }}
                    onChange={(e) => {
                      setMobileImage(e.target.files[0]);
                      clearError("mobileImage");
                    }}
                  />
                </div>
                {errors.mobileImage && (
                  <p className="text-danger">{errors.mobileImage}</p>
                )}
              </Form.Group>
            </Col>

            {/* DESKTOP IMAGE */}
            <Col className="col-6">
              <Form.Group className="mb-3">
                <label className="form-label mb-2">Desktop Image*</label>



                <div
                  className="upload-box d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "120px", cursor: "pointer", position: "relative" }}
                >
                  {/* {desktopImage ? (
                    <img
                      src={getPreviewUrl(desktopImage)}
                      alt="Desktop Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <>
                      <FiUpload size={22} className="mb-1" />
                      <span className="text-muted">Upload Desktop Image</span>
                    </>
                  )} */}
                  {desktopImage ? (
  <img src={getPreviewUrl(desktopImage)}  alt="Desktop Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }} />
) : existingDesktopImage ? (
  <img src={existingDesktopImage}  alt="Desktop Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}/>
) : (
  <>
    <FiUpload size={22} className="mb-1" />
    <span className="text-muted">Upload Desktop Image</span>
  </>
)}


                  <Form.Control
                    type="file"
                    accept="image/*"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      cursor: "pointer",
                    }}
                    onChange={(e) => {
                      setDesktopImage(e.target.files[0]);
                      clearError("desktopImage");
                    }}
                  />

                </div>
                {errors.desktopImage && (
                  <p className="text-danger">{errors.desktopImage}</p>
                )}
              </Form.Group>
            </Col>
          </Row>


          <Row className="d-flex justify-end my-5">
            <Col className='col-5 m-auto'>
              <div className="save_btn">
                <button type="button" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CoachesAcademy;
