function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import { Form } from 'antd';
import { formItemLayout } from '../utils';
import formRender from './FormRender';
import './index.less';

var WithSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WithSearch, _React$Component);

  function WithSearch(props) {
    var _this;

    _classCallCheck(this, WithSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WithSearch).call(this, props));
    _this.state = {};
    var getFieldDecorator = props.form.getFieldDecorator;
    _this.formRender = formRender({
      getFieldDecorator: getFieldDecorator
    });
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getFormData = _this.getFormData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(WithSearch, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          form = _this$props.form,
          search = _this$props.search;

      if ('search' in nextProps && nextProps.search !== search) {
        form.resetFields();
      }
    }
  }, {
    key: "getFormData",
    value: function getFormData(paramFormat) {
      var form = this.props.form;
      var data = {};
      form.validateFields(function (err, values) {
        data = typeof paramFormat === 'function' ? paramFormat(values) : values;
      });
      return data;
    }
  }, {
    key: "handleSearch",
    value: function handleSearch() {
      var _this$props2 = this.props,
          form = _this$props2.form,
          actions = _this$props2.actions,
          paramFormat = _this$props2.paramFormat,
          _this$props2$pageName = _this$props2.pageName,
          pageName = _this$props2$pageName === void 0 ? 'pageNo' : _this$props2$pageName;
      form.validateFields(function (err, values) {
        if (err) return;
        var res = typeof paramFormat === 'function' ? paramFormat(values) : values;
        actions.onSearch(_objectSpread({}, res, _defineProperty({}, pageName, 1)));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          actions = _this$props3.actions,
          form = _this$props3.form,
          search = _this$props3.search;
      var childrenProps = {
        search: search,
        form: form,
        formItemLayout: formItemLayout,
        getFormData: this.getFormData,
        formRender: this.formRender,
        onSearch: this.handleSearch,
        actions: actions
      };
      return React.createElement("div", {
        className: "search-form"
      }, children(childrenProps));
    }
  }]);

  return WithSearch;
}(React.Component);

export default Form.create()(WithSearch);