const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRoute = require('./routes/user');
app.use(cors({
    origin: ['http:
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect('mongodb:
app.use(session({
    name: 'decaform.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'somethingsecret',
    cookie: {
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({mongooseConnection: mongoose.connection })
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', usersRoute);
app.get('/api', (req, res) => {
});
app.listen(8000, () => {
    console.log('Server started!');
})
