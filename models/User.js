const mongoose = require("mongoose");

const user = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  token: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: String,
    default: false,
  },
});

user.pre("save", function (next) {
  this.login_time = new Date().toString();
  next();
});
const User = new mongoose.model("user", user);
module.exports = User;
