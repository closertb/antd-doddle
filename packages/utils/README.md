---
title: utils 公共方法库
---

utils是一个常用方法集，也包含一些常用枚举定义   

eg:
``` 
import { DATE_FORMAT, getEnumObject } from 'antd-doddle/utils';
```  

## 常量
DATE_FORMAT： 标准日期格式，YYYY-MM-DD  
DATE_TIME_FORMAT： 标准时间格式，YYYY-MM-DD HH:mm:ss  
formItemLayout： 表单布局通用格式， label：wrapper = 8 ：15  

## API
isEmpty：判断输入是否是空对象或空数组  
getEnumObject：根据指定的枚举值和枚举数组，找出其枚举对应的数组索引  
toFormatEnums： 将后端返回的对象转化成标准的label，value对象数组  
throttle：节流函数  
compileParam：详情跳转参数简单加密  
unCompileParam： 详情跳转参数简单解密 
idCodeValid：校验身份证号码是否合法  
getSexById： 通过身份证号获取性别  
getAgeById： 根据身份证号码获取年龄  
toDecimalNumber：金额数据千分位化与保留小数点后n位  

## 正则表达式
使用  
``` 
import { Rules } from 'antd-doddle/utils';

const { email } = Rules;
```    

支持的正则有：
```
  chineseWord: /^([\u4e00-\u9fa5])+$/, // 中文输入
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
  thousandth: /(\d{1,3})(?=(\d{3})+$)/g, //整数千分位 '13456789'.replace(reg,'$1,')
  thousandthWithPoint: /(\d{1,3})(?=(\d{3})+(\.|$))/g, //小数加千分位  '1253456789.89'.replace(reg,'$1,')
```  