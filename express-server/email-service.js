const nodemailer = require( 'nodemailer' );
const dotenv = require( 'dotenv' );
dotenv.config();
const emailHeader = ''
const linkStart = 'http:
const fromAddress = '"' + process.env.EMAIL_USERNAME + '" <' + process.env.EMAIL_ACCOUNT + '>';
const transporter = nodemailer.createTransport( {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASS
    }
} );
async function sendEmail( targetAddress, subject, textPlain, textHTML ) {
    const message = {
        from: fromAddress, 
        to: process.env.EMAIL_ACCOUNT, 
        subject: subject, 
        text: textPlain, 
        html: textHTML, 
    };
    await transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Mail error: " + error);
            return false;
        } else {
            return true;
        }
    });
};
const sendConfirmEmail = async (targetAddress, id, extraInfo) => {
    const clickLink = linkStart + '/confirm-account?id=' + id + '&info=' + extraInfo;
    const confirmContentHTML = '<b>In order to confirm your email address for Playdeca, click the link below</b><br>' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.<br><br>' +
        '<a href="' + clickLink + '">Confirmation Link</a>';
    const confirmContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink;
    const subject= 'Account Confirmation ✔';
    let sentSuccessfully = sendEmail(targetAddress, subject,  confirmContentPlain,  confirmContentHTML);
    return sentSuccessfully; 
};
const sendResetEmail = async (targetAddress, id, extraInfo) => {
    const clickLink = linkStart + '/reset-pass?target=' + targetAddress;
    const resetContentHTML = '<b>To reset the password of your account for Playdeca, click the link below</b><br>' +
        'If you did not request to reset your password, then you can ignore this email.<br>' +
        'In case, you have any trouble with this and are not able to log in after changing your password, content Random6894 or Monster_what on the Discord server. Link is available on Playdeca.com<br><br>' +
        '<a href="' + clickLink +
        '">Confirmation Link</a>';
    const resetContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink;
    const subject = 'Account Password Reset';
    let sentSuccessfully = sendEmail(targetAddress, subject, resetContentPlain, resetContentHTML);
    return sentSuccessfully; 
};
module.exports.sendConfirmEmail = sendConfirmEmail;
module.exports.sendResetEmail = sendResetEmail;
