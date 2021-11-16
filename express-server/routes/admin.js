const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
router.post('/login', function (req, res, next) {
    passport.authenticate('admin-local', function (err, user, info) {
        if (err) { return res.status(401).json('Error, try again. :('); }
        if (!user) {
            return res.status(401).json('Incorrect username or password.');
        }
        req.login(user, function (err) {
            if (err) { return res.status(401).json('Incorrect password for this account.'); }
            return res.status(200).json('Login Success');
        });
    })(req, res, next);
});
router.get('/register', function (req, res, next) {
    addToDatabase(req, res);
});
async function addToDatabase(req, res) {
    var user = new Admin({
        username: "DecaAdmin",
        password: Admin.hashPassword('sometihng'),
    });
    try {
        doc = await user.save();
        console.log("Default User Saved")
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(401).json(err);
    }
}
router.get('/user', isValid, function (req, res, next) {
    return res.status(200).json(req.user);
});
router.get('/logout', isValid, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
});
function isValid(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        return res.status(401).json({ message: 'Unauthorized Request' });
}
module.exports = router;
