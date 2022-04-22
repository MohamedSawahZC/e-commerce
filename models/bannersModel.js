const mongoose = require("mongoose");

const bannersSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.Banner = mongoose.model("Banner", bannersSchema);
