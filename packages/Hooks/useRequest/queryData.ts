import { Result, Options, AnyObject } from '../common';

const STATUS = {
  init: 0, // 初始化
  fetch: 1, // 请求发起
  success: 2, // 请求结束正常
  error: 3, // 请求结束异常
  finish: 4, // 请求完成
};

export default class QueryData {
  url: string
  options: Options
  configs: AnyObject
  body: AnyObject
  initData: AnyObject
  request: any
  result: Result
  status: number
  firstTrigger: boolean
  lazyCalling: boolean
  forceUpdate: () => void
  constructor({ url, options, body = {}, request = {}, configs = {} }, { forceUpdate }) {
    this.url = url;
    this.options = options;
    this.configs = configs;
    this.body = body;
    this.initData = Object.assign({}, body);
    this.request = request;
    this.result = { loading: false, data: undefined };
    this.status = STATUS.init;
    this.firstTrigger = options.prompt;
    this.forceUpdate = forceUpdate;
    this.runLazy = this.runLazy.bind(this);
    this.forceQuery = this.forceQuery.bind(this);
  }

  startQuery() {
    const { url, body, forceUpdate, result } = this;
    if (this.status > STATUS.fetch) {
      return;
    }
    this.status = STATUS.fetch;
    this.request(url, body).then((data) => {
      result.data = data;
      result.loading = false;
      this.status = STATUS.success;
      forceUpdate();
    }).catch((error) => {
      this.status = STATUS.error;
      result.error = error;
    });
  }

  execute() {
    // skip：是否禁用查询
    const { result, options: { skip = false } } = this;
    !skip && this.startQuery();

    // 当skip 为true 时，说明没有查询结果，所以不能用上次的查询结果来做过渡
    return Object.assign({
      error: undefined,
      data: undefined,
      loading: !skip,
      forceUpdate: this.forceQuery,
    }, skip ? {} : result);
  }

  executeLazy() {
    return (this.firstTrigger || this.lazyCalling) ? [this.runLazy, this.execute()] : [this.runLazy, {
      error: undefined,
      data: undefined,
      loading: false,
      forceUpdate: this.forceQuery
    }];
  }

  runLazy(params) {
    const { initData } = this;
    this.body = Object.assign({}, initData, params);
    this.lazyCalling = true;
    this.forceUpdate();
  }

  forceQuery() {
    this.execute();
  }

  afterExecute() {
    const { callback } = this.options;
    if (this.status === STATUS.success) {
      this.status = STATUS.init;
      callback && callback();
      this.lazyCalling = false;
      this.firstTrigger = false;
      this.cleanup();
    }
  }

  cleanup() {
    // this.result.data = undefined;
    this.result.loading = false;
    this.result.error = undefined;
  }

  // 更新查询规则
  updateOptions(body = {}, configs = {}, options = {}) {
    // NOTE: 这里区分lazyCalling， 因为事件请求的传参是通过runLazy来做的
    !this.lazyCalling && (this.body = body);
    Object.assign(this.configs, configs);
    Object.assign(this.options, options);
  }
}
