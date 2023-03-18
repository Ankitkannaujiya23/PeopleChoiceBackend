import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv'
import multer from 'multer';
dotenv.config();
let userName=process.env.USER;
let password=process.env.PASSWORD;

const storage= new GridFsStorage({
    url:`mongodb+srv://${userName}:${password}@people-choice.tfocdef.mongodb.net/?retryWrites=true&w=majority`,
    options:{useNewURLParser:true},
    file:(request,file)=>{
        const match=["image/png","image/jpg"];
        //memeType use for check the file extension 
        if(match.indexOf(file.memeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`
        }
        return{
            bucketName:"Blog_Photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});