import React from 'react';
import { FieldProps } from '../utils';
import './index.less';
/**
 * 定义：详情显示组件；
 * @params: fields       栏目字段定义
 * @params: detail       栏目详情
 * @params: fieldsName   栏目名称
 * @params: children     自定义render
 */
interface RenderDetailProps {
    fields: FieldProps[];
    detail: object;
    fieldName?: string;
    children?: Function;
    [propName: string]: any;
}
declare function RenderDetail(props: RenderDetailProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof RenderDetail>;
export default _default;
