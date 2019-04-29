export default {
  modifyBundlerConfig: (bundlerConfig) => {
    const rules = [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  }
};
