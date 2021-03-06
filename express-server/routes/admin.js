const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const jwt = require( 'jsonwebtoken' );
const passport = require( 'passport' );
const isUserValid = passport.authenticate( 'jwt', { session: false } );
const isUserConfirmed = () => {
    return ( req, res, next ) => {
        console.log( "Checking is user a user" );
        if ( !req.user.confirmed_email ) {
            return res.status( 400 ).json( {
                message: "You must confirm your email account by clicking the link emailed to you, on the account provided when signing up"
            } );
        }
        else if ( !req.user.confirmed_game ) {
            return res.status( 400 ).json( {
                message: "You must confirm your in-game name by typing /register in minecraft and clicking the link. Open it in the browser you are signed in on."
            } );
        }
        else {
            next();
        }
    }
}
const isUserAdmin = ( req, res, next ) => {
    if ( req.user.role === 'user' ) {
        res.status( 200 ).json( { admin: false, message: "User is not an admin" } );
    }
    else if ( req.user.role === 'admin' ) {
        next();
    }
    else {
        res.status( 200 ).json( { admin: false, message: "User is not an admin" } );
    }
}
router.get( '/role', [isUserValid, isUserAdmin], ( req, res, next ) => {
    if ( req.user )
        res.status( 200 ).json( { admin: true, role: 'admin' } );
    else
        res.status( 200 ).json( { admin: false, role: 'user' } );
} );
router.get( '/check', isUserValid, ( req, res, next ) => {
    if ( req.user.role === 'user' ) {
        res.status( 400 ).json( false );
    }
    else if ( req.user.role === 'admin' ) {
        res.status( 200 ).json( true );
    }
    else {
        res.status( 400 ).json( false );
    }
    next();
} );
router.get( '/all-banned-users', [isUserValid, isUserAdmin], ( req, res, next ) => {
    User.find( { role: 'user', banned: true }, ( error, document ) => {
        if ( error ) {
            res.status( 404 ).json( { message: "Not found" } );
        }
        else {
            let allUsers = [];
            document.forEach( user => {
                userInfo = {
                    _id: user._id,
                    username: user.username,
                }
                allUsers.push( userInfo );
            } );
            res.status( 200 ).json( { allUsers } );
        }
    } )
} );
router.post( '/ban-user', [isUserValid, isUserAdmin], ( req, res, next ) => {
    const userId = req.body.ban._id;
    User.findByIdAndUpdate( userId, { banned: true }, ( error, document ) => {
        if ( error ) {
            res.status( 200 ).json( { message: 'Cannot ban player reason: ' + error } );
        }
        else {
            res.status( 200 ).json( { message: 'Player was banned from the website' } );
        }
    } );
} );
router.post( '/unban-user', [isUserValid, isUserAdmin], ( req, res, next ) => {
    const userId = req.body.unban._id;
    User.findByIdAndUpdate( userId, { banned: false }, ( error, document ) => {
        if ( error ) {
            res.status( 200 ).json( { message: 'Cannot unban player reason: ' + error } );
        }
        else {
            res.status( 200 ).json( { message: 'Player has been unbanned from the website' } );
        }
    } );
} );
module.exports = router;
