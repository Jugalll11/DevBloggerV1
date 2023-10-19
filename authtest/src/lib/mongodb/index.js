import mongoose from "mongoose";

export const connectMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log("Connected")
    }
    catch(err){
        console.log("Not connected to mongodb because: ", err)
    }
}