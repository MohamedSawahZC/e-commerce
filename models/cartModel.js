const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number,
        image: String,
        subTotal:Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
    total: {
      type:Number
    }
  },
  { timestamps: true }
);

exports.Cart = mongoose.model("Cart", cartSchema);
