module.exports = {
  lazyLoad: false,
  pick: {
    posts(markdownData) {
      return {
        meta: markdownData.meta,
        description: markdownData.description,
      };
    },
  },
  plugins: ['bisheng-plugin-description', 'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd?injectProvider', 'bisheng-plugin-react?lang=__react'],
  routes: [{
    path: '/',
    component: './template/Main',
  }, {
    path: '/guide/:post',
    component: './template/Main',
  }, {
    path: '/packages/:post',
    component: './template/Main',
  }],
};
