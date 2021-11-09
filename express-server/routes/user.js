const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
router.post('/register', function (req, res, next) {
    addToDatebase(req, res);
});
async function addToDatebase(req, res) {
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_date: Date.now(),
        confirmed: false,
        role: "none",
    });
    console.log("Please work");
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    } catch (err) {
        res.status(401).json(err);
    }
}
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(401).json('Error, try again. :('); }
        if (!user) { return res.status(401).json('Incorrect email or password.'); }
        req.logIn(user, function (err) {
            if (err) { return res.status(401).json('Incorrect password for this account.'); }
            return res.status(200).json('Login Success');
        });
    })(req, res, next);
});
router.get('/user', isUserValid, function (req, res, next) {
    return res.status(200).json(req.user);
});
router.get('/logout', isUserValid, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
});
function isUserValid(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        return res.status(401).json({ message: 'Unauthorized Request' });
}
module.exports = router;
