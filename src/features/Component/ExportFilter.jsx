import React from 'react'
import { Form, Input, Button, Row, Col, Upload, Select, message, DatePicker } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

function ExportFilter() {

  const { RangePicker } = DatePicker;
  return (
    <>
      <div className=" bg-white p-3  text-end">
        <Button
          type="default"

          icon={<DownloadOutlined />}
          style={{ height: "50px" }}
          className='fw-bold'

        >
          Export
        </Button>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates) => setDateRange(dates || [])}
          allowClear
          style={{ marginLeft: 10, height: "50px" }}
          className="datepiker"

        />
      </div>
    </>
  )
}

export default ExportFilter
