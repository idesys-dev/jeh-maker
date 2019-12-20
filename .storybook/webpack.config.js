const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = async ({ config, mode } ) => {
  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')
config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  });
  config.module.rules.push({ test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] });
  config.module.rules.push({ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' });
  config.plugins.push(new ForkTsCheckerWebpackPlugin())
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });
  return config;
};
