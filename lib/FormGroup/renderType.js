"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.extendRenderTypes = void 0;

var _fields = require("./fields");

var renderTypes = {
  origin: _fields.OriginInput,
  image: _fields.UploadFile,
  // imageUpload: UploadFile,
  selfDefine: _fields.selfDefine,
  withUnit: _fields.HInputWithUnit,
  text: _fields.HText,
  input: _fields.HInput,
  inputNumber: _fields.HInputNumber,
  select: _fields.HSelect,
  radio: _fields.HRadio,
  check: _fields.HCheck,
  datePicker: _fields.HDatePicker,
  rangePicker: _fields.HRangePicker
};

var extendRenderTypes = function extendRenderTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign(renderTypes, types);
};

exports.extendRenderTypes = extendRenderTypes;
var _default = renderTypes;
exports["default"] = _default;