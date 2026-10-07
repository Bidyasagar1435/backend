const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyExist = await userModel.findOne({ email });

  if (isAlreadyExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  // storing token inside the cookie
  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
  });
}

module.exports = { registerUser };
