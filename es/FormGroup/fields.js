function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/destructuring-assignment */


import React from 'react';
import moment from 'moment';
import { Input, InputNumber, Select, DatePicker, Radio, Checkbox } from 'antd';
import OriginSearch from '../OriginSearch';
import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';
export var DATE_FORMAT = 'YYYY-MM-DD';
export var DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
var Option = Select.Option;
var RadioGroup = Radio.Group;
var RangePicker = DatePicker.RangePicker;
var TextArea = Input.TextArea;
var CheckboxGroup = Checkbox.Group;

var getContainer = function getContainer(className) {
  return function () {
    return className ? document.getElementsByClassName(className)[0] : document.body;
  };
};

var generateOption = function generateOption() {
  var enums = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (_typeof(enums) !== 'object') {
    console.error('enums is not an object or array');
    return [];
  }

  return Array.isArray(enums) ? enums : Object.keys(enums).map(function (value) {
    return {
      value: value,
      label: enums[value]
    };
  });
};

var handleDisabledDate = function handleDisabledDate(currentDate) {
  return currentDate && currentDate > moment().endOf('day');
};

function HInput(_ref) {
  var field = _ref.field;
  return React.createElement(Input, Object.assign({}, field));
}

;

var HText = function HText(_ref2) {
  var field = _ref2.field;
  return React.createElement(TextArea, Object.assign({}, field));
};

var HInputNumber = function HInputNumber(_ref3) {
  var field = _ref3.field;
  return React.createElement(InputNumber, Object.assign({}, field));
};

var HSelect = function HSelect(_ref4) {
  var field = _ref4.field,
      enums = _ref4.enums,
      containerName = _ref4.containerName;
  return React.createElement(Select, Object.assign({
    getPopupContainer: getContainer(containerName)
  }, field), generateOption(enums).map(function (_ref5) {
    var value = _ref5.value,
        label = _ref5.label;
    return React.createElement(Option, {
      key: value,
      value: value
    }, label);
  }));
};

var HRadio = function HRadio(_ref6) {
  var field = _ref6.field,
      enums = _ref6.enums;
  return React.createElement(RadioGroup, Object.assign({
    options: generateOption(enums)
  }, field));
};

var HCheck = function HCheck(_ref7) {
  var field = _ref7.field,
      enums = _ref7.enums;
  return React.createElement(CheckboxGroup, Object.assign({
    options: generateOption(enums)
  }, field));
};

var HDatePicker = function HDatePicker(_ref8) {
  var field = _ref8.field,
      containerName = _ref8.containerName;

  var format = field.format,
      others = __rest(field, ["format"]);

  return React.createElement(DatePicker, Object.assign({
    format: format || DATE_FORMAT,
    getCalendarContainer: getContainer(containerName)
  }, others));
};

var HRangePicker = function HRangePicker(_ref9) {
  var field = _ref9.field,
      containerName = _ref9.containerName;

  var disabledDate = field.disabledDate,
      _field$showTime = field.showTime,
      showTime = _field$showTime === void 0 ? false : _field$showTime,
      format = field.format,
      others = __rest(field, ["disabledDate", "showTime", "format"]); // // eslint-disable-next-line
  // const beginDate = data[startKey];
  // // eslint-disable-next-line
  // const endDate = data[endKey];
  // // eslint-disable-next-line
  // const rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];


  return React.createElement(RangePicker, Object.assign({
    showTime: showTime,
    getCalendarContainer: getContainer(containerName),
    disabledDate: disabledDate ? function (currentDate) {
      return handleDisabledDate(currentDate);
    } : undefined,
    format: format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
  }, others));
};

var HInputWithUnit = function HInputWithUnit(_ref10) {
  var field = _ref10.field,
      enums = _ref10.enums;
  console.log('update unit');
  return React.createElement(InputWithUnit, Object.assign({
    enums: enums
  }, field));
};

var selfDefine = function selfDefine(_ref11) {
  var field = _ref11.field,
      data = _ref11.data;
  return field.child({
    field: field,
    data: data
  });
};

var OriginInput = function OriginInput(_ref12) {
  var field = _ref12.field;
  return React.createElement(OriginSearch, Object.assign({}, field, {
    style: {
      width: '100%',
      height: 32
    }
  }));
};

var UploadFile = function UploadFile(_ref13) {
  var field = _ref13.field,
      _ref13$props = _ref13.props,
      props = _ref13$props === void 0 ? {} : _ref13$props;
  return React.createElement(FileUpload, Object.assign({}, field));
};

var renderType = {
  origin: OriginInput,
  image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine: selfDefine,
  withUnit: HInputWithUnit,
  text: HText,
  input: HInput,
  inputNumber: HInputNumber,
  select: HSelect,
  radio: HRadio,
  check: HCheck,
  datePicker: HDatePicker,
  rangePicker: HRangePicker
};
export var extendRenderTypes = function extendRenderTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(renderType, types);
};
export default renderType;