var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React from 'react';
import { Form } from 'antd';
import { extendSymbol } from './default';
import renderType from './renderType';
var FormItem = Form.Item;

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

export default function FormRender(props) {
  var field = props.field,
      require = props.required,
      _props$wrapProps = props.wrapProps,
      wrapProps = _props$wrapProps === void 0 ? {} : _props$wrapProps,
      _props$datas = props.datas,
      initData = _props$datas === void 0 ? {} : _props$datas,
      containerName = props.containerName,
      defaultWrap = props.withWrap,
      dynamicParams = props.dynamicParams,
      itemKey = props.itemKey,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      Wrapper = props.Wrapper,
      otherFormPrrops = __rest(props, ["field", "required", "wrapProps", "datas", "containerName", "withWrap", "dynamicParams", "itemKey", "disabled", "Wrapper"]);

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
      placeholder = field.placeholder,
      fieldDisable = field.disabled,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? props.rules || [] : _field$rules,
      _field$isEnable = field.isEnable,
      isEnable = _field$isEnable === void 0 ? function () {
    return true;
  } : _field$isEnable,
      _field$onChange = field.onChange,
      onChange = _field$onChange === void 0 ? defaultAction : _field$onChange,
      format = field.format,
      withWrap = field.withWrap,
      _field$enums = field.enums,
      enums = _field$enums === void 0 ? [] : _field$enums,
      _field$seldomProps = field.seldomProps,
      seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps,
      _field$formProps = field.formProps,
      formProps = _field$formProps === void 0 ? {} : _field$formProps,
      _field$dependencies = field.dependencies,
      dependencies = _field$dependencies === void 0 ? [] : _field$dependencies,
      _field$render = field.render,
      selfRender = _field$render === void 0 ? function () {
    return null;
  } : _field$render,
      _field$shouldUpdate = field.shouldUpdate,
      shouldUpdate = _field$shouldUpdate === void 0 ? false : _field$shouldUpdate,
      _field$isDynamic = field.isDynamic,
      isDynamic = _field$isDynamic === void 0 ? false : _field$isDynamic,
      others = __rest(field, ["type", "key", "name", "style", "required", "allowClear", "placeholder", "disabled", "rules", "isEnable", "onChange", "format", "withWrap", "enums", "seldomProps", "formProps", "dependencies", "render", "shouldUpdate", "isDynamic"]);

  var enumKey = field.enumKey || key;
  var content = null;

  if (!field) {
    console.error('field can not be undefined');
    return content;
  }

  var disableTemp = fieldDisable || disabled;
  var disable = typeof disableTemp === 'function' ? disableTemp(initData, {}) : disableTemp;

  var _required = typeof required === 'function' ? required(initData, {}) : required;

  var selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : props.enums || enums;
  var pholder = placeholder || ruleTipMap[type] || "\u8BF7\u8F93\u5165".concat(name);
  var common = Object.assign({
    style: style,
    required: _required,
    allowClear: allowClear,
    disabled: disable,
    placeholder: pholder,
    onChange: props.onChange || onChange
  }, seldomProps, others); // 如果这个节点不需要渲染，那么就直接返回null

  var finalEnable = props.isEnable || isEnable;

  if (renderType[type]) {
    var render = renderType[type];
    content = shouldUpdate ? React.createElement(FormItem, {
      shouldUpdate: shouldUpdate,
      noStyle: true
    }, function (form) {
      var datas = Object.assign({}, form.getFieldsValue());

      var require = typeof required === 'function' ? required(initData, datas) : required;

      var disabled = typeof disableTemp === 'function' ? disableTemp(initData, datas) : disableTemp;
      return finalEnable(initData, datas) ? React.createElement(FormItem, Object.assign({
        key: key,
        name: key,
        label: name,
        dependencies: dependencies,
        rules: gerateRule(require, pholder, rules)
      }, formProps, otherFormPrrops), render({
        field: Object.assign(common, {
          disabled: disabled
        }),
        name: name,
        enums: selectEnums,
        containerName: containerName
      })) : selfRender(datas, form);
    }) : React.createElement(FormItem, Object.assign({
      key: key,
      name: key,
      label: name,
      dependencies: dependencies,
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

  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ? React.createElement(Wrapper, Object.assign({}, wrapProps), content) : content;
}
FormRender.$type = extendSymbol;