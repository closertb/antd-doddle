import React from 'react';
import { FieldProps, SearchProps } from '../utils';
import './index.less';
interface WithSearchProps {
    form: any;
    onSearch: Function;
    fields?: FieldProps[];
    search?: SearchProps;
    onReset?: Function;
    paramFormat?: Function;
    pageName?: string;
    dynamicParams?: object;
    children?: (props: WithSearchProps) => React.ReactElement;
    extraBtns?: Function;
    [propName: string]: any;
}
declare class WithSearch extends React.PureComponent<WithSearchProps> {
    formRender: React.ReactNode;
    constructor(props: any);
    getFormData(paramFormat: any): {};
    handleSearch(): void;
    handleReset(): void;
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof WithSearch, Pick<import("antd/lib/form").FormComponentProps<any>, "wrappedComponentRef">>;
export default _default;
