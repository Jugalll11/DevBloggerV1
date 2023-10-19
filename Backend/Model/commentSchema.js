const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'PostModel'
    },
    content:{
        type:String,
        required:true
    }
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports= Comment;