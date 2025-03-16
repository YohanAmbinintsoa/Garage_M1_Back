const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    firstname:{ type: String, required: true },
    username:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    role:{type:[], required:true}
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
module.exports = mongoose.model('User', UserSchema);