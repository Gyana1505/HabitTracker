import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHabits, removeHabit } from '../featurses/Habit/habitsSlice'
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Grid,
  Button,
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'
import HabitForm from './HabitForm'

// import LoadingSpinner from './LoadingSpinner'

const HabitList = () => {
  const dispatch = useDispatch()
  const { habits, isLoading } = useSelector((state) => state.habits)
  const [formOpen, setFormOpen] = useState(false)
  const [editHabit, setEditHabit] = useState(null)

  useEffect(() => {
    dispatch(getHabits())
  }, [dispatch])

  const handleEdit = (habit) => {
    setEditHabit(habit)
    setFormOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      dispatch(removeHabit(id))
    }
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditHabit(null)
  }

  if (isLoading) {
    return null
    // return <LoadingSpinner />
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">My Habits</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormOpen(true)}
        >
          Add Habit
        </Button>
      </Box>

      <Grid container spacing={2}>
        {habits.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No habits yet. Add your first habit to get started!</Typography>
          </Grid>
        ) : (
          habits.map((habit) => (
            <Grid item xs={12} sm={6} md={4} key={habit._id}>
              <Card
                sx={{
                  height: 220, // 🔹 fixed card height
                  display: 'flex',
                  flexDirection: 'column',
                  width:220
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" gutterBottom noWrap>
                      {habit.name}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => handleEdit(habit)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(habit._id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  {habit.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // show max 2 lines
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {habit.description}
                    </Typography>
                  )}

                  {habit.targetDays && (
                    <Chip
                      label={`Target: ${habit.targetDays} days`}
                      size="small"
                      variant="outlined"
                    />
                  )}

                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Created: {new Date(habit.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {formOpen && (
        <HabitForm
          open={formOpen}
          onClose={handleCloseForm}
          editHabitData={editHabit}
        />
      )}
    </Box>
  )
}

export default HabitList
