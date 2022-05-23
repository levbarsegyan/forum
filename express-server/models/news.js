const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var newsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true, default: 'Admin' },
    date: { type: Date, required: true }
});
module.exports = mongoose.model('NewsData', newsSchema);
