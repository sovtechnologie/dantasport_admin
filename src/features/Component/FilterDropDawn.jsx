import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function FilterDropDawn() {
  const [value, setValue] = useState(null);

  return (
    <div className="bg-white py-3">
      <Select
        showSearch
        allowClear
        placeholder="Vendor Name"
        style={{ width: 220, height: "50px" }}
        optionFilterProp="children"
        onChange={(val) => setValue(val)}
        filterOption={(input, option) =>
          option.children
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        <Option value="Satsih">Satsih</Option>
        <Option value="Shivam">Shivam</Option>
        <Option value="Binod">Binod</Option>
      </Select>
      <Select
        showSearch
        allowClear
        placeholder="Venue Name"
        style={{ width: 220, height: "50px", marginLeft: "10px" }}
        optionFilterProp="children"
        onChange={(val) => setValue(val)}
        filterOption={(input, option) =>
          option.children
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        <Option value="Lucknow">Lucknow</Option>
        <Option value="Delhi">Delhi</Option>
        <Option value="Kanpur">Kanpur</Option>
      </Select>
    </div>
  );
}

export default FilterDropDawn;
