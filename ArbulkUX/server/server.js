                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var webpack = require('webpack');
var env = require('./environment');
var path = require('path');
var mode = process.env.NODE_ENV || env.DEVELOPMENT;
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config.development.js');
var compiler = webpack(config);
console.log(">>>>>>>>>>>>>here i am",config,__dirname)
if(mode === env.DEVELOPMENT) {
    // only need in development
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

app.use(webpackHotMiddleware(compiler));
    app.get('*',(req , res) =>{

     res.sendFile(path.join(__dirname, '../client/index.html'));
  })
}

 else {
  // only need in development
   console.log(">>>>>>>>>>>>>I am in else>>>>>>>>>>>>>>>")
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

    app.use(webpackHotMiddleware(compiler));
    app.get('*',(req , res) =>{

     res.sendFile(path.join(__dirname, '../client/index.html'));
  })

}




app.use(webpackHotMiddleware(compiler));


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


