export default function log(target?: any, prop?: any, descriptor?: any) {
  // const fun = target[prop];
  const fun = descriptor.value || (descriptor.get && descriptor.get());
  function logFun(...args) {
    console.log(`function ${prop} is start, with the arguments`, args);
    const result = fun.apply(this, args);
    console.log(`function ${prop} excute finished, and the result is ***${result || ''}***`);
    return result;
  }
  return {
    configurable: true,
    value: logFun
  };
}
