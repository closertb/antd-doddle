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

/**
 * @param {*} value 判断该对象是否是空对象或空数组
 */
export const isEmpty = value => typeof value === 'object' && Object.keys(value).length === 0;

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
 * 根据给定的数组,转化成标准的label, value数组；
 * @param {array} arr 目标数组
 * @param {string} value value对应属性
 * @param {string} label label对应属性
 */
export const toFormatEnums = (arr = [], value, label) =>
  arr.map(target => ({ label: target[label], value: target[value] }));

/**
 * 作用：拼接区域和详细地址，处理一些特殊情况
 * @param {Object} value  { id, name, address }
 */
export const concatAddress = (value) => {
  const { id = '', name, address } = value;
  const temp = name ? name.split('-') : [];
  let regionName = '';
  // 如果选择中包含了全四川，全成都这种字样，则只有一项有效;
  if (`${id}`.length < (temp.length * 2)) {
    temp.pop();
  }
  // 处理天津-天津，上海-上海, 处理几个直辖市
  if (temp.length > 1 && temp[0] === temp[1]) {
    regionName = `${temp[1]}市`;
    if (temp.length > 2) {
      regionName += temp[2];
    }
  } else {
    regionName = temp.join('');
  }
  return `${regionName}${address}`;
};

/**
 * 作用: 函数节流
 * @params: fun         需要节流执行的程序
 * @params: delay       延迟执行时间
 * @params: time        最小触发间隔
 * @return：返回值延迟执行的函数
 */
export const throttle = (fun, delay = 800, time = 300) => {
  let timeout;
  let startTime = new Date();

  return function callback({ ...args }) {
    const curTime = new Date();
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
 * 功能：字符串的简单加解密
 * @param {*} code 要加密的字符串
 */
export function compileParam(code = '') {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
}

export function unCompileParam(code = '') {
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
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
export function idCodeValid(code, mask, startNum = 4, endNum = 4) {
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
      ai = codeArr[i];
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
export function getSexById(id = '') {
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
export function getAgeById(id = '') {
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
export function toDecimalNumber(value = 0, pointCount = 2) {
  const withPoint = value.toFixed(pointCount);
  const reg = /(\d{1,3})(?=(\d{3})+(\.|$))/g;
  return withPoint.replace(reg, '$1,');
}

/**
 * 从动态表单中提取list数据
 * @param: Object values 动态表单对象， like：{ name1: 1, value1: 1, name2: '2', value2: 2 }
 * @return：返回值是一个数组：[{name: 1, value: 2 }, { name: 2, value: 2 }]
 */
export function objectToList(values) {
  const regExp = /-\d$/;
  const indexObj = {};
  // 筛选当前Form的'field-num'字符串到list数组中
  const list = Object.keys(values).filter(x => regExp.test(x));
  const arr = list.reduce((arr, x) => {
    const field = x.split('-')[0]; // 列名
    const i = x.split('-')[1]; // arr index，index有可能能不是连贯的
    const obj = arr[i] || {};
    indexObj[i] = i; // 记录出现过的Index
    obj[field] = values[x];
    arr[i] = obj;
    return arr;
  }, []);
  // 因为index可能不是连贯的，所以可能某些数组是空的
  return {
    indexObj, // 出现过的index
    list: arr.filter(obj => Object.keys(obj).length)
  };
}

