import React from 'react';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';
export var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
};

var OriginInput = function OriginInput(_ref) {
  var field = _ref.field,
      props = _ref.props,
      data = _ref.data;
  var service = field.service,
      searchKey = field.searchKey,
      placeholder = field.placeholder,
      onSelect = field.onSelect,
      allowClear = field.allowClear,
      valueFormat = field.valueFormat,
      format = field.format,
      maxSize = field.maxSize,
      seldomProps = field.seldomProps,
      disable = field.disable;
  return React.createElement(OriginSearch, Object.assign({
    disabled: disable && disable(data),
    style: {
      width: '100%',
      height: 32
    },
    searchKey: searchKey,
    onSelect: props.onSelect || onSelect,
    format: format,
    placeholder: placeholder,
    allowClear: allowClear,
    maxSize: maxSize,
    valueFormat: valueFormat,
    fetchData: service
  }, seldomProps));
};

var UploadFile = function UploadFile(_ref2) {
  var field = _ref2.field,
      props = _ref2.props;
  var key = field.key,
      name = field.name,
      _field$seldomProps = field.seldomProps,
      seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps;
  return React.createElement(FileUpload, Object.assign({
    info: field.info,
    url: props.url,
    name: name,
    simple: field.psimple,
    key: key,
    listType: field.listType,
    reg: field.reg,
    fileSize: field.fileSize,
    tips: field.tips,
    upload: props.upload || field.upload,
    maxSize: field.maxSize
  }, seldomProps));
};

var WithUnit = function WithUnit(_ref3) {
  var field = _ref3.field;
  var inputProps = field.inputProps,
      selectProps = field.selectProps,
      defaultUnit = field.defaultUnit,
      enums = field.enums,
      seldomProps = field.seldomProps;
  return React.createElement(InputWithUnit, Object.assign({
    enums: enums,
    selectProps: selectProps,
    inputProps: inputProps,
    defaultUnit: defaultUnit
  }, seldomProps));
};

var selfDefine = function selfDefine(_ref4) {
  var field = _ref4.field,
      props = _ref4.props,
      data = _ref4.data;
  return field.child({
    field: field,
    props: props,
    data: data
  });
};

var renderType = {
  origin: OriginInput,
  image: UploadFile,
  imageUpload: UploadFile,
  selfDefine: selfDefine,
  withUnit: WithUnit
};
export var extendRenderTypes = function extendRenderTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(renderType, types);
};
export default renderType;