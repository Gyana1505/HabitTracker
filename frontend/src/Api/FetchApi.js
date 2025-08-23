import axios from 'axios'

 const server='http://localhost:5000'
// Create axios instance
const api = axios.create({
  baseURL: server
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token 
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const registerUser = (userData) => api.post('/api/user/register', userData)
export const loginUser = (userData) => api.post('/api/user/login', userData)

// Habits API
// export const fetchHabits = () => api.get('/habits')
 export const createHabit = (habitData) => api.post('/api/habit/addhabit', habitData)
// export const updateHabit = (id, habitData) => api.put(`/habits/${id}`, habitData)
// export const deleteHabit = (id) => api.delete(`/habits/${id}`)

// // Progress API
// export const fetchProgress = (habitId) => api.get(`/progress/${habitId}`)
// export const markProgress = (progressData) => api.post('/progress', progressData)
// export const fetchProgressSummary = () => api.get('/progress/summary')

export default api