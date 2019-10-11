import React from 'react';
import { Modal } from 'antd';
/**
 * 模态框组件
 *
 * @props visible Symbol类型参数，每次visible改变的时候，都会显示模态框
 * @props form 如果配置了form属性，则onOk属性会传递values,且只有在form validate success之后，才触发cancel逻辑
 * @props {...modalProps} 参考antd 模态框组件
 */
interface ModalProps {
  visible: symbol,
  confirmLoading?: boolean,
  onCancel?: Function,
  form?: any,
  onOk?: Function
}

interface StateProps {
  visible: boolean
}

export default class HModal extends React.PureComponent<ModalProps> {
  state: StateProps
  constructor(props) {
    super(props);
    const { visible } = props;
    this.state = {
      visible: Boolean(visible)
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentWillReceiveProps({ visible, confirmLoading }) {
    // 若 visible 为 false，表示主动关闭弹框
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
    if (confirmLoading !== undefined && confirmLoading.valueOf() === false &&
      this.props.confirmLoading && this.props.confirmLoading.valueOf()) {
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
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        const success = onOk(values); // onOk处理为true时才关闭窗口；
        success && hideModal();
      });
    } else {
      onOk && onOk();
      hideModal();
    }
  }

  render() {
    let { confirmLoading } = this.props;
    if (confirmLoading !== undefined) {
      confirmLoading = confirmLoading.valueOf();
    }
    const modalProps = {
      ...this.props,
      confirmLoading,
      visible: true,
      onOk: this.handleOk,
      onCancel: this.handleCancel };
    return (
      <div>{this.state.visible && <Modal {...modalProps} >{this.props.children}</Modal>}</div>
    );
  }
}
