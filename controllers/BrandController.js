const mongoose = require("mongoose");
const { Brand } = require("../models/brand");

exports.addBrand = async (req, res, next) => {
  try {
    const file = req.files.image;
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      imgData = result.url;
    });
    const { name } = req.body;
    let brand = new Brand({
        name,
        image:imgData,
    });
    await brand.save();
    res.send({ brand });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    let brand = await Brand.find();
    res.send({ brand });
  } catch (error) {
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    await Brand.findByIdAndRemove(req.params.id);
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    await Brand.findByIdAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
    });
    res.send({ message: "Item updated successfully" });
  } catch (error) {
    next(error);
  }
};
