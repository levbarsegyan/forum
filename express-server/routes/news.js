const express = require('express');
const router = express.Router();
const passport = require('passport');
const NewsData = require('../models/news');
const isUserValid = passport.authenticate('jwt', { session: false });
const isUserAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        res.status(400).json({ admin: false, message: "User is not an admin" });
    }
    else if (req.user.role === 'admin') {
        next();
    }
    else {
        res.status(400).json({ admin: false, message: "User is not an admin" });
    }
}
router.post('/create', isUserValid, isUserAdmin, function (req, res, next) {
    let newsInformation = new NewsData(req.body.news);
    try {
        newsInformation.save();
        res.status(200).json({ sent: true, message: "Submited, thank you" });
    } catch (reason) {
        console.log("Saving failed for reason: " + reason);
        res.status(200).json({ sent: false, message: 'There was an error saving the news, try again later' });
    }
    next();
});
router.post('/delete', isUserValid, isUserAdmin, function (req, res, next) {
    NewsData.findByIdAndDelete(req.body.newsId).then(
        (doc, err) => {
            if (err) {
                res.json({ sent: false, message: err })
            }
            res.json({ sent: true, message: "News deleted" });
        }
    );
});
router.post('/edit', isUserValid, isUserAdmin, function (req, res, next) {
    NewsData.findByIdAndUpdate(req.body.news._id, { content: req.body.news.content },
        () => {
            res.json({ message: "News post updated!" });
        }
    );
});
router.post('/get-post', function (req, res, next) {
    NewsData.findById(req.body.news._id).then(
        doc => {
            res.json(doc);
        }
    ).catch(
        reason => {
            console.log("Rejected for reason: " + reason);
            res.status(404).json(reason);
        }
    );
});
router.get('/list', function (req, res, next) {
    NewsData.find().then(
        doc => {
            res.json(doc);
        }
    ).catch(
        reason => {
            console.log("Rejected for reason: " + reason);
            res.status(404).json(reason);
        }
    );
});
module.exports = router;
