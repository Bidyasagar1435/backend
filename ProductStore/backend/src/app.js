const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const productRoutes = require("../src/routes/product.routes")


const app = express();

app.use(express.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes)

module.exports = app;
