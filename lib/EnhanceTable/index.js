"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _table = _interopRequireDefault(require("./table"));

var _common = require("../utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var createColumns = _table["default"].createColumns;

var EnhanceTable =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(EnhanceTable, _React$PureComponent);

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
      var _a = this.props,
          fields = _a.fields,
          _a$search = _a.search,
          search = _a$search === void 0 ? {} : _a$search,
          datas = _a.datas,
          _a$total = _a.total,
          total = _a$total === void 0 ? 0 : _a$total,
          _a$loading = _a.loading,
          loading = _a$loading === void 0 ? {} : _a$loading,
          onSearch = _a.onSearch,
          _a$rowKey = _a.rowKey,
          rowKey = _a$rowKey === void 0 ? 'id' : _a$rowKey,
          footer = _a.footer,
          _a$noPage = _a.noPage,
          noPage = _a$noPage === void 0 ? false : _a$noPage,
          _a$pageName = _a.pageName,
          pageName = _a$pageName === void 0 ? _common.Pagination.PN : _a$pageName,
          others = __rest(_a, ["fields", "search", "datas", "total", "loading", "onSearch", "rowKey", "footer", "noPage", "pageName"]);

      var columns = this.getInitalColumns(fields);
      var page = search.pageNum ? 'pageNum' : pageName;
      var pagination = noPage ? null : {
        total: total,
        current: search[page],
        pageSize: search[_common.Pagination.PS],
        onChange: function onChange(pn) {
          return onSearch(_defineProperty({}, page, pn));
        },
        showTotal: function showTotal(t) {
          return footer ? footer(Object.assign({
            total: total
          }, search)) : "\u5171 ".concat(t, " \u6761");
        }
      };
      var tableProps = Object.assign({
        columns: columns,
        pagination: pagination,
        bordered: true,
        dataSource: datas,
        loading: loading.list,
        rowKey: rowKey
      }, others);
      return _react["default"].createElement("div", {
        style: {
          marginTop: 20
        }
      }, _react["default"].createElement(_antd.Table, Object.assign({}, tableProps)));
    }
  }]);

  return EnhanceTable;
}(_react["default"].PureComponent);

exports["default"] = EnhanceTable;