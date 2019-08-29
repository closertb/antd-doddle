import { throttle as base } from '../utils';
export default function throttle() {
  // const fun = target[prop];
  function defaultBind(target, prop, descriptor) {
    var fun = descriptor.value || descriptor.get && descriptor.get();
    var withThrottle = base(fun);
    return {
      configurable: true,
      get: function get() {
        return withThrottle.bind(this);
      }
    };
  }

  function defineBind() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return function bind(target, prop, descriptor) {
      var fun = descriptor.value || descriptor.get && descriptor.get();
      var withThrottle = base.apply(void 0, [fun].concat(params));
      return {
        configurable: true,
        get: function get() {
          return withThrottle.bind(this);
        }
      };
    };
  }

  return arguments.length === 3 ? defaultBind.apply(void 0, arguments) : defineBind.apply(void 0, arguments);
}