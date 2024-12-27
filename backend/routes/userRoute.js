import express from "express";
import { create, deleteData, getData, getOne, updateData } from "../controller/userController.js";

const route = express.Router();
route.post("/create", create);
route.get("/getdata", getData);
route.get("/getone/:id",getOne)
route.put("/updateData/:id",updateData)
route.delete("/deleteData/:id",deleteData)
export default route;
