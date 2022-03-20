const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isUserValid = passport.authenticate('jwt', { session: false });
const isUserConfirmed = () => {
    return (req, res, next) => {
        console.log("Checking is user a user");
        if (!req.user.confirmed_email) {
            return res.status(400).json({
                message: "You must confirm your email account by clicking the link emailed to you, on the account provided when signing up"
            });
        }
        else if (!req.user.confirmed_game) {
            return res.status(400).json({
                message: "You must confirm your in-game name by typing /register in minecraft and clicking the link. Open it in the browser you are signed in on."
            });
        }
        else {
            next()
        }
    }
}
const isUserAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        res.status(400).json({ admin: false, message: "User is not an admin" });
    }
    else if (req.user.role === 'admin') {
        next();
    }
    else {
        res.status(400).json({ admin: false, message: "User is not an admin" });
    }
}
router.get('/role', [isUserValid, isUserAdmin], (req, res, next) => {
    if (req.user)
        res.status(200).json({admin: true, role: 'admin'});
    else
        res.status(400).json({admin: false, role: 'user'});
});
router.get('/check', [isUserValid, isUserAdmin], (req, res, next) => {
    if (req.user) {
        res.status(200).json({ admin: true, message: "User is admin" });
    }
    else
        res.status(400).json({ admin: false, message: "User is user"});
});
module.exports = router;
