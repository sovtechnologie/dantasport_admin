import React, { useEffect, useState } from 'react';
import { Table, Input, Upload, Button, Checkbox, Form, message, Spin, Popconfirm } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import '../pages/Stylesheets/SportServices.css';
import SportIcon from "../../../assets/Admin/sporticon.png"
import UploadImage from "../../../assets/UploadIcon.png";
import { useFetchSports } from '../../../hooks/admin/sport/useFetchSport';
import { useAddSport } from '../../../hooks/admin/sport/useAddSport';
import { useStatusSport } from '../../../hooks/admin/sport/useStatusSport';

const SportsServicePage = () => {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const addSportMutation = useAddSport();
    const [successText, setSuccessText] = useState("");
    const [pendingCheckboxChange, setPendingCheckboxChange] = useState(null);
    // { key, field, newValue }

    const { data: sportlistData, isLoading: Sportloading } = useFetchSports();

    useEffect(() => {
        if (sportlistData && sportlistData.result) {
            const mappedData = sportlistData.result.map((sport, index) => ({
                key: sport.id || index,
                name: sport.sports_name || 'N/A',
                icon: sport.sports_images || "", // use the backend image URL, empty string if not available
                sports: sport.sports === 1,
                coaching: sport.coaching === 1,
                popularSports: sport.popular_sports === 1,
                event: sport.events === 1,
            }));
            setData(mappedData);
        }
    }, [sportlistData]);


    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("sportsName", values.name);
        formData.append("sportsIcon", values.icon?.[0]?.originFileObj);
        addSportMutation.mutate(formData, {
            onSuccess: () => {
                message.success("Sport/Service added successfully!");
                setSuccessText(`✅ ${values.name} has been added successfully!`);
                form.resetFields();
                // Clear the message after 3 seconds
                setTimeout(() => setSuccessText(""), 3000);
            },
            onError: () => {
                message.error("Failed to add sport/service");
            },
        });
    };
    const { mutate: ChangeStatus } = useStatusSport();
    const applyCheckboxChange = (key, field, value) => {
        // Find the sport record to get sportId if needed
        const sportToUpdate = data.find(item => item.key === key);
        if (!sportToUpdate) return;

        // Prepare payload - adjust field names as your API expects
        // Assuming 'sports' field changes status for sport itself
        const payload = {
            id: key, // or sportToUpdate.id if your data has 'id'
            [field]: value ? 1 : 0, // convert boolean to integer if needed
            //  // optionally send field being updated if API supports
        };
        console.log("payload of statua change", payload);

        // Call API to change status
        ChangeStatus(payload, {
            onSuccess: () => {
                // Update local state on success
                setData(prev =>
                    prev.map(item =>
                        item.key === key ? { ...item, [field]: value } : item
                    )
                );
                message.success(`Sport ${field} status updated successfully.`);
                setPendingCheckboxChange(null);
            },
            onError: () => {
                message.error(`Failed to update sport ${field} status.`);
                setPendingCheckboxChange(null);
                // Optionally keep old state or revert UI if optimistic update used
            },
        });
    };

    const confirmCheckboxChange = (key, field, currentValue) => {
        setPendingCheckboxChange({ key, field, newValue: !currentValue });
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            render: icon => (
                <div className="icon-cell">
                    <img src={icon} alt="icon" className="sport-icon" />
                </div>
            ),
        },
        {
            title: 'Sports',
            dataIndex: 'sports',
            render: (val, record) => (
                <Popconfirm
                    title={`Are you sure to ${val ? 'deactivate' : 'activate'} this sport?`}
                    onConfirm={() => applyCheckboxChange(record.key, 'sports', !val)}
                    onCancel={() => setPendingCheckboxChange(null)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Checkbox
                        checked={val}
                        onClick={e => {
                            e.preventDefault(); // prevent immediate toggle
                            confirmCheckboxChange(record.key, 'sports', val);
                        }}
                    />
                </Popconfirm>
            )
        },
        {
            title: 'Coaching',
            dataIndex: 'coaching',
            render: (val, record) => (
                <Popconfirm
                    title={`Are you sure to ${val ? 'deactivate' : 'activate'} this sport?`}
                    onConfirm={() => applyCheckboxChange(record.key, 'coaching', !val)}
                    onCancel={() => setPendingCheckboxChange(null)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Checkbox
                        checked={val}
                        onClick={e => {
                            e.preventDefault(); // prevent immediate toggle
                            confirmCheckboxChange(record.key, 'coaching', val);
                        }}
                    />
                </Popconfirm>
            )
        },
        {
            title: 'Popular sports',
            dataIndex: 'popularSports',
            render: (val, record) => (
                <Popconfirm
                    title={`Are you sure to ${val ? 'deactivate' : 'activate'} this sport?`}
                    onConfirm={() => applyCheckboxChange(record.key, 'popularSports', !val)}
                    onCancel={() => setPendingCheckboxChange(null)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Checkbox
                        checked={val}
                        onClick={e => {
                            e.preventDefault(); // prevent immediate toggle
                            confirmCheckboxChange(record.key, 'popularSports', val);
                        }}
                    />
                </Popconfirm>
            )
        },
        {
            title: 'Event',
            dataIndex: 'event',
            render: (val, record) => (
                <Popconfirm
                    title={`Are you sure to ${val ? 'deactivate' : 'activate'} this sport?`}
                    onConfirm={() => applyCheckboxChange(record.key, 'event', !val)}
                    onCancel={() => setPendingCheckboxChange(null)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Checkbox
                        checked={val}
                        onClick={e => {
                            e.preventDefault(); // prevent immediate toggle
                            confirmCheckboxChange(record.key, 'event', val);
                        }}
                    />
                </Popconfirm>
            )
        },
        {
            title: 'Action',
            render: () => (
                <Button type="text" icon={<EditOutlined style={{ color: '#1163C7' }} />} />
            )
        }
    ];


    return (
        <div className="sports-service-container">
            <div className="">
                <Form form={form} layout="vertical" onFinish={onFinish} className="sports-form">
                    <div className="input-wrapper">
                        <Form.Item
                            name="name"
                            label="Enter Sports Name"
                            rules={[{ required: true, message: 'Enter sport name' }]}
                        >
                            <Input placeholder="Enter Sport/Service Name*" className="input-box" />
                        </Form.Item>
                        <Form.Item
                            name="icon"
                            valuePropName="fileList"
                            getValueFromEvent={e => e && Array.isArray(e.fileList) ? e.fileList : e && e.fileList}
                            rules={[{ required: true, message: 'Upload icon' }]}
                            label="Upload Sport Icon"
                        >
                            <Upload
                                listType="text"
                                maxCount={1}
                                beforeUpload={() => false}

                            >
                                <Button className="upload-box"><img src={UploadImage} alt="upload" />Upload Icon</Button>
                            </Upload>
                        </Form.Item>
                    </div>
                    <Form.Item className='add-button-wrapper'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            className="add-button"
                            loading={addSportMutation.isLoading}
                        >
                            ADD SPORT/SERVICE
                        </Button>
                    </Form.Item>
                    {/* Success text display */}
                    {successText && (
                        <div style={{ marginTop: 6, color: "#47e671", fontWeight: 500 }}>
                            {successText}
                        </div>
                    )}
                </Form>
            </div>
            <Spin spinning={Sportloading} size='large'>

                <Table
                    columns={columns}
                    dataSource={data}
                    className="sports-table"
                    pagination={{ pageSize: 10 }}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                />
            </Spin>
        </div>
    );
};

export default SportsServicePage;
