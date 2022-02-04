const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var schema = new Schema({
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    creation_date: { type: String, require: true },
    confirmed: { type: Boolean, required: true },
    role: {
        type: String, required: false, default: 'user'
    }
});
schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 12);
}
schema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}
module.exports = mongoose.model('User', schema);
