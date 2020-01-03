import React from 'react';
import { getEnumObject } from '../utils';
import fieldTypes from '../EnhanceTable/table/fieldTypes';
import './index.less';
/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: detail  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */

var countEnums = ['one-item', 'two-item', 'three-item', 'four-item'];

function renderBaseFields(fields) {
  var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fields.map(function (_ref, index) {
    var name = _ref.name,
        key = _ref.key,
        type = _ref.type,
        enums = _ref.enums,
        render = _ref.render,
        isShow = _ref.isShow,
        _ref$unit = _ref.unit,
        unit = _ref$unit === void 0 ? '' : _ref$unit,
        _ref$itemCount = _ref.itemCount,
        itemCount = _ref$itemCount === void 0 ? 2 : _ref$itemCount;
    var value = detail[key]; // 处理格式化数据

    if (type && value && fieldTypes[type]) {
      value = fieldTypes[type](value, detail);
    } // 处理枚举


    if (enums) {
      value = getEnumObject(enums, detail[key]).label;
    } // 处理render 函数


    if (render && typeof render === 'function') {
      value = render(detail);
    } // 如果存在是否显示的定义，并且判断为不显示，直接返回null


    if (isShow && !isShow(detail)) {
      return null;
    }

    var lineClass = countEnums[itemCount - 1]; // 处理没有值时，统一显示为--,

    var _final = value === undefined || value === '' ? '--' : value;

    return React.createElement("div", {
      className: "showInfo-item ".concat(lineClass),
      key: key
    }, React.createElement("span", {
      className: "showInfo-label"
    }, name), React.createElement("span", {
      className: "showInfo-value"
    }, _final, _final === value ? unit : ''));
  });
}

function RenderDetail(props) {
  var fields = props.fields,
      _props$detail = props.detail,
      detail = _props$detail === void 0 ? {} : _props$detail,
      fieldsName = props.fieldsName,
      children = props.children;
  return React.createElement("div", {
    className: "doddle-render-detail"
  }, fieldsName && React.createElement("h3", {
    className: "title"
  }, fieldsName), React.createElement("div", {
    className: "showInfo-content"
  }, children ? children(renderBaseFields) : renderBaseFields(fields, detail)));
}

export default React.memo(RenderDetail);