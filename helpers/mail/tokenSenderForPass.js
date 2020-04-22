
const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS} = process.env;

const nodemailer = require("nodemailer");

const sendMail = async infos => {

    let transporter =  nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
          user: SMTP_USER, 
          pass: SMTP_PASS 
        }
      }); 

      transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
}


module.exports = sendMail;