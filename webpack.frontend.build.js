const merge = require('webpack-merge');
const common = require('./webpack.frontend.common');
module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: './',
  }
});
