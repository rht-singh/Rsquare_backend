const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.Router = async function (req, res, next) {
  try {
    const { auth } = req.headers;
    if (auth) {
      const token = auth.split(" ")[1];
      if (token) {
        let { email } = await jwt.verify(token, "6763gwywstgw");
        const user = await User.findOne({ email });
        if (user) {
          req.User = user;
          next();
        } else res.json({ success: false, error: "Please login again" });
      } else res.json({ success: false, error: "Unauthorized access" });
    } else res.json({ success: false, error: "Unauthorized access" });
  } catch (err) {
    res.json({ success: false, error: "Unauthorized access" });
  }
};
