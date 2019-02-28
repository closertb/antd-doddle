import React from 'react';
import { Spin } from 'antd';
import { RenderDetail } from '../../../src/index';
import { fields, privateFields } from './fields';

const forkDatas = {
  baseInfo: {
    id: 1,
    userName: 'Dom',
    userId: 'closertb',
    status: 0,
    applyTime: 1550973288220
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

export default function Detail(props) {
  const { confirmLoading } = props;
  return (
    <Spin spinning={confirmLoading}>
      <RenderDetail fields={fields} detail={forkDatas.baseInfo} fieldsName="用户信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.defineInfo} fieldsName="自定义已婚信息" />
      <RenderDetail fields={privateFields} detail={forkDatas.noInfo} fieldsName="自定义未婚信息" />
    </Spin>
  );
}
