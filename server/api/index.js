const express = require('express');
const Router = express.Router({mergeParams : true});

console.log("Comes in in api/index.js");

//Router.use('/test', require('./test'));
Router.use('/v1.0/', require('./v1.0'));        /// For each version we need to manage separate folder with all routes,models,controllers,config's inside it.

module.exports = Router;
