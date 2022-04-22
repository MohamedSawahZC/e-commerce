const mongoose = require("mongoose");
const { FAQ } = require("../models/FAQ");

exports.addFaq = async (req, res, next) => {
  try {
    const { q, a } = req.body;
    let faq = new FAQ({
      q,
      a,
    });
    await faq.save();
    res.send(faq);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
    try {
        let faq = await FAQ.find();
      res.send(faq);
    } catch (error) {
      next(error);
    }
  };

exports.delete = async (req, res, next) => {
    try {
        await FAQ.findByIdAndRemove(req.params.id)
        res.send({ message: "Item deleted successfully" });
    } catch (error) {
        next(error);
      }
}
  
exports.update = async (req, res, next) => {
    try {
        await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            returnOriginal:false
        })
        res.send({ message: "Item Updated successfully" });
    } catch (error) {
        next(error);
      }
  }