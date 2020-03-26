/* eslint-disable max-len */
import useBaseRequest from './useBaseRequest';

var isStr = function isStr(str) {
  return typeof str === 'string';
};

var composeHeader = function composeHeader(url, http) {
  return isStr(url) ? Object.assign({
    http: http,
    method: 'post'
  }, {
    url: url
  }) : Object.assign({
    http: http,
    method: 'post'
  }, url);
};

export function useRequest(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return useBaseRequest(url, body, Object.assign(options, {
    lazy: false
  }));
}
export function useLazyRequest(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // prompt 挂在时是否执行执行
  return useBaseRequest(url, body, Object.assign({
    prompt: false
  }, options, {
    lazy: true
  }));
}

var createRequest = function createRequest(http) {
  return {
    useRequest: function useRequest(url, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return useBaseRequest(composeHeader(url, http), body, Object.assign(options, {
        lazy: false
      }));
    },
    useLazyRequest: function useLazyRequest(url, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return useBaseRequest(composeHeader(url, http), body, Object.assign(options, {
        lazy: true
      }));
    }
  };
};

export default createRequest;