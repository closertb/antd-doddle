import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 表单通用格式
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

export interface EnumField {
  label: 'string', // option显示标签
  value: 'string' // option值 这个类型只能定义为string，而不是string | number或any，是因为antd的option value属性只能为string
  [propName: string]: any // 其他
}

// Field定义
export interface FieldProps {
  name: string | number,
  key: string,
  type?: string
  render?: Function,
  enums?: EnumField [],
  isShow?: Function,
  itemCount?: number,
  unit?: string,
  [propName: string]: any
}

export interface SearchProps {
  pageNo?: number,
  pageNum?: number,
  pageSize?: number,
  pageCount?: number,
  [propName: string]: any
}

/**
 * @param {*} value 判断该对象是否是空对象或空数组
 */
export const isEmpty = value => value === null || (typeof value === 'object' && Object.keys(value).length === 0);

/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */
export const getEnumObject = (enums, value, key = 'value') => {
  const res = enums.filter(item => item[key] === value);
  return res.length > 0 ? res[0] : {};
};

/**
 * 根据给定的数组,转化成标准的label, value数组；如果给定的数组子集是字符串，那么value,label值都是该字符串
 * @param {array} arr 目标数组
 * @param {string} value value对应属性
 * @param {string} label label对应属性
 */
export const toFormatEnums = (arr = [], value, label) => arr
  .map(target => (typeof target === 'string' ? {
    label: target, value: target
  } : { label: target[label], value: target[value] }));


/**
 * 作用: 函数节流
 * @params: fun         需要节流执行的程序
 * @params: delay       延迟执行时间
 * @params: time        最小触发间隔
 * @return：返回值延迟执行的函数
 */
export const throttle = (fun, delay: number = 800, time: number = 300) => {
  let timeout;
  let startTime = Date.now();

  return function callback({ ...args }) {
    const curTime = Date.now();
    clearTimeout(timeout);
    if (curTime - startTime >= time) {
      fun(args);
      startTime = curTime;
    } else {
      timeout = setTimeout(() => { fun(args); }, delay);
    }
  };
};

/**
 * 功能：字符串(数字和字母)的简单加解密
 * @param {*} code 要加密的字符串
 */
const FixOffeset = 17;
export function compileParam(code: string = ''): string {
  let c = String.fromCharCode(code.charCodeAt(0) + FixOffeset + code.length);
  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c; // 增加特殊字符编码，防止'/', '&', '='等字符造成的影响
}

export function unCompileParam(code: string = ''): string {
  // const code = unescape(originCode); // 增加特殊字符的解码
  let c = String.fromCharCode(code.charCodeAt(0) - FixOffeset - code.length);
  for (let i = 1; i < code.length; i += 1) {
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
export function idCodeValid(code: string, mask?: boolean, startNum: number = 4, endNum: number = 4): boolean {
  // 修改数据时加了掩码的, 直接返回true
  if (mask && code.indexOf('*') === startNum && code.lastIndexOf('*') === (code.length + 1) - endNum) {
    return true;
  }
  const city = {
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
  let checkBool = true;

  if (!code || !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    checkBool = false;
  } else if (!city[code.substr(0, 2)]) {
    checkBool = false;
  } else if (moment(`${code.substring(6, 10)}-${code.substring(10, 12)}-${code.substring(12, 14)}`) > moment()) {
    checkBool = false;
  } else {
    const codeArr = code.split('');

    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    let ai = 0;
    let wi = 0;

    for (let i = 0; i < 17; i += 1) {
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
export function getSexById(id: string = ''): string {
  let sex = '-1';

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
export function getAgeById(id: string = ''): number {
  let age = -1;

  if (idCodeValid(id)) {
    const birth = moment(`${id.substring(6, 10)}-${id.substring(10, 12)}-${id.substring(12, 14)}`);
    const birthYear = birth.year();
    const birthMonth = birth.month();
    const birthDate = birth.date();
    const now = moment();
    const nowYear = now.year();
    const nowMonth = now.month();
    const nowDate = now.date();

    age = nowYear - birthYear;

    if (birthMonth > nowMonth || (birthMonth === nowMonth && birthDate > nowDate)) {
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
export function toDecimalNumber(value: number = 0, pointCount: number = 2):string {
  const withPoint = (+value).toFixed(pointCount);
  const reg = /(\d{1,3})(?=(\d{3})+(\.|$))/g;
  return withPoint.replace(reg, '$1,');
}

export const Rules = {
  chineseWord: /^([\u4e00-\u9fa5])+$/,
  normalWord: /^([\u4e00-\u9fa5-a-zA-Z0-9_-—])+$/, // 常规字符输入
  email: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(?:\.[0-9A-Za-z]+)+$/, // 邮箱校验
  phone: /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/, // 电话号码格式校验
  fix2: /^([1-9]\d*$)|([1-9]\d*\.(\d{1,2})$)|(0\.((0[1-9])|([1-9]\d?))$)/, // 大于0，最多保留两位小数
  positive: /(^0\.0*[1-9]+[0-9]*$)|(^[1-9]\d*(\.\d+)?$)/, // 正数
  positiveInteger: /^[1-9]\d*$/, // 正整数
  notNegtive: /^\d*(\.\d+)?$/, // 正数或0
  notNegtiveInteger: /^\d*$/, // 正整数或0
  rate: /^0\.0[1-9]\d{0,3}$|^0\.10{0,4}$/, // 输入0.01-0.1（含）之间，最多可输入五位小数
  rate2: /^0(\.0\d{0,4})?$|^0\.10{0,4}$/, // 输入0-0.1（含）之间，最多可输入五位小数
  amount: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/, // 金额最多两位小数
  percent: /^100$|^([1-9]|[1-9]\d)(\.\d{1,2})*$/, // 1-100百分比 最多两位小数
  thousandth: /(\d{1,3})(?=(\d{3})+$)/g, // 整数千分位 '13456789'.replace(reg,'$1,')
  thousandthWithPoint: /(\d{1,3})(?=(\d{3})+(\.|$))/g, // 小数加千分位  '1253456789.89'.replace(reg,'$1,')
};
