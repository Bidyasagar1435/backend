const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check whether the product exists

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find this user's cart
    let cart = await cartModel.findOne({ user: userId });

    // If the user doesn't have a cart, create one

    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // Check whether the product is already in the cart

    const existingProduct = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    return res.status(200).json({
      message: "Cart Updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      message: "Failed to add to cart",
    });
  }
}

async function removeFromCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // find the users cart
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // remove the product from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    // save the updated cart

    await cart.save();

    return res.status(200).json({
      message: "Cart Updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      message: "Failed to remove from cart",
    });
  }
}

async function getCart(req, res) {
  try {
    const userId = req.user.id;

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product", " name desc image");

    if (!cart) {
      return res.status(200).json({
        message: "Your Cart Is Empty",
        cart: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
}

module.exports = { addToCart, removeFromCart, getCart };
