const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
router.post('/register', async (req, res, next)  => {
    const doesEmailExist = await User.findOne({ email: req.body.email });
    if (doesEmailExist) return res.status(400).send({ error: "User is already registered on this Email Address" });
    date = Date();
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_date: date.toString(),
        confirmed: false,
        role: "none",
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
    User.findOne({ username: req.body.username }, (error, user) => {
        if (error) return res.status(400).send('Error logging in');
        if (!user) { return res.status(401).send('Incorrect email or password.'); }
        if (!user.isValid(req.body.password)) {
            return res.status(401).send('Incorrect email or password.');
        }
        else {       
            var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 10000
            });
            res.json({ token: 'JWT ' + token });
        }
    });
});
router.post('/user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.status(200).json("Welcome to the protected route");
});
router.get('/logout', isUserValid, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
});
function isUserValid(req, res, next) {
    return passport.authenticate('jwt', { session: false });
}
module.exports = router;
