module.exports = (config) => {
  config.disableCSSModules = true;
  config.disableAntdStyle = true;
  config.library = 'ffe-basic';
  config.libraryTarget = 'umd';
  return config;
};
