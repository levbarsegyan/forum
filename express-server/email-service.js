const nodemailer = require( 'nodemailer' );
const dotenv = require( 'dotenv' );
dotenv.config();
const emailHeader = ''
const fromAddress = '"' + process.env.EMAIL_USERNAME + '" <' + process.env.EMAIL_ACCOUNT + '>';
async function sendEmail( message ) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASS
        }
    } );
    let info = await transporter.sendMail( message );
    console.log( 'Message sent: %s', info.messageId );
    console.log( 'Preview URL: %s', nodemailer.getTestMessageUrl( info ) );
}
const sendConfirmEmail = async ( targetAddress, id, extraInfo ) => {
    let testAccount = await nodemailer.createTestAccount();
    const clickLink = 'http:
    const confirmContentHTML = '<b>In order to confirm your email address for Playdeca, click the link below</b><br>' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.<br><br>' +
        '<a href="' + clickLink + '">Confirmation Link</a>';
    const confirmContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink;
    let message = {
        from: this.fromAddress, 
        to: process.env.EMAIL_ACCOUNT,
        subject: 'Account Confirmation ✔', 
        text: confirmContentPlain, 
        html: confirmContentHTML, 
    };
    sendEmail( message );
}
const sendResetEmail = async ( targetAddress, id, extraInfo ) => {
    const clickLink = 'http:
    const resetContentHTML = '<b>To reset the password of your account for Playdeca, click the link below</b><br>' +
        'If you did not request to reset your password, then you can ignore this email.<br>' +
        'In case, you have any trouble with this and are not able to log in after changing your password, content Random6894 or Monster_what on the Discord server. Link is available on Playdeca.com<br><br>' +
        '<a href="' + clickLink +
        '">Confirmation Link</a>';
    const resetContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink;
    const message = {
        from: this.fromAddress, 
        to: process.env.EMAIL_ACCOUNT,
        subject: 'Account Password Reset', 
        text: resetContentPlain, 
        html: resetContentHTML, 
    };
    sendEmail( message );
}
module.exports.sendConfirmEmail = sendConfirmEmail;
module.exports.sendResetEmail = sendResetEmail;
