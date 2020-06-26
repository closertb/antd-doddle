"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormRender;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _default = require("./default");

var _fields = _interopRequireDefault(require("./fields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var FormItem = _antd.Form.Item;

var defaultAction = function defaultAction() {};

var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}; // 用于接受一个从接口获取到的枚举数组


var getParamFromProps = function getParamFromProps(key, props) {
  return props[key] || [];
};

var ruleTipMap = {
  input: '请输入',
  text: '请输入',
  inputNumber: '请输入',
  select: '请选择',
  radio: '请选择',
  check: '请选择',
  datePicker: '请选择',
  rangePicker: '请选择'
};

var gerateRule = function gerateRule(required, placeholder, rules) {
  return [{
    required: required,
    message: placeholder
  }].concat(rules);
};

function FormRender(props) {
  var field = props.field,
      require = props.required,
      _props$wrapProps = props.wrapProps,
      wrapProps = _props$wrapProps === void 0 ? {} : _props$wrapProps,
      _props$data = props.data,
      data = _props$data === void 0 ? {} : _props$data,
      containerName = props.containerName,
      defaultWrap = props.withWrap,
      dynamicParams = props.dynamicParams,
      Wrapper = props.Wrapper;

  var _field$type = field.type,
      type = _field$type === void 0 ? 'input' : _field$type,
      key = field.key,
      name = field.name,
      _field$style = field.style,
      style = _field$style === void 0 ? {
    width: '100%'
  } : _field$style,
      _field$required = field.required,
      required = _field$required === void 0 ? require || false : _field$required,
      _field$allowClear = field.allowClear,
      allowClear = _field$allowClear === void 0 ? true : _field$allowClear,
      _field$disable = field.disable,
      disable = _field$disable === void 0 ? false : _field$disable,
      placeholder = field.placeholder,
      fieldDisable = field.disabled,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? props.rules || [] : _field$rules,
      _field$isEnable = field.isEnable,
      isEnable = _field$isEnable === void 0 ? true : _field$isEnable,
      _field$onChange = field.onChange,
      onChange = _field$onChange === void 0 ? defaultAction : _field$onChange,
      format = field.format,
      withWrap = field.withWrap,
      _field$enums = field.enums,
      enums = _field$enums === void 0 ? [] : _field$enums,
      _field$seldomProps = field.seldomProps,
      seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps,
      _field$decorProps = field.decorProps,
      decorProps = _field$decorProps === void 0 ? {} : _field$decorProps,
      _field$formProps = field.formProps,
      formProps = _field$formProps === void 0 ? {} : _field$formProps,
      _field$dependencies = field.dependencies,
      dependencies = _field$dependencies === void 0 ? [] : _field$dependencies,
      _field$shouldUpdate = field.shouldUpdate,
      shouldUpdate = _field$shouldUpdate === void 0 ? false : _field$shouldUpdate,
      _field$isDynamic = field.isDynamic,
      isDynamic = _field$isDynamic === void 0 ? false : _field$isDynamic,
      others = __rest(field, ["type", "key", "name", "style", "required", "allowClear", "disable", "placeholder", "disabled", "rules", "isEnable", "onChange", "format", "withWrap", "enums", "seldomProps", "decorProps", "formProps", "dependencies", "shouldUpdate", "isDynamic"]);

  var enumKey = field.enumKey || key;
  var content = null;

  if (!field) {
    console.error('field can not be undefined');
    return content;
  }

  var disabled = fieldDisable || disable && disable(data);
  var selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : props.enums || enums;
  var pholder = placeholder || ruleTipMap[type] || "\u8BF7\u8F93\u5165".concat(name);
  var common = Object.assign({
    style: style,
    required: required,
    allowClear: allowClear,
    disabled: disabled,
    placeholder: pholder,
    onChange: props.onChange || onChange
  }, decorProps, seldomProps, others);
  console.log('con', key, type); // 如果这个节点不需要渲染，那么就直接返回null

  if (!isUndefind(props.isEnable, isEnable)) {
    return content;
  }

  if (_fields["default"][type]) {
    var render = _fields["default"][type];
    content = _react["default"].createElement(FormItem, Object.assign({
      key: key,
      name: key,
      label: name,
      dependencies: dependencies,
      shouldUpdate: shouldUpdate,
      rules: gerateRule(required, pholder, rules)
    }, formProps), render({
      field: common,
      name: name,
      enums: selectEnums,
      containerName: containerName
    }));
  } else {
    console.error('type:', type, 'is not supported, you can use extendRenderTypes API to define what you want');
  }

  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ? _react["default"].createElement(Wrapper, Object.assign({}, wrapProps), content) : content;
}

FormRender.$type = _default.extendSymbol;