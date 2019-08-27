function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import { Input, AutoComplete, Spin, Tooltip, Icon } from 'antd';
import { throttle, isEmpty } from '../utils';
import './index.less';
var Option = AutoComplete.Option;
var DefaultOption = React.createElement(Option, {
  key: "empty",
  disabled: true
}, "\u6682\u65E0\u53EF\u5339\u914D\u7684\u641C\u7D22\u7ED3\u679C");

var OriginSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OriginSearch, _React$Component);

  function OriginSearch(props) {
    var _this;

    _classCallCheck(this, OriginSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OriginSearch).call(this, props));
    _this.state = {
      isShowSearch: false,
      loading: false,
      options: [],
      seachRes: [],
      value: props.value,
      search: props.search || {}
    };
    _this.lastFethId = 0;
    _this.load = _this.load.bind(_assertThisInitialized(_this));
    _this.lazyLoad = throttle(_this.load, 800);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_this));
    _this.handleOpenSearch = _this.handleOpenSearch.bind(_assertThisInitialized(_this));
    _this.handleCloseSearch = _this.handleCloseSearch.bind(_assertThisInitialized(_this));
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OriginSearch, [{
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

      fetchData(params).then(function (datas) {
        if (fetchId !== _this2.lastFethId) {
          // 异步程序，保证回调是按顺序进行
          return;
        }

        var options;

        if (isEmpty(datas)) {
          options = [DefaultOption];
        } else {
          // 用户自定义数据格式转换；
          options = format(datas).map(function (_ref, key) {
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
          seachRes: datas
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
    } // 处理选择后的逻辑

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
      var res = Object.assign({}, search, _defineProperty({}, searchKey, value));
      value && this.lazyLoad(res);
    } // 清除动作处理

  }, {
    key: "handleRemove",
    value: function handleRemove() {
      var res = undefined;
      this.setState({
        value: res
      });
      this.triggerChange(res);
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
      var _this$props2 = this.props,
          style = _this$props2.style,
          _this$props2$valueFor = _this$props2.valueFormat,
          valueFormat = _this$props2$valueFor === void 0 ? function (value) {
        return value;
      } : _this$props2$valueFor,
          _this$props2$disabled = _this$props2.disabled,
          disabled = _this$props2$disabled === void 0 ? false : _this$props2$disabled,
          _this$props2$placehol = _this$props2.placeholder,
          placeholder = _this$props2$placehol === void 0 ? '请输入' : _this$props2$placehol,
          _this$props2$allowCle = _this$props2.allowClear,
          allowClear = _this$props2$allowCle === void 0 ? false : _this$props2$allowCle,
          _this$props2$maxSize = _this$props2.maxSize,
          maxSize = _this$props2$maxSize === void 0 ? 500 : _this$props2$maxSize;
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
      var inputValue = valueFormat(value);
      var withTips = inputValue && String(inputValue).length > maxSize;
      var nodeProps = Object.assign({
        disabled: disabled,
        // disabled的时候，allowClear任然是可以点击的
        allowClear: !disabled && allowClear,
        placeholder: placeholder,
        readOnly: true,
        value: inputValue,
        style: {
          width: '100%'
        },
        onChange: this.handleRemove
      }, inputProps);
      return React.createElement("div", {
        className: "doddle-input-search",
        style: style
      }, withTips ? React.createElement(Tooltip, {
        className: "whatip",
        title: inputValue
      }, React.createElement(Input, Object.assign({}, nodeProps))) : React.createElement(Input, Object.assign({}, nodeProps)), isShowSearch && React.createElement("div", {
        className: "js-origin-search origin-search"
      }, React.createElement(Icon, {
        type: "search",
        className: "origin-search-icon"
      }), React.createElement(AutoComplete, {
        autoFocus: true,
        className: "certain-category-search",
        dropdownClassName: "certain-category-search-dropdown",
        dropdownMatchSelectWidth: true,
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
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var value = nextProps.value;

      if (!prevState.value || prevState.value !== value) {
        return {
          value: nextProps.value
        };
      }

      return null;
    }
  }]);

  return OriginSearch;
}(React.Component);

export { OriginSearch as default };