function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import { connect } from 'dva';
import memoized from 'memoize-one';
import invariant from 'invariant';
var app;
/**
 * @description 显示警告信息
 * @param {boolean} condition 提示条件
 * @param {string} message 提示信息
 */

export function warning(condition, message) {
  if (!condition) {
    invariant(condition, "[Furion]: ".concat(message));
  }
}
/**
 * @description 检查是否为字符串
 * @param {*} string
 */

export function isString(string) {
  return Object.prototype.toString.call(string) === '[object String]';
}
/**
 * @description 检查命名空间是否为空
 * @param {*} namespace
 */

function checkNamespace(namespace) {
  warning(namespace, 'namespace must be required');
  if (isString(namespace)) return [namespace];
  if (Array.isArray(namespace) && namespace.length) return namespace;
  warning(false, 'namespace must be string or not empty array');
  return [];
}
/**
 * @description 转化_model effect为对象
 * @param {*} _models
 */


function getAppModelEffects(_models) {
  // 遍历_models,根据ns找出相应的effects
  return _models.reduce(function (next, key) {
    var namespace = key.namespace,
        effects = key.effects;
    next[namespace] = effects;
    return next;
  }, {});
}
/**
 * @description 检查action类型
 * @param {*} actionType
 */


function checkActionType(actionType) {
  warning(actionType && actionType.indexOf('/') > -1, "actionType: ".concat(actionType, " is incorrectly formatted"));
}
/**
 * @description 获取注入的state
 * @param {*} state
 * @param {*} ns
 */


function getConnectState(state, ns) {
  if (ns.length === 1) {
    var currentState = state[ns[0]];
    return Object.assign({}, currentState);
  }

  return ns.reduce(function (next, key) {
    var currentState = state[key];
    warning(currentState, "namespace: ".concat(key, " not find in state"));
    next[key] = currentState;
    return next;
  }, {});
}

var addPrefix = function addPrefix(curEffect, dispatch) {
  return Object.keys(curEffect).reduce(function (next, key) {
    if (!key) return next; // 检查actionType

    checkActionType(key);
    var actionName = key.split('/')[1];

    next["_".concat(actionName)] = function (payload) {
      return dispatch({
        type: key,
        payload: payload
      });
    };

    return next;
  }, {});
};
/**
 * @description 依据effects生成指定的actions，前面加 ’_‘
 * @param {*} effects
 * @param {*} dispatch
 */


var getEffectsForActions = function getEffectsForActions(effects, dispatch) {
  var effectsKeys = Object.keys(effects);
  return effectsKeys.reduce(function (next, key) {
    if (effectsKeys.length === 1) {
      return addPrefix(effects[key], dispatch);
    }

    next[key] = addPrefix(effects[key], dispatch);
    return next;
  }, {});
};

var memoizedGetEffectsForActions = memoized(getEffectsForActions);
var memoizedGetConnectState = memoized(getConnectState);
var memoizedGetAppModelEffects = memoized(getAppModelEffects);
export function setApp(_app) {
  app = Object.assign({}, _app);
}
export default function model(namespace) {
  var ns = checkNamespace(namespace);
  warning(app, 'app must be installed (use setApp) before starting app');

  var _models = app._models || [];

  var allEffects = memoizedGetAppModelEffects(_models);
  var effects = ns.reduce(function (next, key) {
    next[key] = allEffects[key];
    return next;
  }, {});
  return function connected(WrapperComponent) {
    var HOC =
    /*#__PURE__*/
    function (_WrapperComponent) {
      _inherits(HOC, _WrapperComponent);

      function HOC() {
        _classCallCheck(this, HOC);

        return _possibleConstructorReturn(this, _getPrototypeOf(HOC).apply(this, arguments));
      }

      _createClass(HOC, [{
        key: "_constructor",
        value: function _constructor(props) {
          if (_get(_getPrototypeOf(HOC.prototype), "_constructor", this)) {
            _get(_getPrototypeOf(HOC.prototype), "_constructor", this).call(this, props);
          }
        }
      }]);

      return HOC;
    }(WrapperComponent);

    return connect(function (state) {
      return memoizedGetConnectState(state, ns);
    }, function (dispatch) {
      return memoizedGetEffectsForActions(effects, dispatch);
    })(HOC);
  };
}