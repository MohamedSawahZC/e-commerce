const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: Number,
        name: String,
        price: Number,
        image: String,
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

  },
  { timestamps: true }
);

exports.Favorite = mongoose.model("Favorite", favoriteSchema);
