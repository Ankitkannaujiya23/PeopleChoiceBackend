import grid from "gridfs-stream";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const BaseUrl = process.env.BASE_URL || "http://localhost:5001";
// check if our db connected or not
const isConnected = mongoose.connection;
let gridfsBucket;
let gfs;
isConnected.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(isConnected.db, {
    bucketName: "fs",
  });
  // make readable format via gridfs-stream
  gfs = grid(isConnected.db, mongoose.mongo);
  gfs.collection("fs");
});

// for uploading an image file
export const fileUpload = (request, response) => {
  if (!request.file) {
    return response
      .status(404)
      .json({ statusCode: 404, message: "File not found!" });
  }

  const imageURL = `${BaseUrl}/file/${request.file.filename}`;

  return response.status(200).json({ statusCode: 200, imageURL: imageURL });
};

//for get image from mongoDB

export const getImage = async (request, response) => {
  try {
    // to get your image
    let file = await gfs.files.findOne({ filename: request.params.filename });
    // you need to download the image
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    return response
      .status(500)
      .json({ statusCode: 500, message: " Internal server error!" });
  }
};
