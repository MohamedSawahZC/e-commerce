const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    q: {
      type: String,
    },
    a: {
      type: String,
    },
  },
  { timestamps: true }
);

exports.FAQ = mongoose.model("FAQ", faqSchema);
