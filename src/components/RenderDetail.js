import React from 'react';
import moment from 'moment';
import { getEnumObject, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
import './index.less';

/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: props  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
export function renderBaseFields(fields, props = {}) {
  return fields.map(({ name, key, type, enums, render, isShow }, index) => {
    let value = props[key];

    if (type === 'date') {
      value = value && moment(value).format(DATE_FORMAT);
    }
    if (type === 'datetime') {
      value = value && moment(value).format(DATE_TIME_FORMAT);
      !value && (value = '-:-:-');
    }
    // 处理枚举
    if (enums && enums.length > 0) {
      value = getEnumObject(enums, props[key]).label;
    }
    // 处理render 函数
    if (render && typeof render === 'function') {
      value = render(props);
    }
    // 如果存在是否显示的定义，并且判断为不显示，直接返回null
    if (isShow && !isShow(props)) {
      return null;
    }
    // 处理没有值时，统一显示为--,
    (value === undefined || value === '') && (value = '--');
    return (
      <div className="showInfo-item" key={index}>
        <span className="showInfo-label">{name}</span>
        <span className="showInfo-value">{value}</span>
      </div>
    );
  });
}

/**
 * 定义：详情显示组件；
 * @params: fields       栏目字段定义
 * @params: detail       栏目详情
 * @params: fieldsName   栏目名称
 * @params: children     自定义render
 */
export default class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { fields, detail = {}, fieldsName, children } = this.props;
    return (
      <div className="ffe-render-detail">
        <h3 className="title">{fieldsName}</h3>
        <div className="showInfo-content">
          {children ? children(renderBaseFields) : renderBaseFields(fields, detail)}
        </div>
      </div>
    );
  }
}
