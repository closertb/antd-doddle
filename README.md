## 摘要 ##
金融组基础组件与方法

组件：
formRender: 包含装饰器的表单组件
WithSearch：搜索框组件
HModal: 最早的carno Hmodal组件
EnhanceTable：用法通HTable，传参更少
RenderDetail：详情渲染组件
OriginSearch：搜索下拉框选择组件
DaynamicForm：动态增减下拉框组件
UploadImg： 简单图片上传组件
FileUpload：文件上传（也可传图片）组件，支持与装饰器继承，支持样板设置，与初始上传提醒

utils 常用方法集合，default导出
DATE_FORMAT： 标准日期格式，YYYY-MM-DD
DATE_TIME_FORMAT： 标准时间格式，YYYY-MM-DD HH:mm:ss
formItemLayout： 表单布局通用格式， label：wrapper = 8 ：15
isEmpty：判断输入是否是空对象或空数组
getEnumObject：根据指定的枚举值和枚举数组，找出其枚举对应的数组索引
toFormatEnums： 将后端返回的对象转化成标准的label，value对象数组
concatAddress： 用于地址拼接，常与citypicker套用
throttle：节流函数
compileParam：详情跳转参数简单加密
unCompileParam： 详情跳转参数简单解密
creditCodeValid：统一社会信用代码校验
idCodeValid：校验身份证号码是否合法
getSexById： 通过身份证号获取性别
getAgeById： 根据身份证号码获取年龄
toDecimalNumber：金额数据千分位化与保留小数点后n位
objectToList： 从动态表单中提取list数据