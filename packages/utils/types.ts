/**
 * description: 类型检测工具对象
 * isObject: 是否是对象
 * isFunction: 是否是函数
 * isArray: 是否是数组
 * isString: 是否为字符串
 * isNumber: 是否为数字
 * isEmpty: 是否为空
 * */
export default {
  isObject(source) {
    return Object.prototype.toString.call(source) === '[object Object]';
  },
  isFunction(source) {
    return (
      source != null
      && (source.constructor === Function || source instanceof Function)
    );
  },
  isArray(source) {
    return Array.isArray(source);
  },
  isString(source) {
    return (
      typeof source === 'string'
      || (!!source
        && typeof source === 'object'
        && Object.prototype.toString.call(source) === '[object String]')
    );
  },
  isNumber(source) {
    return (
      source != null && (source.constructor === Number || source instanceof Number)
    );
  },
  isEmpty(value) {
    // null 或者 未定义，则为空
    if (value === null || value === undefined) {
      return true;
    }
    // 传入空字符串，则为空
    if (typeof value === 'string') {
      return value === '';
    }
    // 传入函数，则不为空
    if (typeof value === 'function') {
      return false;
    }
    // 传入数组长度为0，则为空
    if (value instanceof Array) {
      return !value.length;
    }
    // 传入空对象，则为空
    if (value instanceof Object) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
};
