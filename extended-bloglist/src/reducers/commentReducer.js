import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { setNotif } from './notifReducer'

const initialState = []

const commSlice = createSlice({
  name: 'quips',
  initialState,
  reducers: {
    appendComments(state, action){
      console.log(action, 'is action in append comments in comment reducer')
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

export const { addVote, appendComments, removeBlog } = commSlice.actions

export const initializeComms = (id) => {
  return async dispatch => {
    const lequip = await commentService.getAll(id)
    dispatch(appendComments(lequip))
  }
}

export const newComment = (content) => {
  return async dispatch => {
    const newComm = await commentService.create(content).catch(() => dispatch(setNotif('There was an error when submitting the blog\'s information. Please try again.', 5)))
    if (newComm){
      dispatch(appendComments(newComm))
    }
  }
}

//export const addingVote = (id, newObject) => {
//  return async dispatch => {
//    const voted = await blogService.update(id, newObject)
//    console.log(voted, 'is voted in adding vote in reducer')
//    dispatch(addVote(voted))
//  }
//}

//export const removeEntry = (id) => {
//  console.log(id, 'is id in remove entry in reducer')
//  return async dispatch => {
//    const deletion = await blogService.deleteEntry(id)
//    console.log(deletion, 'is deletion in remove entry')
//    dispatch(removeBlog(id))
//  }
//}

export default commSlice.reducer