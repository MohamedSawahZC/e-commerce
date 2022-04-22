const bycrypt = require("bcrypt");
const { restart } = require("nodemon");
const { User } = require("../models/userModel");
const cloudinary = require('../util/cloudinary');
exports.register = async (req, res, next) => {
  try {
    const file = req.files.profilePic
    var imgData;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => { 
      imgData = result.url
    })
    //Check user already exits
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User already Registerd!");
    //Create new user to be add to DB
    let salt = await bycrypt.genSalt(10);
    let hasedPassword = await bycrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address:req.body.address,
      password: hasedPassword,
      profilePic: imgData,
      isAdmin: req.body.isAdmin || false,
      isSeller: req.body.isSeller || false,
      cart: req.body.cart,
      favorite: req.body.favorite,
    });
    await user.save();
    const token = user.genAuthToken(user._id, user.isAdmin, user.isSeller);
    //Send res
    res.header("token", token);
    res.status(200).send({
      status: "Success",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name: user.name,
        phone: user.phone,
        profilePic: user.profilePic,
        cart: user.cart,
        favorite: user.favorite,
      },
    });
  } catch (error) {
    console.log(error + "===============================================");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    //Check email exits
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).send("Invalid email or password");
    //Check password  true
    const valid = await bycrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Invalid email or passowrd");
    //Create token
    const token = user.genAuthToken(user._id, user.isAdmin);
    //Send res
    res.header("token", token);
    res.status(200).send({
      status: "Success",
      message: {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        phone: user.phone,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    //Check user already exits
    let user = await User.findOneAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
    });
    //Send res
    if (!user) return res.status(404).send("User with the given Id not found");
    res.send({
      status: "User Updated",
      message: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User with the given Id not found");
  res.send({
    status: "Success",
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
    },
  });
};

exports.changePassword = async (req, res, next) => {
  try {
    //Check user already exits
    let salt = await bycrypt.genSalt(10);
    let password = bycrypt.hashSync(req.body.password, salt);
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { password },
      {
        returnOriginal: false,
      }
    );
    //Send res
    if (!user) return res.status(404).send("User with the given Id not found");
    res.send({
      status: "Password Changed",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEmail = async (req, res, next) => {
  try {
    //Check user already exits
    let email = req.body.email;
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { email },
      {
        returnOriginal: false,
      }
    );
    //Send res
    if (!user) return res.status(404).send("User with the given Id not found");
    res.send({
      status: "Email Updated",
    });
  } catch (error) {
    next(error);
  }
};

