import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    dispatch(setUser(user))
    return user
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(clearUser())
  }
}

export default userSlice.reducer
