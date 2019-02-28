import { userStatus } from '../../configs/constants';

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
export const searchFields = [{
  key: 'userId',
  name: '用户ID',
},{
  key: 'mail',
  name: '邮箱',
}, {
  key: 'userId',
  name: '用户ID',
}, {
  key: 'effectDate',
  name: '生效日期',
  startKey: 'effectBeginDate',
  endKey: 'effectEndDate',
  type: 'rangePicker'
}];

export const editFields = [{
  key: 'userName',
  name: '真实姓名',
  required: true,
  disable: data => typeof data.userName !== 'undefined'
}, {
  key: 'mail',
  name: '邮箱',
  required: true
}, {
  key: 'userId',
  name: '用户ID',
  required: true
}, {
  key: 'status',
  name: '状态',
  required: true,
  type: 'select',
  enums: userStatus
}, {
  key: 'remark',
  name: '备注',
}];