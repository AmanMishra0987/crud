import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
dotenv.config();

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;


mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`server is runing on port: ${PORT} `);
    });
  })
  .catch((error) => console.log(error));

  app.use("/api",route);
