const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const questionController = require("../controllers/question.controller");

const { Op } = require('sequelize')


/**
 * @summary Provide Api to get All questions and answers.
 * @returns list of questions
 *
 * @author Pritesh
 **/
router.get(
  "/getQuestions",
  async (req, res, next) => {
    try {
      const listQa = await questionController.getAllQA();
      let resultObj = {
        totalQuestions : listQa.length,
        title: "Javascript Advanced questions",
        quizmaster: {
          name: "Abhishek",
          id: 102031,
        },
        quizquestions: listQa
      };
      if (listQa !='' && listQa != 'null') {
        return res.json({
            status: 200,
            success: true,
            data: resultObj
          });
      } else {
        return res.json({
            status: 502,
            success: false,
            message: 'No Questions found.'
          });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);


module.exports = router;
