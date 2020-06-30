"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createRequest", {
  enumerable: true,
  get: function get() {
    return _useRequest["default"];
  }
});
Object.defineProperty(exports, "useRequest", {
  enumerable: true,
  get: function get() {
    return _useRequest.useRequest;
  }
});
Object.defineProperty(exports, "useLazyRequest", {
  enumerable: true,
  get: function get() {
    return _useRequest.useLazyRequest;
  }
});
Object.defineProperty(exports, "usePrevious", {
  enumerable: true,
  get: function get() {
    return _usePrevious["default"];
  }
});
Object.defineProperty(exports, "useDeepMemo", {
  enumerable: true,
  get: function get() {
    return _useDeepMemo["default"];
  }
});
Object.defineProperty(exports, "usePagination", {
  enumerable: true,
  get: function get() {
    return _usePagination["default"];
  }
});
Object.defineProperty(exports, "setPagination", {
  enumerable: true,
  get: function get() {
    return _usePagination.setPagination;
  }
});

var _useRequest = _interopRequireWildcard(require("./useRequest"));

var _usePrevious = _interopRequireDefault(require("./usePrevious"));

var _useDeepMemo = _interopRequireDefault(require("./useDeepMemo"));

var _usePagination = _interopRequireWildcard(require("./usePagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }