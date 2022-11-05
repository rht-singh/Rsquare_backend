const { google } = require("googleapis");
const { OAUTH } = require("../config/gdrive");
const StoreFile = require("../models/StoredfileModel");
const fs = require("fs");
const oauth2Client = OAUTH();
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function generatePublicUrl(fileId, user_id, filePath) {
  try {
    //change file permisions to public.
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //obtain the webview and webcontent links
    const { data } = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    let createdTime = new Date().toLocaleString();
    const file = new StoreFile({
      user_id: user_id,
      link: data.webViewLink,
      image_id: fileId,
      time: createdTime,
    });
    await file.save();
    fs.unlink(filePath, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  } catch (error) {
    console.log(error.message);
  }
}

exports.uploadFile = async (path, filename, user_id) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename, //file name
        parents: ["1E_5mJ9Le3akrRpE2u86xU9BCTlWLC8xH"],
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(path),
      },
    });
    // report the response from the request
    await generatePublicUrl(response.data.id, user_id, path);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFile = async (fileID) => {
  try {
    const response = await drive.files.delete({
      fileId: fileID, // file id
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
