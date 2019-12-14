---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import { Popconfirm } from 'antd';
import setPaginationParam from '../../utils/common';
import EnhanceTable from "../index";

setPaginationParam({
  PN: 'pn',
  PS: 'ps'
});

const userStatus = [{
  value: 1,
  label: '启用',
}, {
  value: 0,
  label: '禁用',
}];

const statusEnums = {
  error: '错误',
  normal: '正常'
};

const fields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'property',
  name: '资产(万)',
  type: 'decimal' 
}, {
  key: 'addtime',
  name: '加入时间',
  type: 'date',
}, {
  key: 'status',
  name: '用户状态',
  enums: userStatus
}, {
  key: 'cardStatus',
  name: '卡状态',
  enums: statusEnums
}];

const forkDatas = [{
  id: 1,
  userName: 'Dom',
  userId: 'closertb',
  property: 4564384,
  addtime: Date.now(),
  status: 0,
  cardStatus: 'normal'
}, {
  id: 2,
  userName: 'Simon',
  userId: 'simona',
  property: 123456,
  addtime: Date.now(),
  status: 1,
  cardStatus: 'error'
}, {
  id: 3,
  userName: 'Simon',
  userId: 'simona',
  property: 123456,
  addtime: Date.now(),
  status: 1,
  cardStatus: 'normal'
}, {
  id: 4,
  userName: 'Simon',
  userId: 'simona',
  property: 123456,
  addtime: Date.now(),
  status: 1,
  cardStatus: 'error'
}, {
  id: 5,
  userName: 'Simon',
  userId: 'simona',
  property: 123456,
  addtime: Date.now(),
  status: 1,
  cardStatus: 'error'
}];  

class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 180,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { console.log('edit'); }}>修改</a>
            <Popconfirm title="确认删除？" onConfirm={() => { console.log('delete', detail); }}>
              <a style={{ marginLeft: 10 }}>删除</a>
            </Popconfirm>
          </div>)
      }
    ];
  }
  render() {
    const { onSearch = (param) => { console.log('fork', param); } } = this.props;
    const forkProps = {
      fields,
      onSearch,
      search: { pn: 1, ps: 3 },
      rowKey: 'id',
      datas: forkDatas,
      total: forkDatas.length,
      extraFields: this.getExtraFields()
    };

    return (
      <div>
        <EnhanceTable {...forkProps} />
      </div>
    );
  }
}
ReactDOM.render(<Basic />, mountNode);
```