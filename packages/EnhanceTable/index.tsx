import React from 'react';
import { Table } from 'antd';
import table from './table';
import { FieldProps, SearchProps } from '../utils';
import { Pagination } from '../utils/common';

const { createColumns } = table;

// 输入类型定义
interface EnhanceTableProps {
  fields: FieldProps [],
  datas: [],
  total?: number,
  rowKey?: 'string',
  onSearch?: Function,
  search?: SearchProps,
  footer?: Function,
  pageName?: string,
  noPage?: boolean,
  loading?: { list?: boolean },
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
    const { fields, search = {}, datas, total = 0, loading = {}, onSearch,
      rowKey = 'id', footer, noPage = false, pageName = Pagination.PN, ...others } = this.props;
    const columns = this.getInitalColumns(fields);
    const page = search.pageNum ? 'pageNum' : pageName;
    const pagination = noPage ? null : {
      total,
      current: search[page],
      pageSize: search[Pagination.PS],
      onChange: pn => onSearch({ [page]: pn }),
      showTotal: t => footer ? footer({ total, ...search }) : `共 ${t} 条`
    };
    const tableProps = {
      columns,
      pagination,
      bordered: true,
      dataSource: datas,
      loading: loading.list,
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
