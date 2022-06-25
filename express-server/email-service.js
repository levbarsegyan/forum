const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const fromAddress = '"' + process.env.EMAIL_USERNAME + '" <' + process.env.EMAIL_ACCOUNT + '>';
async function sendEmail(message) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass 
        }
    });
    let info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
const sendConfirmEmail = (targetAddress, id, extraInfo) => {
    const clickLink = process.env.DOMAIN + ':4200/'; 
    const confirmContentHTML = '<b>In order to confirm your email address for Playdeca, click the link below</b><br>' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.<br><br>' +
        '<a href="' + clickLink +
        '">Confirmation Link</a>';
    const confirmContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink;
    let message = {
        from: this.fromAddress, 
        to: targetAddress, 
        subject: 'Account Confirmation ✔', 
        text: confirmContentPlain, 
        html: confirmContentHTML, 
    }
    sendEmail(message);
}
const sendResetEmail = (targetAddress) => {
    const resetContent = {
    }
    const message = {
        from: fromAddress, 
        to: targetAddress, 
        subject: 'Account Password Reset', 
        text: 'Hello world?', 
        html: '<b>Hello world?</b>' 
    }
    sendEmail(message);
}
module.exports.sendConfirmEmail = sendConfirmEmail;
module.exports.sendResetEmail = sendResetEmail;
