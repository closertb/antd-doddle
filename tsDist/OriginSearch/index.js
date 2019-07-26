import React from 'react';
import { Input, AutoComplete, Spin, Tooltip, Icon } from 'antd';
import { throttle, isEmpty } from '../utils';
import './index.less';
const { Option } = AutoComplete;
const DefaultOption = (React.createElement(Option, { key: "empty", disabled: true }, "\u6682\u65E0\u53EF\u5339\u914D\u7684\u641C\u7D22\u7ED3\u679C"));
export default class OriginSearch extends React.Component {
    constructor(props) {
        super(props);
        this.lastFethId = 0;
        this.lazyLoad = throttle(this.load, 800);
        this.state = {
            isShowSearch: false,
            loading: false,
            options: [],
            seachRes: [],
            value: props.value,
            search: props.search || {},
        };
        this.load = this.load.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOpenSearch = this.handleOpenSearch.bind(this);
        this.handleCloseSearch = this.handleCloseSearch.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { value } = nextProps;
        if (!prevState.value || prevState.value !== value) {
            return { value: nextProps.value };
        }
        return null;
    }
    load(params) {
        this.lastFethId += 1;
        const fetchId = this.lastFethId;
        const { fetchData, format } = this.props;
        // 设置loading状态，清空option
        this.setState({ loading: true, options: null });
        // 获取数据，并格式化数据
        fetchData(params).then((datas) => {
            if (fetchId !== this.lastFethId) {
                // 异步程序，保证回调是按顺序进行
                return;
            }
            let options;
            if (isEmpty(datas)) {
                options = [DefaultOption];
            }
            else {
                // 用户自定义数据格式转换；
                options = format(datas).map(({ label, value }, key) => (React.createElement(Option, { key: key, value: String(value) }, label)));
            }
            // 如果options为空，则设置为暂无搜索结果
            !options.length && options.push(DefaultOption);
            this.setState({ options, loading: false, seachRes: datas });
        });
    }
    handleOpenSearch() {
        this.setState({ isShowSearch: true });
    }
    handleCloseSearch() {
        this.setState({ isShowSearch: false });
    }
    // 处理选择后的逻辑
    handleSelect(value, option) {
        const { onSelect } = this.props;
        const { seachRes } = this.state;
        // 兼容antd不同版本
        const index = option.key || option.props.index;
        // 如果定义了handleSelect， 则获取自定义值，否则获取选择的默认值
        const selectValue = onSelect ? onSelect(value, index, seachRes) : value;
        this.triggerChange(selectValue);
        this.setState({ value: selectValue });
        this.handleCloseSearch();
    }
    handleChange(value) {
        const { searchKey = 'keyword' } = this.props;
        const { search } = this.state;
        const res = Object.assign({}, search, { [searchKey]: value });
        value && this.lazyLoad(res);
    }
    // 清除动作处理
    handleRemove() {
        const res = undefined;
        this.setState({ value: res });
        this.triggerChange(res);
    }
    triggerChange(value) {
        const { onChange } = this.props;
        onChange && onChange(value);
    }
    render() {
        const { style, valueFormat = value => value, disabled = false, placeholder = '请输入', allowClear = false, maxSize = 500, } = this.props;
        const { options, isShowSearch, value, loading } = this.state;
        // 有搜索框时就禁止输入，且没有点击事件。无搜索框时就可以点击
        const inputProps = isShowSearch
            ? { disabled: true }
            : { onClick: this.handleOpenSearch };
        const inputValue = valueFormat(value);
        const withTips = inputValue && String(inputValue).length > maxSize;
        const nodeProps = Object.assign({ disabled, 
            // disabled的时候，allowClear任然是可以点击的
            allowClear: !disabled && allowClear, placeholder, readOnly: true, value: inputValue, style: { width: '100%' }, onChange: this.handleRemove }, inputProps);
        return (React.createElement("div", { className: "doddle-input-search", style: style },
            withTips ? (React.createElement(Tooltip, { className: "whatip", title: inputValue },
                React.createElement(Input, Object.assign({}, nodeProps)))) : (React.createElement(Input, Object.assign({}, nodeProps))),
            isShowSearch && (React.createElement("div", { className: "js-origin-search origin-search" },
                React.createElement(Icon, { type: "search", className: "origin-search-icon" }),
                React.createElement(AutoComplete, { autoFocus: true, className: "certain-category-search", dropdownClassName: "certain-category-search-dropdown", dropdownMatchSelectWidth: true, onBlur: this.handleCloseSearch, onSearch: this.handleChange, onSelect: this.handleSelect, style: { width: '100%' }, optionLabelProp: "value" }, loading
                    ? [
                        React.createElement(Option, { key: "loading", disabled: true },
                            React.createElement(Spin, { spinning: loading, style: { paddingLeft: '45%', textAlign: 'center' } })),
                    ]
                    : options)))));
    }
}
