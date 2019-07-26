import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox, Col } from 'antd';
import { formItemLayout as layout, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
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
// 用于接受一个从接口获取到的枚举数组
const getParamFromProps = (key, props) => props[key] || [];
const WrapperDefault = props => React.createElement(Col, { span: props.span || 12 }, props.children);
export default function ({ formItemLayout = layout, containerName, getFieldDecorator, require, Wrapper = WrapperDefault, withWrap: defaultWrap = false }) {
    return function FormRender(props) {
        const { field, data = {}, wrapProps = {} } = props;
        const { type = 'input', key, name, style = { width: '100%' }, required = require || false, allowClear = true, placeholder, defaultValue, disable = false, rules = [], maxLength, isEnable = true, specialKey, onChange = defaultAction, format, withWrap, enums = [], seldomProps = {}, isDynamic = false, } = field;
        const enumKey = field.enumKey || key;
        let content = null;
        // 如果这个节点不需要渲染，那么就直接返回null
        if (!isUndefind(props.isEnable, isEnable)) {
            return content;
        }
        switch (type) {
            // eslint-disable-next-line
            case 'input':
                // eslint-disable-next-line
                const patternRules = [{ required, message: placeholder || `请输入${name}` },
                    { pattern: /^\S.*\S$|^\S$/, message: '首尾不能含有空字符' }].concat(rules);
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout, { className: "self-define-item" }), getFieldDecorator(key, {
                    initialValue: data[key],
                    rules: patternRules
                })(React.createElement(Input, Object.assign({ type: "text", style: style, maxLength: maxLength, onChange: props.onChange || onChange, placeholder: placeholder || `请输入${name}`, disabled: disable && disable(data) }, seldomProps)))));
                break;
            // eslint-disable-next-line
            case 'inputNumber':
                // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
                // eslint-disable-next-line
                const { max, min, precision = 0, step = 1 } = field;
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout, { className: "self-define-item" }), getFieldDecorator(key, {
                    initialValue: data[key],
                    rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
                })(React.createElement(InputNumber, Object.assign({ max: max, min: min, step: step, precision: precision, style: style, placeholder: placeholder || `请输入${name}`, onChange: props.onChange || onChange, disabled: disable && disable(data) }, seldomProps)))));
                break;
            // eslint-disable-next-line
            case 'text':
                // eslint-disable-next-line
                const { minRows = 2, maxRows = 6 } = field;
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout, { className: "self-define-item" }), getFieldDecorator(key, {
                    initialValue: data[key],
                    rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
                })(React.createElement(TextArea, Object.assign({ type: "text", style: style, maxLength: maxLength || 300, placeholder: placeholder || `请输入${name}`, autosize: { minRows, maxRows }, onChange: props.onChange || onChange, disabled: disable && disable(data) }, seldomProps)))));
                break;
            // eslint-disable-next-line
            case 'select':
                // eslint-disable-next-line
                const selectEnums = isDynamic ? getParamFromProps(enumKey, props) : (props.enums || enums);
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(key, {
                    initialValue: isUndefind(data[key], defaultValue),
                    rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
                })(React.createElement(Select, Object.assign({ style: style, placeholder: placeholder || '不限', allowClear: allowClear, disabled: disable && disable(data), onChange: props.onChange || onChange, getPopupContainer: getContainer(containerName) }, seldomProps), selectEnums.map(({ value, label }) => (React.createElement(Option, { key: value, value: value }, label)))))));
                break;
            // eslint-disable-next-line
            case 'radio':
                // eslint-disable-next-line
                const radioEnums = isDynamic ? getParamFromProps(enumKey, props) : (props.enums || enums);
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(key, {
                    initialValue: isUndefind(data[key], defaultValue),
                    rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
                })(React.createElement(RadioGroup, Object.assign({ options: radioEnums, disabled: disable && disable(data), onChange: props.onChange || onChange }, seldomProps)))));
                break;
            // eslint-disable-next-line
            case 'check':
                // eslint-disable-next-line
                const checkEnums = isDynamic ? getParamFromProps(enumKey, props) : (props.enums || enums);
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(key, {
                    initialValue: isUndefind(data[key], defaultValue),
                    rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
                })(React.createElement(CheckboxGroup, Object.assign({ options: checkEnums, disabled: disable && disable(data), onChange: props.onChange || onChange }, seldomProps)))));
                break;
            case 'datePicker':
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(key, {
                    initialValue: data[key] && moment(data[key]),
                    rules: [{ required, message: placeholder || `请选择${name}` }].concat(rules)
                })(React.createElement(DatePicker, Object.assign({ style: style, showTime: field.showTime || false, format: format || DATE_FORMAT, onChange: props.onChange || onChange, placeholder: placeholder || '请选择', disabled: disable && disable(data), getCalendarContainer: getContainer(containerName) }, seldomProps)))));
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
                content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(rangeKey, {
                    initialValue: rangeDate,
                    rules: [{ required, message: placeholder || `请输入${name}` }].concat(rules)
                })(React.createElement(RangePicker, Object.assign({ style: style, allowClear: allowClear, showTime: showTime, className: "search-range-picker", onChange: props.onChange || onChange, format: format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT), getCalendarContainer: getContainer(containerName), disabledDate: disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined }, seldomProps)))));
                break;
            default:
                if (renderType[type]) {
                    const render = renderType[type];
                    content = (React.createElement(FormItem, Object.assign({ key: specialKey || key, label: name }, formItemLayout), getFieldDecorator(key, {
                        initialValue: data[key],
                        rules: [{ required: props.required || required, message: placeholder }].concat(rules)
                    })(render({ field, props, data }))));
                }
                else {
                    console.error('type is not supported');
                }
                break;
        }
        return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ?
            React.createElement(Wrapper, Object.assign({}, wrapProps), content) : content;
    };
}
