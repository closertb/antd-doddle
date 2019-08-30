import { connect } from 'dva';
import memoized from 'memoize-one';
import invariant from 'invariant';

let app;
/**
 * @description 显示警告信息
 * @param {boolean} condition 提示条件
 * @param {string} message 提示信息
 */
export function warning(condition, message) {
  if (!condition) {
    invariant(condition, `[Furion]: ${message}`);
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
  return _models.reduce((next, key) => {
    const { namespace, effects } = key;
    next[namespace] = effects;
    return next;
  }, {});
}

/**
 * @description 检查action类型
 * @param {*} actionType
 */
function checkActionType(actionType) {
  warning(
    actionType && actionType.indexOf('/') > -1,
    `actionType: ${actionType} is incorrectly formatted`
  );
}

/**
 * @description 获取注入的state
 * @param {*} state
 * @param {*} ns
 */
function getConnectState(state, ns) {
  if (ns.length === 1) {
    const currentState = state[ns[0]];
    return { ...currentState };
  }
  return ns.reduce((next, key) => {
    const currentState = state[key];
    warning(currentState, `namespace: ${key} not find in state`);
    next[key] = currentState;
    return next;
  }, {});
}

const addPrefix = (curEffect, dispatch) => Object.keys(curEffect).reduce((next, key) => {
  if (!key) return next;
  // 检查actionType
  checkActionType(key);
  const actionName = key.split('/')[1];
  next[`_${actionName}`] = payload => dispatch({ type: key, payload });
  return next;
}, {});

/**
 * @description 依据effects生成指定的actions，前面加 ’_‘
 * @param {*} effects
 * @param {*} dispatch
 */
const getEffectsForActions = (effects, dispatch) => {
  const effectsKeys = Object.keys(effects);
  return effectsKeys.reduce((next, key) => {
    if (effectsKeys.length === 1) {
      return addPrefix(effects[key], dispatch);
    }
    next[key] = addPrefix(effects[key], dispatch);
    return next;
  }, {});
};

const memoizedGetEffectsForActions = memoized(getEffectsForActions);
const memoizedGetConnectState = memoized(getConnectState);
const memoizedGetAppModelEffects = memoized(getAppModelEffects);

export function setApp(_app) {
  app = Object.assign({}, _app);
}

export default function model(namespace) {
  const ns = checkNamespace(namespace);
  warning(app, 'app must be installed (use setApp) before starting app');
  const _models = app._models || [];
  const allEffects = memoizedGetAppModelEffects(_models);
  const effects = ns.reduce((next, key) => {
    next[key] = allEffects[key];
    return next;
  }, {});

  return function connected(WrapperComponent) {
    class HOC extends WrapperComponent {
      _constructor(props) {
        if (super._constructor) {
          super._constructor(props);
        }
      }
    }

    return connect(
      state => memoizedGetConnectState(state, ns),
      dispatch => memoizedGetEffectsForActions(effects, dispatch)
    )(HOC);
  };
}
