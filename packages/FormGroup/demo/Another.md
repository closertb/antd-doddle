---
title: 单项列举用法
order: 0
---

默认示例(图片没有上传接口，所以暂时没法上传)
 
```jsx
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, Switch, Input } from 'antd';
// import { formRender } from 'antd-doddle';
import FormGroup from "../index";

const FormItem = Form.Item;
const { FormRender } = FormGroup;

function Edit(props) {
  const [enums, setEnums] = useState([{value: 1,label: '启用'}, {value: 0,label: '禁用'}]);
  const handleSubmit  = useCallback(() => {
    const { form } = props;

    form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
    });
  })
  // 模拟远程数据获取
  useEffect(() => {
    setTimeout(() => {
      setEnums([{value: 1,label: '远程启用'}, {value: 0,label: '远程禁用'}])
    })
  }, [])
  const { detail: data = { userName: 'doddle', mail: 'closertb@163.com', enable: true }, form: { getFieldDecorator } } = props;
  // 组件声明，绑定getFieldDecorator
  const formProps = {
    layout: 'horizontal',
    getFieldDecorator,
    required: true,
    formItemLayout,
    withWrap: true,
    fields: editFields,
    datas: {
      userName: 'doddle'
    },
    dynamicParams: {
      status: enums
    }
  };
  return (
    <div>
      <Row>
        <FormGroup {...formProps}>
          <Row>
            <FormRender itemKey="userName" />
            <FormRender itemKey="mail" />
          </Row>
          <Row>
            <FormRender itemKey="cardStatus" />
            <FormRender itemKey="corpLegalIdCardFrontStoreId" />
          </Row>
          <Row>  
            <FormRender itemKey="enable" />
            <FormRender itemKey="notshow" />
          </Row>
          <FormRender itemKey="remark" />
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
        </FormGroup>
      </Row>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  );
}

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

const statusEnums = {
  error: '冻结',
  normal: '正常'
};

const editFields = [{
  key: 'userName',
  name: '真实姓名',
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
}, {
  key: 'cardStatus',
  name: '卡状态',
  type: 'radio',
  enums: statusEnums
}, {
  key: 'corpLegalIdCardFrontStoreId',
  url: 'corpLegalIdCardFrontUrl',
  name: '正面',
  required: false,
  type: 'image',
  psimple: 'https://cos.56qq.com/loan/loanuser/idcard_back.png',
  isEnable: (_, data) => {
    return data.cardStatus !== 'error';
  },
}, {
  key: 'enable',
  name: '是否激活',
  required: false,
  type: 'selfDefine',
  decorProps: { valuePropName: 'checked' },
  child: ({ field, onChange }) => <Switch onChange={onChange} />
}, {
  key: 'notshow',
  name: '激活时展示',
  required: false,
  isEnable: (_, data) => {
    console.log('data:', data);
    return data.enable;
  },
  type: 'text'
}, {
  key: 'remark',
  name: '备注',
  required: false,
  type: 'text',
  seldomProps: { // 使用seldomProps扩展原生支持的属性
    autoSize: { minRows: 3, maxRows: 6 }
  }
}];

const Another = Form.create()(Edit)
ReactDOM.render(<Another />, mountNode);
```