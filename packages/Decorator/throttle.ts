import { throttle as base } from '../utils';

export default function throttle(...args) {
  // const fun = target[prop];
  function defaultBind(target?: any, prop?: any, descriptor?: any) {
    const fun = descriptor.value || (descriptor.get && descriptor.get());
    const withThrottle = base(fun);
    return {
      configurable: true,
      get() {
        return withThrottle.bind(this);
      }
    };
  }
  function defineBind(...params: any) {
    return function bind(target, prop, descriptor) {
      const fun = descriptor.value || (descriptor.get && descriptor.get());
      const withThrottle = base(fun, ...params);
      return {
        configurable: true,
        get() {
          return withThrottle.bind(this);
        }
      };
    };
  }
  return args.length === 3 ? defaultBind(...args) : defineBind(...args);
}
