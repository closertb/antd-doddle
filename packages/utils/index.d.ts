export declare const DATE_FORMAT = "YYYY-MM-DD";
export declare const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export declare const formItemLayout: {
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
export interface EnumField {
    label: 'string';
    value: 'string';
    [propName: string]: any;
}
export interface FieldProps {
    name: string | number;
    key: string;
    type?: string;
    render?: Function;
    enums?: EnumField[];
    isShow?: Function;
    itemCount?: number;
    unit?: string;
    [propName: string]: any;
}
export interface SearchProps {
    pageNo?: number;
    pageNum?: number;
    pageSize?: number;
    pageCount?: number;
    [propName: string]: any;
}
/**
 * @param {*} value 判断该对象是否是空对象或空数组
 */
export declare const isEmpty: (value: any) => boolean;
/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */
export declare const getEnumObject: (enums: any, value: any, key?: string) => any;
/**
 * 根据给定的数组,转化成标准的label, value数组；如果给定的数组子集是字符串，那么value,label值都是该字符串
 * @param {array} arr 目标数组
 * @param {string} value value对应属性
 * @param {string} label label对应属性
 */
export declare const toFormatEnums: (arr: any[], value: any, label: any) => {
    label: any;
    value: any;
}[];
/**
 * 作用: 函数节流
 * @params: fun         需要节流执行的程序
 * @params: delay       延迟执行时间
 * @params: time        最小触发间隔
 * @return：返回值延迟执行的函数
 */
export declare const throttle: (fun: any, delay?: number, time?: number) => ({ ...args }: {
    [x: string]: any;
}) => void;
export declare function compileParam(code?: string): string;
export declare function unCompileParam(code?: string): string;
/**
 * 校验身份证号码是否合法
 * @param String  id   合法的身份证编号
 * @param Boolean mask 身份证编号是否包含掩码
 * return Boolean 对于有掩码的身份证号码，只校验掩码格式是否正确，通用是前四位为最后四位为明码
 * 对于不包含掩码的，按国家规定格式校验。为真返回true
 */
export declare function idCodeValid(code: string, mask?: boolean, startNum?: number, endNum?: number): boolean;
/**
 * 根据身份证号码获取性别
 * @param  String id 合法的身份证编号
 * @return String 合法返回0或1，0为男，1位女，不合法返回-1
 */
export declare function getSexById(id?: string): string;
/**
 * 根据身份证号码获取年龄
 * @param String id 合法的身份证编号
 * return Number 合法返回对应年龄，不合法返回-1
 */
export declare function getAgeById(id?: string): number;
/**
 * 根据传入的数，加千分位与保留小数点后n位；
 * @param {*} value 要格式化的数据
 * @param {*} pointCount 保留小数点的位数
 */
export declare function toDecimalNumber(value?: number, pointCount?: number): string;
export declare const Rules: {
    chineseWord: RegExp;
    normalWord: RegExp;
    email: RegExp;
    phone: RegExp;
    fix2: RegExp;
    positive: RegExp;
    positiveInteger: RegExp;
    notNegtive: RegExp;
    notNegtiveInteger: RegExp;
    rate: RegExp;
    rate2: RegExp;
    amount: RegExp;
    percent: RegExp;
    thousandth: RegExp;
    thousandthWithPoint: RegExp;
};
