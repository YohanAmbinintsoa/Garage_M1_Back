const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    firstname:{ type: String, required: true },
    username:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address : {type : String , required : true} ,
    phone : {type : String , required : true } ,
    state: { type : Number , required : true}
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);