import React from 'react';
import { Row, Col, Form, Button } from 'antd';

export default function SearchBar(props) {
  const { formRender, onSearch, search, searchFields, operate } = props;
  return (
    <Form className="h-search-form">
      <Row>
        {searchFields.map((field, index) => (
          <Col span={8} key={index}>
            {formRender({ field, data: search })}
          </Col>
        ))}
      </Row>
      <div style={{ paddingTop: 2, textAlign: 'center' }}>
        <Button type="primary" onClick={onSearch}>搜索</Button>
        <Button className="ml-20" onClick={() => operate('add')}>新增用户</Button>
      </div>
    </Form>
  );
}
