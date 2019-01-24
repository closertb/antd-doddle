import _classCallCheck from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import React from 'react';
import moment from 'moment';
import { getEnumObject, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
import style from './index.less';
/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: props  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */

export function renderBaseFields(fields) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fields.map(function (_ref, index) {
    var name = _ref.name,
        key = _ref.key,
        type = _ref.type,
        enums = _ref.enums,
        render = _ref.render,
        isShow = _ref.isShow;
    var value = props[key];

    if (type === 'date') {
      value = value && moment(value).format(DATE_FORMAT);
    }

    if (type === 'datetime') {
      value = value && moment(value).format(DATE_TIME_FORMAT);
      !value && (value = '-:-:-');
    } // 处理枚举


    if (enums && enums.length > 0) {
      value = getEnumObject(enums, props[key]).label;
    } // 处理render 函数


    if (render && typeof render === 'function') {
      value = render(props);
    } // 如果存在是否显示的定义，并且判断为不显示，直接返回null


    if (isShow && !isShow(props)) {
      return null;
    } // 处理没有值时，统一显示为--,


    (value === undefined || value === '') && (value = '--');
    return React.createElement("div", {
      className: "showInfo-item",
      key: index
    }, React.createElement("span", {
      className: "showInfo-label"
    }, name), React.createElement("span", {
      className: "showInfo-value"
    }, value));
  });
}

var RecordDetail =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RecordDetail, _React$Component);

  function RecordDetail(props) {
    var _this;

    _classCallCheck(this, RecordDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecordDetail).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(RecordDetail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fields = _this$props.fields,
          _this$props$detail = _this$props.detail,
          detail = _this$props$detail === void 0 ? {} : _this$props$detail,
          fieldsName = _this$props.fieldsName;
      return React.createElement("div", {
        className: style.RenderDetail
      }, React.createElement("h3", {
        className: "title"
      }, fieldsName), React.createElement("div", {
        className: "showInfo-content"
      }, renderBaseFields(fields, detail)));
    }
  }]);

  return RecordDetail;
}(React.Component);

export { RecordDetail as default };