const nodemailer = require("nodemailer");
const templateOtp = require("./template");

exports.sendMail = async (email, name, token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    var mailOptions = {
      from: "Web Developer",
      to: email,
      subject: "Verfication Link From RSquare",
      html: templateOtp(email, name, token),
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Link send successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
