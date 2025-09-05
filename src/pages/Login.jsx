import React, { useState } from "react";
import "../stylesheet/login.css";
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import logo from "../assets/dashboardlogo.png"
import backgroundImage from "../assets/loginBgImage.png";
import { useSelector, useDispatch } from "react-redux";
import { Login,clearError } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const onFinish = (values) => {
    dispatch(Login({
      mobileNumber: values.userId,
      role: values.role,
      password: values.password
    }))
      .unwrap()
      .then((user) => {
        // user is the payload returned by Login thunk
        if (user.role === 3) {
          navigate("/admin");
        } else if (user.role === 2) {
          navigate("/vendor");
        } else {
          navigate("/dashboard"); // fallback generic dashboard if role unknown
        }
      })
      .catch(() => {/* error handled by redux */ });
  };

   // Clear backend error on any input change
  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />

        <Form layout="vertical" onFinish={onFinish} autoComplete="off" initialValues={{ role: 3 }} hideRequiredMark>
          <Form.Item
            label="Select Role"
            name="role"
            rules={[{ required: true, message: "Please select the role" }]}
            className="select-role-label"
          >
            <Select placeholder="Select your role" size="large" onChange={handleInputChange}>
              <Select.Option value={3}>Admin</Select.Option>
              <Select.Option value={2}>Vendor</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="userId"
            rules={[
              { required: true, message: "Please enter your Mobile Number" },
              { pattern: /^\d+$/, message: "Mobile number must contain digits only" },
              { min: 10, message: "Mobile number must be at least 10 digits" },
              { max: 15, message: "Mobile number can be at most 15 digits" },
            ]}
            className="user-id-label"
          >
            <Input
              size="large"
              placeholder="Please enter your User ID"
              prefix={<UserOutlined />}
              type="text"
              maxLength={10}
              inputMode="numeric"
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
            className="password-label"
          >
            <Input.Password
              size="large"
              placeholder="Please enter your password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleInputChange}
            />
          </Form.Item>
          {error && (
            <div className="login-error" style={{ color: "red", marginTop: 8 }}>
              {error}
            </div>
          )}

          <div className="forgot-link">
            <a href="#">If you forgot your password, click here</a>
          </div>

          <Form.Item>
            <div className="login-btn-wrapper">
              <Button htmlType="submit" className="login-btn" loading={loading}>
                {loading ? "Loging in..." : "Login"}
              </Button>
            </div>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
