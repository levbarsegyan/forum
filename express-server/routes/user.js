const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const jwtBlacklist = require( '../models/jwt-blacklist' );
const jwt = require( 'jsonwebtoken' );
const passport = require( 'passport' );
const email = require( "../email-service" );
const validation = require( "../validation-service" );
const isUserValid = passport.authenticate( 'jwt', { session: false } );
const isEmailConfirmed = (req, res, next) => {
    return ( req, res, next ) => {
        if (!req.user.confirmed_email) {
            res.status(400).json({ message: "You must confirm your email account by clicking the link emailed to you, on the account provided when signing up" });
        }
        else {
            next();
        }
    }
}
const isGameNameConfirmed = () => {
    return ( req, res, next ) => {
        if ( !req.user.confirmed_game ) {
            res.status( 200 ).json( { message: "You must confirm your in-game name by typing /register in minecraft and clicking the link. Open it in the browser you are signed in on." } );
        }
        else {
            next();
        }
    }
}
const checkBlacklist = () => {
    return ( req, res, next ) => {
        console.log( passport.cookie );
    }
}
router.post( '/register', async ( req, res, next ) => {
    const doesEmailExist = await User.findOne( { email: req.body.email } );
    if ( doesEmailExist ) return res.status( 400 ).send( { reply: "User is already registered on this Email Address" } );
    if (validation.validateNewUser(req.body.username, req.body.email, req.body.password)) {
        var user = new User( {
            email: req.body.email,
            username: req.body.username,
            password: User.hashPassword( req.body.password ),
            extra_info: User.hashPassword( req.body.email ),
            creation_date: new Date(),
            confirmed_game: false,
            confirmed_email: false,
            role: "user",
        } );
        try {
            doc = await user.save();
            const success = email.sendConfirmEmail( doc.email, doc._id, doc.extra_info );
            return res.status( 201 ).json( success );
        } catch ( err ) {
            res.status( 401 ).json( err );
        }
        next();
    }
    else {
        res.status(400).json({ reply: "Information was invalid." });
    }
} );
router.post( '/login', ( req, res, next ) => {
    let userInformation = {
        email: req.body.email,
        password: req.body.password,
    }
    console.log("Attempted sign in with " + userInformation);
    if (validation.validateSignIn(userInformation.email, userInformation.password)) {
        User.findOne( { email: userInformation.email }, ( error, user ) => {
            if ( error ) return res.status( 400 ).json( { message: 'Error logging in' } );
            if ( !user || !user.isValid(userInformation.password) ) {
                return res.status( 400 ).json( { message: 'Incorrect email or password.' } );
            }
            else if ( user.banned ) {
                return res.status( 400 ).json( { message: 'User is banned' } );
            }
            else if ( !user.confirmed_email ) {
                return res.status( 400 ).json( { message: 'You have not confirmed your email address' } );
            }
            else {
                var token = jwt.sign( { id: user._id }, process.env.SECRET, {
                    expiresIn: 10000
                } );
                res.cookie( 'jwt', token, { httpOnly: true, secure: false } );
                res.status( 200 ).send( { token } );
            }
        } );
    }
    else {
        res.status(400).json({ message: 'Invalid information received' });
    }
} );
router.post( '/user-info', ( req, res, next ) => {
    if ( req.body.id ) {
        User.findById( req.body.id, ( error, user ) => {
            if ( !error ) {
                userInformation = { 
                    _id: req.body.id,
                    username: user.username,
                };
                res.status( 200 ).json( { user: userInformation } );
            }
            else {
                console.log( "Error getting Username for Id\n" + error );
                res.status( 400 ).json( { message: "Error finding ID " } );
            }
        }).catch((err) => {
            res.status(400).json({message: 'User already signed out'});
        });
    } else {
        res.status( 401 ).json( { message: "No user" } );
    }
} );
router.get( '/all-users', ( req, res, next ) => {
    User.find( { role: 'user', banned: false }, ( error, doc ) => {
        if ( !error ) {
            let allUsers = [];
            doc.forEach( user => {
                userInfo = {
                    _id: user._id,
                    username: user.username,
                }
                allUsers.push( userInfo );
            } );
            res.status( 200 ).json( { allUsers } );
        }
        else {
            console.log( "Error getting Username for Id\n" + error );
            res.status( 400 ).json( { message: "Error finding ID " } );
        }
    } );
    res.status( 400 );
} );
router.get( '/user', isUserValid, ( req, res, next ) => {
    if ( req.user.banned ) {
        res.cookie( 'jwt', '', { httpOnly: true, secure: false } );
        return res.status( 200 ).json( { message: 'Logout Success' } );
    }
    if ( req.user ) {
        userInformation = {
            _id: req.user._id,
            email: req.user.email,
            username: req.user.username,
            creation_date: req.user.creation_date,
            confirmed: req.user.confirmed_email,
        };
        res.status( 200 ).json( userInformation );
    }
    else
        res.status( 400 ).json( "User is signed out" )
} );
router.get( '/role', isUserValid, ( req, res, next ) => {
    if ( req.user )
        res.status( 200 ).json( req.user.role );
    else
        res.status( 400 ).json( "User signed out" )
} );
router.get( '/logout', ( req, res, next ) => {
    res.cookie( 'jwt', '', { httpOnly: true, secure: false } );
    return res.status( 200 ).json( { message: 'Logout Success' } );
} );
function logoutUser( req, res, next ) {
}
router.post( '/default-admin', async ( req, res, next ) => {
    var user = new User( {
        email: process.env.ADMIN_EMAIL,
        username: process.env.ADMIN_USERNAME,
        password: User.hashPassword( process.env.ADMIN_PASS ),
        extra_info: User.hashPassword( process.env.ADMIN_EMAIL ),
        creation_date: new Date(),
        confirmed_game: true,
        confirmed_email: true,
        role: 'admin',
    } );
    try {
        doc = await user.save();
        res.status( 200 ).json( "success" );
    } catch ( err ) {
        res.status( 200 ).json( "failure: " + err );
    }
    next();
} );
router.post( '/check-email', ( req, res, next ) => {
    if (validation.matchEmail(req.body.payload.email)) {
        let targetEmail = req.body.payload.email;
        User.findOne( { email: targetEmail, banned: false }, ( err, doc ) => {
            if ( err || doc === null ) {
                res.status(200).json({ found: false })
                console.log("Error: " + err);
            } else {
                res.status( 200 ).json( { found: true } )
            }
        } );
    }
    else {
        res.status(200).json({ found: false, message: 'Email format is invalid' });
    }
} );
router.post( '/reset-email', ( req, res, next ) => {
    let targetEmail = req.body.payload.email;
    let targetId;
    let extra;
    if (validation.matchEmail(targetEmail)) {
        User.findOneAndUpdate( { email: targetEmail, banned: false }, { allow_reset: true }, ( err, doc, result ) => {
            if ( err ) {
                res.status( 200 ).json( { message: 'Cannot find user with that email address' } )
            } else {
                targetId = doc._id;
                extra = doc.extra_info;
                email.sendResetEmail( targetEmail, targetId, extra );
                res.status( 200 ).json( { message: 'Email sent to ' + targetEmail + ' \nCheck inbox and spam folder for the reset email.' } )
            }
        } );
    }
    else {
        res.status(200).json({ message: 'Invalid Email format' });
    }
} );
router.post( '/reset-pass', ( req, res, next ) => {
    let newPassword = req.body.payload.password;
    let userId = req.body.payload.id;
    let extraInfo = req.body.payload.information;
    User.findById( userId, ( error, document ) => {
        if ( document.extra_info === extraInfo ) {
            User.findOneAndUpdate( { _id: userId, banned: false },
                { allow_reset: false, password: User.hashPassword( newPassword ), extraInfo: "" },
                ( err, doc, result ) => {
                    if ( err ) {
                        res.status( 200 ).json( { accepted: false, message: 'Unable to change user password, sorry' } )
                    } else {
                        res.status( 200 ).json( { accepted: true, message: 'Password reset' } )
                    }
                }
            );
        } else if ( error ) {
            res.status( 404 ).json( { accepted: false, message: err } )
        }
        else {
            res.status( 404 ).json( { accepted: false, message: "Incorrect Temporary Passcode" } )
        }
    } )
} );
router.post( '/confirm-email', ( req, res, next ) => {
    let id = req.body.payload.id;
    User.findOneAndUpdate( { _id: id, banned: false }, { confirmed_email: true },
        ( err, doc, result ) => {
            if ( err ) {
                res.status( 401 ).send( { accepted: false, reply: 'Unable to confirm account email address, sorry' } );
            } else {
                res.status( 200 ).send( { accepted: true, reply: 'Your account\'s email address has been confirmed' } );
            }
        } );
} );
module.exports = router;
