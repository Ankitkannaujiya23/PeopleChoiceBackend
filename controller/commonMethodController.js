import SubscribeModel from "../model/subscribeModel.js";

export const addSubscriber = async(request, response)=>{
try {

    let req= request.body;
    let data= await SubscribeModel.findOne({email:req.email});

    if(data){
        return response.status(200).json({statusCode:403, message:"You have already Subscribed !!"})
    }

    let subscriber= await new SubscribeModel(req);
    subscriber.save();
    
    return response.status(200).json({statusCode:200, message:"You have successfully Subscribed!!" })

} catch (error) {
    return response.status(500).json({statusCode:500, message:"Internal server Error !"})
}
}