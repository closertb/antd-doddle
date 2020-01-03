 /** 
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
 * @param string format       : 表单项类型
*/
export interface FieldProps {
  type?: string,         //  表单项类型
  key: string,          //  表单项主键
  name?: string,         //  表单项名称
  style?: object,        //  表单项样式
  required?: boolean,    //  表单项是否必填
  allowClear?: boolean,   //  表单项是否允许清除
  placeholder?: string,  //  表单项说明文字
  defaultValue?: any, //  表单项默认值
  disable?: Function,      //  表单项是否禁用
  rules?: [],        //  表单项校验规则
  maxLength: number,    //  表单项最大长度
  isEnable?: boolean,     //  表单项是否启用，true时渲染，false时不渲染
  specialKey?: string,   //  表单项FORMITEM专用key值，用于react diff时用
  format?: string,       //  表单项类型
  onChange?: Function,
  isDynamic?: boolean,
  [propName: string]: any
}

export interface FormRenderProps {
  field: FieldProps,
  extendProps?: GroupProps,
  data?: any,
  [propName: string]: any // 其他
}
/**
 * @param string formItemLayout         : 表单项整体样式定义
 * @param string getFieldDecorator      : 表单项装饰器
 * @param string require                : 表单项整体定义是否必填
 * @param string Wrapper                : 表单包裹组件
 * @param string containerName          : 表单组件挂载的Dom节点ClassName
 */
export interface ConstuctorProps {
  getFieldDecorator: Function,
  formItemLayout?: object,
  containerName?: string,
  require?: boolean,
  Wrapper?: Function,
  withWrap?: boolean,
  dynamicParams?: object, // 动态参数注入
}

export interface GroupProps extends ConstuctorProps {
  children: React.ReactNode, // React.ReactChildren
  required?: boolean,
  [propName: string]: any // 其他
}


export interface Enums {
  value: any,
  label: string | number,
  [propName: string]: any
}