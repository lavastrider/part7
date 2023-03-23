//object will contain title, author, and url

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    appendBlogs(state, action){
      return state.concat(action.payload)
    },
    addVote(state, action){
      console.log(action, 'is action in replace phrase')
      const id = action.payload.id
      const phraseToReplace = state.find((word) => word.id === id)
      console.log(phraseToReplace, 'is phrasetoreplace in add vote')
      phraseToReplace.votes = action.payload.votes
    }
  }
})

export const { addVote, appendBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const books = await blogService.getAll()
    dispatch(appendBlogs(books))
  }
}

export const newBlogs = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlogs(newBlog))
  }
}

//export const addingVote = (id) => {
//  return async dispatch => {
//    const voted = await wordService.incVote(id)
//    dispatch(replacePhrase(voted))
//  }
//}

//export const deleteEntry = (id) => {
//
//
//}

export default blogSlice.reducer