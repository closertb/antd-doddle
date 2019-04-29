import React from 'react';
import { Form, Modal } from 'antd';

class HModal extends React.Component {
  constructor(props) {
    super(props);
    const { visible } = props;
    this.state = {
      visible: Boolean(visible),
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    console.log('create');
  }
  // eslint-disable-next-line
  componentWillReceiveProps({ visible, confirmLoading }) {
    // 若 visible 为 false，表示主动关闭弹框
    console.log('update');
    if (visible === false) {
      return this.setState({ visible });
    }

    // 如果props中的visible属性改变，则显示modal
    if (visible && (visible !== this.props.visible)) {
      this.setState({
        visible: true
      });
    }
    // 如果confirmLoading 从true转变为flase,则处理关闭逻辑
    if (confirmLoading !== undefined && confirmLoading === false && this.props.confirmLoading) {
      this.setState({
        visible: false
      });
    }
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.setState({
      visible: false
    });
  }

  handleOk() {
    const { confirmLoading, form, onOk } = this.props;
    const hideModal = () => {
      // 如果没有设置confirmLoading,则直接关闭窗口
      if (confirmLoading === undefined) {
        this.handleCancel();
      }
    };

    if (onOk && form) {
      // 如果设置了form属性，则验证成功后才关闭表单
      form.validate((error, values) => {
        if (error) return;
        const res = onOk(values);
        res && hideModal();
      });
    } else {
      onOk && onOk();
      hideModal();
    }
  }

  render() {
    const { confirmLoading, child, visible, title = '弹窗', form, ...others } = this.props;
    const modalProps = {
      title,
      confirmLoading,
      visible: this.state.visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
    };
    const childProps = {
      form,
      visible,
      confirmLoading,
      ...others,
    };
    return (
      <Modal {...modalProps}>
        {this.props.children(childProps)}
      </Modal>
    );
  }
}
export default Form.create()(HModal);
