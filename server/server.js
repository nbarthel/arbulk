var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var webpack = require('webpack');
var env = require('./environment');
var path = require('path');
var mode = process.env.NODE_ENV || env.DEVELOPMENT;
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require(`../webpack.config.${mode}`);
var compiler = webpack(config);

console.log(">>>>>>>>>>>...in server.js>>>>");
console.log(">>>>>>>>>>>...in server.js>>>>" , __dirname ,config);
if(mode === env.DEVELOPMENT) {
    // only need in development
    app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));

app.use(webpackHotMiddleware(compiler));
    app.get('*',(req , res) =>{

     res.sendFile(path.join(__dirname, '../client/index.html'));
  })
}

 else {
 // only need in development
   app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));

app.use(webpackHotMiddleware(compiler));
    //app.get('*',(req , res) =>{
  //res.sendFile(path.join(__dirname, '../client/index.html'));
  //})
}

boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

if (require.main === module) {
  app.start();
}
