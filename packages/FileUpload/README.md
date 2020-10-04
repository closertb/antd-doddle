---
title: FileUpload 文件及时上传组件
---

FileUpload组件的出现是为了解决需求中常用的文件上传（图片预览与一般文件）， 支持模版文件预览与图片文件上传后预览，支持多文件。
## 代码演示

## API

### FileUpload 输入
| 参数名 | 作用 | 必传 | 类型 | 默认值  
--:|:--:|---:|---:|:---:   
| upload | 图片上传请求 | 是 |  fun：promise | --
| fileSize | 文件最大限制 | 否 | bool |  false
| reg | 文件类型限制 | 否 | regex | jpg, png
| tips | 类型错误提示语 | 否 | string | 请选择jpg,png类型的图片格式
| listType |  上传类型，普通文件同 | 否 |  同antd |  false
| simple | 样例，仅适用于listType为picture-card时 | 否 | array | -- 
| info | 上传前的提示语 | 否 |  string | --
| maxSize | 最大上传数量 | 否 | number | 1
| value | 初始值 | 否 | string | '',多个图片以逗号隔开
| onChange | 状态改变触发的方法 | 否 |  fun | --  
