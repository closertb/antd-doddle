"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImageLoad;

var _react = _interopRequireWildcard(require("react"));

var _reactTransitionGroup = require("react-transition-group");

var _Loading = _interopRequireDefault(require("./Loading"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ImageLoad(props) {
  var _props$imgProps = props.imgProps,
      imgProps = _props$imgProps === void 0 ? {
    src: '',
    width: '100%'
  } : _props$imgProps,
      _props$waiting = props.waiting,
      waiting = _props$waiting === void 0 ? false : _props$waiting,
      _props$wrapClassName = props.wrapClassName,
      wrapClassName = _props$wrapClassName === void 0 ? '' : _props$wrapClassName,
      callback = props.callback,
      _props$transtionTime = props.transtionTime,
      transtionTime = _props$transtionTime === void 0 ? 1000 : _props$transtionTime,
      _props$transtionClass = props.transtionClassName,
      transtionClassName = _props$transtionClass === void 0 ? 'loadImg' : _props$transtionClass;
  var imgSrc = imgProps.src;
  var loadRef = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isReady = _useState2[0],
      setReady = _useState2[1];

  (0, _react.useEffect)(function () {
    var img = new Image();

    img.onload = function () {
      loadRef.current = true;
      callback && callback();

      if (!waiting) {
        setReady(true);
      }
    };

    img.src = imgSrc; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc, waiting]);
  (0, _react.useEffect)(function () {
    if (!waiting && loadRef.current) {
      setReady(true);
    }
  }, [waiting, loadRef]);
  return _react["default"].createElement("div", {
    className: "loadingWrap ".concat(wrapClassName)
  }, !isReady && _react["default"].createElement("div", {
    className: "loading-animate"
  }, _react["default"].createElement(_Loading["default"], null)), _react["default"].createElement(_reactTransitionGroup.CSSTransition, {
    "in": isReady,
    timeout: transtionTime,
    classNames: transtionClassName,
    unmountOnExit: true
  }, _react["default"].createElement("img", Object.assign({}, imgProps))));
}