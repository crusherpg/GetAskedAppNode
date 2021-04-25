// Define All required NPM packages
const express = require("express");
const app = express();
const Router = require('express').Router({mergeParams : true});
//const controller = require('./test.controller');
// const passport = require("passport");

// const passportConfig = require("./config/passport.config");
// passportConfig(passport);

// // Call Crons one By one

// // cron.schedule('* * * * *', () => {
// //   console.log('running a task every minute');
// // });
// // const cronJobs = require("./crons");
// // const cronjob = new Cronjob('app')
// // global.cronjob = cronjob;

// // console.log("cronjob Inlizezing in console:",cronJob);
// // cronjob.moveOldLocationRecords();

// App Specific Routes
Router.use('/question', require("./routes/question.route"));

module.exports = Router;