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

module.exports = {
  port: 8090,
  source: {
    docs: ['./docs'],
    packages: './packages'
  },
  output: './_site',
  theme: './site',
  entiryName: 'index',
  themeConfig: {
    siteKey: 'antd-doddle',
    home: '/docs/introduce',
    combineChangelog: false,
    compSorterType: 'native',
    title: 'Frontend Component Library',
    github: 'https://github.com/closertb',
    friendLinks: [{ name: 'closertb', link: 'www.baidu.com' }, { name: 'Denzel', link: 'www.baidu.com' }]
  },
  devServerConfig: {},
  webpackConfig(config) {
    config.devtool = 'source-map';
    alertLessConfig(config.module.rules);
    // resetTsConfig(config.module.rules);
    return config;
  },
  root: '/docs/introduce'
};
