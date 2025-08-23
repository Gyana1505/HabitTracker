import express from "express";
import { isAuth } from "../middleware/Auth.js";
import { addHabit } from "../controller/habitController.js";

const router=express.Router();

router.post('/addhabit',isAuth,addHabit)
export default router