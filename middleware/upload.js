import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();
let userName = process.env.USER;
let password = process.env.PASSWORD;
// const URL=`mongodb+srv://${userName}:${password}@people-choice.tfocdef.mongodb.net/?retryWrites=true&w=majority`;
const URL = process.env.MONGO_URI || "mongodb://localhost:27017/people-choice";
const storage = new GridFsStorage({
  url: URL,
  options: { useNewURLParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];
    //memeType use for check the file extension
    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "Blog_Photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
