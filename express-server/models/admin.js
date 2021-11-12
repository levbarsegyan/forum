const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var schema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
});
schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 12);
}
schema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}
module.exports = mongoose.model('Admin', schema);
