import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox, Col } from 'antd';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
import { FormRenderProps, ConstuctorProps, Enums } from './interface';
import { extendSymbol } from './default';
import renderType from './renderType';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const defaultAction = () => { };
const getContainer = className => () => className ? document.getElementsByClassName(className)[0] : document.body;
const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;
const handleDisabledDate = currentDate => currentDate && currentDate > moment().endOf('day');
const generateOption = (enums: object | Enums []):Enums [] => {
  if (!enums || typeof enums !== 'object') {
    console.error('enums is not an object or array');
    return [];
  }
  return Array.isArray(enums) ? enums : Object.keys(enums).map(value => ({
    value: value,
    label: enums[value]
  }));
}

// 用于接受一个从接口获取到的枚举数组
const getParamFromProps = (key, props) => props[key] || [];

interface UninProps extends FormRenderProps, ConstuctorProps {
}

export default function FormRender(unionProps: UninProps, rightProps?: FormRenderProps) {
  let props;
  let construtProps;
  // have the special extend SYmbol, the function is call by old FormRender;
  if (unionProps.extend === extendSymbol) {
    construtProps = unionProps;
    props = rightProps;
  } else {
    construtProps = unionProps.extendProps;
    props = unionProps;
  }
  const { field, data = {}, wrapProps = {} } = props;

  const { require, getFieldDecorator, formItemLayout, containerName, withWrap: defaultWrap, Wrapper, dynamicParams } = construtProps;
  const {
    type = 'input',
    key,
    name,
    style = { width: '100%' },
    required = require || false,
    allowClear = true,
    placeholder,
    defaultValue,
    disable = false,
    rules = [],
    maxLength,
    isEnable: enableTemp = true,
    specialKey,
    onChange = defaultAction,
    format,
    withWrap,
    enums = [],
    seldomProps = {},
    decorProps = {},
    isDynamic = false, // 是否获取动态枚举
  } = field;
  const enumKey = field.enumKey || key;
  let content = null;
  let isEnable = enableTemp;
  // 如果这个节点不需要渲染，那么就直接返回null
  if (typeof enableTemp === 'function') {
    isEnable = enableTemp(data);
  }
  // 如果props.isEnable为false，或则isEnable 传值为false 或 enableTemp(data) 返回值为false；此节点不渲染
  if (!isUndefind(props.isEnable, isEnable)) {
    return content;
  }
  switch (type) {
    // eslint-disable-next-line
    case 'input':
    // eslint-disable-next-line
      const patternRules = [{ required, message: placeholder || `请输入${name}` },
        { pattern: /^\S.*\S$|^\S$/, message: '首尾不能含有空字符' }].concat(rules);
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: patternRules
          })(
            <Input
              type="text"
              style={style}
              maxLength={maxLength}
              onChange={props.onChange || onChange}
              placeholder={placeholder || `请输入${name}`}
              disabled={disable && disable(data)}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'inputNumber':
      // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
      // eslint-disable-next-line
      const { max, min, precision = 0, step = 1 } = field;
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
          })(
            <InputNumber
              max={max}
              min={min}
              step={step}
              precision={precision}
              style={style}
              placeholder={placeholder || `请输入${name}`}
              onChange={props.onChange || onChange}
              disabled={disable && disable(data)}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'text':
    // eslint-disable-next-line
      const { minRows = 2, maxRows = 6 } = field;
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
          {getFieldDecorator(key, {
            initialValue: data[key],
            rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
          })(
            <TextArea
              type="text"
              style={style}
              maxLength={maxLength || 300}
              placeholder={placeholder || `请输入${name}`}
              autosize={{ minRows, maxRows }}
              onChange={props.onChange || onChange}
              disabled={disable && disable(data)}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'select':
    // eslint-disable-next-line
    const selectEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : (props.enums || enums);
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout}>
          {getFieldDecorator(key, {
            initialValue: isUndefind(data[key], defaultValue),
            rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
          })(
            <Select
              style={style}
              placeholder={placeholder || '不限'}
              allowClear={allowClear}
              disabled={disable && disable(data)}
              onChange={props.onChange || onChange}
              getPopupContainer={getContainer(containerName)}
              {...seldomProps}
            >
              {generateOption(selectEnums).map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
              ))}
            </Select>
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'radio':
    // eslint-disable-next-line
    const radioEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : (props.enums || enums);
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout}>
          {getFieldDecorator(key, {
            initialValue: isUndefind(data[key], defaultValue),
            rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
          })(
            <RadioGroup
              options={generateOption(radioEnums)}
              disabled={disable && disable(data)}
              onChange={props.onChange || onChange}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'check':
    // eslint-disable-next-line
    const checkEnums = isDynamic ? getParamFromProps(enumKey, dynamicParams || props) : (props.enums || enums);
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout}>
          {getFieldDecorator(key, {
            initialValue: isUndefind(data[key], defaultValue),
            rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
          })(
            <CheckboxGroup
              options={generateOption(checkEnums)}
              disabled={disable && disable(data)}
              onChange={props.onChange || onChange}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    case 'datePicker':
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout}>
          {getFieldDecorator(key, {
            initialValue: data[key] && moment(data[key]),
            rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
          })(
            <DatePicker
              style={style}
              showTime={field.showTime || false}
              format={format || DATE_FORMAT}
              onChange={props.onChange || onChange}
              placeholder={placeholder || '请选择'}
              disabled={disable && disable(data)}
              getCalendarContainer={getContainer(containerName)}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    // eslint-disable-next-line
    case 'rangePicker':
      // eslint-disable-next-line
      const { startKey, endKey, key: rangeKey, disabledDate = false, showTime = false } = field;
      // eslint-disable-next-line
      const beginDate = data[startKey];
      // eslint-disable-next-line
      const endDate = data[endKey];
      // eslint-disable-next-line
      const rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];
      content = (
        <FormItem key={specialKey || key} label={name} {...formItemLayout}>
          {getFieldDecorator(rangeKey, {
            initialValue: rangeDate,
            rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
          })(
            <RangePicker
              style={style}
              allowClear={allowClear}
              showTime={showTime}
              className="search-range-picker"
              onChange={props.onChange || onChange}
              format={format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)}
              getCalendarContainer={getContainer(containerName)}
              disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
              {...seldomProps}
            />
          )}
        </FormItem>
      );
      break;
    default:
      if (renderType[type]) {
        const render = renderType[type];
        content = (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required: props.required || required, message: placeholder }].concat(rules),
              ...decorProps
            })(render({ field, props, data }))}
          </FormItem>);
      } else {
        console.error('type is not supported');
      }
  }
  return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ?
    <Wrapper {...wrapProps}>{content}</Wrapper> : content;
}

FormRender.$type = extendSymbol;
