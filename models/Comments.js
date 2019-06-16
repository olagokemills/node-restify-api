const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const CommentSchema = new mongoose.Schema({
      
    UserEmail:{
        type: String,
        required:true,
        trim:true
    },
    CommenterName:{
        type: String,
        trim:true
    },
    CommenterEmail:{
        type: String,
        trim:true
    },
    description:{
        type: String,
        trim: true
    }
});

CommentSchema.plugin(timestamp);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;