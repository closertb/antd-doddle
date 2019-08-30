export default function log(target?: any, prop?: any, descriptor?: any): {
    configurable: boolean;
    value: (...args: any[]) => any;
};
