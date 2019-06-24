"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = withForm;

var _antd = require("antd");

function withForm(target) {
  return _antd.Form.create()(target);
}