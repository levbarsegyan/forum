const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var forumDataSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date_published: { type: String, required: true },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentData' }],
});
module.exports = mongoose.model('ForumData', forumDataSchema);
