const { send } = require("express/lib/response");
const mongoose = require("mongoose");
const { Banner } = require("../models/bannersModel");
const cloudinary = require("../util/cloudinary");
exports.addBanner = async (req, res, next) => {
  try {
    const file = req.files.image
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      imgData = result.url
    });
    let banner =await new Banner({
      image: imgData,
    });
    await banner.save();
    res.status(200).send({
      image: banner.image,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.getAllBanners = async (req, res, next) => {
  try {
    let banners = await Banner.find();
    res.send(banners);
  } catch (error) {
    next(error);
  }
};

exports.deleteBanner = async (req, res, next) => {
  const { id } = req.body;
  try {
      let banner = await Banner.findOneAndRemove({ _id:id });
      res.send({message:"Item deleted success"})
  } catch (error) {
      console.log(error);
    next(error);
  }
};
