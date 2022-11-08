const User = require("../../models/User");
const { sendMail } = require("../../utils/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, password } = req.body;
    if (!first_name || !last_name || !phone || !email || !password)
      throw new Error("Please send all the credentials");
    const verified = "No";
    const exists = await User.findOne({ email });
    console.log(exists);
    if (!exists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = await jwt.sign({ email: email }, "6763gwywstgw", {
        expiresIn: "1800s",
      });
      const user = new User({
        first_name,
        last_name,
        email,
        phone,
        verified,
        password: hashedPassword,
      });
      await sendMail(email, first_name, token);
      await user.save();
      return res.json({
        success: true,
        info: "verification link sends successfully",
      });
    } else {
      res.send({ success: false, msg: "User already exist" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Something went wrong" });
  }
};
