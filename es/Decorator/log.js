export default function log(target, prop, descriptor) {
  // const fun = target[prop];
  var fun = descriptor.value || descriptor.get && descriptor.get();

  function logFun() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.log("function ".concat(prop, " is start, with the arguments"), args);
    var result = fun.apply(this, args);
    console.log("function ".concat(prop, " excute finished, and the result is ***").concat(result || '', "***"));
    return result;
  }

  return {
    configurable: true,
    value: logFun
  };
}