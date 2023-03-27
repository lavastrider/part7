import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import userService from '../services/user'
//import { setNotif } from './notifReducer'

const initialState = []

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
    },
    appendUsers(state, action) {
      console.log(action, 'is action in append users')
      console.log(JSON.parse(JSON.stringify(state)), 'is json json state in append users')
      const copyState = { ...state }
      copyState.appendUsers = action.payload
      return copyState
      //return state.concat(action.payload)
    }
  }
})

export const { saveUser, setToken, appendUsers } = userSlice.actions

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

export const initializeUsers = () => {
  return async dispatch => {
    const userList = await userService.getAll()
    console.log(userList, 'is userList in get users')
    dispatch(appendUsers(userList))
  }
}

export const newUser = (user) => {
  return async dispatch => {
    const newUserData = await userService.create(user)
    dispatch(appendUsers(newUserData))
  }
}

export default userSlice.reducer