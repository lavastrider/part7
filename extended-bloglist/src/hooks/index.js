import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  //console.log(type, 'is type in usefield')
  //console.log(value, 'is value in usefield')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = (event) => setMatches(event.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  })

  return matches
}
