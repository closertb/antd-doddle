---
title: 单项列举用法
order: 1
---

默认示例(图片没有上传接口，所以暂时没法上传)
 
```jsx
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Switch, Input } from 'antd';
// import { formRender } from 'antd-doddle';
import FormGroup from "../index";

const { FormRender } = FormGroup;

function Edit(props) {
  const [enums, setEnums] = useState([{value: 1,label: '启用'}, {value: 0,label: '禁用'}]);
  const [form] = FormGroup.useForm();
  const [update, setUpdate] = useState(false);
  const handleSubmit  = useCallback(() => {
    form.validateFields().then((values) => {
      console.log(values);
      setUpdate(true);
    });
  })
  // 模拟远程数据获取
  useEffect(() => {
    setTimeout(() => {
      setEnums([{value: 1,label: '远程启用'}, {value: 0,label: '远程禁用'}])
    })
  }, [])
  const formProps = {
    layout: 'horizontal',
    required: true,
    formItemLayout,
    withWrap: true,
    fields: editFields,
    // 这里因为datas 每次传递的新对象，而没保证不可变，会导致Edit 渲染更新时，组件修改的值被重置
    // 重现步骤：
    // 1. 是否激活按钮切换到false，其他表单填完；
    // 2. 点击提交，即可看到，激活按钮又回到了true；
    // 最好的方法就是采用ref来保证引用不可变；
    datas: {
      userName: 'doddle',
      mail: 'closertb@163.com',
      enable: true
    },
    form,
    dynamicParams: {
      status: enums
    }
  };
  return (
    <div>
      <FormGroup {...formProps}>
        <Row>
          <FormRender itemKey="userName" />
          <FormRender itemKey="mail" />
        </Row>
        <Row>
          <FormRender itemKey="cardStatus" />
        </Row>
        <Row>  
          <FormRender itemKey="enable" />
          <FormRender itemKey="notshow" />
        </Row>
        <FormRender itemKey="remark" />
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
  key: 'cardStatus',
  name: '卡状态',
  type: 'radio',
  enums: statusEnums
}, {
  key: 'enable',
  name: '是否激活',
  required: false,
  type: 'selfDefine',
  formProps: {
    valuePropName: 'checked'
  },
  child: ({ field }) => <Switch />
}, {
  key: 'notshow',
  name: '激活时展示',
  required: false,
  isEnable: (_, { enable }) => !enable,
  shouldUpdate: (pre, cur) => {
    return pre.enable !== cur.enable
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

ReactDOM.render(<Edit />, mountNode);
```