function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import moment from 'moment';
export var DATE_FORMAT = 'YYYY-MM-DD';
export var DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'; // 表单通用格式

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
      span: 15
    }
  }
};
/**
 * @param {*} value 判断该对象是否是空对象或空数组
 */

export var isEmpty = function isEmpty(value) {
  return value === null || _typeof(value) === 'object' && Object.keys(value).length === 0;
};
/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */

export var getEnumObject = function getEnumObject(enums, value) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value';

  if (Array.isArray(enums)) {
    var res = enums.filter(function (item) {
      return item[key] === value;
    });
    return res.length > 0 ? res[0] : {};
  }

  return {
    label: enums[value] || ''
  };
};
/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签值；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */

export var getValueFromEnums = function getValueFromEnums(enums, value) {
  return getEnumObject(enums, value).label;
};
/**
 * 根据给定的数组,转化成标准的label, value数组；如果给定的数组子集是字符串，那么value,label值都是该字符串
 * @param {array} arr 目标数组
 * @param {string} value value对应属性
 * @param {string} label label对应属性
 */

export var toFormatEnums = function toFormatEnums() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 ? arguments[1] : undefined;
  var label = arguments.length > 2 ? arguments[2] : undefined;
  return arr.map(function (target) {
    return typeof target === 'string' ? {
      label: target,
      value: target
    } : {
      label: target[label],
      value: target[value]
    };
  });
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
  var startTime = Date.now();
  return function callback(_a) {
    var args = __rest(_a, []);

    var curTime = Date.now();
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
 * 功能：字符串(数字和字母)的简单加解密
 * @param {*} code 要加密的字符串
 */

var FixOffeset = 17;
export function compileParam() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var c = String.fromCharCode(code.charCodeAt(0) + FixOffeset + code.length);

  for (var i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }

  return c; // 增加特殊字符编码，防止'/', '&', '='等字符造成的影响
}
export function unCompileParam() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  // const code = unescape(originCode); // 增加特殊字符的解码
  var c = String.fromCharCode(code.charCodeAt(0) - FixOffeset - code.length);

  for (var i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }

  return c;
}
/**
 * 校验身份证号码是否合法
 * @param String  id   合法的身份证编号
 * @param Boolean mask 身份证编号是否包含掩码
 * return Boolean 对于有掩码的身份证号码，只校验掩码格式是否正确，通用是前四位为最后四位为明码
 * 对于不包含掩码的，按国家规定格式校验。为真返回true
 */

export function idCodeValid(code, mask) {
  var startNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var endNum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

  // 修改数据时加了掩码的, 直接返回true
  if (mask && code.indexOf('*') === startNum && code.lastIndexOf('*') === code.length + 1 - endNum) {
    return true;
  }

  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  var checkBool = true;

  if (!code || !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    checkBool = false;
  } else if (!city[code.substr(0, 2)]) {
    checkBool = false;
  } else if (moment("".concat(code.substring(6, 10), "-").concat(code.substring(10, 12), "-").concat(code.substring(12, 14))) > moment()) {
    checkBool = false;
  } else {
    var codeArr = code.split(''); // 加权因子

    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 校验位

    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;

    for (var i = 0; i < 17; i += 1) {
      ai = +codeArr[i];
      wi = factor[i];
      sum += ai * wi;
    }

    if (parity[sum % 11].toString() !== codeArr[17]) {
      checkBool = false;
    }
  }

  return checkBool;
}
/**
 * 根据身份证号码获取性别
 * @param  String id 合法的身份证编号
 * @return String 合法返回0或1，0为男，1位女，不合法返回-1
 */

export function getSexById() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var sex = '-1';

  if (idCodeValid(id)) {
    if (parseInt(id.substr(16, 1), 10) % 2 === 1) {
      // 男
      sex = '0';
    } else {
      // 女
      sex = '1';
    }
  }

  return sex;
}
/**
 * 根据身份证号码获取年龄
 * @param String id 合法的身份证编号
 * return Number 合法返回对应年龄，不合法返回-1
 */

export function getAgeById() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var age = -1;

  if (idCodeValid(id)) {
    var birth = moment("".concat(id.substring(6, 10), "-").concat(id.substring(10, 12), "-").concat(id.substring(12, 14)));
    var birthYear = birth.year();
    var birthMonth = birth.month();
    var birthDate = birth.date();
    var now = moment();
    var nowYear = now.year();
    var nowMonth = now.month();
    var nowDate = now.date();
    age = nowYear - birthYear;

    if (birthMonth > nowMonth || birthMonth === nowMonth && birthDate > nowDate) {
      age -= 1;
    }
  }

  return age;
}
/**
 * 根据传入的数，加千分位与保留小数点后n位；
 * @param {*} value 要格式化的数据
 * @param {*} pointCount 保留小数点的位数
 */

export function toDecimalNumber() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pointCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var withPoint = (+value).toFixed(pointCount);
  var reg = /(\d{1,3})(?=(\d{3})+(\.|$))/g;
  return withPoint.replace(reg, '$1,');
}
/**
 * description: 类型检测工具对象
 * isObject: 是否是对象
 * isFunction: 是否是函数
 * isArray: 是否是数组
 * isString: 是否为字符串
 * isNumber: 是否为数字
 * isEmpty: 是否为空
 * */

export var Type = {
  isObject: function isObject(source) {
    return Object.prototype.toString.call(source) === '[object Object]';
  },
  isFunction: function isFunction(source) {
    return source != null && (source.constructor === Function || source instanceof Function);
  },
  isArray: function isArray(source) {
    return Array.isArray(source);
  },
  isString: function isString(source) {
    return typeof source === 'string' || !!source && _typeof(source) === 'object' && Object.prototype.toString.call(source) === '[object String]';
  },
  isNumber: function isNumber(source) {
    return source != null && (source.constructor === Number || source instanceof Number);
  },
  isEmpty: function isEmpty(value) {
    // null 或者 未定义，则为空
    if (value === null || value === undefined) {
      return true;
    } // 传入空字符串，则为空


    if (typeof value === 'string') {
      return value === '';
    } // 传入函数，则不为空


    if (typeof value === 'function') {
      return false;
    } // 传入数组长度为0，则为空


    if (value instanceof Array) {
      return !value.length;
    } // 传入空对象，则为空


    if (value instanceof Object) {
      for (var key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          return false;
        }
      }

      return true;
    }
  }
};
export var Rules = {
  chineseWord: /^([\u4e00-\u9fa5])+$/,
  normalWord: /^([\u4e00-\u9fa5-a-zA-Z0-9_-—])+$/,
  email: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(?:\.[0-9A-Za-z]+)+$/,
  phone: /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/,
  fix2: /^([1-9]\d*$)|([1-9]\d*\.(\d{1,2})$)|(0\.((0[1-9])|([1-9]\d?))$)/,
  positive: /(^0\.0*[1-9]+[0-9]*$)|(^[1-9]\d*(\.\d+)?$)/,
  positiveInteger: /^[1-9]\d*$/,
  notNegtive: /^\d*(\.\d+)?$/,
  notNegtiveInteger: /^\d*$/,
  rate: /^0\.0[1-9]\d{0,3}$|^0\.10{0,4}$/,
  rate2: /^0(\.0\d{0,4})?$|^0\.10{0,4}$/,
  amount: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
  percent: /^100$|^([1-9]|[1-9]\d)(\.\d{1,2})*$/,
  thousandth: /(\d{1,3})(?=(\d{3})+$)/g,
  thousandthWithPoint: /(\d{1,3})(?=(\d{3})+(\.|$))/g
};