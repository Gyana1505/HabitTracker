import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { fetchHabits, createHabit, updateHabit, deleteHabit } from '../../Api/FetchApi'
import { createHabit } from '../../Api/FetchApi'
// Async thunks
export const getHabits = createAsyncThunk(
  'habits/getHabits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchHabits()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async (habitData, { rejectWithValue }) => {
    try {
      const response = await createHabit(habitData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editHabit = createAsyncThunk(
  'habits/editHabit',
  async ({ id, habitData }, { rejectWithValue }) => {
    try {
      const response = await updateHabit(id, habitData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeHabit = createAsyncThunk(
  'habits/removeHabit',
  async (id, { rejectWithValue }) => {
    try {
      await deleteHabit(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get habits
      .addCase(getHabits.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.isLoading = false
        state.habits = action.payload.data
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Failed to fetch habits'
      })
      // Add habit
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload.data)
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.error = action.payload?.error || 'Failed to add habit'
      })
      // Edit habit
      .addCase(editHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex(habit => habit._id === action.payload.data._id)
        if (index !== -1) {
          state.habits[index] = action.payload.data
        }
      })
      .addCase(editHabit.rejected, (state, action) => {
        state.error = action.payload?.error || 'Failed to update habit'
      })
      // Remove habit
      .addCase(removeHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(habit => habit._id !== action.payload)
      })
      .addCase(removeHabit.rejected, (state, action) => {
        state.error = action.payload?.error || 'Failed to delete habit'
      })
  },
})

export const { clearError } = habitsSlice.actions
export default habitsSlice.reducer