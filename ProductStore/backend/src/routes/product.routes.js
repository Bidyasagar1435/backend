const express = require("express");
const productController = require("../controllers/product.controller");
const multer = require("multer");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");
const {
  validateProductId,
} = require("../middlewares/validateProductId.middleware");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// private routes(admin only)
router.post(
  "/create-product",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  productController.createProduct,
);
router.patch(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  validateProductId,
  productController.updateProduct,
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminMiddleware,
  validateProductId,
  productController.deleteProduct,
);

// public routes
router.get("/all-products", productController.getAllProducts);
router.get(
  "/single-product/:id",
  validateProductId,
  productController.getSingleProduct,
);

module.exports = router;
