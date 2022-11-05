const { register } = require("./signup/signup");
const { login, Verify } = require("./Login/login");
const { uploadPicture } = require("./UploadPicture/fileUpload");
const { deleteUploadedFile } = require("./UploadPicture/deleteFile");
const { getUploadedFiles } = require("./UploadPicture/getUploadedFiles");
module.exports = {
  register,
  getUploadedFiles,
  Verify,
  login,
  deleteUploadedFile,
  uploadPicture,
};
