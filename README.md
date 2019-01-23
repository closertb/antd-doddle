## create-doddle ##
一个简易的脚手架，一键创建一个简易的react项目；
使用了ES7语法，且未编译，所以node版本为8最好
## 操作指南 ##
npm install create-doddle -g
create-doddle [options] ***templateType*** ***projectName***

templateType(模板类型)，有四种模板可选：  

 - react（当前仅该项可用）
 - vue
 - dva
 - h5

 projectName(项目名称)，基于当前命令执行路径，并将模板拷贝到这个项目文件夹下

 options(可选参数)：
  - -f: 强制删除当前命令执行路径下已存在的projectName文件夹；
  - -h：帮助，commander原生提供

