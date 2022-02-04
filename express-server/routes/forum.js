const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const CommentData = require('../models/comments');
const ForumData = require('../models/forum');
router.post('/create', function (req, res, next) {
    console.log(req.body);
    let postInformation = new ForumData(req.body);
    postInformation.save();
});
router.post('/delete-post', function (req, res, next) {
    ForumData.findById(req.body._id).then(
        function (doc, err) {
            if (err) {
                res.json({ message: err }).catch();
            }
            doc.comment.forEach(comId => {
                CommentData.findByIdAndDelete(comId).then(
                    function (doc, err) {
                        if (err) {
                            res.json({ CommentMessage: err });
                        }
                        res.json({ CommentMessage: "Deleted comment" });
                    }
                ).catch(rejection => {
                    console.log(rejection);
                });
            });
        }
    );
    ForumData.findByIdAndDelete(req.body._id).then(
        function (doc, err) {
            if (err) {
                res.json({ message: err })
            }
            res.json({ message: "Post deleted" });
        }
    );
});
router.post('/edit-post', function (req, res, next) {
    ForumData.findByIdAndUpdate(req.body._id, { content: req.body.content })
        .then(function (doc) {
            res.json({ message: "Post updated!" });
        });
});
router.get('/list', function (req, res, next) {
    ForumData.find().then(
        function (doc) {
            res.json(doc);
        }
    );
});
router.post('/delete-reply', function (req, res, next) {
    console.log(req.body.commentId);
    CommentData.findByIdAndDelete(req.body.commentId).then(
        function (doc, err) {
            if (err) {
                res.json({ message: "Error deleting comment -- " + err });
            }
            console.log("Deleted: " + doc);
        }
    ).then(
        ForumData.findByIdAndUpdate(req.body.postId, { '$pull': { 'comment': req.body.commentId } }).then(
            function (doc, err) {
                if (err) {
                    res.json({ message: "Error updating forum post comments -- " + err})
                }
                console.log("Updated for comment removal " + doc)
                res.json({ message: "Comment/Reply was deleted" });
            }
        )
    );
});
router.put('/vote-up', function (req, res, next) {
});
router.put('/vote-down', function (req, res, next) {
});
router.post('/add-reply', function (req, res, next) {
    let postId = req.body.postId;
    let commentPost = req.body.comment;
    let commentInformation = new CommentData(commentPost);
    commentInformation.save().then(
        com => {
            return (ForumData.findByIdAndUpdate(postId, { '$push': { 'comment': com._id } })
                .catch(() => {
                    console.log("Error on saving comment");
                    res.json({ message: "Error on saving comment" });
                }));
        }
    );
    res.json({ message: "Comment added" });
});
router.post('/get-reply', function (req, res, next) {
    CommentData.findById(req.body._id).then(
        function (document) {
            res.json(document);
        }
    );
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body).then(
        function (doc) {
            res.json(doc);
            next();
        }
    );
});
module.exports = router;
