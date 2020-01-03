"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.combineTypes = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isValid = function isValid(date) {
  return Boolean(date) && (typeof date === 'number' || typeof date === 'string');
};

var getParsedDate = function getParsedDate(date, format) {
  return isValid(date) ? (0, _moment["default"])(date).format(format) : '';
};
/*
 * column类型定义
 */


var fieldTypes = {
  normal: function normal(value) {
    return value;
  },
  date: function date(value) {
    return getParsedDate(value, _utils.DATE_FORMAT);
  },
  datetime: function datetime(value) {
    return getParsedDate(value, _utils.DATE_TIME_FORMAT);
  },
  decimal: function decimal(value) {
    return (0, _utils.toDecimalNumber)(value, 2);
  },
  "enum": function _enum(value, _ref) {
    var enums = _ref.enums;
    return (0, _utils.getValueFromEnums)(enums, value);
  }
};
/*
 * 扩展column类型定义
 */

var combineTypes = function combineTypes(types) {
  return Object.assign(fieldTypes, types);
};

exports.combineTypes = combineTypes;
var _default = fieldTypes;
exports["default"] = _default;