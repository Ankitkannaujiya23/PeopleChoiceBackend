import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();


export const jwtAuthenticateToken=(request,response,next)=>{
    const authToken= request.headers['token'];
    const token= authToken;

    if (token==null) {
        return response.status(401).json({statusCode:401, message:'token is missing!!!'});
    }
    // we need to import jwt, with the jwt.verify() we can verify the token it takes token and secret key from env file
    jwt.verify(token, process.env.ACCESS_SECRET_KEY,(error,userDetails)=>{
    // here if token verified then callback will be execute and it give error or user details
    if(error){
        return response.status(403).json({statusCode:403, message:"Token is invalid!!!"});
    }
    // if we do not get error then we pass the user detail in request.user
    request.user=userDetails;
    // and when your all work done in middleware you want to hit your api then you have to call next() function for api calling
    next();
    })
}