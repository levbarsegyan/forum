const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var commentDataSchema = new Schema({
    comment: { type: String, required: true },
    author: { type: String, required: true },
    date_published: { type: String, required: true },
});
module.exports = mongoose.model('CommentData', commentDataSchema);
