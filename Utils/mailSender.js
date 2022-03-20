const nodemailer = require('nodemailer');

const sendEmail = (subject, email, message) => new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Mail_Email,
          pass: process.env.Mail_Password,
        },
      });
      const mailOptions = {
        from: "AnyFormBuilder",
        to: email,
        subject : subject,
        text: message,
      };
      transporter.sendMail(mailOptions)
      .then(mail=>{
        console.log(mail);
        resolve(mail);
      })
      .catch(err=>{
        console.log(err)
        reject("Could Not Send Email");
      })
});

module.exports = sendEmail;