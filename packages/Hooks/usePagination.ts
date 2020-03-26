import { useState, useCallback } from 'react';
import usePrevious from './usePrevious';

const selfSymbol = Symbol('pagination');

const INIT_DATA = { pn: 1, ps: 10 };

const data = {
  [selfSymbol]: INIT_DATA
};

/**
 * name: setPagination
 * func: 设定分页数据格式，默认{ pageNum: 1, pageSize: 10 }
 * @params baseData 分页数据
*/
export function setPagination(baseData = INIT_DATA) {
  data[selfSymbol] = baseData;
}

/**
 * name: usePagination
 * func: 分页查询触发hooks
 * @params  initData 查询初始值设置，比如默认状态，起始时间
 * @params  deps     更新初始值的依赖；
 * @returns search   当前search值；
 * @returns onSearch 搜索；
 * @returns onReset  重置；
*/
interface SearchProps {
  [propName: string]: any
}

export default function usePagination(initData = {}, deps = []) : [
  SearchProps,
  (data: SearchProps) => any,
  () => any
] {
  const [search, setSearch] = useState(Object.assign({}, data[selfSymbol], initData));

  const initRef = usePrevious(search, deps);

  const onSearch = useCallback((data) => {
    // 这里的Set值，由于做了相等性判断，所以为对象时，需要重新生成一个新的索引
    // 另外用到了setState的回调时用法，而不用search作为依赖，可以保证onSearch指向频繁变化
    // setSearch(Object.assign({}, search, data)); /* deps: [search] */
    setSearch(search => Object.assign({}, search, data));
  }, []);

  const onReset = useCallback(() => setSearch(initRef.current), []);
  return [search, onSearch, onReset];
}
