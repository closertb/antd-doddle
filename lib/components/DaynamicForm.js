import "antd/lib/button/style";
import _Button from "antd/lib/button";
import _toConsumableArray from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/toConsumableArray";
import _objectSpread from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck";
import _createClass from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf";
import _inherits from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/applyDecoratedDescriptor";

var _class;

import React from 'react';
import bind from 'bind-decorator';
import styles from './index.less'; // 根据方向，找出指定索引的有效的上一或下一数据项

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

var DaynamicForm = (_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DaynamicForm, _React$Component);

  function DaynamicForm(props) {
    var _this;

    _classCallCheck(this, DaynamicForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DaynamicForm).call(this, props));

    _this.handlMoveUp = function (index) {
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
    };

    _this.handlMoveDown = function (index) {
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
    };

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

      onChange(res.filter(function (e) {
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
      return React.createElement("div", {
        className: styles.FullReduction
      }, validDatas.map(function (rule, index) {
        return React.createElement("div", {
          key: rule.key
        }, children(rule, actions), index ? React.createElement(_Button, {
          style: {
            marginLeft: 10
          },
          type: "primary",
          shape: "circle",
          icon: "minus",
          onClick: function onClick() {
            return _this2.handlMinus(rule.key);
          }
        }) : React.createElement(_Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlAdd,
          type: "primary",
          shape: "circle",
          icon: "plus"
        }), canMove && index > 0 && React.createElement(_Button, {
          style: {
            marginLeft: 10
          },
          onClick: _this2.handlMoveUp(rule.key),
          type: "primary",
          shape: "circle",
          icon: "up"
        }), canMove && index < length && React.createElement(_Button, {
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
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, "handlMinus", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handlMinus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handlAdd", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handlAdd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "trigger", [bind], Object.getOwnPropertyDescriptor(_class.prototype, "trigger"), _class.prototype)), _class);
export { DaynamicForm as default };