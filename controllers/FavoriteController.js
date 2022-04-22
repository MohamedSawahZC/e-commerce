const getting = require("../util/extractIdFromToken");
const { Favorite } = require("../models/favoriteModel");

exports.addToCart = async (req, res) => {
  const { productId, name, image, price } = req.body;
  const quantity = Number.parseInt(req.body.quantity);

  const token = req.headers["token"]; //extract token from header

  const userId = await getting.getIdFromToken(token); //getting user Id from token
  try {
    if (!userId) return res.send("Please Enter token");
    let favorite = await Favorite.findOne({ userId: userId }).exec();
    if (favorite) {
      //cart exists for user
      let itemIndex = favorite.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        return res.send({
          message: "Item Already in favorite",
        });
      } else {
        //product does not exists in cart, add new item
        favorite.products.push({
          productId,
          image,
          name,
          price,
        });
      }
      favorite = await favorite.save();
      return res.status(201).send(favorite);
    } else {
      //no cart for user, create new cart
      const newfavorite = await Favorite.create({
        userId,
        products: [
          {
            productId,
            image,
            name,
            price,
          },
        ],
      });

      return res.status(201).send(newfavorite);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getUserCart = async (req, res) => {
  const token = req.headers["token"]; //extract token from header

  const userId = await getting.getIdFromToken(token);
  let favorite = await Favorite.findOne({ userId: userId }).exec();
  if (!favorite || favorite.products.length < 1)
    return res.send({
      message: "No Items",
    });
  console.log();
  if (!favorite.products) {
    return res.send({
      message: "No items",
    });
  } else {
    return res.send(favorite);
  }
};

exports.removeItem = async (req, res) => {
  const token = req.headers["token"]; //extract token from header
  productId = req.body.productId;
  const userId = await getting.getIdFromToken(token);
  let favorite = await Favorite.findOne({ userId: userId }).exec();
  let itemIndex = favorite.products.findIndex((p) => p.productId == productId);
  let productItem = favorite.products[itemIndex];
  try {
    favorite.products.pull({ _id: productItem._id });
    favorite = await favorite.save();
    return res.status(201).send({
      message:"Item deleted successfully"
    });
  } catch (error) {
    console.log(error);
  }
};
