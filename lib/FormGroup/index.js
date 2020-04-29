"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormGroup;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _utils = require("../utils");

var _FormRender = _interopRequireDefault(require("./FormRender"));

var _default = require("./default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

// 遍历 react children, 识别FormRender
function deepMap(children, extendProps, mapFields) {
  return _react.Children.map(children, function (child) {
    if (child === null || _typeof(child) !== 'object') {
      return child;
    }

    var _child$props = child.props,
        itemKey = _child$props.itemKey,
        field = _child$props.field,
        data = _child$props.data;
    var isDefine = typeof child.type === 'function'; // 仅对FormRender 组件做属性扩展

    if (isDefine && child.type.$type === _default.extendSymbol) {
      return (0, _react.cloneElement)(child, {
        extendProps: extendProps,
        field: field || mapFields[itemKey],
        data: data || extendProps.datas
      });
    } // 仅对FormRender 组件做属性扩展


    if (isDefine && child.type.$type === _default.extendSymbol) {
      return (0, _react.cloneElement)(child, {
        extendProps: extendProps
      });
    }

    if (child && child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return (0, _react.cloneElement)(child, {
        children: deepMap(child.props.children, extendProps, mapFields)
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
      _constProps$fields = constProps.fields,
      fields = _constProps$fields === void 0 ? [] : _constProps$fields,
      _constProps$datas = constProps.datas,
      datas = _constProps$datas === void 0 ? {} : _constProps$datas,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? _default.WrapperDefault : _constProps$Wrapper,
      _constProps$withWrap = constProps.withWrap,
      withWrap = _constProps$withWrap === void 0 ? false : _constProps$withWrap,
      children = constProps.children,
      dynamicParams = constProps.dynamicParams,
      others = __rest(constProps, ["formItemLayout", "containerName", "getFieldDecorator", "required", "fields", "datas", "Wrapper", "withWrap", "children", "dynamicParams"]);

  var dataRef = (0, _react.useRef)(datas);
  var extendProps = {
    formItemLayout: formItemLayout,
    containerName: containerName,
    dynamicParams: dynamicParams,
    getFieldDecorator: getFieldDecorator,
    require: required,
    _datas: dataRef.current,
    datas: datas,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  var mapFields = (0, _react.useMemo)(function () {
    return fields.reduce(function (pre, cur) {
      var key = cur.key;

      if (!key) {
        console.log('field key is requied');
        return pre;
      }

      pre[key] = cur;
      return pre;
    }, {});
  }, [fields]);
  return _react["default"].createElement(_antd.Form, Object.assign({}, others), deepMap(children, extendProps, mapFields));
}

FormGroup.FormRender = _FormRender["default"];