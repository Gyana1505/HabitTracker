import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './component/Navbar'
import Login from "./pages/Login"
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'

function App() {
 const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path='/register' element={<Register/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/>
             <Route path='/analytics' element={<Analytics/>}/>
          </Routes>
        </div>
      </Router>
    


  </ThemeProvider>
  )
}

export default App
