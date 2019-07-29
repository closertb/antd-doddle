function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

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
function (_React$PureComponent) {
  _inherits(DynamicForm, _React$PureComponent);

  function DynamicForm(props) {
    var _this;

    _classCallCheck(this, DynamicForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicForm).call(this, props));

    _this.handlMoveUp = function (index) {
      return function () {
        var rules = _this.state.rules;

        var _a = rules[index],
            key = _a.key,
            temp = __rest(_a, ["key"]);

        var lastIndex = findValid(rules, key, -1);
        rules[index] = Object.assign({}, rules[lastIndex], {
          key: key
        });
        rules[lastIndex] = Object.assign({}, temp, {
          key: lastIndex
        });

        _this.setState({
          rules: _toConsumableArray(rules)
        });

        _this.trigger(rules);
      };
    };

    _this.handlMoveDown = function (index) {
      return function () {
        var rules = _this.state.rules;

        var _a = rules[index],
            key = _a.key,
            temp = __rest(_a, ["key"]);

        var nextIndex = findValid(rules, key, 1);
        rules[index] = Object.assign({}, rules[nextIndex], {
          key: key
        });
        rules[nextIndex] = Object.assign({}, temp, {
          key: nextIndex
        });

        _this.setState({
          rules: _toConsumableArray(rules)
        });

        _this.trigger(rules);
      };
    };

    var value = props.value,
        _props$disableBtn = props.disableBtn,
        disableBtn = _props$disableBtn === void 0 ? false : _props$disableBtn;
    var isValid = !!value && value.length > 0;
    var initValue = isValid ? value : [{
      key: 0
    }];
    _this.state = {
      canReset: !isValid,
      rules: initValue.map(function (ele, key) {
        return Object.assign({
          disableBtn: disableBtn
        }, ele, {
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
    key: "handlMinus",
    value: function handlMinus(index) {
      var rules = this.state.rules;
      rules[index].deleteFlag = true;
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
        }, children(rule, dataBind), !rule.disableBtn && index > 0 && React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          type: "primary",
          shape: "circle",
          icon: "minus",
          onClick: function onClick() {
            return _this2.handlMinus(rule.key);
          }
        }), !rule.disableBtn && index === 0 && React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlAdd,
          type: "primary",
          shape: "circle",
          icon: "plus"
        }), !rule.disableBtn && canMove && index > 0 && React.createElement(Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlMoveUp(rule.key),
          type: "primary",
          shape: "circle",
          icon: "up"
        }), !rule.disableBtn && canMove && index < length && React.createElement(Button, {
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
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var canReset = prevState.canReset;
      var _nextProps$value = nextProps.value,
          value = _nextProps$value === void 0 ? [] : _nextProps$value,
          _nextProps$disableBtn = nextProps.disableBtn,
          disableBtn = _nextProps$disableBtn === void 0 ? false : _nextProps$disableBtn;

      if (canReset && value.length > 0) {
        return {
          rules: value.map(function (ele, key) {
            return Object.assign({
              disableBtn: disableBtn
            }, ele, {
              key: key
            });
          }),
          canReset: false
        };
      }

      return null;
    }
  }]);

  return DynamicForm;
}(React.PureComponent);

export { DynamicForm as default };