const { Sequelize, Op, Model, DataTypes } = require('sequelize');

let database = process.env.DB_NAME;
let dbuser = process.env.DB_USER;
let dbpass = process.env.DB_PASSWORD;
let dbhost = process.env.DB_HOST;

module.exports = {
    HOST: dbhost,
    USER: dbuser,
    PASSWORD: dbpass,
    DB: database,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//connection.end();