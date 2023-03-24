import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotif } from './notifReducer'

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
      console.log(JSON.parse(JSON.stringify(phraseToReplace)), 'is json json phrasetoreplace in add vote reducer')
      console.log(phraseToReplace.likes, 'is pTR likes in add vote')
      phraseToReplace.likes = action.payload.likes + 1
      console.log(phraseToReplace.likes, 'is pTR likes in add vote after made the same as action payload likes')
    },
    removeBlog(state, action){
      //console.log(action, 'is action in removeblog')
      const id = action.payload
      const blogWithoutDeleted = state.filter((diary) => diary.id !== id)
      return blogWithoutDeleted
    }
  }
})

export const { addVote, appendBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const books = await blogService.getAll()
    dispatch(appendBlogs(books))
  }
}

export const newBlogs = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content).catch(() => dispatch(setNotif('There was an error when submitting the blog\'s information. Please try again.', 5)))
    if (newBlog){
      dispatch(appendBlogs(newBlog))
    }
  }
}

export const addingVote = (id, newObject) => {
  return async dispatch => {
    const voted = await blogService.update(id, newObject)
    console.log(voted, 'is voted in adding vote in reducer')
    dispatch(addVote(voted))
  }
}

export const removeEntry = (id) => {
  console.log(id, 'is id in remove entry in reducer')
  return async dispatch => {
    const deletion = await blogService.deleteEntry(id)
    console.log(deletion, 'is deletion in remove entry')
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer