import "../../styelsheets/Manage/addMember.css";
import { Button, Form, Upload, Select, Input } from "antd";
import UploadImage from "../../../../assets/UploadIcon.png";

const { Option } = Select;

export default function AddGymMember() {
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
                    ADD GYM MEMBER
                </h2>
                <div className="member-form-row">
                    <Form.Item name="selectGym" label="Select Gym" rules={[{ required: true }]}>
                        <Select placeholder="Select Gym" className="member-Select">
                            <Option value="gym1">Gym 1</Option>
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
                            <Option value="aadhar">Aadhar Card</Option>
                            <Option value="pan">Pan Card</Option>
                            <Option value="licence">Licence Card</Option>
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
                    <Button type="primary" htmlType="submit">
                        ADD GYM MEMBER
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
