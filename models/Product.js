const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required:true
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [
      {
        userId:String,
        firstName: String,
        lastName: String,
        userImage: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

exports.Product = mongoose.model("Product", productSchema);
