import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log(type, 'is type in usefield')
  console.log(value, 'is value in usefield')
  
  const resetfield = (feld) => {
    Array.from(document.querySelectorAll('input')).forEach((input)=>input.value='')
    console.log(feld, 'is feld in resetfield')
    console.log(feld.value, 'is feld value')
    setValue('')
    feld.value = ''
    console.log(feld, 'is feld in resetfield after clearing value')
    console.log(feld.value, 'is feld value after clearing value')
    return feld
  }
  
  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  return {
    type,
    value,
    onChange,
    resetfield
  }
}

export const useReset = () => {
  const dummyVal = 5
  
  return (
   dummyVal
  )
}