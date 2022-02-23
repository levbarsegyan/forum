const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var forumDataSchema = new Schema({
    jwt: { type: String, required: true },
    date_added: { type: Date, required: true, default: Date.toString() }
});
module.exports = mongoose.model('ForumData', forumDataSchema);
