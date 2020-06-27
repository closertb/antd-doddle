"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HInput = HInput;
exports.HRangePicker = exports.HDatePicker = exports.HCheck = exports.HRadio = exports.HSelect = exports.HInputNumber = exports.HText = exports.HInputWithUnit = exports.selfDefine = exports.UploadFile = exports.OriginInput = exports.DATE_TIME_FORMAT = exports.DATE_FORMAT = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _OriginSearch = _interopRequireDefault(require("../OriginSearch"));

var _FileUpload = _interopRequireDefault(require("../FileUpload"));

var _InputWithUnit = _interopRequireDefault(require("../InputWithUnit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
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


var DATE_FORMAT = 'YYYY-MM-DD';
exports.DATE_FORMAT = DATE_FORMAT;
var DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
exports.DATE_TIME_FORMAT = DATE_TIME_FORMAT;
var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;
var RangePicker = _antd.DatePicker.RangePicker;
var TextArea = _antd.Input.TextArea;
var CheckboxGroup = _antd.Checkbox.Group;

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

function HInput(_ref) {
  var field = _ref.field;
  return _react["default"].createElement(_antd.Input, Object.assign({}, field));
}

;

var HText = function HText(_ref2) {
  var field = _ref2.field;
  return _react["default"].createElement(TextArea, Object.assign({}, field));
};

exports.HText = HText;

var HInputNumber = function HInputNumber(_ref3) {
  var field = _ref3.field;
  return _react["default"].createElement(_antd.InputNumber, Object.assign({}, field));
};

exports.HInputNumber = HInputNumber;

var HSelect = function HSelect(_ref4) {
  var field = _ref4.field,
      enums = _ref4.enums,
      containerName = _ref4.containerName;
  return _react["default"].createElement(_antd.Select, Object.assign({
    getPopupContainer: getContainer(containerName)
  }, field), generateOption(enums).map(function (_ref5) {
    var value = _ref5.value,
        label = _ref5.label;
    return _react["default"].createElement(Option, {
      key: value,
      value: value
    }, label);
  }));
};

exports.HSelect = HSelect;

var HRadio = function HRadio(_ref6) {
  var field = _ref6.field,
      enums = _ref6.enums;
  return _react["default"].createElement(RadioGroup, Object.assign({
    options: generateOption(enums)
  }, field));
};

exports.HRadio = HRadio;

var HCheck = function HCheck(_ref7) {
  var field = _ref7.field,
      enums = _ref7.enums;
  return _react["default"].createElement(CheckboxGroup, Object.assign({
    options: generateOption(enums)
  }, field));
};

exports.HCheck = HCheck;

var HDatePicker = function HDatePicker(_ref8) {
  var field = _ref8.field,
      containerName = _ref8.containerName;

  var format = field.format,
      others = __rest(field, ["format"]);

  return _react["default"].createElement(_antd.DatePicker, Object.assign({
    format: format || DATE_FORMAT,
    getCalendarContainer: getContainer(containerName)
  }, others));
};

exports.HDatePicker = HDatePicker;

var HRangePicker = function HRangePicker(_ref9) {
  var field = _ref9.field,
      containerName = _ref9.containerName;

  var startKey = field.startKey,
      endKey = field.endKey,
      placeholder = field.placeholder,
      _field$showTime = field.showTime,
      showTime = _field$showTime === void 0 ? false : _field$showTime,
      format = field.format,
      others = __rest(field, ["startKey", "endKey", "placeholder", "showTime", "format"]);

  return _react["default"].createElement(RangePicker, Object.assign({
    showTime: showTime,
    getCalendarContainer: getContainer(containerName),
    placeholder: ['开始日期', '结束日期'],
    format: format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
  }, others));
};

exports.HRangePicker = HRangePicker;

var HInputWithUnit = function HInputWithUnit(_ref10) {
  var field = _ref10.field,
      enums = _ref10.enums;
  return _react["default"].createElement(_InputWithUnit["default"], Object.assign({
    enums: enums
  }, field));
};

exports.HInputWithUnit = HInputWithUnit;

var selfDefine = function selfDefine(_ref11) {
  var field = _ref11.field,
      data = _ref11.data;
  return field.child({
    field: field,
    data: data
  });
};

exports.selfDefine = selfDefine;

var OriginInput = function OriginInput(_ref12) {
  var field = _ref12.field;
  return _react["default"].createElement(_OriginSearch["default"], Object.assign({}, field, {
    style: {
      width: '100%',
      height: 32
    }
  }));
};

exports.OriginInput = OriginInput;

var UploadFile = function UploadFile(_ref13) {
  var field = _ref13.field,
      _ref13$props = _ref13.props,
      props = _ref13$props === void 0 ? {} : _ref13$props;
  return _react["default"].createElement(_FileUpload["default"], Object.assign({}, field));
};

exports.UploadFile = UploadFile;