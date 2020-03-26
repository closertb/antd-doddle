"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = useRequest;
exports.useLazyRequest = useLazyRequest;
exports["default"] = void 0;

var _useBaseRequest = _interopRequireDefault(require("./useBaseRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */
var isStr = function isStr(str) {
  return typeof str === 'string';
};

var composeHeader = function composeHeader(url, http) {
  return isStr(url) ? Object.assign({
    http: http,
    method: 'post'
  }, {
    url: url
  }) : Object.assign({
    http: http,
    method: 'post'
  }, url);
};

function useRequest(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _useBaseRequest["default"])(url, body, Object.assign(options, {
    lazy: false
  }));
}

function useLazyRequest(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // prompt 挂在时是否执行执行
  return (0, _useBaseRequest["default"])(url, body, Object.assign({
    prompt: false
  }, options, {
    lazy: true
  }));
}

var createRequest = function createRequest(http) {
  return {
    useRequest: function useRequest(url, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return (0, _useBaseRequest["default"])(composeHeader(url, http), body, Object.assign(options, {
        lazy: false
      }));
    },
    useLazyRequest: function useLazyRequest(url, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return (0, _useBaseRequest["default"])(composeHeader(url, http), body, Object.assign(options, {
        lazy: true
      }));
    }
  };
};

var _default = createRequest;
exports["default"] = _default;