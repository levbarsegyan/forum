const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
router.post('/create', isUserAuthenticated(), function (req, res, next) {
});
router.delete('/delete-post', function (req, res, next) {
});
router.get('/list', function (req, res, next) {
});
router.delete('/delete-reply', function (req, res, next) {
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
router.get('/register', function (req, res, next) {
    addToDatabase(req, res);
});
module.exports = router;
