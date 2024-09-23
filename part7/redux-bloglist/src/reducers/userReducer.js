import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
export default userSlice.reducer

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('user', user) // Debugging statement
      dispatch(setUser(user))
      dispatch(setNotification({message: `Welcome ${user.name}`, type: 'success'}))
    } catch (error) {
      console.error('Login failed:', error) // Debugging statement
      dispatch(setNotification({message: 'Wrong username or password', type: 'error'}))
    }
  }
}
