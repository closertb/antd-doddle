import "antd/lib/form/style";
import _Form from "antd/lib/form";
import _defineProperty from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/defineProperty";
import _objectSpread from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectSpread";
import _classCallCheck from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck";
import _createClass from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf";
import _inherits from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/inherits";
import _assertThisInitialized from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import { formItemLayout } from '../utils';
import formRender from './FormRender';

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
        getFormData: this.getFormData,
        search: search,
        form: form,
        formItemLayout: formItemLayout,
        getFieldDecorator: form.getFieldDecorator,
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

export default _Form.create()(WithSearch);