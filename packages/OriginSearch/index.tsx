import React from 'react';
import { Input, AutoComplete, Spin, Tooltip, Icon } from 'antd';
import { throttle, isEmpty } from '../utils';
import './index.less';

const { Option } = AutoComplete;
const DefaultOption = (
  <Option key="empty" disabled>
    暂无可匹配的搜索结果
  </Option>
);

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
  fetchData: Function, // 带promise的数据获取接口
  valueFormat?: Function, // 数据显示框自定义数据显示函数。默认为 value => value
  format?: Function, // 下拉列表显示自定义规则函数，返回[{label: '',value: ''}]对象数组
  onSelect?: Function,
  onChange?: Function,
  value?: string | object | number,
  search?: object,
  searchKey?: string,
  maxSize?: number,
  style: object,
  disabled: boolean,
  placeholder: string,
  allowClear: boolean
}

interface searchState {
  isShowSearch: boolean,
  loading: boolean,
  options: [],
  seachRes: [],
  value: string | object | number,
  search: object,
}
export default class OriginSearch extends React.Component<OriginSearchProps> {
  lastFethId: number
  lazyLoad: Function
  state: searchState;
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      loading: false,
      options: [],
      seachRes: [],
      value: props.value,
      search: props.search || {},
    };
    this.lastFethId = 0;
    this.load = this.load.bind(this);
    this.lazyLoad= throttle(this.load, 800);
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
      } else {
        // 用户自定义数据格式转换；
        options = format(datas).map(({ label, value }, key) => (
          <Option key={key} value={String(value)}>
            {label}
          </Option>
        ));
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
    const res = { ...search, [searchKey]: value };
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
    const {
      style,
      valueFormat = value => value,
      disabled = false,
      placeholder = '请输入',
      allowClear = false,
      maxSize = 500,
    } = this.props;
    const { options, isShowSearch, value, loading } = this.state;
    // 有搜索框时就禁止输入，且没有点击事件。无搜索框时就可以点击
    const inputProps = isShowSearch
      ? { disabled: true }
      : { onClick: this.handleOpenSearch };
    const inputValue = valueFormat(value);
    const withTips = inputValue && String(inputValue).length > maxSize;
    const nodeProps = {
      disabled,
      // disabled的时候，allowClear任然是可以点击的
      allowClear: !disabled && allowClear,
      placeholder,
      readOnly: true,
      value: inputValue,
      style: { width: '100%' },
      onChange: this.handleRemove,
      ...inputProps,
    };
    return (
      <div className="doddle-input-search" style={style}>
        {withTips ? (
          <Tooltip className="whatip" title={inputValue}>
            <Input {...nodeProps} />
          </Tooltip>
        ) : (
          <Input {...nodeProps} />
        )}
        {isShowSearch && (
          <div className="js-origin-search origin-search">
            <Icon type="search" className="origin-search-icon" />
            <AutoComplete
              autoFocus
              className="certain-category-search"
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth
              onBlur={this.handleCloseSearch}
              onSearch={this.handleChange}
              onSelect={this.handleSelect}
              style={{ width: '100%' }}
              optionLabelProp="value"
            >
              {loading
                ? [
                  <Option key="loading" disabled>
                    <Spin
                      spinning={loading}
                      style={{ paddingLeft: '45%', textAlign: 'center' }}
                    />
                  </Option>,
                ]
                : options}
            </AutoComplete>
          </div>
        )}
      </div>
    );
  }
}
