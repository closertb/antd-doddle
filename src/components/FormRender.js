import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import { formItemLayout as layout, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
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
    } = field;
    let content = null;
    switch (type) {
      // eslint-disable-next-line
      case 'input':
      // eslint-disable-next-line
        const patternRules = [{ required, message: placeholder || `请输入${name}` },
          { pattern: /^\S.*\S$|^\S$/, message: '首尾不能含有空字符' }].concat(rules);
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: patternRules
            })(
              <Input
                type="text"
                maxLength={maxLength}
                onChange={props.onChange || onChange}
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
        // eslint-disable-next-line
        const { max, min, precision = 0, step = 1 } = field;
        content = (props.isEnable || isEnable) && (
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
                style={{ width: '100%' }}
                placeholder={placeholder || `请输入${name}`}
                onChange={props.onChange || onChange}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'text':
      // eslint-disable-next-line
        const { minRows = 2, maxRows = 6 } = field;
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
            })(
              <TextArea
                type="text"
                maxLength={maxLength || 300}
                placeholder={placeholder || `请输入${name}`}
                autosize={{ minRows, maxRows }}
                onChange={props.onChange || onChange}
                disabled={disable && disable(data)}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'origin':
      // eslint-disable-next-line
        const { service, searchKey, onSelect } = field;
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout} className="self-define-item">
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
            })(
              <OriginSearch
                disabled={disable && disable(data)}
                style={{ width: '100%', height: 32 }}
                searchKey={searchKey}
                onSelect={props.onChange || onSelect}
                format={format}
                fetchData={service}
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
                style={{ width: '100%' }}
                placeholder={placeholder || '不限'}
                allowClear={allowClear}
                disabled={disable && disable(data)}
                onChange={props.onChange || onChange}
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
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
            })(
              <RadioGroup
                options={props.enums || options}
                disabled={disable && disable(data)}
                onSelect={props.onChange || onChange}
              />
            )}
          </FormItem>
        );
        break;
      // eslint-disable-next-line
      case 'check':
      // eslint-disable-next-line
        const { enums: groups = [] } = field;
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: isUndefind(data[key], defaultValue),
              rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
            })(
              <CheckboxGroup
                options={props.enums || groups}
                disabled={disable && disable(data)}
                onChange={props.onChange || onChange}
              />
            )}
          </FormItem>
        );
        break;
      case 'datePicker':
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: data[key] && moment(data[key]),
              rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
            })(
              <DatePicker
                showTime={field.showTime || false}
                format={format || DATE_FORMAT}
                placeholder={placeholder || '请选择'}
                disabled={disable && disable(data)}
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
        content = (props.isEnable || isEnable) && (
          <FormItem key={specialKey || key} label={name} {...formItemLayout}>
            {getFieldDecorator(rangeKey, {
              initialValue: rangeDate,
              rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
            })(
              <RangePicker
                style={{ width: '100%' }}
                allowClear={allowClear}
                showTime={showTime}
                className="search-range-picker"
                format={format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)}
                disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
              />
            )}
          </FormItem>
        );
        break;
      case 'image':
      case 'imageUpload':
        content = (props.isEnable || isEnable) && (
          <FormItem className="image-upload" key={key} label={name} {...formItemLayout}>
            {getFieldDecorator(key, {
              initialValue: data[key],
              rules: [{ required: props.required || required, message: placeholder || `请上传${name}` }]
            })(
              <FileUpload
                info={field.info}
                simple={field.psimple}
                key={key}
                listType={field.listType}
                reg={field.reg}
                fileSize={field.fileSize}
                tips={field.tips}
                upload={field.upload}
                maxSize={field.maxSize}
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
