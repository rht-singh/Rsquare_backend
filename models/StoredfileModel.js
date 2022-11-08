const mongoose = require("mongoose");

const file = mongoose.Schema({
  user_id: {
    type: String,
  },
  link: {
    type: String,
  },
  image_id: {
    type: String,
  },
  time: {
    type: String,
  },
  file_type: {
    type: String,
  },
  file_name: {
    type: String,
  },
});

const StoreFile = new mongoose.model("file", file);
module.exports = StoreFile;
