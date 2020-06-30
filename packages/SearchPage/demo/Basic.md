---
title: 基本用法
order: 0
---

默认示例(设置isDynamic，动态获取接口返回枚举)

```jsx
import React, { useRef, useState, useCallback } from "react";
import { Button } from 'antd';
import SearchPage from "../index";
import HModal from '../../HModal';

function DetailModal(props) {
    return (
        <HModal title="测试框" {...props}>
            这是一个测试的modal
        </HModal>
    );
}

function Page(params) {
  const extraBtns = () => <Button onClick={() => setVisible(Symbol(''))}>编辑按钮</Button>
  const query = useRef();
  const onSearch = useCallback((value) => {
    console.log('value', value);
  });
  const [visible, setVisible] = useState(false);

  const searchProps = {
    fields: searchFields,
    search: { reach: 0 },
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
    dynamicParams: { // 从请求获取到的动态枚举， 需配合fields设置isDynamic属性
      reach:  [{ label: '远处的是', value: 1 }, { label: '动态的否', value: 0 }],
    },
    extraBtns // 添加自定义按钮操作
  };

  const tableProps = {
    fields,
    datas: forkDatas,
    total: forkDatas.length,
  };

  const pageProps = {
    searchProps,
    tableProps,
    setQuery: params => query.current = params,
    onSearch
  }

  const modalProps = {
    visible,
    onOk: () => {
      console.log('do something');
      onSearch(query.current);
    }
  }
  return (
    <SearchPage {...pageProps}>
      {visible && <DetailModal {...modalProps} />}
    </SearchPage>
  )
}

const searchFields = [{
  key: 'sectionId',
  name: '路段',
}, {
  key: 'reach',
  name: '是否达成',
  type: 'select',
  enums: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
  isDynamic: true,
  seldomProps: { 
    allowClear: true,
  }
}, {
  key: 'time',
  name: '筛选时间',
  type: 'rangePicker',
  startKey: 'startTime',
  endKey: 'endTime',
}];

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

ReactDOM.render(<Page />, mountNode);
```