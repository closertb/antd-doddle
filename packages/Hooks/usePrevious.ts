import { useRef, useEffect } from 'react';

/**
 * name: usePrevious
 * func: 缓存初始值
 * @params initData 初始值
 * @params deps     更新缓存，数组；
 * @return ref      返回缓存所在的锚点；即访问值时需要使用ref.current
*/
export default function usePrevious<TValue>(initData: TValue, deps = []) {
  const ref = useRef<TValue>();
  // 支持deps变化时，强制更新初始值
  useEffect(() => {
    ref.current = Object.assign({}, initData); // 保存初始值；
  }, deps);
  return ref;
}
