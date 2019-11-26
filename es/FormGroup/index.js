function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { Children, cloneElement } from 'react';
import { formItemLayout as layout } from '../utils';
import FormRender from './FormRender';
import { extendSymbol, WrapperDefault } from './default'; // 遍历 react children, 识别FormRender

function deepMap(children, extendProps) {
  return Children.map(children, function (child) {
    var isDefine = typeof child.type === 'function';
    var name = child.type.name; // 仅对FormRender 组件做属性扩展
    // 仅对FormRender 组件做属性扩展

    if (isDefine && child.type.$type === extendSymbol) {
      return cloneElement(child, {
        extendProps: extendProps
      });
    }

    if (child && child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return cloneElement(child, {
        children: deepMap(child.props.children, extendProps)
      });
    }

    return child;
  });
}

export default function FormGroup(constProps) {
  var _constProps$formItemL = constProps.formItemLayout,
      formItemLayout = _constProps$formItemL === void 0 ? layout : _constProps$formItemL,
      containerName = constProps.containerName,
      getFieldDecorator = constProps.getFieldDecorator,
      required = constProps.required,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? WrapperDefault : _constProps$Wrapper,
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
FormGroup.FormRender = FormRender;