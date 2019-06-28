---
title: decorator 常用装饰器
---

decorator是个人总结的一些装饰器方法，目前只包含了四个装饰器

eg:
``` 
import { log, form } from 'antd-doddle/decorator';
```  

## API
bind：this绑定, 使用同autobind  

throttle：节流函数, 支持time和delay设置  

form: antd Form.create()的高阶组件装饰器写法  

log： 打印方法的输入输出
