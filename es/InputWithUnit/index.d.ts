import React from 'react';
import { EnumField } from '../utils';
interface InputWithUnitProps {
    value?: any;
    defaultUnit?: 'string';
    enums?: EnumField[];
    inputProps?: object;
    selectProps?: object;
    onChange?: Function;
}
interface InputWithUnitState {
    number: number | string;
    unit: 'string';
}
export default class InputWithUnit extends React.Component<InputWithUnitProps> {
    state: InputWithUnitState;
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, preState: any): any;
    handleChange(val: any, key: any): void;
    trigger(res: any): void;
    render(): JSX.Element;
}
export {};
