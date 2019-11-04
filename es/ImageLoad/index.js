function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Loading from './Loading';
import './index.less';
export default function ImageLoad(props) {
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
      children = props.children,
      _props$transtionClass = props.transtionClassName,
      transtionClassName = _props$transtionClass === void 0 ? 'loadImg' : _props$transtionClass;
  var imgSrc = imgProps.src;
  var loadRef = useRef(false);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isReady = _useState2[0],
      setReady = _useState2[1];

  useEffect(function () {
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
  useEffect(function () {
    if (!waiting && loadRef.current) {
      setReady(true);
    }
  }, [waiting, loadRef]);
  return React.createElement("div", {
    className: "loadingWrap ".concat(wrapClassName)
  }, React.createElement("div", {
    className: "loading-animate ".concat(isReady ? 'exit-active' : 'enter-active')
  }, !waiting && React.createElement(Loading, null)), React.createElement(CSSTransition, {
    "in": isReady,
    timeout: transtionTime,
    classNames: transtionClassName,
    unmountOnExit: true
  }, children || React.createElement("img", Object.assign({}, imgProps))));
}