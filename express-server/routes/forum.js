const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
const mongoose = require('mongoose');
const CommentData = require('../models/comments');
const ForumData = require('../models/forum');
router.post('/create', function (req, res, next) {
    console.log(req.body)
    let postInformation = new ForumData(req.body)
    postInformation.save();
});
router.post('/delete-post', function (req, res, next) {
    ForumData.findByIdAndDelete(req.body._id)
        .then(function (doc, err) {
            if (err) {
                res.json({ message: err })
            }
            res.json({ message: "Post deleted" });
        })
});
router.post('/edit-post', function (req, res, next) {
    ForumData.findByIdAndUpdate(req.body._id, { content: req.body.content })
        .then(function (doc) {
            res.json({ message: "Post updated!" });
        });
});
router.get('/list', function (req, res, next) {
    ForumData.find()
        .then(function (doc) {
            res.json(doc);
        });
});
router.post('/delete-reply', function (req, res, next) {
});
router.put('/vote-up', function (req, res, next) {
});
router.put('/vote-down', function (req, res, next) {
});
router.post('/add-reply', function (req, res, next) {
    let postId = req.body._id;
    let commentPost = req.body.comment;
    let commentInformation = new CommentData(commentPost);
    commentInformation.save().then(c => (
        ForumData.findByIdAndUpdate(postId, { '$push': { 'comment': c._id } })
            .catch(() => {
                console.log("Error on saving comment");
                res.json({ message: "Error on saving comment" });
            })
    ));
    console.log("Might have worked");
    res.json({ message: "Might have worked" });
});
router.post('/get-reply', function (req, res, next) {
    CommentData.findById(req.body._id).then(function (document) {
        console.log("Getting: " + document);
        res.json(document);
    });
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body)
        .then(function (doc) {
            res.json(doc);
            next();
        });
});
module.exports = router;
