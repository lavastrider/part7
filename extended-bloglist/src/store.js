import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    userInfo: userReducer,
    notification: notifReducer,
    comments: commentReducer
  }
})

console.log(store.getState(), 'is store get state in store.js')
//console.log(store.getState().blogs, 'is store get state blogs in store.js')
//console.log(store.getState().blogs.PromiseResult, 'is store get state blogs promise result in store.js')

export default store