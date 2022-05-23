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
const adminRoute = require('./routes/admin');
const forumRoute = require('./routes/forum');
const newsRoute = require('./routes/news');
const BACKEND_PORT = process.env.BACKEND_PORT || 8000;
const FRONTEND_DOMAIN = "http:
const BACKEND_DOMAIN = "http:
const MONGODB_DOMAIN = process.env.DB_CONNECTION;
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
mongoose.connect(MONGODB_DOMAIN, { useNewUrlParser: true, useFindAndModify: false });
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
app.use('/api/admin', adminRoute);
app.use('/api/news', newsRoute);
app.listen(BACKEND_PORT, () => {
    console.log('Server started!');
})
