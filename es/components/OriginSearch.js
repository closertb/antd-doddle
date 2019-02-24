function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React from 'react';
import { Input, AutoComplete, Spin, Icon } from 'antd';
import { throttle, isEmpty } from '../utils';
import './index.less';
var Option = AutoComplete.Option;
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

      fetchData(params).then(function (list) {
        if (fetchId !== _this2.lastFethId) {
          // 异步程序，保证回调是按顺序进行
          return;
        }

        var options;

        if (isEmpty(list)) {
          options = [DefaultOption];
        } else {
          // 用户自定义数据格式转换；
          options = format(list).map(function (_ref, key) {
            var label = _ref.label,
                value = _ref.value;
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

      var res = _objectSpread({}, search, _defineProperty({}, searchKey, value));

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
        className: "ffe-origin-search",
        style: style // eslint-disable-next-line
        ,
        ref: function ref(el) {
          return _this3.searchInputElement = el;
        }
      }, React.createElement(Input // eslint-disable-next-line
      , _extends({
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
      }, React.createElement(Icon, {
        type: "search",
        className: "origin-search-icon"
      }), React.createElement(AutoComplete, {
        autoFocus: true,
        className: "certain-category-search",
        dropdownClassName: "certain-category-search-dropdown",
        dropdownMatchSelectWidth: true,
        size: size,
        onBlur: this.handleCloseSearch,
        onSearch: this.handleChange,
        onSelect: this.handleSelect,
        style: {
          width: '100%'
        },
        optionLabelProp: "value"
      }, loading ? [React.createElement(Option, {
        key: "loading",
        disabled: true
      }, React.createElement(Spin, {
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