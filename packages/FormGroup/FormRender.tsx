import React from 'react';
import { Form } from 'antd';
import { FormRenderProps, ConstuctorProps, FieldProps } from './interface';
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

const gerateRule = ({ placeholder, name, required, type } : FieldProps, rules) => [{
  required, message: placeholder || ruleTipMap[type] || `请输入${name}` }].concat(rules);

interface UninProps extends FormRenderProps, ConstuctorProps {
}

export default function FormRender(props: FormRenderProps) {
  const { field, require, wrapProps = {}, data = {}, containerName, withWrap: defaultWrap,
  dynamicParams, Wrapper } = props;
  const {
    type = 'input',
    key,
    name,
    style = { width: '100%' },
    required = require || false,
    allowClear = true,
    disable = false,
    disabled: fieldDisable,
    rules = props.rules || [],
    isEnable = true,
    onChange = defaultAction,
    format,
    withWrap,
    enums = [],
    seldomProps = {},
    decorProps = {},
    formProps = {},
    isDynamic = false, // 是否获取动态枚举
    ...others
  } = field;
  const enumKey = field.enumKey || key;
  let content = null;

  if (!field) {
    console.error('field can not be undefined');
    return content;
  }

  const disabled = fieldDisable || (disable && disable(data));

  const selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : (props.enums || enums);

  const common = {
    style,
    required,
    allowClear,
    disabled,
    onChange: props.onChange || onChange,
    ...decorProps,
    ...seldomProps,
    ...others
  };


  // 如果这个节点不需要渲染，那么就直接返回null
  if (!isUndefind(props.isEnable, isEnable)) {
    return content;
  }

  if (renderType[type]) {
    const render = renderType[type];
    content = (
      <FormItem
        key={key}
        name={key}
        label={name}
        rules={gerateRule(field, rules)}
        {...formProps}
      >
        {render({ field: common, name, enums: selectEnums, containerName })}
      </FormItem>);
  } else {
    console.error('type', type, 'is not supported');
  }
  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ?
    <Wrapper {...wrapProps}>{content}</Wrapper> : content;
}

FormRender.$type = extendSymbol;
