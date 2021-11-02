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
        creation_date: Date.now()
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    } catch (err) {
        res.status(501).json(err);
    }
};
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({message: 'Login Success'});
        });
    })(req, res, next);
});
module.exports = router;
