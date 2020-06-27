"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _utils = require("../utils");

var _FormRender = _interopRequireDefault(require("./FormRender"));

var _default2 = require("./default");

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

var useForm = _antd.Form.useForm; // 遍历 react children, 识别FormRender

function deepMap(children, extendProps, mapFields) {
  return _react.Children.map(children, function (child) {
    if (child === null || _typeof(child) !== 'object') {
      return child;
    }

    var _child$props = child.props,
        itemKey = _child$props.itemKey,
        field = _child$props.field;
    var isDefine = typeof child.type === 'function'; // 仅对FormRender 组件做属性扩展

    if (isDefine && child.type.$type === _default2.extendSymbol) {
      return (0, _react.cloneElement)(child, Object.assign({}, extendProps, {
        field: field || mapFields[itemKey]
      }));
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

var FormGroup = function FormGroup(props, ref) {
  var _props$formItemLayout = props.formItemLayout,
      formItemLayout = _props$formItemLayout === void 0 ? _utils.formItemLayout : _props$formItemLayout,
      containerName = props.containerName,
      required = props.required,
      _props$fields = props.fields,
      fields = _props$fields === void 0 ? [] : _props$fields,
      onFormChange = props.onFormChange,
      _props$Wrapper = props.Wrapper,
      Wrapper = _props$Wrapper === void 0 ? _default2.WrapperDefault : _props$Wrapper,
      withWrap = props.withWrap,
      dynamicParams = props.dynamicParams,
      children = props.children,
      _props$datas = props.datas,
      datas = _props$datas === void 0 ? {} : _props$datas,
      others = __rest(props, ["formItemLayout", "containerName", "required", "fields", "onFormChange", "Wrapper", "withWrap", "dynamicParams", "children", "datas"]);

  var insideRef = (0, _react.useRef)();
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

  var _ref = ref || insideRef;

  var extendProps = {
    containerName: containerName,
    dynamicParams: dynamicParams,
    datas: datas,
    required: required,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  var formProps = Object.assign({
    initialValues: datas
  }, formItemLayout, others); // 如果data 值变化，重置表单的值

  (0, _react.useEffect)(function () {
    // 函数式组件采用form 直接reset；
    if (props.form) {
      props.form.setFieldsValue(datas);
      return;
    } // 如果是类组件，才采用ref示例更新组件


    if (_typeof(_ref) === 'object') {
      _ref.current.setFieldsValue(datas);
    }
  }, [datas]);
  return _react["default"].createElement(_antd.Form, Object.assign({}, formProps, {
    ref: _ref
  }), deepMap(children, extendProps, mapFields));
};

var FormGroupWithRef = (0, _react.forwardRef)(FormGroup);
var ForwardForm = FormGroupWithRef;
ForwardForm.FormRender = _FormRender["default"];
ForwardForm.useForm = useForm;
var _default = ForwardForm;
exports["default"] = _default;