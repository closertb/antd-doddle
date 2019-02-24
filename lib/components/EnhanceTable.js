"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _table = _interopRequireDefault(require("../utils/table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createColumns = _table.default.createColumns;

var EnhanceTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EnhanceTable, _React$Component);

  function EnhanceTable(props) {
    var _this;

    _classCallCheck(this, EnhanceTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnhanceTable).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(EnhanceTable, [{
    key: "getInitalColumns",
    value: function getInitalColumns(fields) {
      var _this$props$extraFiel = this.props.extraFields,
          extraFields = _this$props$extraFiel === void 0 ? [] : _this$props$extraFiel;
      return createColumns(fields).enhance(extraFields).values();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fields = _this$props.fields,
          _this$props$search = _this$props.search,
          search = _this$props$search === void 0 ? {} : _this$props$search,
          datas = _this$props.datas,
          _this$props$total = _this$props.total,
          total = _this$props$total === void 0 ? 0 : _this$props$total,
          _this$props$loading = _this$props.loading,
          loading = _this$props$loading === void 0 ? {} : _this$props$loading,
          _this$props$actions = _this$props.actions,
          actions = _this$props$actions === void 0 ? {} : _this$props$actions,
          _this$props$rowKey = _this$props.rowKey,
          rowKey = _this$props$rowKey === void 0 ? 'id' : _this$props$rowKey,
          footer = _this$props.footer,
          _this$props$noPage = _this$props.noPage,
          noPage = _this$props$noPage === void 0 ? false : _this$props$noPage,
          _this$props$pageName = _this$props.pageName,
          pageName = _this$props$pageName === void 0 ? 'pageNo' : _this$props$pageName,
          others = _objectWithoutProperties(_this$props, ["fields", "search", "datas", "total", "loading", "actions", "rowKey", "footer", "noPage", "pageName"]);

      var columns = this.getInitalColumns(fields);
      var page = search.pageNum ? 'pageNum' : pageName;
      var pagination = noPage ? false : {
        total: total,
        current: search[page],
        pageSize: search.pageCount || search.pageSize,
        onChange: function onChange(pn) {
          return actions.onSearch(_defineProperty({}, page, pn));
        },
        showTotal: function showTotal(t) {
          return footer ? footer(_objectSpread({
            total: total
          }, search)) : "\u5171 ".concat(t, " \u6761");
        }
      };

      var tableProps = _objectSpread({
        columns: columns,
        pagination: pagination,
        bordered: true,
        dataSource: datas,
        loading: loading.list,
        rowKey: rowKey
      }, others);

      return _react.default.createElement("div", {
        style: {
          marginTop: 20
        }
      }, _react.default.createElement(_antd.Table, tableProps));
    }
  }]);

  return EnhanceTable;
}(_react.default.Component);

exports.default = EnhanceTable;