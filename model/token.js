import mongoose from "mongoose";

const tokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})

const tokenModel=mongoose.model('tokenCollection',tokenSchema);
export default tokenModel;