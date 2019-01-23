import "antd/lib/table/style";
import _Table from "antd/lib/table";
import _defineProperty from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/apple/Documents/company/ffe-basic/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import React from 'react';
import table from '../utils/table';
var createColumns = table.createColumns;

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
          _this$props$scrollPro = _this$props.scrollProp,
          scrollProp = _this$props$scrollPro === void 0 ? {} : _this$props$scrollPro,
          _this$props$noPage = _this$props.noPage,
          noPage = _this$props$noPage === void 0 ? false : _this$props$noPage;
      var columns = this.getInitalColumns(fields);
      var pagination = noPage ? false : {
        total: total,
        current: search.pageNo || search.pageNum,
        pageSize: search.pageCount || search.pageSize,
        onChange: function onChange(page) {
          return actions.onSearch(_defineProperty({}, search.pageNo ? 'pageNo' : 'pageNum', page));
        },
        showTotal: function showTotal(t) {
          return "\u5171 ".concat(t, " \u6761");
        }
      };
      var tableProps = {
        columns: columns,
        pagination: pagination,
        bordered: true,
        dataSource: datas,
        loading: loading.list,
        rowKey: rowKey,
        scroll: scrollProp
      };
      return React.createElement("div", {
        style: {
          marginTop: 20
        }
      }, React.createElement(_Table, tableProps));
    }
  }]);

  return EnhanceTable;
}(React.Component);

export { EnhanceTable as default };