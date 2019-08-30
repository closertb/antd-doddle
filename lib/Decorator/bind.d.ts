/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
export declare function boundMethod(target?: any, key?: any, descriptor?: any): {
    configurable: boolean;
    get(): any;
    set(value: any): void;
};
/**
 * Use boundMethod to bind all methods on the target.prototype
 */
export declare function boundClass(target?: any): any;
export default function bind(...args: any[]): any;
