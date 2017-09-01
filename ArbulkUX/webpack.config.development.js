var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: __dirname+'/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
          comments: false, // remove comments
          compress: {
              unused: true,
              screw_ie8: true,
              dead_code: true, // big one--strip code that will never execute
              warnings: false, // good for prod apps so users can't peek behind curtain
              drop_debugger: true,
              conditionals: true,
              evaluate: true, // strips console statements
              drop_console: true,
              sequences: true,
              booleans: true,
          }
      }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react'],
    },{
      test: /\.json$/,
      loader: 'json-loader'
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
     { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000' },
     ]
  }
};
