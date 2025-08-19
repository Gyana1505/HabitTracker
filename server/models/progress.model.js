import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.ObjectId,
    ref: 'Habit',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Prevent duplicate progress entries for same habit on same date
ProgressSchema.index({ habit: 1, date: 1 }, { unique: true });

export const Progress=mongoose.model("Progress",ProgressSchema);