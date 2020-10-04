import React from 'react';
import { Table } from 'antd';
import table from './table';
import { FieldProps, SearchProps } from '../utils';
import { Pagination } from '../utils/common';

const { createColumns } = table;

interface LoadingWrap  {
  list?: boolean 
}
// 输入类型定义
export interface EnhanceTableProps {
  fields: FieldProps [],
  datas: [],
  total?: number,
  rowKey?: 'string',
  onSearch?: Function,
  search?: SearchProps,
  footer?: Function,
  pageName?: string,
  noPage?: boolean,
  loading?: boolean | LoadingWrap,
  extraFields?: FieldProps []; // 组件初始值
  [propName: string]: any
}

export default class EnhanceTable extends React.PureComponent<EnhanceTableProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getInitalColumns(fields) {
    const { extraFields = [] } = this.props;
    return createColumns(fields).enhance(extraFields).values();
  }
  render() {
    const { fields, search = {}, datas, total = 0, loading = false, onSearch,
      rowKey = 'id', footer, pagination = true, pageName = Pagination.PN, ...others } = this.props;
    const columns = this.getInitalColumns(fields);
    // pagination 默认由组件自身生成，设置为 null 时不渲染，设置为object 时为自定义
    const _pagination = pagination && (typeof pagination === 'object' ? pagination : {
      total,
      current: search[pageName],
      pageSize: search[Pagination.PS],
      onChange: pn => onSearch({ [pageName]: pn }),
      showTotal: t => footer ? footer({ total, ...search }) : `共 ${t} 条`
    });
    // loading 类型断言
    let spinning;
    if ((loading as LoadingWrap).list !== undefined) {
      spinning = (loading as LoadingWrap).list
    } else {
      spinning = loading;
    }
    const tableProps = {
      columns,
      pagination: _pagination,
      bordered: true,
      dataSource: datas,
      loading: spinning,
      rowKey,
      ...others
    };

    return (
      <div style={{ marginTop: 20 }}>
        <Table {...tableProps} />
      </div>
    );
  }
}
