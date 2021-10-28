const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
app.use(express.static(path.join(__dirname + '/../angular-app/dist/angular-app')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../angular-app/dist/angular-app/index.html'));
});
app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the server'
    });
});
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post Created...',
                authData
            });
        }
    });
});
app.post('/api/refresh', (req, res) => {
});
app.post('/api/login', (req, res) => {
    user = {
        email: "Soemthing something",
        password: "PasswordSometing",
    };
    res.json(this.user)
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
app.listen(8000, () => {
    console.log('Server started!')
})
