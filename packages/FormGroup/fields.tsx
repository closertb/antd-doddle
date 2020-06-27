/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';
import { CommonProps } from './interface';

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

function HInput<T extends CommonProps> ({ field }: T) {
  return <Input {...field} />
};

const HText = ({ field }) => {
  return (
    <TextArea
      {...field}
    />);
};

const HInputNumber = ({ field }) => {
  return (
    <InputNumber
      {...field}
    />);
};

const HSelect = ({ field, enums, containerName }) => {
  return (
    <Select
      getPopupContainer={getContainer(containerName)}
      {...field}
    >
      {generateOption(enums).map(({ value, label }) => (
        <Option key={value} value={value}>{label}</Option>
      ))}
    </Select>);
};

const HRadio = ({ field, enums }) => {
  return (
    <RadioGroup
      options={generateOption(enums)}
      {...field}
    />);
};

const HCheck = ({ field, enums }) => {
  return (
    <CheckboxGroup
      options={generateOption(enums)}
      {...field}
    />);
};

const HDatePicker = ({ field, containerName }) => {
  const { format, ...others } = field;
  return (
    <DatePicker
      format={format || DATE_FORMAT}
      getCalendarContainer={getContainer(containerName)}
      {...others}
    />);
};

const HRangePicker = ({ field, containerName }) => {
  const { startKey, endKey, placeholder, showTime = false, format, ...others } = field;

  return (
    <RangePicker
      showTime={showTime}
      getCalendarContainer={getContainer(containerName)}
      placeholder={['开始日期', '结束日期']}
      format={format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)}
      {...others}
    />);
};

const HInputWithUnit = ({ field, enums }) => {
  return (<InputWithUnit
    enums={enums}
    {...field}
  />);
};

const selfDefine = ({ field, data }) => field.child({ field, data });

const OriginInput = ({ field }) => {
  return (<OriginSearch
    {...field}
    style={{ width: '100%', height: 32 }}
  />);
};

const UploadFile = ({ field, props = {} }) => {
  return (<FileUpload
    {...field}
  />);
};

export {
  OriginInput,
  UploadFile,
  selfDefine,
  HInputWithUnit,
  HText,
  HInput,
  HInputNumber,
  HSelect,
  HRadio,
  HCheck,
  HDatePicker,
  HRangePicker
};
