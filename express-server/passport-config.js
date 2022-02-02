const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('./models/user');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.SECRET
};
passport.use(new JwtStrategy(options, (payload, done) => {
    User.findOne({ id: payload._id }, function (err, user) {
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
