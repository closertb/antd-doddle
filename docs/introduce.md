---
title: 介绍
order: 0
---

lina 是 carno 组件库的升级版，是对内的中台业务组件库。俗话说男主外女主内，所以这个新的组件库以刀塔 2 中一个女性英雄来命名。

## 安装

lina 是一个多包的项目，天生支持按需引入，即：想使用什么包，就安装什么包。下面我们安装两个包看看。

```sh
npm i @lina/HBasicLayout @lina/HForm
```

## 使用

通过下面的两种方式将想要使用的组件引入项目，然后组件对应的样式文件会自动加载进来。

方式一，默认方式

```javascript
import HBasicLayout from '@lina/HBasicLayout';
import HForm from '@lina/HForm';
```

方式二，这是在 galileo 中配置了 babel-plugin-import 插件，所以看起来能像 antd 一样引入组件

```javascript
import { HBasicLayout, HForm } from '@lina';
```

## 更新日志

lina 通过 deer 自动在每个组件中生成 CHANGELOG.md 文件，然后可以在网站每个组件的最下面查看。
