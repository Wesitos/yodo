import morgan from 'morgan';
import winston from 'winston';

const env = process.env,
      production = (env.NODE_ENV=='production'),
      logFilePath = env.LOG_FILE,
      morganFormat = production?'dev':'combined';

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      humanReadableUnhandledException: true,
    }),
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      json: true,
      filename: logFilePath,
      maxsize: 5242880, // In bytes
      maxFiles: 5,
      colorize: false,
    }),
  ],
  exitOnError: false,
});

const stream = {
  write: function(message){
    logger.info(message);
  }
};

export const middleware = morgan(morganFormat, {stream});

