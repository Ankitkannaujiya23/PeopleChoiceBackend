import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../config.env" });
const dbConnection = async () => {
  try {
    let password = process.env.PASSWORD;
    let userName = process.env.USER;
    // let URL=`mongodb+srv://${userName}:${password}@people-choice.tfocdef.mongodb.net/?retryWrites=true&w=majority`;
    const URL =
      process.env.MONGO_URI || "mongodb://localhost:27017/people-choice";
    console.log({ URL });
    mongoose.set("strictQuery", false);
    mongoose
      .connect(URL, { useNewURLParser: true })
      .then(() => {
        console.log("Database Connected Successfully!!");
      })
      .catch((error) =>
        console.log("error while database connection!>>>>>", error, URL)
      );
  } catch (error) {
    console.log("error while database connection!!", error);
  }
};

export default dbConnection;
