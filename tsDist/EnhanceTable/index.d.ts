import React from 'react';
import { FieldProps } from '../utils';
interface SearchProps {
    pageNo?: number;
    pageNum?: number;
    pageSize?: number;
    pageCount?: number;
}
interface EnhanceTableProps {
    fields: FieldProps[];
    datas: [];
    total?: number;
    rowKey?: 'string';
    onSearch?: Function;
    search?: SearchProps;
    footer?: Function;
    pageName?: string;
    noPage?: boolean;
    loading?: {
        list?: boolean;
    };
    extraFields?: FieldProps[];
    [propName: string]: any;
}
export default class EnhanceTable extends React.PureComponent<EnhanceTableProps> {
    static PN: string;
    static PS: string;
    constructor(props: any);
    getInitalColumns(fields: any): any;
    render(): JSX.Element;
}
export {};
