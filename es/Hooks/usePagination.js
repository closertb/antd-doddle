function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useCallback } from 'react';
import usePrevious from './usePrevious';
var selfSymbol = Symbol('pagination');
var INIT_DATA = {
  pn: 1,
  ps: 10
};

var data = _defineProperty({}, selfSymbol, INIT_DATA);
/**
 * name: setPagination
 * func: 设定分页数据格式，默认{ pageNum: 1, pageSize: 10 }
 * @params baseData 分页数据
*/


export function setPagination() {
  var baseData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_DATA;
  data[selfSymbol] = baseData;
}
export default function usePagination() {
  var initData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = useState(Object.assign({}, data[selfSymbol], initData)),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var initRef = usePrevious(search, deps);
  var onSearch = useCallback(function (data) {
    // 这里的Set值，由于做了相等性判断，所以为对象时，需要重新生成一个新的索引
    // 另外用到了setState的回调时用法，而不用search作为依赖，可以保证onSearch指向频繁变化
    // setSearch(Object.assign({}, search, data)); /* deps: [search] */
    setSearch(function (search) {
      return Object.assign({}, search, data);
    });
  }, []);
  var onReset = useCallback(function () {
    return setSearch(initRef.current);
  }, []);
  return [search, onSearch, onReset];
}