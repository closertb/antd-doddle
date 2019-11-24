"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendSymbol = exports.WrapperDefault = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WrapperDefault = function WrapperDefault(props) {
  return _react["default"].createElement(_antd.Col, {
    span: props.span || 12
  }, props.children);
};

exports.WrapperDefault = WrapperDefault;
var extendSymbol = Symbol('extend');
exports.extendSymbol = extendSymbol;