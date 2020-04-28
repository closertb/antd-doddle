import React, { Children, useMemo, cloneElement, useRef } from 'react';
import { Form } from 'antd';
import { formItemLayout as layout } from '../utils';
import { GroupProps } from './interface';
import FormRender from './FormRender';
import { extendSymbol, WrapperDefault } from './default';

// 遍历 react children, 识别FormRender
function deepMap(children, extendProps, mapFields) {
  return Children
    .map(children, (child) => {
      if (child === null || typeof child !== 'object') {
        return child;
      }
      const { itemKey, field, data } = child.props;
      const isDefine = typeof child.type === 'function';
      // 仅对FormRender 组件做属性扩展
      if (isDefine && child.type.$type === extendSymbol) {
        return cloneElement(child, {
          extendProps,
          field: field || mapFields[itemKey],
          data: data || extendProps.datas
        });
      }      // 仅对FormRender 组件做属性扩展
      if (isDefine && child.type.$type === extendSymbol) {
        return cloneElement(child, { extendProps });
      }
      if (child && child.props && child.props.children && typeof child.props.children === 'object') {
        // Clone the child that has children and map them too
        return cloneElement(child, {
          children: deepMap(child.props.children, extendProps, mapFields),
        });
      }
      return child;
    });
}

export default function FormGroup(constProps: GroupProps) {
  const { formItemLayout = layout, containerName, getFieldDecorator, required, fields = [], datas = {},
    Wrapper = WrapperDefault, withWrap = false, children, dynamicParams, ...others } = constProps;
  const dataRef = useRef(datas);
  const extendProps = {
    formItemLayout,
    containerName,
    dynamicParams,
    getFieldDecorator,
    require: required,
    _datas: dataRef.current,
    datas,
    Wrapper,
    withWrap
  };
  const mapFields = useMemo(() => fields.reduce((pre, cur) => {
    const { key } = cur;
    if (!key) {
      console.log('field key is requied');
      return pre;
    }
    pre[key] = cur;
    return pre;
  }, {}), [fields]);
  return (
    <Form {...others}>
      {deepMap(children, extendProps, mapFields)}
    </Form>);
}

FormGroup.FormRender = FormRender;