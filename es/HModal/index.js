function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import { Modal } from 'antd';

var HModal =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(HModal, _React$PureComponent);

  function HModal(props) {
    var _this;

    _classCallCheck(this, HModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HModal).call(this, props));
    var visible = props.visible;
    _this.state = {
      visible: visible,
      innervisible: Boolean(visible),
      confirmLoading: false
    };
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.handleOk = _this.handleOk.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HModal, [{
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }

      this.setState({
        innervisible: false
      });
    }
  }, {
    key: "handleOk",
    value: function handleOk() {
      var _this2 = this;

      var _this$props = this.props,
          confirmLoading = _this$props.confirmLoading,
          form = _this$props.form,
          onOk = _this$props.onOk;

      var hideModal = function hideModal() {
        // 如果没有设置confirmLoading,则直接关闭窗口
        if (confirmLoading === undefined) {
          _this2.handleCancel();
        }
      };

      if (onOk && form) {
        // 如果设置了form属性，则验证成功后才关闭表单
        form.validateFields().then(function (values) {
          var success = onOk(values); // onOk处理为true时才关闭窗口；

          success && hideModal();
        });
      } else {
        onOk && onOk();
        hideModal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          confirmLoading = _this$state.confirmLoading,
          innervisible = _this$state.innervisible;

      var _a = this.props,
          children = _a.children,
          others = __rest(_a, ["children"]);

      var modalProps = Object.assign({}, others, {
        confirmLoading: confirmLoading,
        visible: innervisible,
        onOk: this.handleOk,
        onCancel: this.handleCancel
      });
      return React.createElement("div", null, innervisible && React.createElement(Modal, Object.assign({}, modalProps), children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visible = nextProps.visible,
          confirmLoading = nextProps.confirmLoading; // 若 visible 为 false，表示主动关闭弹框

      if (visible === false) {
        return {
          visible: visible,
          innervisible: false,
          confirmLoading: false
        };
      } // 如果props中的visible属性改变，则显示modal


      if (visible && visible !== prevState.visible) {
        return {
          visible: visible,
          innervisible: true
        };
      }

      if (confirmLoading) {
        return {
          confirmLoading: confirmLoading
        };
      } // 如果confirmLoading 从true转变为flase,则处理关闭逻辑


      if (confirmLoading !== undefined && confirmLoading.valueOf() === false && prevState.confirmLoading && prevState.confirmLoading.valueOf()) {
        /* 如果confirmLoading未拥有done属性，则直接关闭对话框，兼容旧版以及纯boolean对象
        * 如果confirmLoading拥有done属性，且confirmLoading.done为true时才关闭对话框, 适应场景：call请求错误时，不关闭对话框
        */
        return {
          innervisible: false,
          confirmLoading: false
        };
      }

      return null;
    }
  }]);

  return HModal;
}(React.PureComponent);

export { HModal as default };