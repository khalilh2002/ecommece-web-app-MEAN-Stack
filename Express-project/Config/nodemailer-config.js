const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

let config = {
  service: process.env.EMAIL_SERVICE, // your email domain
  auth: {
    user: process.env.EMAIL_ADDRESS, // your email address
    pass: process.env.EMAIL_PASSWORD_KEY, // your password
  },
};

const transporter = nodemailer.createTransport(config);

module.exports = transporter;