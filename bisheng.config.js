const alertLessConfig = (rules) => {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader.includes('less-loader')) {
      rule.options = rules.options || {};
      rule.options.javascriptEnabled = true;
    } else if (rule.use) {
      alertLessConfig(rule.use);
    }
  });
};

const resetTsConfig = (rules) => {
  rules.forEach((rule) => {
    if (rule.test && rule.test.toString() === /\.tsx?$/.toString()) {
      rule.use.forEach((tsRule) => {
        if (tsRule.loader && /ts-loader/.test(tsRule.loader)) {
          tsRule.loader = require.resolve('ts-loader');
        }
      });
    }
  });
};

const filePath = '';
const publicPath = '//closertb.site/antd-doddle/'; // //doc.closertb.site/antd-doddle

module.exports = {
  history: 'hash',
  port: 8090,
  source: {
    guide: ['./guide'],
    packages: './packages'
  },
  output: './docs',
  theme: '@doddle/doddle-bisheng-theme',
  entiryName: 'index',
  themeConfig: {
    siteKey: 'antd-doddle',
    home: '/guide/introduce',
    root: filePath,
    combineChangelog: false,
    compSorterType: 'native',
    title: 'Frontend Component Library',
    github: 'https://github.com/closertb',
    friendLinks: [{ name: 'closertb', link: 'https://github.com/closertb' },
      { name: 'antd', link: 'https://ant-design.gitee.io/index-cn' },
      { name: 'react', link: 'https://react.docschina.org/tutorial/tutorial.html' },
      { name: 'segmentFault', link: 'https://segmentfault.com/u/denzel' },
      { name: 'BiSheng', link: 'https://github.com/benjycui/bisheng' }]
  },
  devServerConfig: {},
  webpackConfig(config) {
    config.devtool = 'source-map';
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'none';
      config.mode = 'production';
    }
    alertLessConfig(config.module.rules);
    resetTsConfig(config.module.rules);
    return config;
  },
  root: process.env.NODE_ENV === 'production' ? publicPath : `${filePath}/`
};
