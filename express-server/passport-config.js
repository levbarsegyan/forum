var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const Admin = require('./models/admin');
passport.use('user-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done({ message: 'General Error for the server' }); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.use('admin-local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
  function(username, password, done) {
    Admin.findOne({ username: username }, function(err, admin) {
      if (err) { return done({ message: 'General Error for the server' }); }
      if (!admin) {
        return done(null, false, { message: 'Admin is not registered with this username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, admin);
    });
  }
));
function userInformation(userId, userType, details) {
    this.userId = userId;
    this.userType = userType;
    this.details = details;
}
passport.serializeUser(function(user, done) {
    var userType = "user";
    var userPrototype = Object.getPrototypeOf(user);
    if (userPrototype === User.prototype) {
        userType = "user";
    }
    else if (userPrototype === Admin.prototype) {
        userType = "admin";
    }
    var userInfo = new userInformation(user._id, userType, '');
    done(null, userInfo)
});
passport.deserializeUser(function (userInfo, done) {
    if (userInfo.userType == 'user') {
        User.findById(userInfo.userId, function(err, user) {
            done(err, user);
        });
    }
    else if (userInfo.userType == 'admin'){
        Admin.findById(userInfo.userId, function(err, user) {
            done(err, user);
        });
    }
});
