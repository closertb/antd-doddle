const normalized = Symbol('normalized');

/* eslint-disable no-prototype-builtins */
export function isComponentPage(pageData) {
  // eslint-disable-next-line no-prototype-builtins
  return pageData.hasOwnProperty('demo') ||
    !(pageData.hasOwnProperty('meta') &&
    pageData.hasOwnProperty('content') &&
    pageData.hasOwnProperty('toc'));
}

export function combineChangelogPage(pageData) {
  // 如果同时存在meta、content、toc则为文档类的数据，非组件文档
  if (pageData.hasOwnProperty('meta') && pageData.hasOwnProperty('content') && pageData.hasOwnProperty('toc')) {
    return;
  }

  const keys = Object.keys(pageData).filter(x => x !== 'demo');
  const majorKey = keys.find(key => pageData[key].meta.title);
  const majorPageData = pageData[majorKey];
  const changelogKey = 'CHANGELOG';
  const changelogPageData = pageData[changelogKey];

  if (changelogPageData) {
    majorPageData.changelog = 'what'; // transformChangelog(changelogPageData.content);
    delete pageData[changelogKey];
  }
}
function getUniquePageKey(pageData) {
  return Object.keys(pageData).find(key => key !== 'demo');
}

function getUniquePageData(pageData) {
  return pageData[getUniquePageKey(pageData)];
}

export function normalizeData(data) {
  const componentDataKey = Object.keys(data).find((key) => {
    const item = data[key];
    return Object.keys(item).find(pageKey => isComponentPage(item[pageKey]));
  });

  if (!componentDataKey) {
    return;
  }

  const componentDatas = data[componentDataKey];
  if (componentDatas[normalized]) {
    return;
  }

  // Object.keys(componentDatas).forEach(key => combineChangelogPage(componentDatas[key]));

  const _arr = Object.values(componentDatas);

  for (let _i = 0; _i < _arr.length; _i += 1) {
    const pageData = _arr[_i];
    const realPageKey = getUniquePageKey(pageData);
    const realPageData = getUniquePageData(pageData);
    // const demoData = pageData.demo;
    Object.assign(pageData, realPageData);
    delete pageData[realPageKey];
  }
  componentDatas[normalized] = true;
}
