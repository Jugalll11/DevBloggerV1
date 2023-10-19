const mongoose = require('mongoose')

const CommunitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
        default:""
    },
    photo:{
        type:String,
        required: true,
        default:""
    }
})

const CommunityModel = mongoose.model('Community', CommunitySchema);
module.exports = CommunityModel;