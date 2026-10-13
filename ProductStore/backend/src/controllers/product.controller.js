const productModel = require("../models/product.model");
const { uploadFile } = require("../services/storage.service");

async function createProduct(req, res) {
  try {
    const { name, desc } = req.body;

    if (!name || !desc) {
      return res.status(400).json({
        message: "Name and description are required",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // upload the image to imagekit
    const imageUrl = await uploadFile(req.file.buffer, req.file.originalname);

    // save the product and imagekit URL in mongodb
    const product = await productModel.create({
      name,
      desc,
      image: imageUrl,
      admin: req.user.id,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: {
        id: product._id,
        name: product.name,
        desc: product.desc,
        image: product.image,
        admin: product.admin,
      },
    });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({
      message: "Failed to add product",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, desc } = req.body;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (name !== undefined) {
      product.name = name;
    }

    if (desc !== undefined) {
      product.desc = desc;
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: {
        id: product._id,
        name: product.name,
        desc: product.desc,
        image: product.image,
        admin: product.admin,
      },
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      message: "Failed to update product",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      product: {
        id: product._id,
        name: product.name,
        desc: product.desc,
        image: product.image,
        admin: product.admin,
      },
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      message: "Failed to delete product",
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    return res.status(500).json({
      message: "Failed to get all products",
    });
  }
}

async function getSingleProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Get single product error:", error);
    return res.status(500).json({
      message: "Failed to get single product",
    });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};


