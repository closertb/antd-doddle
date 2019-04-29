import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import { formItemLayout as layout, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils/index';
import OriginSearch from './OriginSearch';
import FileUpload from './FileUpload';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const defaultAction = () => { };
const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;
const handleDisabledDate = currentDate => currentDate && currentDate > moment().endOf('day');

/**
 * @param string formItemLayout         : 表单项整体样式定义
 * @param string getFieldDecorator      : 表单项装饰器
 * @param string require                : 表单项整体定义是否必填
 * filed 参数说明
 * @param string type         : 表单项类型
 * @param string key          : 表单项主键
 * @param string name         : 表单项名称
 * @param string style        : 表单项样式
 * @param string required     : 表单项是否必填
 * @param string allowClear   : 表单项是否允许清除
 * @param string placeholder  : 表单项说明文字
 * @param string defaultValue : 表单项默认值
 * @param string disable      : 表单项是否禁用
 * @param string rules        : 表单项校验规则
 * @param string maxLength    : 表单项最大长度
 * @param string isEnable     : 表单项是否启用，true时渲染，false时不渲染
 * @param string specialKey   : 表单项FORMITEM专用key值，用于react diff时用
 * @param string format         : 表单项类型
*/
export default function ({ formItemLayout = layout, getFieldDecorator, require }) {
  return function FormRender(props) {
    const { field, data = {} } = props;
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
      isEnable = true,
      specialKey,
      onChange = defaultAction,
      format,
      seldomProps = {},
    } = field;
    let content = null;
    switch (type) {
      // eslint-disable-next-line
      case 'input':
      // eslint-disable-next-line
        const patternRules = [{ required, message: placeholder || `请输入${name}` },
          { pattern: /^\S.*\S$|^\S$/, message: '首尾不能含有空字符' }].concat(rules);
        content = isUndefind(props.isEnable, isEnable) && (
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
        content = isUndefind(props.isEnable, isEnable) && (
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
        content = isUndefind(props.isEnable, isEnable) && (
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
      case 'origin':
      // eslint-disable-next-line
        const { service, searchKey, onSelect, valueFormat, maxSize } = field;
        content = isUndefind(props.isEnable, isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
            })(
              <OriginSearch
                disabled={disable && disable(data)}
                style={{ width: '100%', height: 32 }}
                searchKey={searchKey}
                onSelect={props.onSelect || onSelect}
                format={format}
                placeholder={placeholder}
                allowClear={allowClear}
                maxSize={maxSize}
                valueFormat={valueFormat}
                fetchData={service}
                {...seldomProps}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'select':
      // eslint-disable-next-line
        const { related, relatedKey, enums = [] } = field;
        content = (!related || typeof data[relatedKey] !== 'undefined') && (
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
                {...seldomProps}
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
      // eslint-disable-next-line
        const { enums: options = [], onChange: change = () => { } } = field;
        content = isUndefind(props.isEnable, isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
            })(
              <RadioGroup
                options={props.enums || options}
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
        const { enums: groups = [] } = field;
        content = isUndefind(props.isEnable, isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
            })(
              <CheckboxGroup
                options={props.enums || groups}
                disabled={disable && disable(data)}
                onChange={props.onChange || onChange}
                {...seldomProps}
              />
            )}
          </FormItem>
        );
        break;
      case 'datePicker':
        content = isUndefind(props.isEnable, isEnable) && (
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
        content = isUndefind(props.isEnable, isEnable) && (
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
                disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
                {...seldomProps}
              />
            )}
          </FormItem>
        );
        break;
      case 'image':
      case 'imageUpload':
        content = isUndefind(props.isEnable, isEnable) && (
          <FormItem className="image-upload" key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required: props.required || required, message: placeholder || `请上传${name}` }]
            })(
              <FileUpload
                info={field.info}
                url={props.url}
                name={name}
                simple={field.psimple}
                key={key}
                listType={field.listType}
                reg={field.reg}
                fileSize={field.fileSize}
                tips={field.tips}
                upload={field.upload}
                maxSize={field.maxSize}
                {...seldomProps}
              />
            )}
          </FormItem>
        );
        break;
      default:
        console.error('type is not supported');
        break;
    }
    return content;
  };
}
