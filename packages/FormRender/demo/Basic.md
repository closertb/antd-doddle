---
title: 基本用法
order: 0
---

默认示例(图片没有上传接口，所以暂时没法上传)

```jsx
import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, Switch } from 'antd';
// import { formRender } from 'antd-doddle';
import formRender from "../index";

const FormItem = Form.Item;
// 表单通用格式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const userStatus = [{
  value: 1,
  label: '启用',
}, {
  value: 0,
  label: '禁用',
}];

const editFields = [{
  key: 'userName',
  name: '真实姓名',
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  type: 'select',
  enums: userStatus
}, {
  key: 'interest',
  name: '利率',
  type: 'withUnit',
  enums: [{ value: 'month', label: '月' }, { value: 'year', label: '年' }],
  defaultUnit: 'year',
  inputProps: {
    suffix: '%'
  }
}, {
  key: 'corpLegalIdCardFrontStoreId',
  url: 'corpLegalIdCardFrontUrl',
  name: '正面',
  required: false,
  type: 'image',
  psimple: 'https://cos.56qq.com/loan/loanuser/idcard_back.png'
}, {
  key: 'enable',
  name: '是否激活',
  required: false,
  type: 'selfDefine',
  child: ({ field }) => <Switch />
}, {
  key: 'notshow',
  name: '不展示',
  required: false,
  isEnable: false,
  type: 'text'
}, {
  key: 'remark',
  name: '备注',
  required: false,
  type: 'text'
}];

let FormRender; // 用于生成绑定了装饰器getFieldDecorator的组件

class Edit extends React.Component {
  constructor(props){
    super(props);
    const { form: { getFieldDecorator } } = props;
    // 组件声明，绑定getFieldDecorator
    FormRender = formRender({ getFieldDecorator, require: true, formItemLayout, withWrap: true });
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { form } = this.props;

    form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
    });
  }
  render() {
    const { detail: data = {} } = this.props;
    return (
      <Form>
        <Row>
          {editFields.map(field=> <FormRender key={field.key} {...{ field, data }} />)}
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={this.handleSubmit}>提交</Button>
        </div>
      </Form>
    );
  }
}

const Basic = Form.create()(Edit)
ReactDOM.render(<Basic />, mountNode);
```