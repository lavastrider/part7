import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notify',
  initialState: '',
  reducers: {
    notifHide(state, action) {
      //console.log('we are in notifHide')
      console.log(action, 'is action in notifhide')
      console.log(JSON.parse(JSON.stringify(state)), 'is state in notifhide')
      return null
    },
    notifDisplay(state, action){
      console.log('we are in notifDisplay')
      console.log(action, 'is action in notifdisplay')
      return action.payload
    }
  }
})


export const { notifHide, notifDisplay } = notifSlice.actions

export const setNotif = (displaying, timer) => {
  console.log(displaying, 'is displaying in setNotif')
  //console.log(timer, 'is timer in setnotif')
  const timerMil = timer * 1000
  return async dispatch => {
    dispatch(notifDisplay(displaying))
    setTimeout(() => dispatch(notifHide(timerMil)), timerMil)
  }
}

export const setSucNotif = (displaying, timer) => {
  console.log(displaying, 'is displaying in setSucNotif')
  const timerMil = timer * 1000
  return async dispatch => {
    dispatch(notifDisplay(displaying))
    setTimeout(() => dispatch(notifHide(timerMil)), timerMil)
  }
}

export default notifSlice.reducer