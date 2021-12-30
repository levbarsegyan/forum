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
    console.log("1 In create " + req.body);
    console.log("3 In create " + req.body.title);
    let postInformation = new ForumData(req.body)
    console.log("2 In create " + postInformation);
    postInformation.save();
});
router.post('/delete-post', function (req, res, next) {
});
router.post('/edit-post', function (req, res, next) {
});
router.get('/list', function (req, res, next) {
    ForumData.find()
        .then(function (doc) {
            res.json( doc);
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
router.get('/get-post', function (req, res, next) {
});
module.exports = router;
