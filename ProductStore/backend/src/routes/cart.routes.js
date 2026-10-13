const express = require("express");
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", authMiddleware, cartController.addToCart);
router.delete("/remove", authMiddleware, cartController.removeFromCart);

module.exports = router;
