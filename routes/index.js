const router = require("express").Router();
const { Router } = require("../middleware/RouteGuard");
const {
  register,
  login,
  Verify,
  uploadPicture,
  getUploadedFiles,
  deleteUploadedFile,
} = require("../controllers/index");
const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + ".jpg");
  },
});
let upload = multer({
  storage: storage,
});
router.post("/register", register);
router.post("/login", login);
router.get("/verify", Verify);
router.post("/upload-images", Router, upload.any(), uploadPicture);
router.delete("/delete-images", Router, deleteUploadedFile);
router.get("/get-images", Router, getUploadedFiles);
module.exports = router;
