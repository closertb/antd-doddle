import React from 'react';
import { getEnumObject, EnumField, FieldProps } from '../utils';
import fieldTypes from '../EnhanceTable/table/fieldTypes';
import './index.less';

/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: detail  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
const countEnums = ['one-item', 'two-item', 'three-item', 'four-item'];

function renderBaseFields(fields: FieldProps [], detail = {}) {
  return fields.map(({ name, key, type, enums, render, isShow, unit = '', itemCount = 2 }, index) => {
    let value = detail[key];

    // 处理格式化数据
    if (type && value && fieldTypes[type]) {
      value = fieldTypes[type](value, detail);
    }
    // 处理枚举
    if (enums) {
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
    const lineClass = countEnums[itemCount - 1];
    // 处理没有值时，统一显示为--,
    const final = (value === undefined || value === '') ? '--' : value;
    return (
      <div className={`showInfo-item ${lineClass}`} key={key}>
        <span className="showInfo-label">{name}</span>
        <span className="showInfo-value">
          {final}
          {final === value ? unit : ''}
        </span>
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
interface RenderDetailProps {
  fields: FieldProps [], // 栏目字段定义
  detail: object, // 栏目详情
  fieldName?: string, // 栏目名称
  children?: Function  // 自定义render
  [propName: string]: any
}

function RenderDetail(props: RenderDetailProps) {
    const { fields, detail = {}, fieldsName, children } = props;
    return (
      <div className="doddle-render-detail">
        {fieldsName && <h3 className="title">{fieldsName}</h3>}
        <div className="showInfo-content">
          {children ? children(renderBaseFields) : renderBaseFields(fields, detail)}
        </div>
      </div>
    );
}

export default React.memo(RenderDetail)