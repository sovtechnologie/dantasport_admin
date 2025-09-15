import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Upload,Select,Input } from "antd";
import  UploadImage from "../../../../assets/UploadIcon.png";

export default function AddMember() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };
    return (
        <div className="add-member-container">

            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <h2 className="member-title">
                    ADD VENUE MEMBER
                </h2>
                <div className="member-form-row">
                    <Form.Item name="selectVenue" label="Select Venue" rules={[{ required: true }]}>
                        <Select placeholder="Select Venue" className="member-Select">
                            <Option value="venue1">Venue 1</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="memberName" label="Enter Member Full Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item name="memberRole" label="Enter Member Role" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="mobileNumber" label="Enter Mobile Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item name="password" label="Set Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="document" label="Select Documents" rules={[{ required: true }]}>
                        <Select placeholder="Select Document" className="member-Select">
                            <Option value="venue1">Aadhar Card</Option>
                            <Option value="venue1">Pan Card</Option>
                            <Option value="venue1">Licence Card</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="member-form-row">
                    <Form.Item name="documentNumber" label="Document Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Upload Documents" name="Doc" rules={[{ required: true }]}>
                        <Upload>
                            <Button className="uploadImage"><img src={UploadImage} alt="upload" />Upload Image</Button>
                        </Upload>
                    </Form.Item>
                </div>


             <Form.Item className="centered-submit">
                        <Button type="primary" htmlType="submit" >
                            UPDATE MEMBER
                        </Button>
                    </Form.Item>


            </Form>

        </div>
    )
}