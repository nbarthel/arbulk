var winston = require( 'winston' ),
	fs = require( 'fs' ),
	logDir = 'log', // Or read from a configuration
	logger;

winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

if ( !fs.existsSync( logDir ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( logDir );
}
logger = new( winston.Logger )( {
	transports: [
		new winston.transports.Console({level: 'debug'}),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      name: 'file',
      datePattern: '.yyyy-MM-ddTHH',
      filename: logDir + '/logs.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: true,
      maxsize: 1024 * 1024 * 10 // 10MB
    })
    ],
	exceptionHandlers: [
		new winston.transports.File( {
      handleExceptions: true,
      humanReadableUnhandledException: true,
			filename: 'log/exceptions.log'
		} )
    ],
  exitOnError: false
} );



module.exports = logger;


// Use this singleton instance of logger like:
// logger = require( 'Logger.js' );
// logger.debug( 'your debug statement' );
// logger.warn( 'your warning' );
