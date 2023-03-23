//object will contain title, author, and url

import { createSlice } from '@reduxjs/toolkit'

//const getId = () => (100000 * Math.random()).toFixed(0)

//const asObject = (anecdote) => {
//  return {
//    content: anecdote,
//    id: getId(),
//    votes: 0
//  }
//}

const initialState = []

const blogSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    addVote(state, action){
      //console.log(JSON.parse(JSON.stringify(state)), 'is state in addVote in wordSlice')
      const id = action.payload
      //console.log(id, 'is action payload in add vote')
      const phraseToVote = state.find((word) => word.id === id)
      //console.log(phraseToVote, 'is phrase to vote') <- proxy junk
      //console.log(JSON.parse(JSON.stringify(phraseToVote)), 'is pTV with json')
      phraseToVote.votes += 1
      //console.log(JSON.parse(JSON.stringify(state)), 'is state in addVote in wordSlice after voting')
    },
    appendBlogs(state, action){
      return state.concat(action.payload)
    },
    replacePhrase(state, action){
      console.log(action, 'is action in replace phrase')
      const id = action.payload.id
      const phraseToReplace = state.find((word) => word.id === id)
      console.log(phraseToReplace, 'is phrasetoreplace in replace phrase')
      phraseToReplace.votes = action.payload.votes
    }
  }
})

export const { addVote, appendBlogs, replacePhrase } = blogSlice.actions

//export const initializeWords = () => {
//  return async dispatch => {
//    const words = await wordService.getAll()
//    dispatch(appendAnex(words))
//  }
//}

//export const newWords = (content) => {
//   return async dispatch => {
//     const newWord = await wordService.createNew(content)
//     dispatch(appendAnex(newWord))
//   }
//}

//export const addingVote = (id) => {
//  return async dispatch => {
//    const voted = await wordService.incVote(id)
//    dispatch(replacePhrase(voted))
//  }
//}

export default blogSlice.reducer