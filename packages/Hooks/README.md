---
title: Hooks 自定义Hooks
---

Hooks

## 代码演示

## API

### Hooks 集合
| 参数        | 说明                | 
|-------------|---------------------|
| useRequest | 查询请求发起 |
| useLazyRequest | 事件请求发起 |  
| usePrevious | 初始值缓存 |
| useDeepMemo | 函数懒惰执行 |
| usePagination | 分页查询处理 |

### Request Hooks
| 参数        | 说明                | 
|-------------|---------------------|
| createRequest | 绑定请求用到的http示例，比如http.create('mock') |
| useRequest | 查询请求发起 |
| useLazyRequest | 事件请求发起 |  

#### createRequest
```js
// 在configs/http或/pages/service 中先配置设置了domain的http的示例
import { createRequest } from 'ffe-basic/hooks';

const request = http.create('mock');
const { useRequest, useLazyRequest } = createRequest(request);
```

#### useRequest
```js
// 在configs/http或/pages/service 中先配置设置了domain的http的示例
import { useRequest } from 'configs/http';

const { data = {}, loading, forceUpdate } = useRequest('/rule/query', search);

// 也可以直接引用， 但需要自己绑定http请求方法
import { useRequest } from 'ffe-basic/hooks';
const { post } = http.create('mock');

const { data = {}, loading, forceUpdate } = useRequest({
  url: '/rule/query',
  request: post,
}, search);
```

#### useRequest
```js
// 在configs/http或/pages/rule 中先配置设置了domain的http的示例
import { useRequest } from 'configs/http';

// 数组解构，返回的第一个值为唤起请求的方法
const [onSave, { data = {}, loading }] = useLazyRequest('/rule/save');
const [onUpdate, { data = {}, loading }] = useLazyRequest('/rule/update', baseData);
// 一个简单的调用示例
const onOk = useCallback(data => detail.id ? onUpdate({ id: detail.id, ...data }) : onSave(data), [detail]);

```

#### 输入
eg： useRequest(head: object | head: string, body: object, option: object)
| 参数      | 说明                                     | 类型       | 默认值 |
|----------|------------------------------------------|-----------|-------|
|  head | 关于请求方式与请求地址设置，设置为字符串时，为请求地址 | object(string) | - |
|  head.http | http请求实例 | object | - |
|  head.method | 请求方式post, get | string| post |
|  head.request | request 其实是 http[method] 快捷方式， 设置了request 会忽略前两者 | object | - |
|  body | 请求体 | object | {} |
|  option | hooks 配置 | object | {} |
|  option.skip | 是否跳过请求 | boolean | false |
|  option.prompt | lazy请求是否首次自动发起 | boolean | {} |
|  option.trigger | 因为同样的请求body 连续发起只会请求一次，所以可以通过改变body来重新发起请求 | any | -- |

### usePagination: 分页查询hooks
```javascript
import { useRequest， usePagination, setPagination } from 'ffe-basic/hooks';

// 如果你的分页参数不是pageNum 和 pageSize，可以调用这个方法来重置
// setPagination({ pageNum: 1, pageSize: 10 });

const [search, onSearch, onReset] = usePagination({});

const { data = {}, loading } = useRequest('/rule/query', search, { prompt: true });

const tableProps = {
  loading,
  onSearch,
};

const searchProps = {
  search,
  onReset,
  onSearch,
};

```

### 参见Demo
