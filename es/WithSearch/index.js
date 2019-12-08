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
import { Form, Row, Col, Button } from 'antd';
import { Pagination } from '../utils/common';
import { formItemLayout } from '../utils';
import formR from '../FormRender';
import './index.less';

function DefaultRender(props) {
  var fields = props.fields,
      formRender = props.formRender,
      search = props.search,
      handleSearch = props.handleSearch,
      handleReset = props.handleReset,
      extraBtns = props.extraBtns,
      onReset = props.onReset,
      dynamicParams = props.dynamicParams;
  return React.createElement(React.Fragment, null, React.createElement(Row, null, fields.map(function (field) {
    return React.createElement(Col, {
      span: 8,
      key: field.key
    }, formRender(Object.assign({
      field: field,
      data: search
    }, dynamicParams)));
  })), React.createElement("div", {
    className: "btn-group"
  }, React.createElement(Button, {
    type: "primary",
    onClick: handleSearch
  }, "\u67E5\u8BE2"), onReset && React.createElement(Button, {
    onClick: handleReset
  }, "\u91CD\u7F6E")
  /* 仅在设置onReset情况下，开启重置按钮 */
  , extraBtns && extraBtns()));
}

var WithSearch =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WithSearch, _React$PureComponent);

  function WithSearch(props) {
    var _this;

    _classCallCheck(this, WithSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WithSearch).call(this, props));
    _this.state = {};
    var getFieldDecorator = props.form.getFieldDecorator;
    _this.formRender = formR({
      getFieldDecorator: getFieldDecorator,
      containerName: 'search-form'
    });
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    _this.handleReset = _this.handleReset.bind(_assertThisInitialized(_this));
    _this.getFormData = _this.getFormData.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WithSearch, [{
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
      var _this$props = this.props,
          form = _this$props.form,
          onSearch = _this$props.onSearch,
          paramFormat = _this$props.paramFormat,
          _this$props$pageName = _this$props.pageName,
          pageName = _this$props$pageName === void 0 ? Pagination.PN : _this$props$pageName;
      form.validateFields(function (err, values) {
        if (err) return;
        var res = typeof paramFormat === 'function' ? paramFormat(values) : values;
        onSearch(Object.assign({}, res, _defineProperty({}, pageName, 1)));
      });
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      var _this$props2 = this.props,
          onReset = _this$props2.onReset,
          form = _this$props2.form;
      form.resetFields();
      onReset && onReset();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          form = _this$props3.form,
          fields = _this$props3.fields,
          search = _this$props3.search,
          extraBtns = _this$props3.extraBtns,
          onReset = _this$props3.onReset,
          _this$props3$dynamicP = _this$props3.dynamicParams,
          dynamicParams = _this$props3$dynamicP === void 0 ? {} : _this$props3$dynamicP;
      var childrenProps = {
        search: search,
        form: form,
        fields: fields,
        onReset: onReset,
        extraBtns: extraBtns,
        formItemLayout: formItemLayout,
        dynamicParams: dynamicParams,
        onSearch: this.handleSearch,
        getFormData: this.getFormData,
        formRender: this.formRender,
        handleSearch: this.handleSearch,
        handleReset: this.handleReset
      };
      return React.createElement("div", {
        className: "search-form"
      }, children ? children(childrenProps) : DefaultRender(childrenProps));
    }
  }]);

  return WithSearch;
}(React.PureComponent);

export default Form.create()(WithSearch);