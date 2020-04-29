---
title: 自定义搜索表单用法(不推荐使用)
order: 1
---

默认示例

```jsx
import React from 'react';
import { Row, Col, Form, Button } from 'antd';
import WithSearch from "../index";
// 是否达成

const searchFields = [{
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
  name: '手机号'
}];

function SearchBar(props) {
  const { FormRender, onSearch, search, operate, extendProps } = props;
  return (
    <>
      <Row>
        {searchFields.map((field, index) => (
          <Col span={8} key={index}>
            <FormRender {...{ field, data: search, extendProps }} />
          </Col>
        ))}
      </Row>
      <div style={{ paddingTop: 2, textAlign: 'center' }}>
        <Button type="primary" onClick={onSearch}>搜索</Button>
        <Button style={{ marginLeft: 20 }} onClick={() => operate('add')}>新增用户</Button>
      </div>
    </>
  );
}

function Basic() {
  const searchBarProps = {
    search: {},
    onSearch: (param) => { console.log('col', param); },
    paramFormat: ({ effectDate = [], ...others }) => ({
      ...others
    })
  };
  const handleOperate = () => { console.log('operate'); }
  return (
    <div>
      <WithSearch {...searchBarProps} >
        {(props, extend) => <SearchBar {...props} extendProps={extend} operate={handleOperate} />}
      </WithSearch>
    </div>
  );
}

ReactDOM.render(<Basic />, mountNode);
```