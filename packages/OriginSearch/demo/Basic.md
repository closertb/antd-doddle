---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import { Form } from 'antd';
// import { OriginSearch } from 'antd-doddle';
import OriginSearch from '../index';

const FormItem = Form.Item;
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const mockFetch = ({ keyword }) =>
  new Promise(resolve =>
    setTimeout(() => {
      const ran = Math.floor((Math.random() + 0.1) * 10); // 生成一个1~11的随机数列表
      const no = 80000 + ran * 1111;
      const res = new Array(ran).fill(1).map((data, index) => ({
        id: no + index,
        name: `${keyword}0${index + 1}`,
      }));
      resolve(res);
    }, 600),
  );
class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value, index, searchRes) {
    const snapshot = searchRes[index];
    console.log(value, index, searchRes);
    this.setState({ value: snapshot });
    // return值，既是搜索输入框最终要显示的值
    return snapshot;
  }
  render() {
    const modalProps = {
      style: { width: '200px' },
      placeholder: '请输入员工工号/姓名', // 默认为请输入姓名或工号
      onSelect: this.handleSelect,
      maxSize: 30, // 字符超过30个将会默认启用tooltip
      format: datas =>
        datas.map(({ name, id }, index) => ({
          label: `${name}(${id})`,
          value: `${id}`,
          key: index,
        })),
      valueFormat: value => `${value.name}(${value.id})`,
      fetchData: mockFetch, // 一个带promise特性的请求；
      searchKey: 'keyword',
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form style={{ width: 600 }}>
          <FormItem type="inline" {...formItemLayout} label="员工姓名">
            {getFieldDecorator('search', {
              initialValue: { name: 'Dom', id: '0909' },
            })(<OriginSearch {...modalProps} />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Basic = Form.create()(ModalBase);
ReactDOM.render(<Basic />, mountNode);
```
