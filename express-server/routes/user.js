const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const jwtBlacklist = require( '../models/jwt-blacklist' );
const jwt = require( 'jsonwebtoken' );
const passport = require( 'passport' );
const email = require( "../email-service" );
const isUserValid = passport.authenticate( 'jwt', { session: false } );
const isUserConfirmed = () => {
    return ( req, res, next ) => {
        if ( !req.user.confirmed_email ) {
            res.status( 400 ).json( { message: "You must confirm your email account by clicking the link emailed to you, on the account provided when signing up" } );
        } else if ( !req.user.confirmed_game ) {
            res.status( 400 ).json( { message: "You must confirm your in-game name by typing /register in minecraft and clicking the link. Open it in the browser you are signed in on." } );
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
    if ( doesEmailExist ) return res.status( 400 ).send( { error: "User is already registered on this Email Address" } );
    var user = new User( {
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword( req.body.password ),
        creation_date: new Date(),
        confirmed_game: false,
        confirmed_email: false,
        role: "user",
    } );
    try {
        doc = await user.save();
        return res.status( 201 ).json( doc );
    } catch ( err ) {
        res.status( 401 ).json( err );
    }
    next();
} );
router.post( '/login', ( req, res, next ) => {
    User.findOne( { username: req.body.email }, ( error, user ) => {
        if ( error ) return res.status( 400 ).json( { message: 'Error logging in' } );
        if ( !user || !user.isValid( req.body.password ) ) {
            return res.status( 400 ).json( { message: 'Incorrect email or password.' } );
        }
        else if ( user.banned ) {
            return res.status( 400 ).json( { message: 'User is banned' } );
        }
        else {
            var token = jwt.sign( { id: user._id }, process.env.SECRET, {
                expiresIn: 10000
            } );
            res.cookie( 'jwt', token, { httpOnly: true, secure: false } );
            res.status( 200 ).send( { token } );
        }
    } );
} );
router.post( '/user-info', ( req, res, next ) => {
    if ( req.body.id ) {
        User.findById( req.body.id, ( error, user ) => {
            if ( !error ) {
                userInformation = { 
                    _id: user._id,
                    username: user.username,
                };
                res.status( 200 ).json( { user: userInformation } );
            }
            else {
                console.log( "Error getting Username for Id\n" + error );
                res.status( 400 ).json( { message: "Error finding ID " } );
            }
        } );
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
router.post( '/reset-email', ( req, res, next ) => {
    let sent = false;
    sent = email.sendResetEmail( 'Test' );
    res.json({ confirmed: sent });
} );
router.post( '/confirm-email', ( req, res, next ) => {
    let sent = false;
    sent = email.sendConfirmEmail( 'Test', 'TestIdHere', 'TestExtraInfoHere' );
    res.json({ confirmed: sent });
} );
module.exports = router;
