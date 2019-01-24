module.exports = (config) => {
  // config.disableCSSModules = true;
  config.disableCSSSourceMap = true;
  config.disableAntdStyle = true;
  config.library = 'ffe-basic';
  config.libraryTarget = 'umd';
  config.externals = {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
        amd: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    antd: {
      commonjs: 'antd',
      commonjs2: 'antd',
        amd: 'antd',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
        amd: 'moment',
    },
  }
  return config;
};
