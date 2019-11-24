---
title: 基本用法
order: 0
---

默认示例(图片没有上传接口，所以暂时没法上传)

```jsx
import React, { useCallback } from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, Switch, Input } from 'antd';
// import { formRender } from 'antd-doddle';
import FormGroup from "../index";

const FormItem = Form.Item;
const { FormRender } = FormGroup;
// 表单通用格式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
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

function Edit(props) {
  const handleSubmit  = useCallback(() => {
    const { form } = props;

    form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
    });
  })
    const { detail: data = { userName: 'doddle', mail: 'closertb@163.com' }, form: { getFieldDecorator } } = props;
    // 组件声明，绑定getFieldDecorator
    const formProps = { getFieldDecorator, required: true, formItemLayout, withWrap: true };
  return (
    <div>
      <Row>
        <FormGroup {...formProps}>
          {editFields.map(field=> <FormRender key={field.key} {...{ field, data }} />)}
          <Col span={12}>
            <FormItem label="原生组件" {...formItemLayout} >
              {getFieldDecorator('self', {
                initialValue: 'self name',
              })(
                <Input
                  type="text"
                />
              )}
            </FormItem>
          </Col>
          <div>
            chunzhans
          </div>
        </FormGroup>
      </Row>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  );
}

const Basic = Form.create()(Edit)
ReactDOM.render(<Basic />, mountNode);
```