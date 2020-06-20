import React, { Children, cloneElement, useMemo, forwardRef, useEffect } from 'react';
import { Form } from 'antd';
import { formItemLayout as layout } from '../utils';
import { GroupProps } from './interface';
import FormRender from './FormRender';
import { extendSymbol, WrapperDefault } from './default';

const { useForm } = Form;

// 遍历 react children, 识别FormRender
function deepMap(children, extendProps, mapFields) {
  return Children
    .map(children, (child) => {
      if (child === null || typeof child !== 'object') {
        return child;
      }
      const { itemKey, field } = child.props;
      const isDefine = typeof child.type === 'function';
      // 仅对FormRender 组件做属性扩展
      if (isDefine && child.type.$type === extendSymbol) {
        return cloneElement(child, {
          extendProps,
          field: field || mapFields[itemKey],
        });
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

function FormGroup(constProps: GroupProps, ref) {
  const { formItemLayout = layout, containerName, required, fields = [],
    Wrapper = WrapperDefault, withWrap = false, dynamicParams, children, datas, ...others } = constProps;

  const mapFields = useMemo(() => fields.reduce((pre, cur) => {
    const { key } = cur;
    if (!key) {
      console.log('field key is requied');
      return pre;
    }
    pre[key] = cur;
    return pre;
  }, {}), [fields]);

  const extendProps = {
    containerName,
    dynamicParams,
    required,
    Wrapper,
    withWrap,
  };

  const formProps = {
    ...formItemLayout,
    ...others
  };

  useEffect(() => {
    // 如果data 值变化，重置表单的值
    console.log('form', ref);
    ref && ref.current.setFieldsValue(datas);
  }, [datas]);
  return (
    <Form {...formProps} ref={ref}>
      {deepMap(children, extendProps, mapFields)}
    </Form>);
}

interface FormOut {
  [propName: string]: any
}

const ForwardForm: FormOut = forwardRef(FormGroup);

ForwardForm.FormRender = FormRender;

ForwardForm.useForm = useForm;

export default ForwardForm;