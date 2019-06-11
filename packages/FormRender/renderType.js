import React from 'react';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';

export const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

const OriginInput = ({ field, props, data }) => {
  const { service, searchKey, placeholder, onSelect, allowClear, valueFormat, format,
    maxSize, seldomProps, disable } = field;
  return (<OriginSearch
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
  />);
};

const UploadFile = ({ field, props }) => {
  const { key, name, seldomProps = {} } = field;
  return (<FileUpload
    info={field.info}
    url={props.url}
    name={name}
    simple={field.psimple}
    key={key}
    listType={field.listType}
    reg={field.reg}
    fileSize={field.fileSize}
    tips={field.tips}
    upload={props.upload || field.upload}
    maxSize={field.maxSize}
    {...seldomProps}
  />);
};

const WithUnit = ({ field }) => {
  const { inputProps, selectProps, defaultUnit, enums, seldomProps } = field;
  return (<InputWithUnit
    enums={enums}
    selectProps={selectProps}
    inputProps={inputProps}
    defaultUnit={defaultUnit}
    {...seldomProps}
  />);
};

const selfDefine = ({ field, props, data }) => field.child({ field, props, data });
const renderType = {
  origin: OriginInput,
  image: UploadFile,
  imageUpload: UploadFile,
  selfDefine,
  withUnit: WithUnit
};

export const extendRenderTypes = (types = {}) => Object.assign(renderType, types);

export default renderType;
