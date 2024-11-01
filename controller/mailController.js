let nodemailer = require('nodemailer');


module.exports = mailer = (req, res) =>{
    // send mail
    let transporter = nodemailer.createTransport({
        secure: true,
        host : 'smtp.gmail.com',
        service:'gmail',
        port: 405,
        auth : {
          user: 'glareminds@gmail.com',
          pass: 'glareminds@88'
        }
      });

      let sendM = (to, sub, msg)=>{
        try {
            transporter.sendMail({
                to:to,
                subject: sub,
                html : msg
              });
            res.send("mail sent");  
        } catch (error) {
            res.send(error);
        }
        
      }

      // calling the send message function
      sendM('glareminds @gmail.com', "Testing mailer", "This is message");



}