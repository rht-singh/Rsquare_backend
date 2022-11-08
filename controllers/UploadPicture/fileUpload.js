const { uploadFile } = require("../../utils/uploadDrive");
const fs = require("fs");
const path = require("path");
exports.uploadPicture = async (req, res) => {
  try {
    const { files } = req;
    if (!files.length)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    const { User } = req;
    const { _id } = User;
    files.forEach(async (file) => {
      const filepath = path.join(
        path.dirname(process.mainModule.filename),
        `/uploads/${file.originalname}.jpg`
      );
      let filename = file.originalname;
      uploadFile(filepath, filename, _id, file)
        .then(() => console.log("File uploaded"))
        .catch(() => console.log("File not uploaded"));
    });
    res.json({ success: true, message: "File uploaded. Please Refresh" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
