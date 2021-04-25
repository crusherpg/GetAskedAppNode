const winston = require('winston')
dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}

class LoggerService {
    constructor(route) {
      this.log_data = null
      this.route = route
      var folder = moment().utc().format('YYYYMMDD');
      const env = process.env.NODE_ENV;
      var dir = dirname +"/logs/"+folder;
      //console.log("Dir is:",dir);
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
          console.log("Folder Created : ",folder);
      }else{
        console.log("Folder Exists Already :",folder);
      }
   
      const logger = winston.createLogger({
        transports: [
          // For Printing Logs in Console
          new winston.transports.Console(),

          new winston.transports.File({  filename: dir+'/errors.log',timestamp: now, prepend: true , handleExceptions: true , colorize: true, json: false,  level: 'error', 
          format: winston.format.printf((error) => {
            let message = `${dateFormat()} | ${error.level.toUpperCase()} | error.log | ${error.message} | `
            message = error.obj ? message + `data:${JSON.stringify(error.obj)} | ` : message
            message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
            return message
          }),
       }),
    
          new winston.transports.File({
            handleExceptions: true,
            level : 'info',
            colorize: true,
            filename: dir+`/${route}.log`,       // `./logs/${route}.txt` //path: __dirname + "/.env" 
            format: winston.format.printf((info) => {
              let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
              message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
              message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
              return message
            })
          }),

          // new(require('winston-daily-rotate-file'))({
          //   filename: dir+`/${route}.log` ,
          //   timestamp: now,
          //   datePattern: 'DD-MM-yyyy',
          //   prepend: true,
          //   json: false,
          //   level: env === 'development' ? 'verbose' : 'info'
          // }),

        ],
        format: winston.format.printf((info) => {
          let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
          message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
          message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
          return message
        }),
        
        exitOnError: false
     });
     this.logger = logger
  }
  setLogData(log_data) {
    this.log_data = log_data
  }
  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    })
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    })
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    })
  }
  }

  module.exports = LoggerService
