"use strict";

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }