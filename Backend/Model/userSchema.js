const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
        unique:true
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
        required: true,
        default:'https://firebasestorage.googleapis.com/v0/b/devblogger-396609.appspot.com/o/ProfilePhotos%2Fdefault.jpg?alt=media&token=1fb9756d-a3f5-4263-9da6-d1195f4245fd'
    },
    pfpExist:{
        type:Boolean,
        required:true,
        default: false
    },
    Bio:{
        type:String,
        default:"",
    }
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User;
