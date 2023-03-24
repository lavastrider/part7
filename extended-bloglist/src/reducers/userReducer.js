import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
//import { setNotif } from './notifReducer'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  isRegistered: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      console.log(JSON.parse(JSON.stringify(state)), 'is json json state in save user')
      console.log(state, 'is state in save user')
      console.log(action, 'is action in save user')
      return action.payload
    },
    setToken(state, action) {
      console.log(JSON.parse(JSON.stringify(state)), 'is json json state in set token')
      console.log(action, 'is action in set token')
      return action.payload
    }
  }
})

export const { saveUser, setToken } = userSlice.actions

export const userData = (user) => {
  //will use save user reducer
  //console.log(user, 'is user in userdata')
  return async dispatch => {
    const userInfo = user
    dispatch(saveUser(userInfo))
  }
}

export const userToken = (user) => {
  return async dispatch => {
    const useToke = await blogService.setToken(user.token)
    dispatch(setToken(useToke))
  }
}

export default userSlice.reducer