import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser } from '../../Api/FetchApi'

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData)
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData)
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
     message: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.user = null
      state.token = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.message = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.message = action.payload.message || "Registration successful" 
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Registration failed'
        state.error = action.payload?.message || "Registration failed"
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.error || 'Login failed'
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer