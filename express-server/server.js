const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRoute = require('./routes/user');
app.use(cors({
    origin: ['http:
    credentials: true,
}));
mongoose.connect('mongodb:
const passport = require('passport');
const session = require('express-session');
app.use(session({
    name: 'decaform.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'somethingsecret',
    cookie: {
        httpOnly: false,
        secure: false
    }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', usersRoute);
app.get('/api', (req, res) => {
});
app.listen(8000, () => {
    console.log('Server started!')
})
