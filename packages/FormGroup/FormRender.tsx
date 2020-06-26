import React from 'react';
import { Form } from 'antd';
import { FormRenderProps } from './interface';
import { extendSymbol } from './default';
import renderType from './renderType';

const FormItem = Form.Item;

const defaultAction = () => { };
const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

// 用于接受一个从接口获取到的枚举数组
const getParamFromProps = (key, props) => props[key] || [];

const ruleTipMap = {
  input: '请输入',
  text: '请输入',
  inputNumber: '请输入',
  select: '请选择',
  radio: '请选择',
  check: '请选择',
  datePicker: '请选择',
  rangePicker: '请选择'
};

const gerateRule = (required: boolean, placeholder: string, rules) => [{
  required, message: placeholder }].concat(rules);

export default function FormRender(props: FormRenderProps) {
  const { field, required: require, wrapProps = {}, datas = {}, containerName, withWrap: defaultWrap,
  dynamicParams, Wrapper } = props;

  const {
    type = 'input',
    key,
    name,
    style = { width: '100%' },
    required = require || false,
    allowClear = true,
    disable = false,
    placeholder,
    disabled: fieldDisable,
    rules = props.rules || [],
    isEnable = () => true,
    onChange = defaultAction,
    format,
    withWrap,
    enums = [],
    seldomProps = {},
    decorProps = {},
    formProps = {},
    dependencies = [],
    shouldUpdate = false,
    isDynamic = false, // 是否获取动态枚举
    ...others
  } = field;
  const enumKey = field.enumKey || key;
  let content = null;

  if (!field) {
    console.error('field can not be undefined');
    return content;
  }

  const disabled = fieldDisable || (disable && disable(datas));

  const selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : (props.enums || enums);

  const pholder = placeholder || ruleTipMap[type] || `请输入${name}`;
  const common = {
    style,
    required,
    allowClear,
    disabled,
    placeholder: pholder,
    onChange: props.onChange || onChange,
    ...decorProps,
    ...seldomProps,
    ...others
  };


  console.log('con', key, type);
  // 如果这个节点不需要渲染，那么就直接返回null
  const finalEnable = props.isEnable || isEnable;

  if (renderType[type]) {
    const render = renderType[type];
    content = shouldUpdate ? (
      <FormItem shouldUpdate={shouldUpdate} noStyle>
        {form => { 
           const datas = form.getFieldsValue();
           const disabled = fieldDisable || (disable && disable(datas));
           return finalEnable(form, datas) ?
      <FormItem
        key={key}
        name={key}
        label={name}
        dependencies={dependencies}
        rules={gerateRule(required, pholder, rules)}
        {...formProps}
      >
        {render({ field: Object.assign(common, { disabled }), name, enums: selectEnums, containerName })}
      </FormItem> : null}}
      </FormItem>) : (
      <FormItem
        key={key}
        name={key}
        label={name}
        dependencies={dependencies}
        rules={gerateRule(required, pholder, rules)}
        {...formProps}
      >
        {render({ field: common, name, enums: selectEnums, containerName })}
      </FormItem>);
  } else {
    console.error('type:', type, 'is not supported, you can use extendRenderTypes API to define what you want');
  }

  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ?
    <Wrapper {...wrapProps}>{content}</Wrapper> : content;
}

FormRender.$type = extendSymbol;
