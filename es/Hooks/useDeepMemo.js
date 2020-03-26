import { useRef } from 'react';
import { equal as isEqual } from '@wry/equality';
/**
 * name: useDeepMemo
 * func: 缓存函数执行结果，根据deps来决定是否重新结果，更新缓存
 * @params memoFn 需要缓存的函数
 * @params deps   更新函数结果的依赖，类型任意；
*/

export default function useDeepMemo(memoFn, deps) {
  var ref = useRef(); // NOTE: 首次调用，或再次调用深度比较current.deps 与 当前deps是否一致, 不一致，则发起请求；

  if (!ref.current || !isEqual(deps, ref.current.deps)) {
    ref.current = {
      deps: deps,
      value: memoFn()
    };
  }

  return ref.current.value;
}