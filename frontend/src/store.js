import { configureStore } from '@reduxjs/toolkit'
import authReducer from './featurses/Autho/authoSlice'
 import habitsReducer from './featurses/Habit/habitsSlice'
// import progressReducer from './featurses/progress/progressSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
     habits: habitsReducer
    // progress: progressReducer,
  },
})