import "../../styelsheets/Manage/addCourt.css";
import { Form, Input, Button, Upload, Select } from 'antd';
const { TextArea } = Input;

export default function AddCourt() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };
    return (
        <div className="add-Court-Container">
            <div className="add-court-form-section">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                >
                    <h2 className="add-court-title">Add Court</h2>
                    <div className="court-form-row">
                        <Form.Item name="selectVenue" label="Select Venue" rules={[{ required: true }]}>
                            <Select placeholder="Select Venue" className="court-Select">
                                <Option value="venue1">Venue 1</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="courtName" label="Enter Court Name" rules={[{ required: true }]}>
                            <Input placeholder="E.g. 6x6 Box Cricket " />
                        </Form.Item>
                    </div>

                    <div className="court-form-row">
                        <Form.Item name="sports" label="Sport" rules={[{ required: true }]}>
                            <Select placeholder="Select Sport" className="court-Select">
                                <Option value="sport1">Cricket</Option>
                                <Option value="sport1">Football</Option>
                                <Option value="sport1">Batminton</Option>
                                <Option value="sport1">Tennis</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <TextArea placeholder="Enter the Description" />
                        </Form.Item>
                    </div>

                    <Form.Item className="centered-submit">
                        <Button type="primary" htmlType="submit" >
                            CREATE COURT
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}