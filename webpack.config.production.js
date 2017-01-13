var path = require('path');
var webpack = require('webpack');
var client = path.resolve(__dirname,"client");




module.exports = {
    devtool: 'eval',
    entry:[
    
    './client/index'
    ],
    
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

   resolve: {
    extensions: ['', '.js', '.jsx', '.less','.json'],
        modulesDirectories: [
        'node_modules','client'
    ]
},
    module: {
        loaders: [
            {
           test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
               query: {
              presets: ['react','es2015']
            }
           
        },{
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
     
        

},
 
resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
}
};