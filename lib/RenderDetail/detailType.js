"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.extendDetailTypes = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var detailType = {
  date: function date(value) {
    return (0, _moment["default"])(value).format(_utils.DATE_FORMAT);
  },
  datetime: function datetime(value) {
    return (0, _moment["default"])(value).format(_utils.DATE_TIME_FORMAT);
  },
  decimal: function decimal(value) {
    return (0, _utils.toDecimalNumber)(value);
  }
};

var extendDetailTypes = function extendDetailTypes(types) {
  return Object.assign(detailType, types);
};

exports.extendDetailTypes = extendDetailTypes;
var _default = detailType;
exports["default"] = _default;