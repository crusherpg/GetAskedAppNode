const winston = require("winston");
const path = require("path");

dateFormat = () => {
    return new Date(Date.now()).toUTCString()
  }

const logger = winston.createLogger({
    level: 'info',
    //format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: path.join(__basedir, '/logs/errors1.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__basedir, '/logs/combined1.log') })
    ],
    format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
        return message
      })
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;