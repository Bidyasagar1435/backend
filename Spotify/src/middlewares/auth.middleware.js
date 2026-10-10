const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(401).json({
        message: "You don't have permission to do this action",
      });
    }

    next();
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {authArtist};
