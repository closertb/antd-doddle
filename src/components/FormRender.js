import React from 'react';
import { Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import { moment } from 'moment';
import { formItemLayout as layout } from 'configs/constants';
import { dateStrFormat } from 'utils/common';
import OriginSearch from './OriginSearch';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;
const handleDisabledDate = currentDate =>
  currentDate && currentDate > moment().endOf('day');
export default function (params) {
  const { formItemLayout = layout, getFieldDecorator } = params;
  return function FormRender(props) {
    const { field, data = {} } = props;
    const {
      type = 'input',
      key,
      name,
      maxLength,
      required = false,
      allowClear = true,
      placeholder,
      defaultValue,
      disable = false,
      rules = [],
      specialKey,
    } = field;
    let content = null;
    switch (type) {
      // eslint-disable-next-line
      case 'input':
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
                maxLength={maxLength}
                placeholder={placeholder || `请输入${name}`}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'inputNumber':
        // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
        const { max, min, precision = 0, step = 1 } = field;
        content = (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }]
            })(
              <InputNumber
                max={max}
                min={min}
                step={step}
                precision={precision}
                style={{ width: '100%' }}
                placeholder={placeholder || `请输入${name}`}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'text':
        const { minRows = 2, maxRows = 6 } = field;
        content = (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }]
            })(
              <TextArea
                type="text"
                maxLength={maxLength || 300}
                placeholder={placeholder || `请输入${name}`}
                autosize={{ minRows, maxRows }}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'origin':
        const { service, format, searchKey, onSelect } = field;
        content = (
          <FormItem key={key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }]
            })(
              <OriginSearch
                disabled={disable && disable(data)}
                style={{ width: '100%', height: 32 }}
                searchKey={searchKey}
                onSelect={onSelect}
                format={format}
                fetchData={service}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'select':
        const { related, relatedKey, enums = [], onSelect: onChange = () => { } } = field;
        content = (!related || typeof data[relatedKey] !== 'undefined') && (
          <FormItem key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }]
            })(
              <Select
                style={{ width: '100%' }}
                placeholder={placeholder || '不限'}
                allowClear={allowClear}
                disabled={disable && disable(data)}
                onSelect={onChange}
              >
                {(props.enums || enums).map(({ value, label }) => (
                  <Option key={value} value={value}>{label}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'radio':
        const { enums: options = [], onChange: change = () => { } } = field;
        content = (
          <FormItem key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }]
            })(
              <RadioGroup options={props.enums || options} disabled={disable && disable(data)} onSelect={change} />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'check':
        const { enums: groups = [], onChange: uchange = () => { } } = field;
        content = (
          <FormItem key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }]
            })(
              <CheckboxGroup options={props.enums || groups} disabled={disable && disable(data)} onChange={uchange} />
            )}
          </FormItem>
        );
        break;
      case 'datePicker':
        content = (
          <FormItem key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: dateStrFormat(data[key]),
              rules: [{ required, message: placeholder || `请选择${name}` }]
            })(
              <DatePicker
                showTime={field.showTime || false}
                format={field.format || 'YYYY-MM-DD'}
                placeholder={placeholder || '请选择'}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'rangePicker':
        const { startKey, endKey, key: rangeKey, disabledDate = false, format: sformat, showTime = false } = field;
        const beginDate = data[startKey];
        const endDate = data[endKey];
        const rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];
        content = (
          <FormItem key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(rangeKey, {
              initialValue: rangeDate,
              rules: [{ required, message: placeholder || `请输入${name}` }]
            })(
              <RangePicker
                style={{ width: '100%' }}
                allowClear={allowClear}
                showTime={showTime}
                className="search-range-picker"
                format={sformat || 'YYYY-MM-DD'}
                disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
              />
            )}
          </FormItem>
        );
        break;
      case 'render':
        content = field.rander(getFieldDecorator, data);
        break;
      default:
        break;
    }
    return content;
  };
}
