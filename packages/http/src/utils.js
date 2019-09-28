import qs from 'qs';

export default function compose(middlewares = []) {
  if (!Array.isArray(middlewares))
    throw new TypeError('Middleware stack must be an array!');

  // eslint-disable-next-line no-restricted-syntax
  for (const fn of middlewares) {
    if (typeof fn !== 'function')
      throw new TypeError('Middleware must be composed of functions!');
  }

  const { length } = middlewares;
  return function callback(ctx, next) {
    let index = -1;
    function dispatch(i) {
      let fn = middlewares[i];
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'));
      index = i;
      if (i === length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return dispatch(0);
  };
}

// 常用post提交type及对应的dataFormat
const enums = {
  form: {
    type: 'application/x-www-form-urlencoded',
    format: data => qs.stringify(data),
  },
  formData: {
    type: 'multipart/form-data',
    format: data =>
      Object.keys(data).reduce((prev, key) => {
        prev.append(key, data[key]);
        return prev;
      }, new FormData()),
  },
  json: {
    type: 'application/json',
    format: data => JSON.stringify(data),
  },
};

function genHeader(contentType = 'form', data) {
  const { type, format } = enums[contentType];
  return {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': type,
    },
    body: format(data),
  };
}

export const requestMethods = fetch => ({
  get(url, params, options = {}) {
    return fetch(`${url}?${qs.stringify(params)}`, params, options);
  },
  post(url, params, options = {}) {
    const { type } = options;
    return fetch(`${url}`, genHeader(type, params), options);
  },
});

export function defaultErrorHandler(error = {}) {
  if (
    error.message &&
    error.message.toUpperCase().includes('FAILED TO FETCH')
  ) {
    // eslint-disable-next-line no-alert
    window.alert('网络错误，请检查后重试');
    return {};
  }
  // eslint-disable-next-line no-alert
  console.log('errot');
  window.alert(error.message || '请求错误，请稍后重试');
}

export function sum(a, b) {
  return a + b;
}
