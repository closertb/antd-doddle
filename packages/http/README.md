### 如何创建 http 实例
安装  
npm i @doddle/dva --save  

`Http`是请求类`class`, 实际使用的时候，需要创建一个实例化的对象, 可通过以下两种方式创建新的实例

- Http.create(config)
- new Http(config)

两种创建都默认会添加 defaults middlewares`配置.

```javascript
//在应用系统先创建一个基础的http实例，其他的http再通过实例的create方法来扩展
http.create('domain');
```

**config 参数**

| 参数           | 说明                          | 类型     | 默认值 |
| -------------- | ----------------------------- | -------- | ------ |
| servers        | 支持的服务域名对象            | object   | {}     |
| query          | 统一查询字符串                | function | --     |
| contentKey     | 响应数据中业务数据对应的`key` | string   | form   |
| beforeRequest  | 请求发起前自定义中间件集合    | array    | []     |
| beforeResponse | 请求响应前自定义中间件集合    | array    | []     |

### 如何发送`ajax`请求

通过上述方法创建实例后，可通过实例上的`get`以及`post`等方法发送`ajax`请求

```javascript
// url请求的路径，data请求的数据，options参数
get(url, data, options);
post(url, data, options);

// example

// util/http.js
import Http from '@doddle/http';

// 创建base http实例
export default Http.create({
  servers: getEnvServers(), // 必传
  query() {
    return {
      token: cookie.get('token'),
    };
  },
});

// servers/admin.js
import http from 'utils/http';

const { get, post } = http.create('admin');

export function getUserList(params) {
  return get('/get/user/list', params);
}

export function saveUser(user) {
  return post('/save/user', user);
}

export function deleteUser(id) {
  return get('/save/user', { id }, { ignoreErrorModal: true });
}
```

**options 参数**

| 参数        | 说明                                | 类型    | 默认值 |
| ----------- | ----------------------------------- | ------- | ------ |
| ignoreQuery | 是否忽略携带 query 参数             | boolean | false  |
| contentType | 参数类型, 支持 form, formData, json | string  | form   |

### HTTP 中间件

http 的核心是通过中间件以及配置对象实现，可通过在 http 实例构造时，在 beforeQuest 或 beforeResponse 中设置，也可通过 http.use(middleware, order)中设置；

```javascript
// 默认中间件, 也是其依次处理的顺序
  addRequestDomain,
  addRequestQuery,
  fetchRequest,
  responseStatusHandle,
  responseContentHandle,
```

- **requestDomain**  
  domain 中间件，发送请求后，自动给`url`加上对应的`server`地址, 需要配合`servers`使用

- **requestQuery**  
  查询字符串中间件，主要用于添加统一的权限字符串，需要配合`query`参数使用

- **fetchRequest**  
  fetch 发起，核心

- **responseStatusHandle**  
  响应状态码中间件，如果状态码`status >= 200 && status < 300` 则代表请求成功，否则将请求结果设置为失败

- **responseContentHandle**
  依据 contentKey,自动将响应中数据对应的 key，作为最后的响应结果

## 设计思路

### 洋葱模型

学过或了解过 Node 服务框架 Koa 的，都或许听过洋葱模型和中间件。恩，就是吃的那个洋葱，见下图：
![image](https://user-images.githubusercontent.com/22979584/64966275-0f6bd380-d8d1-11e9-9219-28ea026e3030.png)  
Koa 是通过洋葱模型实现对 http 封装，中间件就是一层一层的洋葱，这里推荐两个 Koa 源码解读的文章，当然其源码本身也很简单，可读性非常高。

- [Koa.js 设计模式-学习笔记][1]
- [从头实现一个 koa 框架][2]

我这里不过多讲关于 Koa 的设计模式与源码，理解 Koa 的中间件引擎源码就行了。写这篇文章的目的，是整理出我参照 Koa 设计一个 Http 构造类的思路，此构造类用于简化及规范日常浏览器端请求的书写：

```javascript
// Koa中间件引擎源码
function compose(middlewares = []) {
  if (!Array.isArray(middlewares))
    throw new TypeError('Middleware stack must be an array!');

  for (const fn of middlewares) {
    if (typeof fn !== 'function')
      throw new TypeError('Middleware must be composed of functions!');
  }

  const { length } = middlewares;
  return function callback(ctx, next) {
    let index = -1;
    function dispatch(i) {
      let fn = middlewares[i];
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'));
      index = i;
      if (i === length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return dispatch(0);
  };
}
```

### Fetch

[概念（摘自 MDN）][4]: Fetch 的核心在于对 HTTP 接口的抽象，包括 Request，Response，Headers，Body，以及用于初始化异步请求的 global fetch。得益于 JavaScript 实现的这些抽象好的 HTTP 模块，其他接口能够很方便的使用这些功能。听着咋感觉有点像浏览器端的 Koa(joke)。但是使用上对我们业务编写还是不那么友好，虽然相较于 ajax，已经好太多。下面展示两个用 fetch 发送 get 请求和 post 请求的代码示例：

```javascript
  语法： Promise<Response> fetch(input[, init]);
  ** 以下代码展示都是以input字段为请求url的方式展示
  // get 请求
  fetch('http://server.closertb.site/client/api/user/getList?pn=1&ps=10')
   .then(response => {
     if(reponse.ok) {
       return data.json();
      } else {
       throw Error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
     }
  })
   .then((data) => { console.log(data); });

  // post 请求
  fetch('http://server.closertb.site/client/api/user/getList',
    {
      method: 'POST',
      body: 'pn=1&ps=10',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  ).then(response => {
     if(reponse.ok) {
       return data.json();
      } else {
       throw Error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
     }
  })
   .then((data) => { console.log(data); })
```

从上面的示例,我们可以感觉到，每一个请求发起，都需要用完整的 url，遇到 post 请求，设置 Request Header 是一个比较大的工作，接收响应都需要判断 respones.ok 是否为 true(如果不清楚，请参见 mdn 链接)，然后 response.json()得到返回值，有可能返回值中还包含了 status 与 message，所以要拿到最终的内容，我们还得多码两行代码。如果某一天，我们需要为每个请求加上凭证或版本号，那代码更改量将直接 Double, 所以希望设计一个基于 fetch 封装的，支持中间件的 Http 构造类来简化规范日常前后端的交互，比如像下面这样：

```javascript
  // 在一个config.js 配置全站Http共有信息, eg：
  import Http from '@doddle/http';

  const servers = {
    admin: 'server.closertb.site/client',
    permission: 'auth.closertb.site',
  }
  export default Http.create({
    servers,
    contentKey: 'content',
    query() {
      const token = cookie.get('token');
      return token ? { token: `token:${token}` } : {};
    },
    ...
  });

  // 在services.js中这样使用
  import http from '../configs.js';

  const { get, post } = http.create('admin');
  const params = { pn: 1, ps: 10 };

  get('/api/user/getList', params)
    .then((data) => { console.log(data); });


  post('/api/user/getList', params, { contentType: 'form' })
    .then((data) => { console.log(data); });
```

上面的代码，看起来是不是更直观，明了。

### 设计分析

从上面的分析，这个 Http 构造类需要包含以下特点：

- 服务 Url 地址的拼接，支持多个后端服务
- 请求地址带凭证或其他统一标识
- 请求状态判断
- 请求目标内容获取
- 错误处理
- 请求语义化，即 get, post, put 这种直接标识请求类型
- 请求参数格式统一化

### Talk is Cheap

#### Http 类

参照上面的理想化示例，首先尝试去实现 Http.create：

```javascript
export default class Http {
  constructor(options) {
    const { query, servers = {}, contentKey = '', beforeRequest = [], beforeResponse = [],
      errorHandle } = options;
    this.servers = servers;
    this.key = contentKey;
    this.before = beforeRequest;
    this.after = beforeResponse;
    this.query = query;
    this.errorHandle = errorHandle;
    this.create = this.create.bind(this);
    this._middlewareInit();
  }
  // 静态方法, 语义化实例构造
  static create(options) {
    return new Http(options);
  }
  // 中间件初始化方法，内部调用
  _middlewareInit() {
    const defaultBeforeMidd = [addRequestDomain, addRequestQuery];
    const defaultAfterMidd = [responseStatusHandle, responseContentHandle];

    this._middleWares = this._middleWares || defaultBeforeMidd
      .concat(this.before)
      .concat(fetchRequest)
      .concat(defaultAfterMidd)
      .concat(this.after);
      this._handlers = compose(this._middleWares); // compose即为开头提到的koa核心代码
    }
  }
  // 中间件扩展， like Koa
  use(fn, order) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    let _order = order || 0;
    // 插入位置不对，自动纠正
    if (typeof _order !== 'number' || _order > this._middleWares.length) {
      _order = this._middleWares.length;
    }
    this._middleware.spicle(order || this._middleWares.length, 0, fn);
    this._middlewareInit();
  }
  // 请求实例构造方法
  create(service) {
    this._instance = new Instance({
      domain: this.servers[service], // 服务地址
      key: this.key,
      query: this.query,
      errorHandle: this.errorHandle,
      handlers: this._handlers,
    });
    return requestMethods(this._instance.fetch);  // requestMethods = { get, post, put };
  }
}
```

直接贴代码，也是一种无赖之举。每个方法功能都非常简单，但从 use 和\_middlewareInit 方法， 可以看出和 koa 的中间件有所区别，这里采用的中间件是一种尾触发方式（中间件按事先排好的顺序调用），在后面会进一步体现。

#### requestMethods

关于 requestMethods，其类似于一种策略模式，这里将每一种请示类型，抽象成一个具体的策略，在实例化某个服务的请求时，将得到一系列策略，将 resetful 语义函数化：

```javascript
// 关于genHeader函数，请查看源码，这里的fetch是中间件包装后的；
export const requestMethods = fetch => ({
  get(url, params, options = {}) {
    return fetch(`${url}?${qs.stringify(params)}`, params, options);
  },
  post(url, params, options = {}) {
    const { type } = options;
    return fetch(`${url}`, genHeader(type, params), options);
  },
});
```

#### Instance 类

关于 Instance, 每个实例的服务域名是一致的，所以其作用更多是每个**服务**创建一个执行上下文，用于存储 request, response, 并做错误处理, 实现也非常简单：

```javascript
export default class Instance {
  // configs 包括domain， key， query
  constructor({ handlers, errorHandle, ...configs }) {
    this.configs = configs;
    this.errorHandle = errorHandle;
    this.handlers = handlers;
    this.fetch = this.fetch.bind(this);
    this.onError = this.onError.bind(this);
  }

  fetch(url, params, options) {
    const configs = this.configs;
    const ctx = Object.assign({}, configs, { url, options, params });
    return this.handlers(ctx)
      .then(() => ctx.data)
      .catch(this._onError);
  }

  _onError(error) {
    if (this.errorHandle) {
      this.errorHandle(error);
    } else {
      defaultErrorHandler(error);
    }
    return Promise.reject({});
  }
}
```

关于 Object.assign 创建 ctx, 是为了同一个服务多个请求发起时，上下文不相互影响。

#### 默认中间件实现

正如设计分析时提到的，默认中间件包含了请求地址服务域名拼接，凭证携带，状态判断，内容提取，中间件可采用 async/await，也可用常规函数，见示例代码：

```javascript
export function addRequestDomain(ctx, next) {
  const { domain } = ctx;
  ctx.url = `${domain}${ctx.url}`;
  return next();
}

export function addRequestQuery(ctx, next) {
  const {
    query,
    options: { ignoreQuery = false },
  } = ctx;
  const queryParams = query && query();
  // ignoreQuery 确认忽略，或者queryParams为空或压根不存在；
  ctx.url =
    ignoreQuery || !queryParams
      ? ctx.url
      : `${ctx.url}?${qs.stringify(queryParams)}`;
  return next();
}

export async function fetchRequest(ctx, next) {
  const { url, params } = ctx;
  try {
    ctx.response = await fetch(url, params);
    return next();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function responseStatusHandle(ctx, next) {
  const { response = {} } = ctx;
  if (response.ok) {
    ctx.data = await response.json();
    ctx._response = ctx.data;
    return next();
  } else {
    return Promise.reject(response);
  }
}

export function responseContentHandle(ctx, next) {
  const { key, _response } = ctx;
  ctx.data = key ? _response[key] : _response;
  return next();
}
```

每个中间件代码都非常简单易懂，这也是为什么要采用中间件的设计模型，因为将功能解耦，易于扩展。同时也能看到，next 作为每个中间件的最后执行步骤，这种模式就是传说中的中间件尾调用模式。

### 写在最后

感谢你读到了这里，开始想写的非常多，但高考语文 89 分，不是偶然出现的。在实现一个用于日常生产的 Http 构造类，过程并不像这里写出来的这么简单，需要考虑和权衡的东西非常多，错误处理是关键。这里留了自己踩过的两个坑（更多是因为自己菜），这里没展开来讲，思考：

- 为什么每个中间件最后要 return next();
- query 为什么是在中间件中执行，而不是在 fetch 前执行，然后传参过来；

本文的 demo 可在此[github 地址][5]下载，分支是 http；  
执行用例可在此[github 地址][6]下载,分支是 dva, 详细操作查看 Readme； 
如果你有兴趣在你的项目尝试，可查阅[npm使用指南][7]
```shell
npm i @doddle/dva --save 
```  

[1]: https://chenshenhai.github.io/koajs-design-note/
[2]: https://zhuanlan.zhihu.com/p/35040744
[3]: https://segmentfault.com/a/1190000010107288
[4]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Basic_concepts
[5]: https://github.com/closertb/antd-doddle
[6]: https://github.com/closertb/template
[7]: https://www.npmjs.com/package/@doddle/http