import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenModel from "../model/token.js";

dotenv.config();
export const signupUser = async (request, response) => {
    try {
        // generate salt with bcrypt
        const salt = await bcrypt.genSalt();
        //generate hashed pass word which we store in our db
        let user = request.body;
        const hashedPass = await bcrypt.hash(user.password, salt);
        user = { name: user.name, email: user.email, password: hashedPass };
        let newUser = new userModel(user);
        let name = newUser.name;
        //save user in db in with userModel >> in userCollection 
        await newUser.save();
        return response.status(201).json({ statusCode: 200, message: `Hello Dear ${name} , Your signup has been successfully completed !!` });
    } catch (error) {
        return response.status(500).json({ message: "Error while signup the user!" });
    }
}


export const userLogin = async (request, response) => {
    try {

        let data = request.body;
       // console.log('data',data);
        // first check email id exist in our database or not 
        let user = await userModel.findOne({ email: data.email });
       // console.log("user",user);
        if (!user) {
            return response.status(400).json({ statusCode: 400, message: "User Does not Exist !" })
        }
        // compare email and password from backend to client 
        let emailMatch= (user.email === data.email) ? true: false;
       // console.log("email Match",emailMatch);
        // here firstly pass the request.body.password and then hash password
        let passwordMatch= await bcrypt.compare(data.password, user.password);
       // console.log("Password match",passwordMatch);
        if(emailMatch ===true && passwordMatch===true){
            let accessToken= jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
            let refreshToken= jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            //save token in db from tokenModel  >> in tokenCollection
            const newToken= tokenModel({token: refreshToken});
           await newToken.save();
            response.status(200).json({statusCode:200, 
                message:"You have successfully Logged in",
                accessToken:accessToken,
                refreshToken:refreshToken,
                name:user.name,
                email:user.email});

        }else{
            return response.status(200).json({statusCode:400, message:"Invalid login credentials !"});
        }

    } catch (error) {
        return response.status(500).json({ statusCode: 500, message: "Some Error Occured!" })
    }

}