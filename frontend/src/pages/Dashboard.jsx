import React from 'react'
import { Container, Box } from '@mui/material'
import HabitList from '../component/HabitList'
// import ProgressTracker from '../components/ProgressTracker'

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* <ProgressTracker /> */}
        <p>progress tracker</p>
        <Box sx={{ mt: 4 }}>
          <HabitList />
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard