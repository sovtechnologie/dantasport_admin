import React, { useState } from 'react';
import { Table, Button, Upload, message, Popconfirm, Spin, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Stylesheets/AmenitiesPage.css';
import { useFetchAmenities } from '../../../hooks/admin/amenities/useFetchAmenities';
import { useCreateAmenities } from '../../../hooks/admin/amenities/useCreateAmenities';
import { useDeleteAmenities } from '../../../hooks/admin/amenities/useDeleteAmenities';

export default function AmenitiesPage() {
  const [form] = Form.useForm();
  const { data: AmenitiesData, isLoading } = useFetchAmenities();
  const amenitiesData = AmenitiesData?.result?.map((item) => ({
    key: item.id,                // Table needs a unique key
    name: item.amenities_name,   // For display in "Amenities List" column
    status: item.status          // Keep if you need to show active/inactive later
  })) || [];



  const { mutate: createAmenities } = useCreateAmenities();
  const { refetch } = useFetchAmenities();

  const onFinish = (values) => {
    if (!values.name) {
      message.error("Please enter an Amenities name.");
      return;
    }

    const payload = {
      amentiesName: values.name, // Adjust the key depending on your API
    };

    createAmenities(payload, {
      onSuccess: () => {
        message.success("Amenity added successfully!");
        form.resetFields();
        refetch(); // Refresh the amenities list after adding
      },
      onError: () => {
        message.error("Failed to add amenity. Please try again.");
      },
    });
  };

  const { mutate: deleteAmenities } = useDeleteAmenities();
  const handleDelete = (key) => {
    // setAmenitiesData(prev => prev.filter(item => item.key !== key));
    const payload = {
      id: key,
      status: 0
    }
    deleteAmenities(payload, {
      onSuccess: () => {
        message.success('Amenities deleted successfully');
      },
      onError: () => {
        message.error('Failed to  deleted  Amenities');
        // rollback UI
      }
    })
    console.log("delete key", key);
  };

  const columns = [
    {
      title: 'Amenities List',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="amenity-item">
          {record.name}
        </div>
      )
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className="action-buttons">
          <Button type="text" icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      )
    }
  ];


  return (
    <Spin size="large" spinning={isLoading}>

      <div className="amenities-container">
        <div className="header">
          {/* <span className="title">Amenities List</span> */}
          <div className="amenity-wrapper">
            <Form form={form} layout="vertical" onFinish={onFinish} className="amenities-form">
              <div className="input-container">
                <Form.Item
                  name="name"
                  label="Enter Amenities Name"
                  rules={[{ required: true, message: 'Enter Amenities name' }]}
                >
                  <Input placeholder="Enter Amenities Name*" className="input-box" />
                </Form.Item>
              </div>
              <Form.Item className='add-button-wrapper'>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                  className="add-button"
                >
                  ADD Amenities
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Upload showUploadList={false} beforeUpload={() => { message.success("File uploaded"); return false; }}>
            <Button type="primary" icon={<PlusOutlined />} className='upload-button'>
              Upload Amenities
            </Button>
          </Upload>
        </div>

        <Table
          columns={columns}
          dataSource={amenitiesData}
          pagination={{ pageSize: 10 }}
          rowClassName={() => 'amenity-row'}
        />

      </div>
    </Spin>
  );
}
