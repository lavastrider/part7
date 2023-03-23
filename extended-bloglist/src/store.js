import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notifReducer
  }
})

console.log(store.getState(), 'is store get state in store.js')
//console.log(store.getState().blogs, 'is store get state blogs in store.js')
//console.log(store.getState().blogs.PromiseResult, 'is store get state blogs promise result in store.js')

export default store