import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/userSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password })).unwrap()
      blogService.setToken(user.token)
      dispatch(setNotification({ message: 'Logged in successfully', type: 'success' }))
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
