//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var loopback = require('loopback');
// var boot = require('loopback-boot');
// var app = module.exports = loopback();
// var webpack = require('webpack');
// var env = require('./environment');
// var path = require('path');
// var mode = process.env.NODE_ENV || env.DEVELOPMENT;
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
// var config = require('../webpack.config.development.js');
// var compiler = webpack(config);
// console.log(">>>>>>>>>>>>>here i am",config,__dirname)
// if(mode === env.DEVELOPMENT) {
//     // only need in development
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//
// app.use(webpackHotMiddleware(compiler));
//     app.get('*',(req , res) =>{
//
//      res.sendFile(path.join(__dirname, '../client/index.html'));
//   })
// }
//
//  else {
//   // only need in development
//    console.log(">>>>>>>>>>>>>I am in else>>>>>>>>>>>>>>>")
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//
//     app.use(webpackHotMiddleware(compiler));
//     app.get('*',(req , res) =>{
//
//      res.sendFile(path.join(__dirname, '../client/index.html'));
//   })
//   // app.use(loopback.static(__dirname + '/dist'));
//   // app.get('*', function response(req, res) {
//   //   res.sendFile(path.join(__dirname, '../client/index.html'));
//   // });
// }
//
//
//
//
// app.use(webpackHotMiddleware(compiler));
//
//
// boot(app, __dirname);
//
// app.start = function() {
//   // start the web server
//   return app.listen(function() {
//     app.emit('started');
//     var baseUrl = app.get('url').replace(/\/$/, '');
//     console.log('Web server listening at: %s', baseUrl);
//     if (app.get('loopback-component-explorer')) {
//       var explorerPath = app.get('loopback-component-explorer').mountPath;
//       console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
//     }
//   });
// };
//
// if (require.main === module) {
//   app.start();
// }



// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-ssl
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var loopback = require('loopback');
var boot = require('loopback-boot');
var http = require('http');
var https = require('https');
var bodyParser=require('body-parser')
var app = module.exports = loopback();

/*sendMail = require('../server/boot/sendMail.js');*/


app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }))

// parse application/json
app.use(bodyParser.json({limit:'50mb'}))

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = function(httpOnly) {
    if (httpOnly === undefined) {
        httpOnly = process.env.HTTP;
    }
    var server = null;
    if (!httpOnly) {
        server = http.createServer(app);
    } else {
        server = http.createServer(app);
    }
    server.listen(app.get('port'), function() {
        var baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
        app.emit('started', baseUrl);
        console.log('LoopBack server listening @ %s%s', baseUrl, '/');
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
    return server;
};

// start the server if `$ node server.js`
if (require.main === module) {

    app.start();
}


