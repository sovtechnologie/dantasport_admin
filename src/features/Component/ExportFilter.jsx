import React from 'react'
import { Form, Input, Button, Row, Col, Upload, Select, message,DatePicker } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

function ExportFilter() {

    const { RangePicker } = DatePicker;
  return (
    <>
       <div className="export-section bg-white p-4 text-end">
          <Button
            type="default"
            className="export-btn"
            icon={<DownloadOutlined />}

          >
            Export
          </Button>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(dates) => setDateRange(dates || [])}
            allowClear
            style={{ marginLeft: 10 }}
            className="datepiker"
          />
        </div>
    </>
  )
}

export default ExportFilter
