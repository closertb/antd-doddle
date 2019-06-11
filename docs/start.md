---
title: 开发规范
order: 1
---

## 准备

在开始之前，推荐先学习 React 和 ES2015，并正确安装和配置了 Node.js v8 或以上。

全局安装`@hcb/deer`开发流程工具，使用[文档](https://confluence.56qq.cn/pages/viewpage.action?pageId=35914461)。

```sh
npm i @hcb/deer -g
```

## 命令

lina 的命令都在根目录下使用。

### 安装运行

```sh
npm i && npm start
```

然后访问 localhost:8088 就可以看到组件库网站。

⚠️ 注意：不要安装组件的依赖包，否则会导致运行报错。

### 发布

发布的时候，全部使用 deer 的流程规范，具体命令介绍见上面的文档。

```sh
deer add
deer ct
deer pr -o -g
deer release
npm run publish
```

温馨提示：

- 在发布之前，记得拉下代码，避免发布的时候报错
- 发布的时候会自动 build，不用手动去执行 build 命令

## bisheng

我们使用 bisheng 作为组件库网站的构建工具。

### bisheng.conig.js 配置文件

bisheng 的配置文件是 bisheng.config.js，它可以修改网站的配置，也可以修改 babel 和 webpack 的配置。

#### webpackConfig 函数

webpack 对象是 webpackConfig 方法传递过来的，通过对此对象进行修改实现我们想要的打包效果。

下面是 lina 的对 webpack 对象的修改。

```javascript
webpackConfig(config) {
  config.devtool = 'source-map';
  config.resolve.alias = {
    '@lina/HAuthorized$': path.join(process.cwd(), 'packages', 'HAuthorized', 'src', 'index'),
    '@lina/HForm$': path.join(process.cwd(), 'packages', 'HForm', 'src', 'index'),
  };

  alertLessConfig(config.module.rules);

  return config;
},
```

主要做的事情有：

- 添加了 demo 展示需要的别名，让它们使用 lina 自身的组件
- 修复了 less-loader 版本导致不能在 less 中使用 javascript 报错的问题

另外，bisheng 没有提供专门的 babel 配置修改入口，只能遍历 babel-loader 来修改 babelConfig。

## 组件

在 lina 这个项目里面，bisheng 会扫描 packages 目录下文件，从而渲染出我们的网站页面和 demo 示例。

### 样式

组件中使用 less 或 css 作为样式文件。业务代码中可以通过下面的方式进行样式覆盖，和 antd 样式覆盖类似。

```css
.wrapper {
  :global(.h-basic-layout-globalFooter) {
  }
}
```

⚠️ 注意：以前是在项目入口文件引入的 carno/dist/index.css，现在 lina 进行了分包，不再提供全量的 css，引入组件的地方会自动带上它的样式。

### 如何添加一个组件

1）创建目录

```sh
npx lerna create HTest -y
```

2）修改 package.json 的 name 和 main

```diff
{
+ "name": "@lina/HTest",
- "name": "HTest",
  "version": "0.0.14-alpha.0",
  "description": "> TODO: description",
  "author": "gogo <xiaotian.zhang@56qq.com>",
  "homepage": "",
  "license": "ISC",
+ "main": "lib/index.js",
- "main": "lib/HTest.js",
  ...
}
```

3）修改 README.md，使它里面的内容变成 bisheng 能够识别的格式  
在文件顶部添加如下内容：

```md
---
title: HTest 测试组件
---
```

运行 npm start，导航栏上就可以看到 HTest 组件了。

4）添加组件源码  
新增 ./packages/HTest/src/index.js 文件，假设我们添加的是一个按钮组件。

```javascript
import { Button } from 'antd';

export default Button;
```

5）添加 demo。必须将下面内容全部做完才能看到效果  
新增 ./packages/HTest/demo/Basic.md 文件，添加一个默认示例。

    ---
    title: 默认示例
    order: 0
    ---

    默认示例

    ```jsx
    import React from 'react';
    import HTest from '@lina/HTest';

    function Basic() {
      return <HTest />;
    }

    ReactDOM.render(<Basic />, mountNode);
    ```

再次修改 README.md，添加`## API`

```diff
---
title: HTest 测试组件
---

+ ## API
```

再次运行 npm start，就可以看到 HTest 组件的第一个 demo 了。如果想要添加更多的示例，就在 demo 文件夹中添加更多的 md 文件就好了。

⚠️ 注意事项：

- 每个组件中只能有 README.md、CHANGELOG.md 和 demo 中的多个 md 文件，否则运行就会报错
- demo 中如果引入了第三方库，需要将它安装在最外层，因为当前组件中如果有 node_modules 文件夹，可能会因为存在多余 md 导致上面的问题。另外，将此第三方库加到当前组件的 package.json 中，避免业务组使用的时候缺少依赖报错
