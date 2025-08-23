import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { markProgress, fetchProgressSummary } from '../../services/api'

// Async thunks
export const markHabitProgress = createAsyncThunk(
  'progress/markProgress',
  async (progressData, { rejectWithValue }) => {
    try {
      const response = await markProgress(progressData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProgressSummary = createAsyncThunk(
  'progress/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProgressSummary()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progressData: {},
    summary: [],
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
      // Mark progress
      .addCase(markHabitProgress.fulfilled, (state, action) => {
        const { habit, date, completed } = action.payload.data
        if (!state.progressData[habit]) {
          state.progressData[habit] = {}
        }
        state.progressData[habit][date] = completed
      })
      .addCase(markHabitProgress.rejected, (state, action) => {
        state.error = action.payload?.error || 'Failed to mark progress'
      })
      // Get progress summary
      .addCase(getProgressSummary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProgressSummary.fulfilled, (state, action) => {
        state.isLoading = false
        state.summary = action.payload.data
      })
      .addCase(getProgressSummary.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Failed to fetch progress summary'
      })
  },
})

export const { clearError } = progressSlice.actions
export default progressSlice.reducer