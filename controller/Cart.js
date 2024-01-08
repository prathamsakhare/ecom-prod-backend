const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    // * Here we have used populate method to populate the user field in the cart model, so that we can get the user details in the response
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
