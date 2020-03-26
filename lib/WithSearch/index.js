"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

var _common = require("../utils/common");

var _utils = require("../utils");

var _FormRender = _interopRequireDefault(require("../FormRender"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function DefaultRender(props) {
  var fields = props.fields,
      formRender = props.formRender,
      search = props.search,
      handleSearch = props.handleSearch,
      handleReset = props.handleReset,
      extraBtns = props.extraBtns,
      onReset = props.onReset,
      dynamicParams = props.dynamicParams;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_antd.Row, null, fields.map(function (field) {
    return _react["default"].createElement(_antd.Col, {
      span: 8,
      key: field.key
    }, formRender(Object.assign({
      field: field,
      data: search
    }, dynamicParams)));
  })), _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement(_antd.Button, {
    type: "primary",
    onClick: handleSearch
  }, "\u67E5\u8BE2"), onReset && _react["default"].createElement(_antd.Button, {
    onClick: handleReset
  }, "\u91CD\u7F6E")
  /* 仅在设置onReset情况下，开启重置按钮 */
  , extraBtns && extraBtns()));
}

;

var WithSearch =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WithSearch, _React$PureComponent);

  function WithSearch(props) {
    var _this;

    _classCallCheck(this, WithSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WithSearch).call(this, props));
    _this.state = {};
    var getFieldDecorator = props.form.getFieldDecorator,
        _props$fields = props.fields,
        fields = _props$fields === void 0 ? [] : _props$fields;
    _this.formRender = (0, _FormRender["default"])({
      getFieldDecorator: getFieldDecorator,
      containerName: 'search-form'
    });
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    _this.handleReset = _this.handleReset.bind(_assertThisInitialized(_this));
    _this.getFormData = _this.getFormData.bind(_assertThisInitialized(_this)); // 数组对象转hashMap

    _this.mapField = fields.length ? fields.reduce(function (pre, cur) {
      pre[cur.key] = cur; // 判断是否需要做时间转换；

      if (cur.startKey && cur.endKey) {
        pre[cur.key].isRangePicker = true;
        pre._hasTimeRange = true;
      }

      return pre;
    }, {
      _hasTimeRange: false
    }) : {
      _hasTimeRange: true
    };
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
      var _this2 = this;

      var _this$props = this.props,
          form = _this$props.form,
          onSearch = _this$props.onSearch,
          _this$props$pageName = _this$props.pageName,
          pageName = _this$props$pageName === void 0 ? _common.Pagination.PN : _this$props$pageName;
      form.validateFields(function (err, values) {
        if (err) return;

        var res = _this2.timeFormatFun(values);

        onSearch(Object.assign({}, res, _defineProperty({}, pageName, 1)));
      });
    }
  }, {
    key: "timeFormatFun",
    value: function timeFormatFun(values) {
      var _this3 = this;

      var _this$props2 = this.props,
          timeFormat = _this$props2.timeFormat,
          paramFormat = _this$props2.paramFormat;

      if (paramFormat) {
        return paramFormat(values);
      } // 如果没有时间选择项，直接返回


      if (!this.mapField._hasTimeRange) {
        return values;
      } // 如果没设置timeFormat，则不作格式化


      if (!timeFormat) {
        return values;
      }

      var keys = Object.keys(values);
      var transformFunc = typeof timeFormat === 'string' ? function (time) {
        return time.format(timeFormat);
      } : function (time) {
        return time.valueOf();
      };
      return keys.reduce(function (pre, cur) {
        var value = pre[cur];
        var field = _this3.mapField[cur]; // 搜索结果为数组，且数组的值为Moment对象

        if (field.isRangePicker) {
          if (Array.isArray(value) && value[0] instanceof _moment["default"]) {
            var _value = _slicedToArray(value, 2),
                start = _value[0],
                end = _value[1]; // 会根据showTIme 来判断是否需要自动去取一天的一头一尾


            pre[field.startKey] = field.showTime ? transformFunc(start) : transformFunc(start.startOf('day'));
            pre[field.endKey] = field.showTime ? transformFunc(end) : transformFunc(end.endOf('day'));
          } else {
            pre[field.startKey] = undefined;
            pre[field.endKey] = undefined;
          }

          delete pre[cur];
        }

        return pre;
      }, values);
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      var _this$props3 = this.props,
          onReset = _this$props3.onReset,
          form = _this$props3.form;
      form.resetFields();
      onReset && onReset();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          form = _this$props4.form,
          fields = _this$props4.fields,
          search = _this$props4.search,
          extraBtns = _this$props4.extraBtns,
          onReset = _this$props4.onReset,
          _this$props4$dynamicP = _this$props4.dynamicParams,
          dynamicParams = _this$props4$dynamicP === void 0 ? {} : _this$props4$dynamicP;
      var childrenProps = {
        search: search,
        form: form,
        fields: fields,
        onReset: onReset,
        extraBtns: extraBtns,
        formItemLayout: _utils.formItemLayout,
        dynamicParams: dynamicParams,
        onSearch: this.handleSearch,
        getFormData: this.getFormData,
        formRender: this.formRender,
        handleSearch: this.handleSearch,
        handleReset: this.handleReset
      };
      return _react["default"].createElement("div", {
        className: "search-form"
      }, children ? children(childrenProps) : DefaultRender(childrenProps));
    }
  }]);

  return WithSearch;
}(_react["default"].PureComponent);

var _default = _antd.Form.create()(WithSearch);

exports["default"] = _default;