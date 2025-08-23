import express from "express";
import { isAuth } from "../middleware/Auth.js";
import { addHabit } from "../controller/habitController.js";

const router=express.Router();



export default router 