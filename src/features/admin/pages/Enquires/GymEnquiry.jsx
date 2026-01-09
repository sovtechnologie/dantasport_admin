import React from "react";
import { Container } from "react-bootstrap";
import { Table, Select } from "antd";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

const { Option } = Select;

const columns = [
  {
    title: "GYM Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email ID",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Remark",
    dataIndex: "remark",
    key: "remark",
    width: 260,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => (
      <Select
        defaultValue={value}
        size="small"
        className="status-select"
      >
        <Option value="RNR">RNR</Option>
        <Option value="Connected">Connected</Option>
        <Option value="Pending">Pending</Option>
      </Select>
    ),
  },
  {
    title: "Sub-Status",
    dataIndex: "subStatus",
    key: "subStatus",
    render: (value) => (
      <Select
        defaultValue={value}
        size="small"
        className="substatus-select"
      >
        <Option value="Ringing No Response">Ringing No Response</Option>
        <Option value="Busy">Busy</Option>
        <Option value="Switched Off">Switched Off</Option>
      </Select>
    ),
  },
];

const data = Array.from({ length: 7 }).map((_, index) => ({
  key: index + 1,
  name: "Sahil Khan",
  phone: "+91 9284578663",
  email: "mihirs@gmail.com",
  location: "Hinjewadi,Pune",
  remark: "Hi Want to connect sgcjnxbcgck",
  status: "RNR",
  subStatus: "Ringing No Response",
}));

function GymEnquiry() {
  return (
    <section>
      <SearchBox/>
      <Container className="bg-white p-3 rounded shadow-sm">
        <ExportFilter />

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 7,
            position: ["bottomRight"],
          }}
          rowKey="key"
          className="gym-enquiry-table"
          scroll={{ x: 1200 }}
        />
      </Container>
    </section>
  );
}

export default GymEnquiry;
