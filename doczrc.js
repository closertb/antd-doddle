export default {
  modifyBundlerConfig: (bundlerConfig) => {
    const rules = [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  }
};
