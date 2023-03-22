import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  //console.log(type, 'is type in usefield')
  //console.log(value, 'is value in usefield')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const reset = () => {
    setValue('')
    console.log('we did the resetfield function')
    console.log(value, 'is value in resetField')
  }
  
  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useReset = () => {
  const dummyVal = 5
  
  return (
   dummyVal
  )
}