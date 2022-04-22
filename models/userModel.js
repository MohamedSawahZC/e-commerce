const mongoose = require("mongoose");
const valid = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Create user schema

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 3, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return valid.isEmail(val);
      },
      message: `{Please enter valid email}`,
    },
  },
  address:{type:String},
  password: { type: String, required: true, minlength: 5 },
  phone: { type: String, required: true, minlength: 11 },
  profilePic: { type: String },
  isAdmin: { type: Boolean },
  isSeller: { type: Boolean },

});
userSchema.methods.genAuthToken = (id, isAdmin, isSeller) => {
  const token = jwt.sign(
    { userId: id, adminRole: isAdmin, sellerRole: isSeller },
    "ecommerceSecret"
  );
  return token;
};

//Create our model

exports.User = mongoose.model("User", userSchema);
