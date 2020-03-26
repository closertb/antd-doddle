"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePrevious;

var _react = require("react");

/**
 * name: usePrevious
 * func: 缓存初始值
 * @params initData 初始值
 * @params deps     更新缓存，数组；
 * @return ref      返回缓存所在的锚点；即访问值时需要使用ref.current
*/
function usePrevious(initData) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ref = (0, _react.useRef)(); // 支持deps变化时，强制更新初始值

  (0, _react.useEffect)(function () {
    ref.current = Object.assign({}, initData); // 保存初始值；
  }, deps);
  return ref;
}