const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isUserValid = passport.authenticate('jwt', { session: false });
const isUserConfirmed = () => {
    return (req, res, next) => {
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
const isUserAdmin = () => {
    return (req, res, next) => {
        if (req.user.role === 'user') {
            res.status(400).json({ message: "User is not an admin" });
        }
        else if (req.user.role === 'admin') {
            next();
        }
        else {
            res.status(400).json({ message: "User is not an admin" });
        }
    }
}
router.get('/role', [isUserValid, isUserAdmin()], (req, res, next) => {
    if (req.user)
        res.status(200);
    else
        res.status(400).json("User signed out");
});
module.exports = router;
