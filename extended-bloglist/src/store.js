import { configureStore } from '@reduxjs/toolkit'

const store = configureStore()

//const store = configureStore({
//  reducer: {
//    anecdotes: anecdoteReducer,
//    searchTerm: filterReducer,
//    notification: notificationReducer
//  }  
//})

console.log(store.getState(), 'is store get state in store.js')

export default store