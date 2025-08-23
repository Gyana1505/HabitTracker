import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addHabit, editHabit, clearError } from '../featurses/Habit/habitsSlice'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material'

const HabitForm = ({ open, onClose, editHabitData }) => {
  const dispatch = useDispatch()
  const { error, isLoading } = useSelector((state) => state.habits)
  const [formData, setFormData] = useState({
    name: editHabitData?.name || '',
    description: editHabitData?.description || '',
    targetDays: editHabitData?.targetDays || '',
  })

  React.useEffect(() => {
    if (editHabitData) {
      setFormData({
        name: editHabitData.name,
        description: editHabitData.description,
        targetDays: editHabitData.targetDays || '',
      })
    }
  }, [editHabitData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const habitData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      ...(formData.targetDays && { targetDays: parseInt(formData.targetDays) }),
    }

    if (editHabitData) {
      dispatch(editHabit({ id: editHabitData._id, habitData }))
        .unwrap()
        .then(() => {
          onClose()
        })
    } else {
      dispatch(addHabit(habitData))
        .unwrap()
        .then(() => {
          setFormData({ name: '', description: '', targetDays: '' })
          onClose()
        })
    }
  }

  const handleClose = () => {
    dispatch(clearError())
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editHabitData ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Habit Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Target Days (Optional)"
              name="targetDays"
              type="number"
              value={formData.targetDays}
              onChange={handleChange}
              inputProps={{ min: 1, max: 365 }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {editHabitData ? 'Update' : 'Add'} Habit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default HabitForm