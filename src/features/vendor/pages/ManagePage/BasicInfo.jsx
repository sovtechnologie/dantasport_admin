import "../../styelsheets/Manage/BasicInfo.css";
import { Form, Input, Button, Upload } from "antd";
import UploadImage from "../../../../assets/UploadIcon.png";
import { useSelector } from "react-redux";
import { useFetchSingleVendor } from "../../../../hooks/admin/CreateVendor/useFetchSingleVendor";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const BasicInfo = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [form] = Form.useForm();

  //  // ✅ fetch vendor details
  const { data: vendorData, isLoading } = useFetchSingleVendor(id);
  console.log("user", vendorData?.result);

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };
  useEffect(() => {
    if (vendorData?.result && vendorData.result.length > 0) {
      const vendor = vendorData.result[0];
      form.setFieldsValue({
        ownerName: vendor.full_name,
        mobile: vendor.mobile_number,
        email: vendor.email,
        gstNumber: vendor.gst_number,
        // gstDoc: data.gst_doc,
        pan: vendor.pan_number,
        // panDoc: vendor.pan_doc,
        aadhaar: vendor.aadhaar_number || "672574654536", // Only if exists in backend
        // aadhaarDoc: data.aadhaar_doc,     // Only if exists in backend
        accountNumber: vendor.account_number,
        ifsc: vendor.ifsc_code,
        bankName: vendor.bank_name,
      });
      // ✅ Pre-fill Upload fields
      if (vendor.gst_doc) {
        form.setFieldsValue({
          gstDoc: [
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
          panDoc: [
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
    }
  }, [vendorData, form]);

  const isDisabled = true;

  return (

    <div className="form-section">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="section-title">Basic Information</div>
        <Row>
          <Col lg={4} md={6}>
            <Form.Item
              name="ownerName"
              label="Owner Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Owner Name" disabled />
            </Form.Item>
          </Col>
          <Col lg={4} md={6}>
            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[{ required: true }]}
            >
              <Input placeholder="Mobile Number" disabled />
            </Form.Item>
          </Col>
          <Col lg={4} md={6}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Email" disabled />
            </Form.Item>
            <Form.Item hidden></Form.Item>
          </Col>
        </Row>


        <div className="section-title">Other Information</div>
        <Row>
          <Col lg={6} md={6}>
            <Form.Item
              name="gstNumber"
              label="GST Number"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              label="Upload GST Document"
              name="gstDoc"
              rules={[{ required: true }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
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
                <Button className="uploadImage">
                  <img src={UploadImage} alt="upload" />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item name="pan" label="Pan Number" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>

            <Form.Item
              label="Upload Pancard"
              name="panDoc"
              rules={[{ required: true }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            >
              <Upload
                disabled={isDisabled}
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
                <Button className="uploadImage">
                  <img src={UploadImage} alt="upload" />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              disabled={isDisabled}
              name="aadhaar"
              label="Aadhar Card Number"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              label="Upload Aadhaar Card"
              name="aadhaarDoc"
              rules={[{ required: true }]}
            >
              <Upload disabled={isDisabled}>
                <Button className="uploadImage">
                  <img src={UploadImage} alt="upload" />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item name="ifsc" label="IFSC Code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col lg={6} md={6}>
            <Form.Item
              label="Upload Bank Passbook/Cancel Cheque"
              name="bankDoc"
              rules={[{ required: true }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                listType="text"
                maxCount={1}
                disabled={isDisabled}
                onPreview={(file) => {
                  // open document in new tab or modal
                  window.open(file.url || file.thumbUrl, "_blank");
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true, // Disable remove in edit if required
                }}
              >
                <Button className="uploadImage">
                  <img src={UploadImage} alt="upload" />
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>

        </Row>

        <Form.Item className="blue_btn">
          <Button type="primary" htmlType="submit" >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicInfo;
