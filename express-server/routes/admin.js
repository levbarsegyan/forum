const express = require('express');
const router = express.Router();
const passport = require('passport');
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(401).json('Error, try again. :('); }
        if (!user) { return res.status(401).json('Incorrect username or password.'); }
        req.logIn(user, function (err) {
            if (err) { return res.status(401).json('Incorrect password for this account.'); }
            return res.status(200).json('Login Success');
        });
    })(req, res, next);
});
router.get('/admin', isValid, function (req, res, next) {
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
