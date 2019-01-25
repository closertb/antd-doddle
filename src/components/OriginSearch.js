import React from 'react';
import { Input, AutoComplete, Spin, Icon } from 'antd';
import { throttle, isEmpty } from '../utils';
import sty from './index.less';

const { Option } = AutoComplete;
const DefaultOption = <Option key="empty" disabled>暂无可匹配的搜索结果</Option>;

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
 */
export default class HInputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      loading: false,
      options: [],
      seachRes: [],
      value: props.value,
      search: props.search || {}
    };
    this.lastFethId = 0;
    this.load = this.load.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleOpenSearch = this.handleOpenSearch.bind(this);
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleChangeVisible = this.handleChangeVisible.bind(this);
    this.lazyLoad = throttle(this.load);
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (isEmpty(value) && value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { isShowSearch } = this.state;
    const bodyNode = document.querySelector('body');
    if (isShowSearch !== prevState.isShowSearch) { // 状态切换的时候才改变状态
      if (isShowSearch) {
        document.querySelector('.js-origin-search .ant-select-search__field').focus();
        bodyNode.addEventListener('click', this.handleChangeVisible);
      } else {
        bodyNode.removeEventListener('click', this.handleChangeVisible);
      }
    }
  }
  handleChangeVisible(event) {
    const { isShowSearch } = this.state;
    // eslint-disable-next-line
    event = event || window.event;
    const elem = event.target;
    let inComponentClick = false;
    if (
      (this.searchInputElement && this.searchInputElement.contains(elem)) ||
      ((elem.className || '').indexOf('ant-select-dropdown') !== -1)
    ) {
      inComponentClick = true;
    }
    !inComponentClick && isShowSearch && this.handleCloseSearch();
  }
  load(params) {
    this.lastFethId += 1;
    const fetchId = this.lastFethId;
    const { fetchData, format } = this.props;
    // 设置loading状态，清空option
    this.setState({ loading: true, options: null });
    // 获取数据，并格式化数据
    fetchData(params).then(({ list = [] }) => {
      if (fetchId !== this.lastFethId) { // 异步程序，保证回调是按顺序进行
        return;
      }
      let options;
      if (isEmpty(list)) {
        options = [DefaultOption];
      } else {
        // 用户自定义数据格式转换；
        options = format(list).map(({ label, value }, key) => (
          <Option key={key} value={String(value)}>{label}</Option>));
      }
      // 如果options为空，则设置为暂无搜索结果
      !options.length && options.push(DefaultOption);
      this.setState({ options, loading: false, seachRes: list });
    });
  }
  handleOpenSearch() {
    this.setState({ isShowSearch: true });
  }
  handleCloseSearch() {
    this.setState({ isShowSearch: false });
  }
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
    const res = { ...search };
    res[searchKey] = value;
    value && this.lazyLoad(res);
  }
  triggerChange(value) {
    const { onChange } = this.props;
    onChange && onChange(value);
  }
  render() {
    const { style, valueFormat = value => value, size = 'default', disabled = false, placeholder = '请输入' } = this.props;
    const { options, isShowSearch, value, loading } = this.state;
    // 有搜索框时就禁止输入，且没有点击事件。无搜索框时就可以点击
    const inputProps = isShowSearch ? { disabled: true } : {
      onClick: this.handleOpenSearch,
    };
    return (
      <div
        className={sty.OriginSearch}
        style={style}
        // eslint-disable-next-line
        ref={el => this.searchInputElement = el}
      >
        <Input
          // eslint-disable-next-line
          disabled={disabled}
          ref={e => this.searchInput = e}
          readOnly
          placeholder={placeholder}
          value={valueFormat(value)}
          style={{ width: '100%' }}
          size={size}
          {...inputProps}
        />
        {
          isShowSearch &&
          <div className="js-origin-search origin-search">
            <Icon type="search" className="origin-search-icon" />
            <AutoComplete
              className="certain-category-search"
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth
              size={size}
              onSearch={this.handleChange}
              onSelect={this.handleSelect}
              style={{ width: '100%' }}
              optionLabelProp="value"
            >
              {loading ?
                [
                  <Option key="loading" disabled>
                    <Spin spinning={loading} style={{ paddingLeft: '45%', textAlign: 'center' }} />
                  </Option>
                ] : options
              }
            </AutoComplete>
          </div>
        }
      </div>
    );
  }
}
