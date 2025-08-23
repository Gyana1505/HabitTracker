import TryCatch from "../middleware/trycatch.js";
import { Habit } from "../models/habit.model.js";


export const addHabit=TryCatch(async(req,res)=>{
 const {name,description,targetDays}=req.body;

const user=req.user._id
 const habit = await Habit.create({
   name:name,
   description:description,
   targetDays:targetDays,
   user:user
 })

  res.status(201).json({
    success: true,
    data: habit
  });

})