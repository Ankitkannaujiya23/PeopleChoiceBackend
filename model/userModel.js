import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    }
});

// pass the collection or table of database where you want to apply this schema

const userModel= mongoose.model('userCollection', userSchema);

export default userModel;