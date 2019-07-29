import React from 'react';
interface RuleProp {
    key: number;
    disableBtn?: boolean;
    [propName: string]: any;
}
interface RenderFunc {
    (rule: RuleProp, actons: object): Node;
}
interface DynamicFormProps {
    children: RenderFunc;
    onChange?: Function;
    canMove?: boolean;
    value?: object[];
    disableBtn?: boolean;
}
interface DynamicFormState {
    canReset: boolean;
    rules: RuleProp[];
}
export default class DynamicForm extends React.PureComponent<DynamicFormProps> {
    state: DynamicFormState;
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        rules: any;
        canReset: boolean;
    };
    handlMoveUp: (index: any) => () => void;
    handlMoveDown: (index: any) => () => void;
    handlAdd(): void;
    handlMinus(index: any): void;
    /**
     * @param {any} val 目标值
     * @param {*} index 索引行
     * @param {*} key 单个对象对应的属性
     */
    bindChange(val: any, index: any, key: any): void;
    trigger(res: any): void;
    render(): JSX.Element;
}
export {};
