import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../store/userSlice'
import { setNotification } from '../store/notificationSlice'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification({ message: 'Logged out successfully', type: 'success' }))
  }

  return (
    <div style={{ background: 'lightgrey', padding: 10 }}>
      <Link to="/" style={{ marginRight: 10 }}>blogs</Link>
      <Link to="/users" style={{ marginRight: 10 }}>users</Link>
      <span style={{ marginRight: 10 }}>
        {user.name} logged in
      </span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
