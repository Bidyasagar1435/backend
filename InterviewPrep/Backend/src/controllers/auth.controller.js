const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 * @name registerUser
 * @description Register a new user by username, email and password
 * @access Public
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exists. Please try with another email or username",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUser
 * @description Login user by email and password
 * @access Public
 */

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password not matched",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name logoutUser
 * @description Logout user
 * @access Public
 */

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
}

/**
 * @name getMe
 * @description get current logged in user details
 * @access private
 */

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
