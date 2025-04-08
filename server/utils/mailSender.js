const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            //transporter
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                debug: true,
            })

            //send mail
            let info = await transporter.sendMail({
                from: 'StudyNotion || Aditya Mishra',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;