const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

router.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login user with email and password
 * @access Public
 */
router.post("/login", authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @desc clear token from user cookie and add the token in blacklist to make it invalid
 * @access public
 */
router.get("/logout", authController.logoutUser);

module.exports = router;
