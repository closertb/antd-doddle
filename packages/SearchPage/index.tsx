import React, { useCallback, useRef, useState, useEffect } from 'react';
import WithSearch, { WithSearchProps } from '../WithSearch';
import EnhanceTable, { EnhanceTableProps } from '../EnhanceTable';
import { Pagination } from '../utils/common';

export interface SearchPageProps {
  tableProps: EnhanceTableProps,
  searchProps: WithSearchProps,
  onSearch: (value) => void,
  pn?: string,
  ps?: string,
  extraBtn?: React.ReactElement,
  children?: React.ReactElement,
  setQuery?: (value) => void,
}

export default function SearchPage(props) {
  const { pn = Pagination.PN, ps = Pagination.PS, searchProps, tableProps = {},
  extraBtn = false, onSearch, children, setQuery } = props;

  const { search = {} } = searchProps;
  const _initSearch = useRef({ [pn]: 1, [ps]: 10, ...search });
  const [_search, setSearch] = useState({ ..._initSearch.current });

  const _onSearch = useCallback((value) => {
    // _search.current = Object.assign(_search.current, value);
    const _temp = { ..._search, ...value };
    setSearch(_temp);
    onSearch(_temp);
    setQuery && setQuery(_temp);
  }, [_search]);

  const _onReset = useCallback(() => {
    const _temp = { ..._initSearch.current };
    setSearch(_temp);
    onSearch(_temp);
    setQuery && setQuery(_temp);
  }, []);

  useEffect(() => {
    onSearch(_search);
    setQuery && setQuery(_search);
    return () => {
      console.log('unmount');
      // _search.current = _initSearch.current;
    };
  }, []);

  const _searchProps = {
    search: _search,
    onReset: _onReset,
    onSearch: _onSearch,
    ...searchProps,
  };
  const _tableProps = {
    onSearch: _onSearch,
    search: _search,
    ...tableProps
  };

  return (
    <div>
      <WithSearch {..._searchProps} />
      {extraBtn}
      <div className="pageContent">
        <EnhanceTable {..._tableProps} />
      </div>
      {children}
    </div>
  );
}
