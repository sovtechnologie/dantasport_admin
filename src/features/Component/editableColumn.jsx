import React, { useContext, useRef, useEffect, useState } from 'react';
import { Form, Input, Tooltip, Typography } from 'antd';

 export const EditableContext = React.createContext(null);

export function EditableCell({ editing, dataIndex, title, record, children, ...restProps }) {
  const form = useContext(EditableContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please enter ${title}` }]}
        >
          <Input.TextArea ref={inputRef} autoSize rows={2} />
        </Form.Item>
      ) : (
        <Tooltip title={record?.[dataIndex] || ''}>
          <Typography.Text ellipsis>{children}</Typography.Text>
        </Tooltip>
      )}
    </td>
  );
}

