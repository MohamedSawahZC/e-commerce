const getting = require("../util/extractIdFromToken");
const { Cart } = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  const { productId, name, image, price } = req.body;
  const quantity = Number.parseInt(req.body.quantity);

  const token = req.headers["token"]; //extract token from header

  const userId = await getting.getIdFromToken(token); //getting user Id from token
  try {
    if (!userId) return res.send("Please Enter token");
    let cart = await Cart.findOne({ userId: userId }).exec();
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        productItem.subTotal += quantity * productItem.price;
        cart.products[itemIndex] = productItem;
        cart.total += quantity * productItem.price;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({
          productId,
          image,
          quantity,
          name,
          price,
          subTotal: price * quantity,
        });
        cart.total += price * quantity;
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId,
            quantity,
            image,
            subTotal: price * quantity,
            name,
            price,
          },
        ],
        total: price * quantity,
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getUserCart = async (req, res) => {
  const token = req.headers["token"]; //extract token from header

  const userId = await getting.getIdFromToken(token);
  let cart = await Cart.findOne({ userId: userId }).exec();
  if (!cart || cart.products.length < 1)
    return res.send({
      message: "No Items",
    });
  console.log();
  if (!cart.products) {
    return res.send({
      message: "No items",
    });
  } else {
    return res.send(cart);
  }
};

exports.removeItem = async (req, res) => {
  const token = req.headers["token"]; //extract token from header
  productId = req.body.productId;
  const userId = await getting.getIdFromToken(token);
  let cart = await Cart.findOne({ userId: userId }).exec();
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  let productItem = cart.products[itemIndex];
  try {
    cart.products.pull({ _id: productItem._id });
    cart.total -= productItem.subTotal;
    cart = await cart.save();
    return res.status(201).send({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
