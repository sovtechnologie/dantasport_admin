import React from "react";
import { Container } from "react-bootstrap";
import { Table, Select } from "antd";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

const { Option } = Select;

const columns = [
  {
    title: "Customer Name",
    dataIndex: "name",
    key: "name",
    width:200,
  },
  {
    title: "Enquiry Type",
    dataIndex: "type",
    key: "type",
      width:200,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
      width:200,
  },
  {
    title: "Email ID",
    dataIndex: "email",
    key: "email",
      width:200,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
      width:320,
  },
  {
    title: "Remark",
      width:220,
    dataIndex: "remark",
    key: "remark",
    width: 220,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => (
      <Select defaultValue={value} size="small" >
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
      <Select defaultValue={value} size="small" style={{ width: 130 }}>
        <Option value="Switched Off">Switched Off</Option>
        <Option value="Busy">Busy</Option>
        <Option value="Not Reachable">Not Reachable</Option>
      </Select>
    ),
  },
];

const data = Array.from({ length: 10 }).map((_, index) => ({
  key: index + 1,
  name: "Sahil Khan",
  type: index % 2 === 0 ? "Individual" : "Academy",
  phone: "+91 9284578663",
  email: "mihirs@gmail.com",
  location: "Hinjewadi, Pune",
  remark: "Hi Want to connect sgcjnxbcgck",
  status: "RNR",
  subStatus: "Switched Off",
}));

function CoachEquiry() {
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
          className="corporate-enquiry-table"
          scroll={{ x: 1200 }}
        />
      </Container>
    </section>
  );
}

export default CoachEquiry;
