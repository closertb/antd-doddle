export default {
  disableCSSSourceMap: true,
  disableAntdStyle: true,
  library: 'antd-doddle',
  libraryTarget: 'umd',
  extraBabelPlugins: ["transform-decorators-legacy"],
  externals: {
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
}
