import React from 'react';
import { Table } from 'antd';
import table from '../utils/table';

const { createColumns } = table;
export default class EnhanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getInitalColumns(fields) {
    const { extraFields = [] } = this.props;
    return createColumns(fields).enhance(extraFields).values();
  }
  render() {
    const { fields, search = {}, datas, total = 0, loading = {}, actions = {},
      rowKey = 'id', footer, noPage = false, pageName = 'pageNo', ...others } = this.props;
    const columns = this.getInitalColumns(fields);
    const page = search.pageNum ? 'pageNum' : pageName;
    const pagination = noPage ? false : {
      total,
      current: search[page],
      pageSize: search.pageCount || search.pageSize,
      onChange: pn => actions.onSearch({ [page]: pn }),
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
