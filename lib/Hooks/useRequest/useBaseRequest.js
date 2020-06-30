"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useBaseRequest;

var _react = require("react");

var _queryData = _interopRequireDefault(require("./queryData"));

var _useDeepMemo = _interopRequireDefault(require("../useDeepMemo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

/**
 * name: useBaseRequest
 * @params head       请求相关配置
 * @params body       object 请求体
 * @params options    hooks 配置
*/
function useBaseRequest(head) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    lazy: false
  };

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      tick = _useReducer2[0],
      forceUpdate = _useReducer2[1];
  /**
   * url:     请求地址
   * http:    待domain的请求示例
   * method： 请求方法：get, post, put, delete
   * configs  请求配置：比如 contentType什么的；
  */


  var url = head.url,
      http = head.http,
      method = head.method,
      configs = __rest(head, ["url", "http", "method"]); // 查询对象Ref


  var queryDataRef = (0, _react.useRef)(); // lazy：回调时请求
  // trigger: 强制触发重新请求

  var trigger = options.trigger,
      lazy = options.lazy; // 首次渲染，创建一个Ref用来保存创建的请求示例

  if (!queryDataRef.current) {
    // 新建查询对象；
    queryDataRef.current = new _queryData["default"]({
      url: url,
      body: body,
      options: options,
      request: http[method],
      configs: configs
    }, {
      forceUpdate: forceUpdate
    });
  }

  var queryData = queryDataRef.current;
  queryData.updateOptions(body, configs, options);
  var memo = {
    url: url,
    body: Object.assign({}, body),
    tick: tick,
    trigger: trigger
  }; // 根据memo的变化，判断是否接着发起请求

  var result = (0, _useDeepMemo["default"])(function () {
    return lazy ? queryData.executeLazy() : queryData.execute();
  }, memo);
  var queryResult = lazy ? result[1] : result; // queryResult 结果改变，那就触发afterExecute方法，无缓存时会执行两次
  // loading 由 false 变为 true时：请求开始
  // loading 由 true 变为 false时：请求结束

  (0, _react.useEffect)(function () {
    return queryData.afterExecute();
  }, [queryResult.loading, queryResult.error, queryResult.data]); // 首次挂载时触发，清除上一次建立的query对象，上一次存储的结果

  (0, _react.useEffect)(function () {
    return queryData.cleanup();
  }, []);
  return result;
}