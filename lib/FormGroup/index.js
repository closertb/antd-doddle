"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormGroup;

var _react = require("react");

var _utils = require("../utils");

var _FormRender = _interopRequireDefault(require("./FormRender"));

var _default = require("./default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 遍历 react children, 识别FormRender
function deepMap(children, extendProps) {
  return _react.Children.map(children, function (child) {
    var isDefine = typeof child.type === 'function';
    var name = child.type.name; // 仅对FormRender 组件做属性扩展
    // 仅对FormRender 组件做属性扩展

    if (isDefine && child.type.$type === _default.extendSymbol) {
      return (0, _react.cloneElement)(child, {
        extendProps: extendProps
      });
    }

    if (child && child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return (0, _react.cloneElement)(child, {
        children: deepMap(child.props.children, extendProps)
      });
    }

    return child;
  });
}

function FormGroup(constProps) {
  var _constProps$formItemL = constProps.formItemLayout,
      formItemLayout = _constProps$formItemL === void 0 ? _utils.formItemLayout : _constProps$formItemL,
      containerName = constProps.containerName,
      getFieldDecorator = constProps.getFieldDecorator,
      required = constProps.required,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? _default.WrapperDefault : _constProps$Wrapper,
      _constProps$withWrap = constProps.withWrap,
      withWrap = _constProps$withWrap === void 0 ? false : _constProps$withWrap,
      dynamicParams = constProps.dynamicParams,
      children = constProps.children;
  var extendProps = {
    formItemLayout: formItemLayout,
    containerName: containerName,
    dynamicParams: dynamicParams,
    getFieldDecorator: getFieldDecorator,
    require: required,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  return deepMap(children, extendProps);
}

FormGroup.FormRender = _FormRender["default"];