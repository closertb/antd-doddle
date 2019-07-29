import React from 'react';
/**
 * 模态框组件
 *
 * @props visible Symbol类型参数，每次visible改变的时候，都会显示模态框
 * @props form 如果配置了form属性，则onOk属性会传递values,且只有在form validate success之后，才触发cancel逻辑
 * @props {...modalProps} 参考antd 模态框组件
 */
interface ModalProps {
    visible: symbol;
    confirmLoading?: boolean;
    onCancel?: Function;
    form?: any;
    onOk?: Function;
}
interface StateProps {
    visible: boolean;
}
export default class HModal extends React.PureComponent<ModalProps> {
    state: StateProps;
    constructor(props: any);
    componentWillReceiveProps({ visible, confirmLoading }: {
        visible: any;
        confirmLoading: any;
    }): true | void;
    handleCancel(): void;
    handleOk(): void;
    render(): JSX.Element;
}
export {};
