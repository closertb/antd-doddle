"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utils = require("../utils");

var _default2 = require("../FormGroup/default");

var _FormRender = _interopRequireDefault(require("../FormGroup/FormRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 用于接受一个从接口获取到的枚举数组
function _default(constProps) {
  var _constProps$formItemL = constProps.formItemLayout,
      formItemLayout = _constProps$formItemL === void 0 ? _utils.formItemLayout : _constProps$formItemL,
      containerName = constProps.containerName,
      getFieldDecorator = constProps.getFieldDecorator,
      require = constProps.require,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? _default2.WrapperDefault : _constProps$Wrapper,
      _constProps$withWrap = constProps.withWrap,
      withWrap = _constProps$withWrap === void 0 ? false : _constProps$withWrap,
      dynamicParams = constProps.dynamicParams;
  var extendProps = {
    extend: _default2.extendSymbol,
    formItemLayout: formItemLayout,
    containerName: containerName,
    getFieldDecorator: getFieldDecorator,
    dynamicParams: dynamicParams,
    require: require,
    Wrapper: Wrapper,
    withWrap: withWrap
  };
  return _FormRender["default"].bind(null, extendProps);
}