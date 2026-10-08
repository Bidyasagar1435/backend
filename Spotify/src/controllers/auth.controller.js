const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const alreadyExist = await userModel.findOne({ email });

  if (alreadyExist) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}

module.exports = { registerUser };
