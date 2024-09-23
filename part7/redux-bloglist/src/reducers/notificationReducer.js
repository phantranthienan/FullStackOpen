import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export default notificationSlice.reducer

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(setMessage(notification))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 3000)
  }
}
