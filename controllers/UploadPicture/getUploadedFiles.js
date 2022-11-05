const StoreFile = require("../../models/StoredfileModel");

exports.getUploadedFiles = async (req, res) => {
  try {
    const { User } = req;
    const { _id } = User;
    const files = await StoreFile.find({ user_id: _id });
    if (!files.length) throw new Error("No files found");
    res.json({ success: true, total_images: files.length, files });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
