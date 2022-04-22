const mongoose = require("mongoose");
const cloudinary = require("../util/cloudinary");
const { Product } = require("../models/Product");
const { User } = require("../models/userModel");
const getting = require("../util/extractIdFromToken");

exports.addProduct = async (req, res, next) => {
  try {
    const file = req.files.image;
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      imgData = result.url;
    });
    const { name, price, category, brand, description } = req.body;
    let product = await new Product({
      name,
      category,
      price,
      image: imgData,
      brand,
      description,
    });
    await product.save();
    res.send({
      product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = Product.findOneAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
    });
    res.send("Product updated Successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndRemove(req.params.id);
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    let products = await Product.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const token = req.headers["token"]; //extract token from header
    const userId = await getting.getIdFromToken(token);
    const productId = req.body.id;
    let user = await User.findById(userId);
    let product = await Product.findById(productId);
    let itemIndex = product.comments.findIndex((p) => p.userId == user._id);
    if (itemIndex > -1) {
      res.send({
        message: "Comment already added",
      });
    } else {
      product.comments.push({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userImage: user.profilePic,
        comment: req.body.comment,
      });
      product = await product.save();
      res.send({ product });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.body;
    let product = await Product.findById(id);

    let itemIndex = product.comments.findIndex((p) => p._id == commentId);
    let commentItem = product.comments[itemIndex];
    product.comments.pull({ _id: commentItem._id });
    product = await product.save();
    return res.status(201).send({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const { id } = req.body;
    let product = await Product.findById(id);
    if (product.comments.length == 0) {
      res.send("No comments");
    }
    res.send(product.comments);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

