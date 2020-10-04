/* eslint-disable max-len */
import useBaseRequest from './useBaseRequest';

const isStr = str => typeof str === 'string';

const composeHeader = (url, http) => isStr(url) ?
  Object.assign({ http, method: 'post' }, { url }) :
  Object.assign({ http, method: 'post' }, url);

export function useRequest(url, body, options = {}) {
  return useBaseRequest(url, body, Object.assign(options, { lazy: false }));
}


export function useLazyRequest(url, body, options = {}) {
  // prompt 挂在时是否执行执行
  return useBaseRequest(url, body, Object.assign({ prompt: false }, options, { lazy: true }));
}

const createRequest = http => ({
  useRequest: (url, body, options = {}) => useBaseRequest(composeHeader(url, http), body, Object.assign(options, { lazy: false })),
  useLazyRequest: (url, body, options = {}) => useBaseRequest(composeHeader(url, http), body, Object.assign(options, { lazy: true })),
});

export default createRequest;
