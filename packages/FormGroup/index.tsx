import React, { Children, cloneElement } from 'react';
import { Form } from 'antd';
import { formItemLayout as layout } from '../utils';
import { GroupProps } from './interface';
import FormRender from './FormRender';
import { extendSymbol, WrapperDefault } from './default';

// 遍历 react children, 识别FormRender
function deepMap(children, extendProps) {
  return Children
    .map(children, (child) => {
      const isDefine = typeof child.type === 'function';
      // 仅对FormRender 组件做属性扩展
      if (isDefine && child.type.$type === extendSymbol) {
        return cloneElement(child, { extendProps });
      }
      if (child && child.props && child.props.children && typeof child.props.children === 'object') {
        // Clone the child that has children and map them too
        return cloneElement(child, {
          children: deepMap(child.props.children, extendProps),
        });
      }
      return child;
    });
}

export default function FormGroup(constProps: GroupProps) {
  const { formItemLayout = layout, containerName, getFieldDecorator, required,
    Wrapper = WrapperDefault, withWrap = false, children, dynamicParams, ...others } = constProps;
  
  const extendProps = {
    formItemLayout,
    containerName,
    dynamicParams,
    getFieldDecorator,
    require: required,
    Wrapper,
    withWrap
  };

  return (
    <Form {...others}>
      {deepMap(children, extendProps)}
    </Form>);
}

FormGroup.FormRender = FormRender;