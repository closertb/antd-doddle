import _extends from "D:\\Company Progects\\ffe-basic\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/extends";
export var DATE_FORMAT = 'YYYY-MM-DD';
export var DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
/**
 * @param {*} value 判断该对象是否是空对象或空数组
 */

export var isEmpty = function isEmpty(value) {
  return typeof value === 'object' && Object.keys(value).length === 0;
}; // 表单通用格式

export var formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 14
    }
  }
};
/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */

export var getEnumObject = function getEnumObject(enums, value) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value';
  var res = enums.filter(function (item) {
    return item[key] === value;
  });
  return res.length > 0 ? res[0] : {};
};
/**
 * 作用：拼接区域和详细地址，处理一些特殊情况
 * @param {Object} value  { id, name, address }
 */

export var concatAddress = function concatAddress(value) {
  var _value$id = value.id,
      id = _value$id === void 0 ? '' : _value$id,
      name = value.name,
      address = value.address;
  var temp = name ? name.split('-') : [];
  var regionName = ''; // 如果选择中包含了全四川，全成都这种字样，则只有一项有效;

  if ("".concat(id).length < temp.length * 2) {
    temp.pop();
  } // 处理天津-天津，上海-上海, 处理几个直辖市


  if (temp.length > 1 && temp[0] === temp[1]) {
    regionName = "".concat(temp[1], "\u5E02");

    if (temp.length > 2) {
      regionName += temp[2];
    }
  } else {
    regionName = temp.join('');
  }

  return "".concat(regionName).concat(address);
};
/**
 * 作用: 函数节流
 * @params: fun         需要节流执行的程序
 * @params: delay       延迟执行时间
 * @params: time        最小触发间隔
 * @return：返回值延迟执行的函数
 */

export var throttle = function throttle(fun) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var timeout;
  var startTime = new Date();
  return function callback(_ref) {
    var args = _extends({}, _ref);

    var curTime = new Date();
    clearTimeout(timeout);

    if (curTime - startTime >= time) {
      fun(args);
      startTime = curTime;
    } else {
      timeout = setTimeout(function () {
        fun(args);
      }, delay);
    }
  };
};
/**
 * 功能：字符串的简单加解密
 * @param {*} code 要加密的字符串
 */

export function compileParam() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);

  for (var i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }

  return c;
}
export function unCompileParam() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);

  for (var i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }

  return c;
}