const db = require("../../../../models"); // models path depend on your structure
const Question = db.Question;
const { Op } = require('sequelize')
const sequelize = db.sequelize;

module.exports.getAllQA = async () => {
    try {
        let result = await Question.findAll();
        console.log("result", result);
        result.forEach(element => {
            let temp = element.dataValues.result;
            temp = temp.split(",");
            console.log("element",temp);
            element.dataValues.result = temp;
          });
        return result;   
    } catch (err) {
        console.log("Err :", err);
        return false;
    }
}