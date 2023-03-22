import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log(type, 'is type in usefield')
  console.log(value, 'is value in usefield')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  return {
    type,
    value,
    onChange
  }
}

export const useReset = () => {
  const dummyVal = 5
  
  return (
   dummyVal
  )

}