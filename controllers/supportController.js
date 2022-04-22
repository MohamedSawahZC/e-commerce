const mongoose = require("mongoose");
const { Problem } = require("../models/support");
const getting = require("../util/extractIdFromToken");

exports.addProblem = async (req, res, next) => {
  const { report, problemId, response } = req.body;
  const token = req.headers["token"]; //extract token from header

  const userId = await getting.getIdFromToken(token);
  try {
      let chat = await Problem.findOne({ userId: userId }).exec();
    if (chat===null) {
      let newChat = await Problem.create({
        userId,
          problem: [
              {
                report,
            }
        ],
      });
      return res.send(newChat);
    } else {
      let currentChat = await Problem.findOne({ userId: userId }).exec();
      let itemIndex = currentChat.problem.findIndex((p) => p._id == problemId);
      if (itemIndex > -1) {
        let currentProbelm = currentChat.problem[itemIndex];
          currentProbelm.response = response;
          currentChat = await currentChat.save();
        return res.send("Done");
      } else {
        currentChat.problem.push({
          report: report,
        });
          currentChat = currentChat.save();
        return res.send("Done");
      }
    }
    return res.send("Done");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getChat = async (req, res, next) => {
  const token = req.headers["token"]; //extract token from header
  const userId = await getting.getIdFromToken(token);
  try {
    let chat = await Problem.findOne({ userId: userId }).exec();
    return res.send(chat);
  } catch (error) {
    next(error);
  }
};
