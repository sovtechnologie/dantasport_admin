

import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Upload, Select, message } from 'antd';
import './Stylesheets/AddVendor.css';
import uploadImage from "../../../assets/UploadIcon.png";
import { useSendOtp } from '../../../hooks/admin/CreateVendor/useSendOtp';
import { useVerifyOtp } from '../../../hooks/admin/CreateVendor/useVerifyOtp';
import { useCreateVendor } from '../../../hooks/admin/CreateVendor/useCreateVendor';
import { useAddBankDetails } from '../../../hooks/admin/CreateVendor/useAddBankDetails';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const VendorInfoForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [otpSent, setOtpSent] = useState(false);
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [mobileError, setMobileError] = useState(null);
    const [otpId, setOtpId] = useState(null);
    const [otpError, setOtpError] = useState(null);

    // OTP sending mutation hook
    const {
        mutate: sendOtp,
    } = useSendOtp();

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
                        error?.response?.data?.message || error?.message || "Failed to send OTP";
                    if (error?.response?.status === 409) {
                        console.log("error catch with status409", backendMessage)
                        setMobileError(backendMessage);
                        form.setFields([
                            { name: "mobile", errors: [backendMessage] }
                        ]);
                        form.validateFields(["mobile"]).catch(() => { });
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

    const {
        mutate: verifyOtp,
    } = useVerifyOtp();


    const handleVerifyOtp = () => {
        const otpValue = form.getFieldValue("otp");
        if (!otpId) {
            message.error("Please send OTP first");
            return;
        }
        if (!otpValue) {
            message.error("Please enter OTP");
            return;
        }
        setIsVerifyingOtp(true);
        setOtpError(null);
        // Convert otpValue to a number before sending
        const numericOtp = Number(otpValue);

        if (isNaN(numericOtp)) {
            message.error("OTP must be a numeric value");
            setIsVerifyingOtp(false);
            return;
        }

        verifyOtp(
            { id: otpId, otp: numericOtp },
            {
                onSuccess: (data) => {
                    setIsVerifyingOtp(false);
                    if (data?.status === 200) {
                        message.success(data.message || "OTP verified successfully");
                        setOtpError(null);
                        setVerifiedOtp(true);
                        // Optionally: mark OTP as verified in state or move to next step
                    }
                },
                onError: (error) => {
                    setIsVerifyingOtp(false);
                    const backendMessage =
                        error?.response?.data?.message || error?.message || "OTP verification failed";
                    if (error?.response?.status === 409) {
                        console.log("error catch with status 409", backendMessage)
                        setOtpError(backendMessage);
                        form.setFields([
                            { name: "otp", errors: [backendMessage] }
                        ]);
                        form.validateFields(["otp"]).catch(() => { });
                    } else {
                        message.error(backendMessage);
                    }
                },
            }
        );
    };

    // Clear OTP error on input change
    const handleOtpChange = () => {
        setOtpError(null);
        setVerifiedOtp(false);
        form.setFields([{ name: "mobile", errors: [] }]);
    };

    const { mutate: createVendor, isLoading: isCreatingVendor } = useCreateVendor();
    const { mutate: addBankDetails, isLoading: isAddingBank } = useAddBankDetails();

    const handleFinish = (values) => {
        // You can separate vendor info and bank details if your form fields correspond
        const vendorPayload = {
            vendorId: otpId,
            vendorName: values.vendorName,
            services: values.services,
            vendorEmail: values.email,
        };

        // Bank payload must be FormData
        const bankFormData = new FormData();
        bankFormData.append("vendorId", otpId);
        bankFormData.append("gstNumber", values.gstNumber);
        bankFormData.append("panNumber", values.pancardNumber);
        bankFormData.append("accountNumber", values.accountNumber);
        bankFormData.append("bankName", values.bankName);
        bankFormData.append("ifscCode", values.ifscCode);
        bankFormData.append("aadharNumber", values.aadharNumber);


  
        if (values.gstDocument?.fileList?.[0]?.originFileObj) {
            bankFormData.append("gstDoc", values.gstDocument.fileList[0].originFileObj);
        }
        if (values.pancardDoc?.fileList?.[0]?.originFileObj) {
            bankFormData.append("panDoc", values.pancardDoc.fileList[0].originFileObj);
        }
        if (values.bankDoc?.fileList?.[0]?.originFileObj) {
            bankFormData.append("bankPassBook", values.bankDoc.fileList[0].originFileObj);
        }
        if (values.aadharDoc?.fileList?.[0]?.originFileObj) {
            bankFormData.append("aadharDoc", values.aadharDoc.fileList[0].originFileObj);
        }


        createVendor(vendorPayload, {
            onSuccess: (data) => {
                message.success("Vendor created successfully");
                // After vendor created, optionally add bank details
                addBankDetails(bankFormData, {
                    onSuccess: () => {
                        message.success("Bank details added successfully");
                        form.resetFields();
                        setOtpSent(false);
                        setVerifiedOtp(false);
                        setOtpId(null);
                        setOtpError(null);
                        // ✅ Navigate to vendor list
                        navigate("/admin/vendors");
                    },
                    onError: (err) => {
                        message.error("Failed to add bank details", err);
                    },
                });
            },
            onError: (error) => {
                message.error("Failed to create vendor");
                // Handle vendor creation errors as needed  
            },
        });
    };


    return (
        <div className="vendor-form-wrapper">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="vendor-form"
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <h3>Basic Information</h3>
                        <Form.Item label="Enter Vendor Name" name="vendorName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Enter Mobile Number" name="mobile"
                            validateStatus={mobileError ? "error" : ""}
                            help={mobileError ? mobileError : undefined}
                            rules={[
                                { required: true, message: 'Please enter mobile number' },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'Mobile number must contain only digits',
                                },
                                {
                                    len: 10,
                                    message: 'Mobile number must be exactly 10 digits',
                                },
                            ]}
                        >

                            <Input
                                addonAfter={
                                    <Button type="link" className="otp-button" onClick={handleSendOtp} disabled={isSendingOtp || otpSent} >
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

                        <Form.Item label="Enter Services" name="services" rules={[{ required: true }]}>
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
                        <Form.Item label="Enter Email" name="email" rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email address" },
                        ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Enter OTP" name="otp"
                            validateStatus={otpError ? "error" : undefined}
                            help={otpError ? otpError : undefined}
                            rules={[{ required: true, message: "Please enter OTP" }]}
                        >
                            <Input
                                onChange={handleOtpChange}
                                maxLength={6}
                                addonAfter={<Button
                                    onClick={handleVerifyOtp}
                                    disabled={isVerifyingOtp || verifiedOtp}
                                    type="link"
                                    className="otp-button">{verifiedOtp ? "verified otp" : "Verify OTP"}</Button>} variant='borderless'
                                className="otp-input" />
                        </Form.Item>

                        <Form.Item label="Enter Category" name="category" rules={[{ required: false }]}>
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

                        <Form.Item label="Aadhar Number" name="aadharNumber" rules={[
                            { required: true, message: "Please enter Aadhar number" },
                            {
                                pattern: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
                                message: "Please enter a valid 12-digit Aadhar number (e.g. 1234 5678 9123)",
                            },
                        ]}>
                            <Input maxLength={14} placeholder="Enter 12-digit Aadhar number" onKeyPress={(e) => {
                                if (!/[0-9\s]/.test(e.key)) {
                                    e.preventDefault(); // only digits and spaces allowed
                                }
                            }} />
                        </Form.Item>

                        <Form.Item label="GST Number" name="gstNumber" rules={[
                            { required: true, message: "Please enter GST Number" },
                            {
                                pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                message: "Please enter a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5)"
                            },
                        ]}>
                            <Input maxLength={15} placeholder="Enter 15-digit GSTIN" />
                        </Form.Item>

                        <Form.Item label="Pancard Number" name="pancardNumber" rules={[
                            { required: true, message: "Please enter Pancard number" },
                            {
                                pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                message: "Please enter a valid PAN (e.g. ABCDE1234F)",
                            },
                        ]}>
                            <Input maxLength={10}
                                placeholder="Enter 10-character PAN"
                                style={{ textTransform: "uppercase" }} />
                        </Form.Item>

                        <Form.Item label="Account Number" name="accountNumber" rules={[
                            { required: true, message: "Please enter account number" },
                            {
                                pattern: /^[0-9]{9,18}$/,
                                message: "Account number must be 9–18 digits",
                            },
                        ]}>
                            <Input maxLength={18}
                                placeholder="Enter bank account number"
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault(); // only digits allowed
                                    }
                                }} />
                        </Form.Item>

                        <Form.Item label="Enter Bank Name" name="bankName" rules={[
                            { required: true, message: "Please enter bank name" },
                            {
                                pattern: /^[A-Za-z ]{3,100}$/,
                                message: "Bank name must be at least 3 letters and contain only alphabets",
                            },
                        ]}>
                            <Input placeholder="Enter bank name"
                                onKeyPress={(e) => {
                                    if (!/[A-Za-z ]/.test(e.key)) {
                                        e.preventDefault(); // block numbers/special chars
                                    }
                                }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>

                        <Form.Item label="Upload Aadhar Document" name="aadharDoc" rules={[{ required: true }]}>
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button className='upload-btn' ><img src={uploadImage} alt='upload' />Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Upload GST Document" name="gstDocument" rules={[{ required: true }]}>
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button className='upload-btn' ><img src={uploadImage} alt='upload' />Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Upload Pancard" name="pancardDoc" rules={[{ required: true }]}>
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button className='upload-btn'><img src={uploadImage} alt='upload' />Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="IFSC Code" name="ifscCode" rules={[
                            { required: true, message: "Please enter IFSC code" },
                            {
                                pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                message: "Enter a valid IFSC code (e.g., HDFC0001234)",
                            },
                        ]}>
                            <Input maxLength={11}
                                placeholder="Enter IFSC code"
                                style={{ textTransform: "uppercase" }} />
                        </Form.Item>

                        <Form.Item label="Upload Bank Passbook/Canceled Cheque" name="bankDoc" rules={[{ required: true }]}>
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button className='upload-btn' ><img src={uploadImage} alt='upload' />Upload Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <div className='submit-button-wrapper'>
                        <Button type="primary" htmlType="submit" block className="submit-button" loading={isCreatingVendor || isAddingBank}
                            disabled={isCreatingVendor || isAddingBank}>
                            {isAddingBank ? "Updading.." : ' UPDATE VENDOR'}
                        </Button>
                    </div>

                </Form.Item>
            </Form>
        </div>
    );
};

export default VendorInfoForm;
