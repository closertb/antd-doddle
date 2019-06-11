---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from "react";
import { Button } from 'antd';
import WithSearch from "../index.js";
// 是否达成

export const searchFields = [{
  key: 'sectionId',
  name: '路段',
}, {
  key: 'reach',
  name: '是否达成',
  type: 'select',
  enums: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
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
  render() {
    const extraBtns = () => <Button>自定义按钮</Button>
    const modalProps = {
      fields: searchFields,
      search: { reach: 0 },
      onSearch: this.handleSearch,
      onReset: this.handleReset,
      extraBtns // 添加自定义按钮操作
    };
    return (
      <WithSearch {...modalProps}/>
    );
  }
}

ReactDOM.render(<Basic />, mountNode);
```