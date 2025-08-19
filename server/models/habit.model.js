import mongoose from "mongoose";
const schema=new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please add a habit name'],
    trim: true,
    maxlength: [50, 'Habit name cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  targetDays: {
    type: Number,
    min: 1,
    max: 365
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{timeseries:true})
export const Habit=mongoose.model("Habit",schema);