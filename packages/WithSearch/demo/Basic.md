---
title: 基本用法
order: 0
---

默认示例(设置isDynamic，动态获取接口返回枚举)

```jsx
import React from "react";
import { Button } from 'antd';
import WithSearch from "../index";
// 是否达成

export const searchFields = [{
  key: 'sectionId',
  name: '路段',
}, {
  key: 'reach',
  name: '是否达成',
  type: 'select',
  enums: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
  isDynamic: true,
  inputProps: { 
    allowClear: true,
  }
}, {
  key: 'mobile',
  name: '手机号',
}];

class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSearch(result) {
    console.log('search', result);
  }
  handleReset() {
    console.log('research');
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ enums: [{ label: '远处的是', value: 1 }, { label: '动态的否', value: 0 }] })
    }, 1000)
  }
  render() {
    const extraBtns = () => <Button>自定义按钮</Button>
    const { enums } = this.state;
    const modalProps = {
      fields: searchFields,
      search: { reach: 0 },
      onSearch: this.handleSearch,
      onReset: this.handleReset,
      dynamicParams: { // 从请求获取到的动态枚举， 需配合fields设置isDynamic属性
        reach: enums,
      },
      extraBtns // 添加自定义按钮操作
    };
    return (
      <WithSearch {...modalProps}/>
    );
  }
}

ReactDOM.render(<Basic />, mountNode);
```