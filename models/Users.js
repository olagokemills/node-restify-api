const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    phone:{
        type: String,
        trim:true,
    },
    level:{
        type: String,
        trim:true
    },
    city:{
        type: String,
        trim: true
    },
    interests:{
        type: Array,
        required:true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;