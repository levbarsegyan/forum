const nodemailer = require( 'nodemailer' );
const dotenv = require( 'dotenv' );
dotenv.config();
const emailHeader = 'Good evening,';
const emailFooter = 'Good luck and have fun,\nPlayDeca Administration'
const tokenText =  'The link will lead you to a reset password prompt, but you will need to enter the passcode provided. Passcode: '
const linkStart = 'http:
const fromAddress = '"' + process.env.EMAIL_USERNAME + '" <' + process.env.EMAIL_ACCOUNT + '>';
const transporter = nodemailer.createTransport( {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASS,
    }
} );
const sendEmail = async ( targetAddress, subject, textPlain, textHTML ) => {
    const message = {
        from: fromAddress, 
        to: targetAddress, 
        subject: subject, 
        text: textPlain, 
        html: textHTML, 
    };
    let sent = false;
    await transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Mail error: " + error);
            sent = false;
        } else {
            console.log("Mail info: " + info);
            sent = true;
        }
    });
    return sent; 
};
const sendConfirmEmail = async (targetAddress, id, extraInfo) => {
    const clickLink = linkStart + '/confirm-account/' + id;
    const confirmContentHTML = emailHeader +'<br><br><b>In order to confirm your email address for Playdeca, click the link below</b><br>' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.<br><br>' +
        '<a href="' + clickLink + '">Confirmation Link</a><br><br>' + emailFooter;
    const confirmContentPlain = emailHeader + '\n\nIn order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink + '\n\n' + emailFooter;
    const subject= 'Account Confirmation ✔';
    await sendEmail(targetAddress, subject,  confirmContentPlain,  confirmContentHTML);
    return true; 
};
const sendResetEmail = async (targetAddress, id, extraInfo) => {
    const clickLink = linkStart + '/reset-pass/' + id;
    const resetContentHTML = '<b>To reset the password of your account for Playdeca, click the link below</b><br>' +
        'If you did not request to reset your password, then you can ignore this email.<br>' +
        'In case, you have any trouble with this and are not able to log in after changing your password, content Random6894 or Monster_what on the Discord server. Link is available on Playdeca.com<br><br>' +
        '<a href="' + clickLink + '">Reset Password Link</a><br><br>' +
        tokenText + extraInfo + '<br><br>' + emailFooter;
    const resetContentPlain = 'In order to confirm your email address for Playdeca, click the link below\n' +
        'If you did not sign up to Playdeca.com, then you can simply ignore this email.\n\n' + clickLink + '\n\n' +
        tokenText + extraInfo + '\n\n' + emailFooter;
    const subject = 'Account Password Reset';
    await sendEmail(targetAddress, subject, resetContentPlain, resetContentHTML);
    return true; 
};
module.exports.sendConfirmEmail = sendConfirmEmail;
module.exports.sendResetEmail = sendResetEmail;
