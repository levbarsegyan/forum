const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieparser = require('cookie-parser');
const usersRoute = require('./routes/user');
const forumRoute = require('./routes/forum');
const port = process.env.PORT || 8000;
const requireAuth = passport.authenticate('jwt', { session: false });
app.use(cors({
    origin: [
        'http:
        'http:
    ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb:
app.use(session({
    name: 'decaform.sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.get('/api', (req, res) => {
});
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/forum', forumRoute);
app.use('/api/users', usersRoute);
app.post('/protected', requireAuth, function (req, res) {
    res.send("Welcome to this protected route, you may continue")
})
app.listen(port, () => {
    console.log('Server started!');
})
