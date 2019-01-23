import "antd/lib/modal/style";
import _Modal from "antd/lib/modal";
import _objectSpread from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectSpread";
import _classCallCheck from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck";
import _createClass from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf";
import _inherits from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/inherits";
import _assertThisInitialized from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/assertThisInitialized";
import React from 'react';

/**
 * 模态框组件
 *
 * @props visible Symbol类型参数，每次visible改变的时候，都会显示模态框
 * @props form 如果配置了form属性，则onOk属性会传递values,且只有在form validate success之后，才触发cancel逻辑
 * @props {...modalProps} 参考antd 模态框组件
 */
var HModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HModal, _React$Component);

  function HModal(props) {
    var _this;

    _classCallCheck(this, HModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HModal).call(this, props));
    var visible = props.visible;
    _this.state = {
      visible: Boolean(visible)
    };
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleOk = _this.handleOk.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(HModal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var visible = _ref.visible,
          confirmLoading = _ref.confirmLoading;

      // 若 visible 为 false，表示主动关闭弹框
      if (visible === false) {
        return this.setState({
          visible: visible
        });
      } // 如果props中的visible属性改变，则显示modal


      if (visible && visible !== this.props.visible) {
        this.setState({
          visible: true
        });
      } // 如果confirmLoading 从true转变为flase,则处理关闭逻辑


      if (confirmLoading !== undefined && confirmLoading.valueOf() === false && this.props.confirmLoading && this.props.confirmLoading.valueOf()) {
        /* 如果confirmLoading未拥有done属性，则直接关闭对话框，兼容旧版以及纯boolean对象
         * 如果confirmLoading拥有done属性，且confirmLoading.done为true时才关闭对话框, 适应场景：call请求错误时，不关闭对话框
         */

        /* eslint-disable-next-line */
        if (!confirmLoading.hasOwnProperty('done') || confirmLoading.done) {
          this.setState({
            visible: false
          });
        }
      }

      return true;
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }

      this.setState({
        visible: false
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
        form.validateFields(function (err, values) {
          if (err) {
            return;
          }

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
      var confirmLoading = this.props.confirmLoading;

      if (confirmLoading !== undefined) {
        confirmLoading = confirmLoading.valueOf();
      }

      var modalProps = _objectSpread({}, this.props, {
        confirmLoading: confirmLoading,
        visible: true,
        onOk: this.handleOk,
        onCancel: this.handleCancel
      });

      return React.createElement("div", null, this.state.visible && React.createElement(_Modal, modalProps, this.props.children));
    }
  }]);

  return HModal;
}(React.Component);

export { HModal as default };