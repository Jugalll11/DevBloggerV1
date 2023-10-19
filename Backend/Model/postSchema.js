const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    author:{
        type:String,
        required:true
    },
    content:{
        type: String,
        required: true
    },
    likes:{
        type:Array,
        defualt:[]
    },
    comments:{
        type: Number,
        default:0
    }
},  { timestamps: true });

const PostModel =  mongoose.model('Post', postSchema);
module.exports = PostModel;