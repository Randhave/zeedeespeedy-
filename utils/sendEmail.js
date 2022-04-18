import nodemailer from 'nodemailer'

export const sendEmail = async (options) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        }

        await transporter.sendMail(mailOptions);

    } 
    catch (error) {
     console.log("error while send an email ", error.message)
    }

    //  transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log("error while send an email ", error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
} 