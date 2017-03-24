var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
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
    new webpack.NoErrorsPlugin()
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
