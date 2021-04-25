const dbConfig = require("../config/mysql.config.js");

const { Sequelize ,Model , DataTypes , QueryTypes ,Op }  = require("sequelize");
const { DB } = require("../config/mysql.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0, // change this to zero
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;
db.Op = Op;
global.Op = db.Op;
DB.Model = Model;

db.Question = require("../server/api/v1.0/models/quiz_question.model")(sequelize, Sequelize);

module.exports = db;
