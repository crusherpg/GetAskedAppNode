'use strict';
const {
  Model , Sequelize , sequelize , DataTypes
} = require("../../../../models");

module.exports = (sequelize ,DataTypes) => {

const Question = sequelize.define('Question', {
    id:{
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    question:DataTypes.STRING,
  answer: DataTypes.STRING,
  result:DataTypes.STRING,
    
  },{
    sequelize,
    modelName: 'Question',
    tableName: 'quiz_questions'
  });
  return Question;

};
