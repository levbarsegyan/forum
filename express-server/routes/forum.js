const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let forumDataSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date_published: { type: String, required: true },
});
var ForumData = mongoose.model('ForumData', forumDataSchema);
router.post('/create', function (req, res, next) {
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
            console.log(doc);
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
});
router.get('/get-reply', function (req, res, next) {
});
router.post('/get-post', function (req, res, next) {
    ForumData.findOne(req.body)
        .then(function (doc) {
            res.json(doc);
            next();
        });
});
module.exports = router;
