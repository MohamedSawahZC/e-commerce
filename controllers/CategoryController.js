const mongoose = require("mongoose");
const { Category } = require("../models/category");

exports.addCategory = async (req, res, next) => {
  try {
    const file = req.files.image;
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      imgData = result.url;
    });
    const { name } = req.body;
    let category = new Category({
        name,
        image:imgData,
    });
    await category.save();
    res.send({ category });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    let category = await Category.find();
    res.send({ category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
    });
    res.send({ message: "Item updated successfully" });
  } catch (error) {
    next(error);
  }
};
