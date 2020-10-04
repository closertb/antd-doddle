---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import { Spin } from 'antd';
import RenderDetail from "../index";

const userStatus = [{
  value: 1,
  label: '启用',
}, {
  value: 0,
  label: '禁用',
}];

const statusEnums = {
  error: '冻结',
  normal: '正常'
};

export const fields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'status',
  name: '状态',
  enums: userStatus
}, {
  key: 'applyTime',
  name: '申请时间',
  type: 'datetime',
}, {
  key: 'private',
  name: '个人资产',
  type: 'decimal',
  unit: '元' 
}, {
  key: 'cardStatus',
  name: '卡状态',
  enums: statusEnums
}];

export const privateFields = [{
  key: 'address',
  name: '家庭地址',
},{
  key: 'marital',
  name: '婚姻状况',
}, {
  key: 'mateName',
  name: '配偶姓名',
  isShow: detail => detail.marital === '已婚'
}, {
  key: 'mateIdNo',
  name: '配偶证件号码',
  isShow: detail => detail.marital === '已婚'
}, {
  key: 'familylNum',
  name: '家庭人数',
  unit: '人'
},  {
  key: 'childrenStatus',
  name: '子女情况',
  render: ({ childrenStatus }) => {
    if (childrenStatus.childlessness === -1) {
      return '--';
    }
    return childrenStatus.childlessness ? `成年子女${childrenStatus.adultChildren}个,未成年子女${childrenStatus.minorChildren}个` : '无子女';
  }
}];

const forkDatas = {
  baseInfo: {
    id: 1,
    userName: 'Dom',
    userId: 'closertb',
    status: 0,
    applyTime: 1550973288220,
    private: 999999,
    cardStatus: 'error'
  }, 
  defineInfo: {
    address: 'china sichuan',
    familylNum: 6,
    marital: '已婚',
    mateName: 'Simon',
    mateIdNo: '5107021970',
    childrenStatus: { childlessness: 1, adultChildren: 1, minorChildren: 1 },
  }, 
  noInfo: {
    address: 'china sichuan',
    familylNum: 3,
    marital: '未婚',
    childrenStatus: { childlessness: 0 },
  }
};

function Basic(props) {
  const { confirmLoading = false } = props;
  return (
    <Spin spinning={confirmLoading}>
      <RenderDetail fields={fields} detail={forkDatas.baseInfo} fieldsName="用户信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.defineInfo} fieldsName="自定义已婚信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.noInfo} fieldsName="自定义未婚信息" />
    </Spin>
  );
}

ReactDOM.render(<Basic />, mountNode);
```