
let database = process.env.DB_NAME;
let dbuser = process.env.DB_USER;
let dbpass = process.env.DB_PASSWORD;
let dbhost = process.env.DB_HOST;

/// Mysql Query Object
const dbConfig = require("./mysql.config");
var mysql      = require('mysql');

var pool = mysql.createPool({
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB,
  connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if(err) {
          return cb(err);
        }
        cb(null, connection);
    });
};
module.exports = getConnection;

//export connection, you can optionally use 
//connection.connect here. The same state of this module is passed everywhere. 
//exports.connection = connection;