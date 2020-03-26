import { useRef, useReducer, useEffect } from 'react';
import QueryData from './queryData';
import useDeepMemo from '../useDeepMemo';
import { Head, Options } from '../common';

/**
 * name: useBaseRequest
 * @params head       请求相关配置
 * @params body       object 请求体
 * @params options    hooks 配置
*/
export default function useBaseRequest(head: Head, body = {}, options: Options = { lazy: false }) {
  const [tick, forceUpdate] = useReducer(x => x + 1, 0);

  /**
   * url:     请求地址
   * http:    待domain的请求示例
   * method： 请求方法：get, post, put, delete
   * configs  请求配置：比如 contentType什么的；
  */
  const { url, http, method, ...configs } = head;
  // 查询对象Ref
  const queryDataRef = useRef<QueryData>();

  // lazy：回调时请求
  // trigger: 强制触发重新请求
  const { trigger, lazy } = options;

  // 首次渲染，创建一个Ref用来保存创建的请求示例
  if (!queryDataRef.current) {
    // 新建查询对象；
    queryDataRef.current = new QueryData({
      url,
      body,
      options,
      request: http[method],
      configs
    }, { forceUpdate });
  }

  const queryData = queryDataRef.current;
  queryData.updateOptions(body, configs, options);

  const memo = {
    url,
    body: { ...body },
    tick, // 这个是内部状态流转的关键
    trigger
  };


  // 根据memo的变化，判断是否接着发起请求
  const result = useDeepMemo(() => lazy ? queryData.executeLazy() : queryData.execute(), memo);

  const queryResult = lazy ? result[1] : result;

  // queryResult 结果改变，那就触发afterExecute方法，无缓存时会执行两次
  // loading 由 false 变为 true时：请求开始
  // loading 由 true 变为 false时：请求结束
  useEffect(() => queryData.afterExecute(), [
    queryResult.loading,
    queryResult.error,
    queryResult.data
  ]);

  // 首次挂载时触发，清除上一次建立的query对象，上一次存储的结果
  useEffect(() => queryData.cleanup(), []);

  return result;
}
