const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../../utils/mail");
const bcrypt = require("bcrypt");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if ((email, password)) {
    const exists = await User.findOne({ email });
    if (!exists) {
      res.send({ status: "failure", msg: "user not registered" });
    } else {
      const token = await jwt.sign({ email: email }, "6763gwywstgw", {
        expiresIn: "1800s",
      });
      let validPassword = await bcrypt.compare(password, exists.password);
      if (!validPassword) throw new Error("Invalid password");
      await exists.save();
      await sendMail(email, exists.name, token);
      return res.json({
        success: true,
        info: "verification link sends successfully",
      });
    }
  } else return res.send({ success: true, msg: "Please sends credentals" });
};

exports.Verify = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error("Token not found");
    const decoded = await jwt.verify(token, "6763gwywstgw");
    if (!decoded.email) throw new Error("Invalid token");
    const user = await User.findOne({ email: decoded.email });
    if (!user) throw new Error("User not found");
    user.isVerified = true;
    await user.save();
    res.cookie(`Rsquare_token`, `${token}`);
    res.redirect("/home");
  } catch (error) {
    res.json({ success: true, msg: error.message });
  }
};
