import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to anecdotes app!',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Enhanced action creator with timeout
export const setNotificationWithTimeout = (message, timeoutSeconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * 1000)
  }
}

export default notificationSlice.reducer
