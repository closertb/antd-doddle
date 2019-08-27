import React from 'react';
import './index.less';
/**
 * 作用: 用户名远程搜索下拉列表选择框
 * @prop: { function }      onSelect     下拉列表选择后自定义动作
 * @prop: { function }      onChange     下拉列表选择后自定义动作，一般不使用，与handleSelect功能相似
 * @prop: { function }      format       下拉列表显示自定义规则函数，返回[{label: '',value: ''}]对象数组
 * @prop: { Promise func }  fetchData    带promise的数据获取接口
 * @prop: { string|object } value        初始值
 * @prop: { function }      valueFormat  数据显示框自定义数据显示函数。默认为 value => value
 * @prop: { object }        search       自定义搜索数据对象，不设置则采用默认itmp默认用户查询对象
 * @prop: { string }        searchKey    自定义搜索数据对象，关键词属性名，默认keyword
 * @prop: { number }        maxSize      文字长度超过maxSize时使用ToolTips进行字段扩展展示
 */
interface OriginSearchProps {
    fetchData: Function;
    valueFormat?: Function;
    format?: Function;
    onSelect?: Function;
    onChange?: Function;
    value?: string | object | number;
    search?: object;
    searchKey?: 'string';
    maxSize?: number;
    style: object;
    disabled: boolean;
    placeholder: 'string';
    allowClear: boolean;
}
interface searchState {
    isShowSearch: boolean;
    loading: boolean;
    options: [];
    seachRes: [];
    value: string | object | number;
    search: object;
}
export default class OriginSearch extends React.Component<OriginSearchProps> {
    lastFethId: number;
    lazyLoad: Function;
    state: searchState;
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        value: any;
    };
    load(params: any): void;
    handleOpenSearch(): void;
    handleCloseSearch(): void;
    handleSelect(value: any, option: any): void;
    handleChange(value: any): void;
    handleRemove(): void;
    triggerChange(value: any): void;
    render(): JSX.Element;
}
export {};
