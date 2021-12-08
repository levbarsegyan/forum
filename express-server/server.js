const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
app.use(cors({
    origin: [
        'http:
        'http:
        'http:
    ],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb:
app.use(session({
    name: 'decaform.sid',
    resave: false,
    saveUninitialized: false,
    secret: "somethingsecret",
    cookie: {
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({mongooseConnection: mongoose.connection })
}));
app.get('/api', (req, res) => {
});
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/admin', adminRoute);
app.use('/api/users', usersRoute);
app.listen(8000, () => {
    console.log('Server started!');
})
