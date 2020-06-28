---
title: 基本用法
order: 00
---

默认示例(图片没有上传接口，所以暂时没法上传)，展示了以下功能
 - 联动表单（required，disabled，isEnable）用法；
 - 自定义表单类型的用法；
 - 动态指定枚举的用法

```jsx
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Row, Col, Button, Switch, Input } from 'antd';
// import { formRender } from 'antd-doddle';
import FormGroup from "../index";

const FormItem = Form.Item;
const { FormRender } = FormGroup;

function Edit(props) {
  const [enums, setEnums] = useState([{value: 1,label: '启用'}, {value: 0,label: '禁用'}]);

  const [form] = FormGroup.useForm();
  const handleSubmit  = useCallback(() => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  })
  // 模拟远程数据获取
  useEffect(() => {
    setTimeout(() => {
      setEnums([{value: 1,label: '远程启用'}, {value: 0,label: '远程禁用'}])
    }, 500);
  }, []);

  const { detail: datas = { userName: 'doddle', enable: true, mail: 'closertb@163.com', enable: false, interest: { number: 0.12, unit: 'month' }  } } = props;
  const formProps = {
    layout: 'horizontal',
    form,
    datas,
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
          {editFields.map(field=> <FormRender key={field.key} {...{ field }} />)}
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
  disabled: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'interest',
  name: '利率',
  type: 'withUnit',
  enums: [{ value: 'month', label: '月' }, { value: 'year', label: '年' }],
  defaultUnit: 'year',
  required: (_, { enable }) => !enable,
  shouldUpdate: (pre, cur) => {
    return pre.enable !== cur.enable
  },
  seldomProps: {
    suffix: '%'
  }
}, {
  key: 'enable',
  name: '是否隐藏',
  required: false,
  type: 'selfDefine',
  formProps: { valuePropName: 'checked' },
  child: ({ field }) => <Switch />
}, {
  key: 'notshow',
  name: '不显示',
  required: false,
  isEnable: false,
  type: 'text',
  isEnable: (_, { enable }) => !enable,
  shouldUpdate: (pre, cur) => {
    return pre.enable !== cur.enable
  },
  render: ({ userName, email }) => (<FormItem label="静态信息">{`${userName}-${email}`}</FormItem>)
}, {
  key: 'status',
  name: '状态',
  type: 'select',
  isDynamic: true
}, {
  key: 'cardStatus',
  name: '卡状态',
  type: 'radio',
  enums: statusEnums,
  disabled: (_, data) => data.status === 0,
  shouldUpdate: (pre, cur) => {
    return pre.status !== cur.status
  },
}, {
  key: 'remark',
  name: '联动表单',
  required: false,
  type: 'text',
  dependencies: ['enable'],
  required: true,
  rules: [{ type: 'email', message: 'fuck' }],
}];

ReactDOM.render(<Edit />, mountNode);
```