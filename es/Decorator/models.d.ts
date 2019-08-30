/**
 * @description 显示警告信息
 * @param {boolean} condition 提示条件
 * @param {string} message 提示信息
 */
export declare function warning(condition: any, message: any): void;
/**
 * @description 检查是否为字符串
 * @param {*} string
 */
export declare function isString(string: any): boolean;
export declare function setApp(_app: any): void;
export default function model(namespace: any): (WrapperComponent: any) => any;
