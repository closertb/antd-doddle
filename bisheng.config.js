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
const filePath = '/antd-doddle';

module.exports = {
  history: 'hash',
  port: 8090,
  source: {
    guide: ['./guide'],
    packages: './packages'
  },
  output: './docs',
  theme: './site',
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
      { name: 'BiSheng', link: 'https://github.com/benjycui/bisheng' }]
  },
  devServerConfig: {},
  webpackConfig(config) {
    config.devtool = 'source-map';
    alertLessConfig(config.module.rules);
    // resetTsConfig(config.module.rules);
    return config;
  },
  root: `${filePath}/`
};
