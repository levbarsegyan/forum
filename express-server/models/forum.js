const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var schema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
    creation_date: { type: String, required: true },
});
module.exports = mongoose.model('Forum', schema);
