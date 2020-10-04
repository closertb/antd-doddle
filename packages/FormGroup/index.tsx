import React, { Children, cloneElement, useMemo, useRef, forwardRef, useEffect } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { formItemLayout as layout, Type } from '../utils';
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
          ...extendProps,
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

const FormGroup: React.ForwardRefRenderFunction<FormInstance, GroupProps> = (props, ref) => {
  // 这里datas 不能赋默认值，会导致未设置初始值时，datas 被不断赋 {}；
  const { formItemLayout = layout, containerName, required, fields = [],
    Wrapper = WrapperDefault, withWrap, dynamicParams, children, datas, ...others } = props;

  const insideRef = useRef();
  const mapFields = useMemo(() => fields.reduce((pre, cur) => {
    const { key } = cur;
    if (!key) {
      console.log('field key is requied');
      return pre;
    }
    pre[key] = cur;
    return pre;
  }, {}), [fields]);

  const _ref = ref || insideRef;
  const extendProps = {
    containerName,
    dynamicParams,
    datas,
    required,
    Wrapper,
    withWrap,
  };

  const formProps = {
    initialValues: {},
    ...formItemLayout,
    ...others
  };

  // 如果data 值变化，重置表单的值
  useEffect(() => {
    // 这里加了一个逻辑，当设置一个空数据，表面想清空表单，所以使用了resetFields API；
    const [data, apiStr] = Type.isEmpty(datas) ? [undefined, 'resetFields'] : [datas, 'setFieldsValue'];
    // 函数式组件采用form操作；
    if (props.form) {
      props.form[apiStr](data);
      return;
    }
    // 如果是类组件，才采用ref示例更新组件
    if (typeof _ref === 'object') {
      _ref.current[apiStr](data);
    }
  }, [datas]);


  return (
    <Form {...formProps} ref={_ref}>
      {deepMap(children, extendProps, mapFields)}
    </Form>);
};

const FormGroupWithRef = forwardRef(FormGroup);

type FormGroup = typeof FormGroupWithRef;

interface FormOut extends FormGroup {
  useForm: typeof useForm;
  FormRender: typeof FormRender;
}

const ForwardForm: FormOut = FormGroupWithRef as FormOut;

ForwardForm.FormRender = FormRender;

ForwardForm.useForm = useForm;

export default ForwardForm;