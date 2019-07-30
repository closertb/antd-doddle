---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import moment from 'moment';
import { Form, Row, Col } from 'antd';
import InputWithUnit from "../index";

class Basic extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form>
        <Row>
          <Col span={3}>默认参数：</Col>
          <Col span={8}>
            <InputWithUnit />
          </Col>
        </Row>
        <Row>
          <Col span={3}>自定义参数：</Col>
          <Col span={8}>
            <InputWithUnit />
          </Col>
        </Row> 
      </Form>
    );
  }
}
ReactDOM.render(<Basic />, mountNode);
```