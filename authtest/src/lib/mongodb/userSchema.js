import mongoose, { Schema, models} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: false
    },
    pfp:{
        type: String,
        required: false,
        default:''
    }
},
    { timestamps: true }
)

const User = models.User || mongoose.model('User', userSchema);
export default User;
