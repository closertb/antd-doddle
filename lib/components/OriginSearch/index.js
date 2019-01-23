import "antd/lib/spin/style";
import _Spin from "antd/lib/spin";
import "antd/lib/icon/style";
import _Icon from "antd/lib/icon";
import "antd/lib/input/style";
import _Input from "antd/lib/input";
import _objectSpread from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import "antd/lib/auto-complete/style";
import _AutoComplete from "antd/lib/auto-complete";
import React from 'react';
import { throttle, isEmpty } from '../../utils';
import './index.less';
var Option = _AutoComplete.Option;
var DefaultOption = React.createElement(Option, {
  key: "empty",
  disabled: true
}, "\u6682\u65E0\u53EF\u5339\u914D\u7684\u641C\u7D22\u7ED3\u679C");
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

var HInputSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HInputSearch, _React$Component);

  function HInputSearch(props) {
    var _this;

    _classCallCheck(this, HInputSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HInputSearch).call(this, props));
    _this.state = {
      isShowSearch: false,
      loading: false,
      options: [],
      seachRes: [],
      value: props.value,
      search: props.search || {}
    };
    _this.lastFethId = 0;
    _this.load = _this.load.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleOpenSearch = _this.handleOpenSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCloseSearch = _this.handleCloseSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChangeVisible = _this.handleChangeVisible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.lazyLoad = throttle(_this.load);
    return _this;
  }

  _createClass(HInputSearch, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;

      if (isEmpty(value) && value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isShowSearch = this.state.isShowSearch;
      var bodyNode = document.querySelector('body');

      if (isShowSearch !== prevState.isShowSearch) {
        // 状态切换的时候才改变状态
        if (isShowSearch) {
          document.querySelector('.js-origin-search .ant-select-search__field').focus();
          bodyNode.addEventListener('click', this.handleChangeVisible);
        } else {
          bodyNode.removeEventListener('click', this.handleChangeVisible);
        }
      }
    }
  }, {
    key: "handleChangeVisible",
    value: function handleChangeVisible(event) {
      var isShowSearch = this.state.isShowSearch; // eslint-disable-next-line

      event = event || window.event;
      var elem = event.target;
      var inComponentClick = false;

      if (this.searchInputElement && this.searchInputElement.contains(elem) || (elem.className || '').indexOf('ant-select-dropdown') !== -1) {
        inComponentClick = true;
      }

      !inComponentClick && isShowSearch && this.handleCloseSearch();
    }
  }, {
    key: "load",
    value: function load(params) {
      var _this2 = this;

      this.lastFethId += 1;
      var fetchId = this.lastFethId;
      var _this$props = this.props,
          fetchData = _this$props.fetchData,
          format = _this$props.format; // 设置loading状态，清空option

      this.setState({
        loading: true,
        options: null
      }); // 获取数据，并格式化数据

      fetchData(params).then(function (_ref) {
        var _ref$list = _ref.list,
            list = _ref$list === void 0 ? [] : _ref$list;

        if (fetchId !== _this2.lastFethId) {
          // 异步程序，保证回调是按顺序进行
          return;
        }

        var options;

        if (isEmpty(list)) {
          options = [DefaultOption];
        } else {
          // 用户自定义数据格式转换；
          options = format(list).map(function (_ref2, key) {
            var label = _ref2.label,
                value = _ref2.value;
            return React.createElement(Option, {
              key: key,
              value: String(value)
            }, label);
          });
        } // 如果options为空，则设置为暂无搜索结果


        !options.length && options.push(DefaultOption);

        _this2.setState({
          options: options,
          loading: false,
          seachRes: list
        });
      });
    }
  }, {
    key: "handleOpenSearch",
    value: function handleOpenSearch() {
      this.setState({
        isShowSearch: true
      });
    }
  }, {
    key: "handleCloseSearch",
    value: function handleCloseSearch() {
      this.setState({
        isShowSearch: false
      });
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(value, option) {
      var onSelect = this.props.onSelect;
      var seachRes = this.state.seachRes; // 兼容antd不同版本

      var index = option.key || option.props.index; // 如果定义了handleSelect， 则获取自定义值，否则获取选择的默认值

      var selectValue = onSelect ? onSelect(value, index, seachRes) : value;
      this.triggerChange(selectValue);
      this.setState({
        value: selectValue
      });
      this.handleCloseSearch();
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props$searchKey = this.props.searchKey,
          searchKey = _this$props$searchKey === void 0 ? 'keyword' : _this$props$searchKey;
      var search = this.state.search;

      var res = _objectSpread({}, search);

      res[searchKey] = value;
      value && this.lazyLoad(res);
    }
  }, {
    key: "triggerChange",
    value: function triggerChange(value) {
      var onChange = this.props.onChange;
      onChange && onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          style = _this$props2.style,
          _this$props2$valueFor = _this$props2.valueFormat,
          valueFormat = _this$props2$valueFor === void 0 ? function (value) {
        return value;
      } : _this$props2$valueFor,
          _this$props2$size = _this$props2.size,
          size = _this$props2$size === void 0 ? 'default' : _this$props2$size,
          _this$props2$disabled = _this$props2.disabled,
          disabled = _this$props2$disabled === void 0 ? false : _this$props2$disabled,
          _this$props2$placehol = _this$props2.placeholder,
          placeholder = _this$props2$placehol === void 0 ? '请输入' : _this$props2$placehol;
      var _this$state = this.state,
          options = _this$state.options,
          isShowSearch = _this$state.isShowSearch,
          value = _this$state.value,
          loading = _this$state.loading; // 有搜索框时就禁止输入，且没有点击事件。无搜索框时就可以点击

      var inputProps = isShowSearch ? {
        disabled: true
      } : {
        onClick: this.handleOpenSearch
      };
      return React.createElement("div", {
        className: "originSearch",
        style: style // eslint-disable-next-line
        ,
        ref: function ref(el) {
          return _this3.searchInputElement = el;
        }
      }, React.createElement(_Input, Object.assign({
        // eslint-disable-next-line
        disabled: disabled,
        ref: function ref(e) {
          return _this3.searchInput = e;
        },
        readOnly: true,
        placeholder: placeholder,
        value: valueFormat(value),
        style: {
          width: '100%'
        },
        size: size
      }, inputProps)), isShowSearch && React.createElement("div", {
        className: "js-origin-search origin-search"
      }, React.createElement(_Icon, {
        type: "search",
        className: "origin-search-icon"
      }), React.createElement(_AutoComplete, {
        className: "certain-category-search",
        dropdownClassName: "certain-category-search-dropdown",
        dropdownMatchSelectWidth: true,
        size: size,
        onSearch: this.handleChange,
        onSelect: this.handleSelect,
        style: {
          width: '100%'
        },
        optionLabelProp: "value"
      }, loading ? [React.createElement(Option, {
        key: "loading",
        disabled: true
      }, React.createElement(_Spin, {
        spinning: loading,
        style: {
          paddingLeft: '45%',
          textAlign: 'center'
        }
      }))] : options)));
    }
  }]);

  return HInputSearch;
}(React.Component);

export { HInputSearch as default };