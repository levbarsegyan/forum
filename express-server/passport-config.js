const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('./models/user');
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)    {
        token = req.cookies.jwt;
    }
    console.log("Found the token = " + token);
    return token;
};
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET,
};
passport.use(new JwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
}));
