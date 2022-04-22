const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "e-sawah",
  api_key: "885889739826198",
  api_secret: "cfXX0n3bk7otYV1Bai0lQ3sXzWA",
});

module.exports = cloudinary;