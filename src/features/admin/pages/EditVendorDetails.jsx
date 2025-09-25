import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, Select, message } from "antd";
import "./Stylesheets/AddVendor.css";
import uploadImage from "../../../assets/UploadIcon.png";
import { useUpdateSendOtp } from "../../../hooks/admin/CreateVendor/useUpdateSendOtp";
import { useUpdateVendorDetails } from "../../../hooks/admin/CreateVendor/useUpdateVendorDetails";
// import { useVerifyOtp } from '../../../hooks/admin/CreateVendor/useVerifyOtp';
import { useFetchSingleVendor } from "../../../hooks/admin/CreateVendor/useFetchSingleVendor";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditVendorInfoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [mobileError, setMobileError] = useState(null);
  const [otpId, setOtpId] = useState(null);
  const [otpError, setOtpError] = useState(null);

  //  // ✅ fetch vendor details
  const { data: vendorData, isLoading } = useFetchSingleVendor(id);
  // ✅ prefill form once vendor data is available
  useEffect(() => {
    if (vendorData?.result?.[0]) {
      const vendor = vendorData.result[0];

      form.setFieldsValue({
        vendorName: vendor.full_name || "", // if API gives vendor name
        email: vendor.email || "",
        mobile: vendor.mobile_number || "",
        services: vendor.services || [], // adjust if array/string
        category: vendor.category || "",
        aadharNumber: vendor.addhar_number,
        gstNumber: vendor.gst_number || "",
        pancardNumber: vendor.pan_number || "",
        accountNumber: vendor.account_number?.toString() || "",
        bankName: vendor.bank_name || "",
        ifscCode: vendor.ifsc_code || "",
      });

      // ✅ Pre-fill Upload fields
      if (vendor.gst_doc) {
        form.setFieldsValue({
          gstDocument: [
            {
              uid: "-1",
              name: "GST Document",
              status: "done",
              url: vendor.gst_doc,
            },
          ],
        });
      }

      if (vendor.pan_doc) {
        form.setFieldsValue({
          pancardDoc: [
            {
              uid: "-2",
              name: "Pancard",
              status: "done",
              url: vendor.pan_doc,
            },
          ],
        });
      }

      if (vendor.passbook_or_cheque) {
        form.setFieldsValue({
          bankDoc: [
            {
              uid: "-3",
              name: "Passbook/Cheque",
              status: "done",
              url: vendor.passbook_or_cheque,
            },
          ],
        });
      }
      if (vendor.addhar_doc) {
        form.setFieldsValue({
          addhar_doc: [
            {
              uid: "-4",
              name: "Aadhaar Document",
              status: "done",
              url: vendor.addhar_doc,
            },
          ],
        });
      }
    }
  }, [vendorData, form]);

  // ✅ show loader until vendor details are fetched
  //   if (isLoading) return <p>Loading vendor details...</p>;

  // OTP sending mutation hook
  const { mutate: sendOtp } = useUpdateSendOtp();

  const handleSendOtp = () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile) {
      message.error("Please enter a mobile number before sending OTP");
      return;
    }
    setIsSendingOtp(true);
    setMobileError(null);

    sendOtp(
      { vendorMobileNumber: mobile },
      {
        onSuccess: (data) => {
          setIsSendingOtp(false);
          if (data?.status === 200) {
            message.success(data.message || "OTP sent successfully");
            setOtpId(data?.result?.id);
            setOtpSent(true);
            setMobileError(null);
            form.setFields([{ name: "mobile", errors: [] }]);
            // Auto-fill OTP input with received OTP
            form.setFieldsValue({ otp: data?.result?.otp || "" });
          }
        },
        onError: (error) => {
          setIsSendingOtp(false);
          const backendMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to send OTP";
          if (error?.response?.status === 409) {
            console.log("error catch with status409", backendMessage);
            setMobileError(backendMessage);
            form.setFields([{ name: "mobile", errors: [backendMessage] }]);
            form.validateFields(["mobile"]).catch(() => {});
          } else {
            message.error(backendMessage);
          }
        },
      }
    );
  };

  const handleMobileChange = (e) => {
    // Clear error and OTP sent flag on user input
    setMobileError(null);
    setOtpSent(false);
    form.setFields([{ name: "mobile", errors: [] }]);
  };

  const { mutate: UpdatedwithOtp } = useUpdateVendorDetails();

  // Clear OTP error on input change
  const handleOtpChange = () => {
    setOtpError(null);
    setVerifiedOtp(false);
    form.setFields([{ name: "mobile", errors: [] }]);
  };
  const handleFinish = (values) => {
    console.log("Form values", values);

    const otpValue = values.otp;
    if (!otpId) {
      form.setFields([
        {
          name: "otp",
          errors: ["Please send OTP first before submitting"],
        },
      ]);
      return;
    }

    if (!otpValue) {
      message.error("Please enter OTP");
      return;
    }

    const numericOtp = Number(otpValue);
    if (isNaN(numericOtp)) {
      message.error("OTP must be a numeric value");
      return;
    }

    // ✅ Correct payload
    const updateFormData = new FormData();
    updateFormData.append("id", id); // 👈 vendor id from useParams
    updateFormData.append("otpId", otpId); // 👈 OTP id
    updateFormData.append("otp", numericOtp);

    updateFormData.append("vendorName", values.vendorName);
    updateFormData.append(
      "services",
      Array.isArray(values.services)
        ? values.services.join(",")
        : values.services
    );
    updateFormData.append("vendorEmail", values.email);
    updateFormData.append("aadharNumber", values.aadharNumber);
    updateFormData.append("gstNumber", values.gstNumber);
    updateFormData.append("panNumber", values.pancardNumber);
    updateFormData.append("accountNumber", values.accountNumber);
    updateFormData.append("bankName", values.bankName);
    updateFormData.append("ifscCode", values.ifscCode);
    updateFormData.append("category", values.category);

    // ✅ Files check: agar naya upload hua to originFileObj bhejo, warna skip
    if (values.gstDocument?.[0]?.originFileObj) {
      updateFormData.append("gstDoc", values.gstDocument[0].originFileObj);
    }
    if (values.pancardDoc?.[0]?.originFileObj) {
      updateFormData.append("panDoc", values.pancardDoc[0].originFileObj);
    }
    if (values.bankDoc?.[0]?.originFileObj) {
      updateFormData.append("bankPassBook", values.bankDoc[0].originFileObj);
    }
    if (values.addhar_doc?.[0]?.originFileObj) {
      updateFormData.append("addhar_doc", values.addhar_doc[0].originFileObj);
    }

    UpdatedwithOtp(updateFormData, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          message.success(data.message || "Vendor updated successfully ✅");
          form.resetFields();
          setOtpSent(false);
          setVerifiedOtp(false);
          setOtpId(null);
          navigate("/admin/vendors");
        }
      },
      onError: (error) => {
        const backendMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Vendor update failed";
        if (error?.response?.status === 409) {
          setOtpError(backendMessage);
          form.setFields([{ name: "otp", errors: [backendMessage] }]);
          form.validateFields(["otp"]).catch(() => {});
        } else {
          message.error(backendMessage);
        }
      },
    });
  };

  return (
    <div className="vendor-form-wrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={({ errorFields }) => {
          console.log("Form validation failed:", errorFields);
          message.error("Please fix form errors before submitting");
        }}
        className="vendor-form"
      >
        <Row gutter={24}>
          <Col span={12}>
            <h3>Basic Information</h3>
            <Form.Item
              label="Enter Vendor Name"
              name="vendorName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter Mobile Number"
              name="mobile"
              validateStatus={mobileError ? "error" : ""}
              help={mobileError ? mobileError : undefined}
              rules={[
                { required: true, message: "Please enter mobile number" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Mobile number must contain only digits",
                },
                {
                  len: 10,
                  message: "Mobile number must be exactly 10 digits",
                },
              ]}
            >
              <Input
                disabled={true}
                addonAfter={
                  <Button
                    type="link"
                    className="otp-button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || otpSent}
                  >
                    {otpSent ? "Sent!" : "Send OTP"}
                  </Button>
                }
                variant="borderless"
                maxLength={10}
                minLength={10}
                onChange={handleMobileChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                placeholder="Enter 10-digit mobile number"
                className="otp-input"
              />
            </Form.Item>

            <Form.Item
              label="Enter Services"
              name="services"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select services" mode="multiple" allowClear>
                <Option value="Sports">Sports</Option>
                <Option value="Gym">Gym</Option>
                <Option value="Event">Event</Option>
                <Option value="Coach">Coach</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <h3>&nbsp;</h3>
            <Form.Item
              label="Enter Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter OTP"
              name="otp"
              validateStatus={otpError ? "error" : undefined}
              help={otpError ? otpError : undefined}
              rules={[{ required: true, message: "Please enter OTP" }]}
            >
              <Input
                onChange={handleOtpChange}
                maxLength={6}
                // addonAfter={<Button
                //     onClick={handleVerifyOtp}
                //     disabled={isVerifyingOtp || verifiedOtp}
                //     type="link"
                //     className="otp-button">{verifiedOtp ? "verified otp" : "Verify OTP"}</Button>}
                variant="borderless"
                className="otp-input"
              />
            </Form.Item>

            <Form.Item
              label="Enter Category"
              name="category"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select category">
                <Option value="category1">Run/Event</Option>
                <Option value="category2">Trainer/Academy</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <h3>Other Information</h3>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Enter Aadhar Number"
              name="aadharNumber"
              rules={[
                { required: true, message: "Please enter Aadhar number" },
                {
                  pattern: /^[2-9]{1}[0-9]{11}$/,
                  message: "Please enter a valid 12-digit Aadhar number",
                },
              ]}
            >
              <Input
                maxLength={12}
                placeholder="Enter 12-digit Aadhar number"
                onKeyPress={(e) => {
                  if (!/[0-9\s]/.test(e.key)) {
                    e.preventDefault(); // only digits and spaces allowed
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="GST Number"
              name="gstNumber"
              rules={[
                { required: true, message: "Please enter GST Number" },
                {
                  pattern:
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message:
                    "Please enter a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5)",
                },
              ]}
            >
              <Input maxLength={15} placeholder="Enter 15-digit GSTIN" />
            </Form.Item>

            <Form.Item
              label="Pancard Number"
              name="pancardNumber"
              rules={[
                { required: true, message: "Please enter Pancard number" },
                {
                  pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i,
                  message: "Please enter a valid PAN (e.g. ABCDE1234F)",
                },
              ]}
            >
              <Input
                maxLength={10}
                placeholder="Enter 10-character PAN"
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
              />
            </Form.Item>

            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[
                { required: true, message: "Please enter account number" },
                {
                  pattern: /^[0-9]{9,18}$/,
                  message: "Account number must be 9–18 digits",
                },
              ]}
            >
              <Input
                maxLength={18}
                placeholder="Enter bank account number"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); // only digits allowed
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="Enter Bank Name"
              name="bankName"
              rules={[
                { required: true, message: "Please enter bank name" },
                {
                  pattern: /^[A-Za-z ]{3,100}$/,
                  message:
                    "Bank name must be at least 3 letters and contain only alphabets",
                },
              ]}
            >
              <Input
                placeholder="Enter bank name"
                onKeyPress={(e) => {
                  if (!/[A-Za-z ]/.test(e.key)) {
                    e.preventDefault(); // block numbers/special chars
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Upload Aadhar Document"
              valuePropName="fileList"
              name="addhar_doc"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[{ required: true }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="text"
                maxCount={1}
                onPreview={(file) => {
                  // open document in new tab or modal
                  window.open(file.url || file.thumbUrl, "_blank");
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true, // Disable remove in edit if required
                }}
              >
                <Button className="upload-btn">
                  <img src={uploadImage} alt="upload" /> Upload Image
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Upload GST Document"
              name="gstDocument"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[{ required: true }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="text"
                maxCount={1}
                onPreview={(file) => {
                  // open document in new tab or modal
                  window.open(file.url || file.thumbUrl, "_blank");
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true, // Disable remove in edit if required
                }}
              >
                <Button className="upload-btn">
                  <img src={uploadImage} alt="upload" /> Upload Image
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Upload Pancard"
              name="pancardDoc"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[{ required: true }]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="text"
                onPreview={(file) => {
                  // open document in new tab or modal
                  window.open(file.url || file.thumbUrl, "_blank");
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true, // Disable remove in edit if required
                }}
              >
                <Button className="upload-btn">
                  <img src={uploadImage} alt="upload" /> Upload Image
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="IFSC Code"
              name="ifscCode"
              rules={[
                { required: true, message: "Please enter IFSC code" },
                {
                  pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                  message: "Enter a valid IFSC code (e.g., HDFC0001234)",
                },
              ]}
            >
              <Input
                maxLength={11}
                placeholder="Enter IFSC code"
                style={{ textTransform: "uppercase" }}
              />
            </Form.Item>

            <Form.Item
              label="Upload Bank Passbook/Canceled Cheque"
              name="bankDoc"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[{ required: true }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="text"
                maxCount={1}
                onPreview={(file) => {
                  // open document in new tab or modal
                  window.open(file.url || file.thumbUrl, "_blank");
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true, // Disable remove in edit if required
                }}
              >
                <Button className="upload-btn">
                  <img src={uploadImage} alt="upload" /> Upload Image
                </Button>
              </Upload>
            </Form.Item>
            {/* 
                        <Form.Item label="Upload Bank Passbook/Canceled Cheque" name="bankDoc" rules={[{ required: true }]}>
                            <Upload beforeUpload={() => false}>
                                <Button className='upload-btn' ><img src={uploadImage} alt='upload' />Upload Image</Button>
                            </Upload>
                        </Form.Item> */}
          </Col>
        </Row>

        <Form.Item>
          <div className="submit-button-wrapper">
            <Button type="primary" htmlType="submit" className="submit-button">
              UPDATE VENDOR
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVendorInfoForm;
