const express = require("express");
const productController = require("../controllers/product.controller");
const multer = require("multer");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// private routes(admin only)
router.post(
  "/create-product",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  productController.addProduct,
);
router.patch(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct,
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct,
);

// public routes
router.get("/all-products", productController.getAllProducts);
router.get("/single-product/:id", productController.getSingleProduct);

module.exports = router;
