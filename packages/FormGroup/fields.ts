/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import { Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const { Option } = Select;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const getContainer = className => () => className ? document.getElementsByClassName(className)[0] : document.body;
const generateOption = (enums = []) => {
  if (typeof enums !== 'object') {
    console.error('enums is not an object or array');
    return [];
  }
  return Array.isArray(enums) ? enums : Object.keys(enums).map(value => ({
    value,
    label: enums[value]
  }));
};
const handleDisabledDate = currentDate => currentDate && currentDate > moment().endOf('day');

const HInput = ({ field, name }) => {
  const { placeholder, ...others } = field;
  return (
    <Input
      placeholder={placeholder || `请输入${name}`}
      {...others}
    />);
};

const HText = ({ field }) => {
  const { name, placeholder, ...others } = field;
  return (
    <TextArea
      placeholder={placeholder || `请输入${name}`}
      {...others}
    />);
};

const HInputNumber = ({ field }) => {
  const { name, placeholder, ...others } = field;
  return (
    <InputNumber
      type="text"
      placeholder={placeholder || `请输入${name}`}
      {...others}
    />);
};

const HSelect = ({ field, selectEnums, containerName }) => {
  const { placeholder, ...others } = field;
  return (
    <Select
      placeholder={placeholder || '不限'}
      getPopupContainer={getContainer(containerName)}
      {...others}
    >
      {generateOption(selectEnums).map(({ value, label }) => (
        <Option key={value} value={value}>{label}</Option>
      ))}
    </Select>);
};

const HRadio = ({ field, selectEnums }) => {
  const { name, placeholder, ...others } = field;
  return (
    <RadioGroup
      options={generateOption(selectEnums)}
      {...others}
    />);
};

const HCheck = ({ field, selectEnums }) => {
  const { placeholder, ...others } = field;
  return (
    <CheckboxGroup
      options={generateOption(selectEnums)}
      {...others}
    />);
};

const HDatePicker = ({ field, containerName }) => {
  const { placeholder, format, ...others } = field;
  return (
    <DatePicker
      format={format || DATE_FORMAT}
      placeholder={placeholder || '请选择'}
      getCalendarContainer={getContainer(containerName)}
      {...others}
    />);
};

const HRangePicker = ({ field, containerName }) => {
  const { startKey, endKey, disabledDate, showTime = false, placeholder, format, ...others } = field;
  // eslint-disable-next-line
  const beginDate = data[startKey];
  // eslint-disable-next-line
  const endDate = data[endKey];
  // eslint-disable-next-line
  const rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];
  return (
    <RangePicker
      placeholder={placeholder || '请选择'}
      showTime={showTime}
      getCalendarContainer={getContainer(containerName)}
      disabledDate={disabledDate ? currentDate => handleDisabledDate(currentDate) : undefined}
      format={format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)}
      {...others}
    />);
};

const HInputWithUnit = ({ field }) => {
  const { inputProps, selectProps, defaultUnit, enums, ...others } = field;
  return (<InputWithUnit
    enums={enums}
    selectProps={selectProps}
    inputProps={inputProps}
    defaultUnit={defaultUnit}
    {...others}
  />);
};

const selfDefine = ({ field, props, data }) => field.child({ field, props, data });


const renderType = {
  // origin: OriginInput,
  // image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine,
  inputWithUnit: HInputWithUnit,
  text: HText,
  input: HInput,
  inputNumber: HInputNumber,
  select: HSelect,
  radio: HRadio,
  check: HCheck,
  datePicker: HDatePicker,
  rangePicker: HRangePicker
};

export const extendRenderTypes = (types = {}) => Object.assign(renderType, types);

export default renderType;
