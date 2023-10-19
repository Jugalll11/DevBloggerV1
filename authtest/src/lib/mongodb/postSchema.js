import mongoose, { Schema, models} from "mongoose";

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
},  { timestamps: true });

const PostModel = models.Post || mongoose.model('Post', postSchema);
export default PostModel;