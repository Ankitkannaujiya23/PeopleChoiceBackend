
import mongoose from "mongoose";

const subscribeSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
});

const SubscribeModel= mongoose.model('SubscribersCollection', subscribeSchema);
export default SubscribeModel;