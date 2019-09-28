import qs from 'qs';
/**
 *
 * @param {*} ctx:  指的是根据httpInstance.create 产生的示例
 * @param {*} next：指下一个要执行的中间件；
 */
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
    console.log('error', error);
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
