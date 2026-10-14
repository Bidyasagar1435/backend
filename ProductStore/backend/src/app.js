const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const productRoutes = require("../src/routes/product.routes")
const cartRoutes = require("../src/routes/cart.routes");
const cors = require("cors");


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
