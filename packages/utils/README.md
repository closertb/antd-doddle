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
