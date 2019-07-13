"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

var _fieldTypes = _interopRequireDefault(require("../EnhanceTable/table/fieldTypes"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * 作用: 详情信息表单的渲染
 * @params: fields 渲染表单的属性对象
 * @params: props  渲染表单的值对象
 * @return：返回值是一个Dom树组
 */
var countEnums = ['one-item', 'two-item', 'three-item', 'four-item'];

function renderBaseFields(fields) {
  var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fields.map(function (_ref) {
    var name = _ref.name,
        key = _ref.key,
        type = _ref.type,
        enums = _ref.enums,
        render = _ref.render,
        isShow = _ref.isShow,
        _ref$unit = _ref.unit,
        unit = _ref$unit === void 0 ? '' : _ref$unit,
        _ref$itemCount = _ref.itemCount,
        itemCount = _ref$itemCount === void 0 ? 2 : _ref$itemCount;
    var value = detail[key]; // 处理格式化数据

    if (type && value && _fieldTypes["default"][type]) {
      value = _fieldTypes["default"][type](value, detail);
    } // 处理枚举


    if (enums && enums.length > 0) {
      value = (0, _utils.getEnumObject)(enums, detail[key]).label;
    } // 处理render 函数


    if (render && typeof render === 'function') {
      value = render(detail);
    } // 如果存在是否显示的定义，并且判断为不显示，直接返回null


    if (isShow && !isShow(detail)) {
      return null;
    }

    var lineClass = countEnums[itemCount - 1]; // 处理没有值时，统一显示为--,

    var _final = value === undefined || value === '' ? '--' : value;

    return _react["default"].createElement("div", {
      className: "showInfo-item ".concat(lineClass),
      key: key
    }, _react["default"].createElement("span", {
      className: "showInfo-label"
    }, name), _react["default"].createElement("span", {
      className: "showInfo-value"
    }, _final, _final === value ? unit : ''));
  });
}
/**
 * 定义：详情显示组件；
 * @params: fields       栏目字段定义
 * @params: detail       栏目详情
 * @params: fieldsName   栏目名称
 * @params: children     自定义render
 */


var RenderDetail =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RenderDetail, _React$Component);

  function RenderDetail(props) {
    var _this;

    _classCallCheck(this, RenderDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RenderDetail).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(RenderDetail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fields = _this$props.fields,
          _this$props$detail = _this$props.detail,
          detail = _this$props$detail === void 0 ? {} : _this$props$detail,
          fieldsName = _this$props.fieldsName,
          children = _this$props.children;
      return _react["default"].createElement("div", {
        className: "doddle-render-detail"
      }, fieldsName && _react["default"].createElement("h3", {
        className: "title"
      }, fieldsName), _react["default"].createElement("div", {
        className: "showInfo-content"
      }, children ? children(renderBaseFields) : renderBaseFields(fields, detail)));
    }
  }]);

  return RenderDetail;
}(_react["default"].Component);

exports["default"] = RenderDetail;