// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var StatsPlugin = require('stats-webpack-plugin');

// module.exports = {
//    devtool:'source-map',
//    entry: [
//     path.join(__dirname, 'client/index.js')
//   ],

//   output: {
//     path: path.join(__dirname, '/dist/'),
//     filename: 'bundle.js',
//     publicPath: 'http://localhost:3000'
//   },
//    plugins: [

//     new HtmlWebpackPlugin({
//       template: 'client/index.html',
//       inject: 'body',
//       filename: 'index.html'
//     }),
//     // new ExtractTextPlugin('bundle.css'),
//     // new webpack.optimize.UglifyJsPlugin({
//     //   compressor: {
//     //     warnings: false,
//     //     screw_ie8: true
//     //   }
//     // }),
//     new StatsPlugin('webpack.stats.json', {
//       source: false,
//       modules: false
//     }),
//     // new webpack.DefinePlugin({
//     //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//     // })
//   ],
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loaders: ['babel'],
//       exclude: /node_modules/,
//       include: path.join(__dirname, 'client'),
//       query:{
//         presets:['es2015','react']
//       },
//     },{
//       test: /\.json$/,
//       loader: 'json'
//     },{
//       test: /\.css$/,
//       loader: 'style!css'
//     },
//     { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
//     ]
//   }
// };


require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
      'babel-polyfill',
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
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'client'),
    },{
      test: /\.json$/,
      loader: 'json'
    },{
      test: /\.css$/,
      loader: 'style!css'
    },
     { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
     ]
  }
};