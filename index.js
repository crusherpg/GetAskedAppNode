require("dotenv").config({ path: __dirname + "/.env" });
global.__basedir = __dirname;

// Define All required NPM packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require('fs');
const distDir = "../dist";
const passport = require("passport");
const expressWinston = require("express-winston");
const winston = require("winston");
//const compression = require("compression");

global.dirname = __dirname; 
global.fs = fs;

const constants = require("constants");

const moment = require("moment");
const momentz = require("moment-timezone").tz;
const parseformat = require("moment-parseformat");
momentz.setDefault(constants.DEFAULT_TIMEZONE);

//global.now = new Date();
global.moment = moment;
global.now = momentz(constants.DEFAULT_TIMEZONE).format();

global.parseformat = parseformat;

/// Common JS Functions
const utils = require("./utils");
global.utils = utils;

global.apiVer = process.env.API_VER;

global.Limit = process.env.LIMIT;

const os = require("os");

// Input Validation package
const expressValidator = require("express-validator");
app.use(expressValidator());

// Importing Security Dependencies
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

const hostname = os.hostname();
console.log("Hostname is:" + hostname);

const mysql1 = require("./config/mysqlconn.config");
global.mysqlconn = mysql1;

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, distDir)));

const Logger = require("./helpers/logger_service");
const logger = new Logger('app')
global.logger = logger;

//const loggerMiddleware = require('./helpers/logging-middleware');

/// Cors enable
app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  /* Request Logger Start */
  if(Object.keys(req.body).length > 0)
    logger.info(` ${req.originalUrl} - ${req.method} -` , req.body);

  if(Object.keys(req.params).length > 0)
    logger.info(` ${req.originalUrl} - ${req.method} -` , req.params);
  /* Request Logger End */
  
  if ("OPTIONS" == req.method) 
  { 
    return res.send(200);
  }else{
    next();
  }
  

  
});




const ratelimit = rateLimit({
  max: 10, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: "Too many requests", // message to send
});
global.ratelimit = rateLimit;

app.use("/routeName", ratelimit); // Setting limiter on specific route. Works both for Brute Force attacks and DOS attacks.

// Data Sanitization against XSS
app.use(xss());

// Works like Middleware before approaching route/endpoint
app.use(helmet());

// This should work both there and elsewhere.
global.isEmptyObj = function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};


/*** Reporting all errors in error.log   */
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: dirname+"/logs/errors.log",
        level: "error",
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);


// global error handler
app.use(require("./helpers/error-handler"));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/server/api',require('./server/api/index'));

app.listen(process.env.PORT || 4040, () => {
//app.listen(process.env.PORT , () => {
  console.log("Express listening on 5000 or ");
});
