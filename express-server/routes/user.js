const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwtBlacklist = require('../models/jwt-blacklist');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isUserValid = passport.authenticate('jwt', { session: false });
const isUserConfirmed = () => {
    return (req, res, next) => {
        if (!req.user.confirmed_email) {
            res.status(400).json({ message: "You must confirm your email account by clicking the link emailed to you, on the account provided when signing up" });
        } else if (!req.user.confirmed_game) {
            res.status(400).json({ message: "You must confirm your in-game name by typing /register in minecraft and clicking the link. Open it in the browser you are signed in on." });
        }
        else {
            next()
        }
    }
}
const checkBlacklist = () => {
    return (req, res, next) => {
        console.log(passport.cookie);
    }
}
router.post('/register', async (req, res, next) => {
    const doesEmailExist = await User.findOne({ email: req.body.email });
    if (doesEmailExist) return res.status(400).send({ error: "User is already registered on this Email Address" });
    date = Date();
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_date: date.toString(),
        confirmed_game: false,
        confirmed_email: false,
        role: "user",
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    } catch (err) {
        res.status(401).json(err);
    }
    next();
});
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.email }, (error, user) => {
        if (error) return res.status(400).send('Error logging in');
        if (!user || !user.isValid(req.body.password)) {
            return res.status(401).send('Incorrect email or password.');
        }
        else {
            var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 10000
            });
            res.cookie('jwt', token, { httpOnly: true, secure: false });
            res.status(200).send({ token });
        }
    });
});
router.get('/user', [isUserValid], (req, res, next) => {
    if (req.user) {
        userInformation = {
            email: req.user.email,
            username: req.user.username,
            creation_date: req.user.creation_date,
        };
        res.status(200).json(userInformation);
    }
    else
        res.status(400).json("User signed out")
});
router.get('/role', isUserValid, (req, res, next) => {
    if (req.user)
        res.status(200).json(req.user.role);
    else
        res.status(400).json("User signed out")
});
router.get('/logout', isUserValid, (req, res, next) => {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
});
function logoutUser(req, res, next) {
}
router.post('/default-admin', async (req, res, next) => {
    date = Date();
    var user = new User({
        email: 'admin@admin.com',
        username: 'admin',
        password: User.hashPassword('admin'),
        creation_date: date.toString(),
        confirmed_game: true,
        confirmed_email: true,
        role: "admin",
    });
    try {
        doc = await user.save();
        res.status(200).json("success");
    } catch (err) {
        res.status(401).json(err);
    }
    next();
});
module.exports = router;
