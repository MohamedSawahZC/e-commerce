const mongoose = require("mongoose");
const { WhoUs } = require("../models/whoUs");

exports.add = async (req, res, next) => {
  const { text, version } = req.body;
  try {
    let whoUs = new WhoUs({
      text,
      version,
    });
    whoUs = await whoUs.save();
    res.send(whoUs);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    let data = await WhoUs.find();
    res.send(data);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
    try {
        let data = await WhoUs.findOneAndUpdate(req.params.id, req.body, {
            returnOriginal:false,
        })
        res.send(data);
    } catch (error) {
        next(error);
    }
}
