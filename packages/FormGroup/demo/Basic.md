---
title: 基本用法
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
    }, 500);
  }, []);

  const { detail: data = { userName: 'doddle', mail: 'closertb@163.com', enable: true, interest: { number: 0.12, unit: 'month' }  }, form: { getFieldDecorator } } = props;
  // 组件声明，绑定getFieldDecorator
  const formProps = {
    layout: 'horizontal',
    getFieldDecorator,
    required: true,
    formItemLayout,
    withWrap: true,
    dynamicParams: {
      status: enums
    }
  };
  return (
    <div>
      <FormGroup {...formProps}>
        <Row>
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
        </Row>
      </FormGroup>
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
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  type: 'select',
  isDynamic: true
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
  name: '是否隐藏',
  required: false,
  type: 'selfDefine',
  decorProps: { valuePropName: 'checked' },
  child: ({ field }) => <Switch />
}, {
  key: 'notshow',
  name: '不显示',
  required: false,
  isEnable: false,
  type: 'text'
}, {
  key: 'remark',
  name: '联动表单',
  required: false,
  type: 'text',
  isEnable: ({ enable }) => enable
}, {
  key: 'cardStatus',
  name: '卡状态',
  type: 'radio',
  enums: statusEnums
}];

const Basic = Form.create()(Edit)
ReactDOM.render(<Basic />, mountNode);
```