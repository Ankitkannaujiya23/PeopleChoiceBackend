import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routes/route.js";

const app = express();
dotenv.config({ path: "./config.env" });
console.log(process.env.HOST_PORT);
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
const PORT = process.env.HOST_PORT || 5002;
app.listen(PORT, () => console.log(`server is running on PORT  ${PORT}`));

dbConnection();
