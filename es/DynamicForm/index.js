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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Button } from 'antd'; // 根据方向，找出指定索引的有效的上一或下一数据项

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

var DynamicForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DynamicForm, _React$Component);

  function DynamicForm(props) {
    var _this;

    _classCallCheck(this, DynamicForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handlMoveUp", function (index) {
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

    _defineProperty(_assertThisInitialized(_this), "handlMoveDown", function (index) {
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
    _this.handlMinus = _this.handlMinus.bind(_assertThisInitialized(_this));
    _this.handlAdd = _this.handlAdd.bind(_assertThisInitialized(_this));
    _this.bindChange = _this.bindChange.bind(_assertThisInitialized(_this));
    _this.trigger = _this.trigger.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DynamicForm, [{
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
    /**
     * @param {any} val 目标值
     * @param {*} index 索引行
     * @param {*} key 单个对象对应的属性
     */

  }, {
    key: "bindChange",
    value: function bindChange(val, index, key) {
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

      onChange && onChange(res.filter(function (_ref) {
        var deleteFlag = _ref.deleteFlag;
        return !deleteFlag;
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
      var dataBind = this.bindChange;
      var validDatas = rules.filter(function (_ref2) {
        var deleteFlag = _ref2.deleteFlag;
        return !deleteFlag;
      });
      var length = validDatas.length - 1;
      return React.createElement("div", {
        className: "doddle-daynamic-form"
      }, validDatas.map(function (rule, index) {
        return React.createElement("div", {
          key: rule.key
        }, children(rule, dataBind), index ? React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          type: "primary",
          shape: "circle",
          icon: "minus",
          onClick: function onClick() {
            return _this2.handlMinus(rule.key);
          }
        }) : React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlAdd,
          type: "primary",
          shape: "circle",
          icon: "plus"
        }), canMove && index > 0 && React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlMoveUp(rule.key),
          type: "primary",
          shape: "circle",
          icon: "up"
        }), canMove && index < length && React.createElement(Button, {
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

  return DynamicForm;
}(React.Component);

export { DynamicForm as default };