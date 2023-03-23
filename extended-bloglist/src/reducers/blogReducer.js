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
      console.log(action, 'is action in addVote reducer')
      const id = action.payload.id
      console.log(id, 'is id in add vote')
      const phraseToReplace = state.find((word) => word.id === id)
      console.log(phraseToReplace, 'is phrasetoreplace in add vote reducer')
      console.log(phraseToReplace.likes, 'is pTR likes in add vote')
      phraseToReplace.likes = action.payload.likes
      console.log(phraseToReplace.likes, 'is pTR likes in add vote after made the same as action payload likes')
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

export const addingVote = (id, newObject) => {
  return async dispatch => {
    const voted = await blogService.update(id, newObject)
    console.log(voted, 'is voted in adding vote in reducer')
    dispatch(addVote(voted))
  }
}

//export const deleteEntry = (id) => {
//
//
//}

export default blogSlice.reducer