---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, TimePicker, InputNumber } from 'antd';
import FileUpload from "../index";

// 表单通用格式
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const fields = {
  corpLegalIdCardBack: {
    key: 'corpLegalIdCardBackStoreId',
    url: 'corpLegalIdCardBackUrl',
    name: '身份证反面',
    required: true,
    type: 'image',
    simple: 'https://cos.56qq.com/loan/loanuser/idcard_front.png'
  },
  peopleBankCredit: {
    key: 'peopleBankCredit',
    name: '申请人人行征信(详版)',
    maxSize: 5,
    fileSize: 100,
    listType: 'text',
    info: '只能上传.zip/.rar文件且不能超过100M',
    reg: /[\s\S]+[.zip,.rar]$/,
    tips: '请选择zip或rar格式压缩文件',
  }
};

class Basic extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form>
        <Row>
          <Col span={12}>
            <FileUpload {...fields.peopleBankCredit} />
          </Col> 
        </Row>
      </Form>
    );
  }
}
ReactDOM.render(<Basic />, mountNode);
```