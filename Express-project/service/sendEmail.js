const transporter = require('../Config/nodemailer-config')


const sendEmail = async (to, subject, text) => {
    try {
  
      let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        html: text
      };
  
      let info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  module.exports = sendEmail;