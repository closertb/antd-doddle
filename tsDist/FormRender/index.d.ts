/// <reference types="react" />
/**
 * @param string formItemLayout         : 表单项整体样式定义
 * @param string getFieldDecorator      : 表单项装饰器
 * @param string require                : 表单项整体定义是否必填
 * @param string Wrapper                : 表单包裹组件
 * @param string containerName          : 表单组件挂载的Dom节点ClassName
 * filed 参数说明
 * @param string type         : 表单项类型
 * @param string key          : 表单项主键
 * @param string name         : 表单项名称
 * @param string style        : 表单项样式
 * @param string required     : 表单项是否必填
 * @param string allowClear   : 表单项是否允许清除
 * @param string placeholder  : 表单项说明文字
 * @param string defaultValue : 表单项默认值
 * @param string disable      : 表单项是否禁用
 * @param string rules        : 表单项校验规则
 * @param string maxLength    : 表单项最大长度
 * @param string isEnable     : 表单项是否启用，true时渲染，false时不渲染
 * @param string specialKey   : 表单项FORMITEM专用key值，用于react diff时用
 * @param string format         : 表单项类型
*/
interface FieldProps {
    type?: string;
    key: string;
    name?: string;
    style?: object;
    required?: boolean;
    allowClear?: boolean;
    placeholder?: string;
    defaultValue?: any;
    disable?: Function;
    rules?: [];
    maxLength: number;
    isEnable?: boolean;
    specialKey?: string;
    format?: string;
    onChange?: Function;
    isDynamic?: boolean;
    [propName: string]: any;
}
interface FormRenderProps {
    field: FieldProps;
    data?: any;
    [propName: string]: any;
}
export default function ({ formItemLayout, containerName, getFieldDecorator, require, Wrapper, withWrap: defaultWrap }: {
    formItemLayout?: {
        labelCol: {
            xs: {
                span: number;
            };
            sm: {
                span: number;
            };
        };
        wrapperCol: {
            xs: {
                span: number;
            };
            sm: {
                span: number;
            };
        };
    };
    containerName: any;
    getFieldDecorator: any;
    require: any;
    Wrapper?: (props: any) => JSX.Element;
    withWrap?: boolean;
}): (props: FormRenderProps) => any;
export {};
