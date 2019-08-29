export default function throttle(...args: any[]): {
    configurable: boolean;
    get(): any;
} | ((target: any, prop: any, descriptor: any) => {
    configurable: boolean;
    get(): any;
});
