var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Table } from 'antd';
import table from './table';
const { createColumns } = table;
export default class EnhanceTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getInitalColumns(fields) {
        const { extraFields = [] } = this.props;
        return createColumns(fields).enhance(extraFields).values();
    }
    render() {
        const _a = this.props, { fields, search = {}, datas, total = 0, loading = {}, onSearch, rowKey = 'id', footer, noPage = false, pageName = EnhanceTable.PN } = _a, others = __rest(_a, ["fields", "search", "datas", "total", "loading", "onSearch", "rowKey", "footer", "noPage", "pageName"]);
        const columns = this.getInitalColumns(fields);
        const page = search.pageNum ? 'pageNum' : pageName;
        const pagination = noPage ? null : {
            total,
            current: search[page],
            pageSize: search.pageCount || search.pageSize,
            onChange: pn => onSearch({ [page]: pn }),
            showTotal: t => footer ? footer(Object.assign({ total }, search)) : `共 ${t} 条`
        };
        const tableProps = Object.assign({ columns,
            pagination, bordered: true, dataSource: datas, loading: loading.list, rowKey }, others);
        return (React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(Table, Object.assign({}, tableProps))));
    }
}
EnhanceTable.PN = 'pageNo';
EnhanceTable.PS = 'pageSize';
