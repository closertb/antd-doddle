"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _bindDecorator = _interopRequireDefault(require("bind-decorator"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("./index.less"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

// 根据方向，找出指定索引的有效的上一或下一数据项
function findValid(arr, index) {
  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var target = index + dir;

  for (var i = target; dir === 1 && i < arr.length || dir === -1 && i >= 0; i += dir) {
    if (!arr[i].deleteFlag) {
      target = i;
      break;
    }
  }

  return target;
}

var DaynamicForm = (_class = (_temp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DaynamicForm, _React$Component);

  function DaynamicForm(props) {
    var _this;

    _classCallCheck(this, DaynamicForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DaynamicForm).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlMoveUp", function (index) {
      return function () {
        var rules = _this.state.rules;

        var _rules$index = rules[index],
            key = _rules$index.key,
            temp = _objectWithoutProperties(_rules$index, ["key"]);

        var lastIndex = findValid(rules, key, -1);
        rules[index] = _objectSpread({}, rules[lastIndex], {
          key: key
        });
        rules[lastIndex] = _objectSpread({}, temp, {
          key: lastIndex
        });

        _this.setState({
          rules: _toConsumableArray(rules)
        });

        _this.trigger(rules);
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlMoveDown", function (index) {
      return function () {
        var rules = _this.state.rules;

        var _rules$index2 = rules[index],
            key = _rules$index2.key,
            temp = _objectWithoutProperties(_rules$index2, ["key"]);

        var nextIndex = findValid(rules, key, 1);
        rules[index] = _objectSpread({}, rules[nextIndex], {
          key: key
        });
        rules[nextIndex] = _objectSpread({}, temp, {
          key: nextIndex
        });

        _this.setState({
          rules: _toConsumableArray(rules)
        });

        _this.trigger(rules);
      };
    });

    var _props$value = props.value,
        value = _props$value === void 0 ? [{
      key: 0
    }] : _props$value;
    _this.state = {
      rules: value.map(function (ele, key) {
        return _objectSpread({}, ele, {
          key: key
        });
      })
    };
    return _this;
  }

  _createClass(DaynamicForm, [{
    key: "handlMinus",
    value: function handlMinus(index) {
      var rules = this.state.rules;
      rules[index].deleteFlag = true;
      this.setState({
        rules: _toConsumableArray(rules)
      });
      this.trigger(rules);
    }
  }, {
    key: "handlAdd",
    value: function handlAdd() {
      var rules = this.state.rules;
      rules = rules.concat([{
        value: undefined,
        key: rules.length
      }]);
      this.setState({
        rules: _toConsumableArray(rules)
      });
      this.trigger(rules);
    }
  }, {
    key: "handleChange",
    value: function handleChange(val, index, key) {
      var rules = this.state.rules;
      rules[index][key] = val;
      this.setState({
        rules: _toConsumableArray(rules)
      });
      this.trigger(rules);
    }
  }, {
    key: "trigger",
    value: function trigger(res) {
      var onChange = this.props.onChange; // 虽说Res的值已经用this.setState更新过，但方法是异步的，所以不能直接用this.state

      onChange && onChange(res.filter(function (e) {
        return !e.deleteFlag;
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          canMove = _this$props.canMove;
      var rules = this.state.rules;
      var actions = {
        handlAdd: this.handlAdd,
        handlMinus: this.handlMinus,
        handleChange: this.handleChange
      };
      var validDatas = rules.filter(function (rule) {
        return !rule.deleteFlag;
      });
      var length = validDatas.length - 1;
      return _react.default.createElement("div", {
        className: _index.default.FullReduction
      }, validDatas.map(function (rule, index) {
        return _react.default.createElement("div", {
          key: rule.key
        }, children(rule, actions), index ? _react.default.createElement(_antd.Button, {
          style: {
            marginLeft: 10
          },
          type: "primary",
          shape: "circle",
          icon: "minus",
          onClick: function onClick() {
            return _this2.handlMinus(rule.key);
          }
        }) : _react.default.createElement(_antd.Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlAdd,
          type: "primary",
          shape: "circle",
          icon: "plus"
        }), canMove && index > 0 && _react.default.createElement(_antd.Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlMoveUp(rule.key),
          type: "primary",
          shape: "circle",
          icon: "up"
        }), canMove && index < length && _react.default.createElement(_antd.Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlMoveDown(rule.key),
          type: "primary",
          shape: "circle",
          icon: "down"
        }));
      }));
    }
  }]);

  return DaynamicForm;
}(_react.default.Component), _temp), (_applyDecoratedDescriptor(_class.prototype, "handlMinus", [_bindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handlMinus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handlAdd", [_bindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handlAdd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [_bindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trigger", [_bindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "trigger"), _class.prototype)), _class);
exports.default = DaynamicForm;