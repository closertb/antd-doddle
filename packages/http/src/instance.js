import { defaultErrorHandler } from './utils';

export default class Instance {
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
      .catch(this.onError);
  }

  onError(error) {
    if (this.errorHandle) {
      this.errorHandle(error);
    } else {
      defaultErrorHandler(error);
    }
    return Promise.reject({});
  }
}
