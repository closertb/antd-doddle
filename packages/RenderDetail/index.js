import React from 'react';
import { getEnumObject } from '../utils';
import detailType from './detailType';
import './index.less';

/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: props  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
function renderBaseFields(fields, detail = {}) {
  return fields.map(({ name, key, type, enums, render, isShow, unit = '' }, index) => {
    let value = detail[key];

    // 处理格式化数据
    if (type && value && detailType[type]) {
      value = detailType[type](value);
    }
    // 处理枚举
    if (enums && enums.length > 0) {
      value = getEnumObject(enums, detail[key]).label;
    }
    // 处理render 函数
    if (render && typeof render === 'function') {
      value = render(detail);
    }
    // 如果存在是否显示的定义，并且判断为不显示，直接返回null
    if (isShow && !isShow(detail)) {
      return null;
    }
    // 处理没有值时，统一显示为--,
    const final = (value === undefined || value === '') ? '--' : value;
    return (<div className="showInfo-item" key={index} >
      <span className="showInfo-label">{name}</span>
      <span className="showInfo-value">{final}{final === value ? unit : ''}</span>
    </div>);
  });
}

/**
 * 定义：详情显示组件；
 * @params: fields       栏目字段定义
 * @params: detail       栏目详情
 * @params: fieldsName   栏目名称
 * @params: children     自定义render
 */
export default class RenderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { fields, detail = {}, fieldsName, children } = this.props;
    return (
      <div className="doddle-render-detail">
        <h3 className="title">{fieldsName}</h3>
        <div className="showInfo-content">
          {children ? children(renderBaseFields) : renderBaseFields(fields, detail)}
        </div>
      </div>
    );
  }
}
