const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("config");
const secret = config.get("secret");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ msj: "not authorizeded" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(501).json({ msj: error.message });
  }
};
module.exports = auth;
