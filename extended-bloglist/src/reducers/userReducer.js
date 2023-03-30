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
      const copyStateLogin = { ...state }
      copyStateLogin.loggedUser = action.payload
      return copyStateLogin
      //return state.concat(action.payload)
    },
    setToken(state, action) {
      console.log(JSON.parse(JSON.stringify(state)), 'is json json state in set token')
      console.log(action, 'is action in set token')
      const copyStateToken = { ...state }
      copyStateToken.token = action.payload
      return copyStateToken
      //return action.payload
    },
    appendUsers(state, action) {
      console.log(action, 'is action in append users')
      console.log(JSON.parse(JSON.stringify(state)), 'is json json state in append users')
      //const copyState = [ ...state ]
      const copyState = { ...state }
      console.log(copyState, 'is copy state in append users')
      //copyState.concat(action.payload)
      copyState.appendUsers = action.payload
      return copyState
      //return state.concat(action.payload)
    }
  }
})

export const { saveUser, setToken, appendUsers } = userSlice.actions

export const userData = (user) => {
  //will use save user reducer
  console.log(user, 'is user in userdata')
  return async dispatch => {
    const userInfo = user
    dispatch(saveUser(userInfo))
  }
}

export const userToken = (user) => {
  return async dispatch => {
    console.log(user, 'is user arg in user token in user reducer')
    const useToke = await blogService.setToken(user.token)
    console.log(user.token, 'is user dot token in usertoken in user reducer')
    console.log(useToke, 'is usetoke in usertoken in user reducer')
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
    console.log(newUserData, 'is new user data')
    dispatch(appendUsers(newUserData))
  }
}

export default userSlice.reducer