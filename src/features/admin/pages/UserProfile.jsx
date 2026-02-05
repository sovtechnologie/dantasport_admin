import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";

function UserProfile() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = {
    height: "50px",
    borderRadius: "12px",
    paddingRight: "45px",
  };

  const iconStyle = {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#6c757d",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    console.log("Password Change Data:", formData);
    alert("Password updated successfully!");
  };

  return (
    <section>
      <Container
        className="bg-white shadow-sm rounded" 
        style={{ padding: "40px 20px" }}
      >
        <h2 className="mb-5" style={{ fontSize: "25px" }}>
          User Profile:{" "}
          <span style={{ color: "#1163C7", fontSize: "20px" }}>
            Satish Sahu
          </span>
        </h2>

        <form onSubmit={handleSubmit}>
          <Row>
            <Col
              md={11}
              className="m-auto p-4"
              
            >
              <Row className="g-4">
                {/* Old Password */}
                <Col md={6}>
                  <label className="mb-1">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    placeholder="Enter old password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Col>

                {/* Current Password */}
                <Col md={6}>
                  <label className="mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Col>

                {/* New Password */}
                <Col md={6}>
                  <label className="mb-1">New Password *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      style={inputStyle}
                    />
                    <span onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? (
                        <EyeOff size={20} style={iconStyle} />
                      ) : (
                        <Eye size={20} style={iconStyle} />
                      )}
                    </span>
                  </div>
                </Col>

                {/* Confirm Password */}
                <Col md={6}>
                  <label className="mb-1">Confirm New Password *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Re-enter new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      style={inputStyle}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} style={iconStyle} />
                      ) : (
                        <Eye size={20} style={iconStyle} />
                      )}
                    </span>
                  </div>
                </Col>

                {/* Error Message */}
                {error && (
                  <Col md={12}>
                    <p style={{ color: "red", marginBottom: 0 }}>{error}</p>
                  </Col>
                )}

                {/* Submit */}
                <Col md={3}>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      height: "45px",
                      borderRadius: "10px",
                      fontWeight: "500",
                    }}
                  >
                    Save
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
}

export default UserProfile;
