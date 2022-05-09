const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const CommentData = require('../models/comments');
const ForumData = require('../models/forum');
const VoteData = require('../models/vote');
const isUserValid = passport.authenticate('jwt', { session: false });
const getCommentAuthorId = function (req, res, next)  {
    CommentData.findById(req.body.comment._id).then(
        (doc, err) => {
            if (err) {
                res.status(404).send();
            } else {
                req.originalAuthorId = doc.author;
                next();
            }
        }
    );
};  
const getPostAuthorId = function (req, res, next)  {
    ForumData.findById(req.body._id).then(
        (doc, err) => {
            if (err) {
                res.status(404).send();
            } else {
                req.originalAuthorId = doc.author;
                next();
            }
        }
    );
};  
router.post('/create', isUserValid, function (req, res, next) {
    let rawPostData = req.body;
    rawPostData.author = req.user._id;
    let postInformation = new ForumData(rawPostData);
    try {
        postInformation.save();
        res.status(200).json({ sent: true, message: "Post was submited, thank you" });
    } catch (reason) {
        console.log("Saving failed for reason: " + reason);
        res.status(200).json({ sent: false, message: 'There was an error sending the post, try again later'});
    }
});
router.post('/delete-post', isUserValid, getPostAuthorId, function (req, res, next) {
    if (req.user._id.equals(req.originalAuthorId) ) {
        ForumData.findById(req.body._id).then(
            function (doc, err) {
                if (err) {
                    res.json({ sent: false, message: err }).catch();
                }
                doc.comment.forEach(comId => {
                    CommentData.findByIdAndDelete(comId).then(
                        function (doc, err) {
                            if (err) {
                                res.json({ CommentMessage: err });
                            }
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
                    res.json({  sent: false, message: err })
                }
                res.json({ sent: true, message: "Post deleted" });
            }
        );
    } else {
        res.json({ sent: false, message: "You are not the author of this post" });
    }
});
router.post('/edit-post', function (req, res, next) {
    ForumData.findByIdAndUpdate(req.body._id, { content: req.body.content })
        .then(
            doc => {
                res.json({ message: "Post updated!" });
            }
        );
});
router.get('/list', function (req, res, next) {
    ForumData.find().then(
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
router.post('/delete-reply', isUserValid, getCommentAuthorId, function (req, res, next) {
    if ( !req.user || req.user._id.equals(req.originalAuthorId) ) {
        CommentData.findByIdAndDelete(req.body.comment._id)
        .then(
            function (doc, err) {
                if (err) {
                    res.status(400).json({ sent: false, message: "Error deleting comment -- " + err });
                }
            }
        ).then(
            ForumData.findByIdAndUpdate(req.body.postId, { '$pull': { 'comment': req.body.comment._id } }).then(
                function (doc, err) {
                    if (err) {
                        res.status(400).json({ sent: false, message: "Error updating forum post comments -- " + err })
                    }
                }
            )
        );
        res.json({ sent: true, message: "Comment/Reply was deleted" });
    } else {
        res.json({ sent: false, message: "You may not delete others' comments" });
    }
});
router.post('/vote-up', function (req, res, next) {
});
router.post('/vote-down', function (req, res, next) {
});
router.post('/add-reply', isUserValid, function (req, res, next) {
    let postId = req.body.postId;
    let commentPost = req.body.comment;
    commentPost.author = req.user._id;
    let commentInformation = new CommentData(commentPost);
    commentInformation.save().then(
        com => {
            return (ForumData.findByIdAndUpdate(postId, { '$push': { 'comment': com._id } })
                .catch( () => {
                    console.log("Error on saving comment");
                    res.json({ message: "Error on saving comment" });
                })
            );
        }
    );
    res.json({ message: "Comment added! Thank you, " + req.user.username });
});
router.post('/edit-reply', isUserValid, getCommentAuthorId, function (req, res, next) {
    var originalAuthorId = req.originalAuthorId;
    if (req.user._id.equals(originalAuthorId)) {
        CommentData.findByIdAndUpdate(req.body.comment._id, {
            content: req.body.comment.content
        }).catch(
            (reason) => {
                console.log(reason);
                res.status(400).json({ message : "Comment failed to update"})
            }
        );
        res.status(200).json({ message: "Comment updated" });
    } else {
        res.json({ message: "You don't own this comment." });
    }
});
router.post('/get-reply', function (req, res, next) {
    CommentData.findById(req.body._id).then(
        (document) => {
            res.json(document);
        }
    );
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body).then(
        (doc) => {
            res.json(doc);
            next();
        }
    );
});
router.post('/inc-forum-vote', function (req, res, next) {
    ForumData.findByIdAndUpdate(req.body.forum._id, { $inc: { vote_count: 1 } });
});
router.post('/dec-forum-vote', function (req, res, next) {
    ForumData.findByIdAndUpdate(req.body.forum._id, { $inc: { vote_count: -1 } });
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body).then(
        (doc) => {
            res.json(doc);
            next();
        }
    );
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body).then(
        (doc) => {
            res.json(doc);
            next();
        }
    );
});
module.exports = router;
