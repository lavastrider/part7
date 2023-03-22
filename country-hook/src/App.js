import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
  if (name) {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response)=> {
        console.log(response.data, 'is response data in useeffect in usecountry')
        setCountry(response)
      })
      .catch(() => {
        setCountry('not found')
      })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  
  console.log(country, 'is country in Country component')
  
  
  if (!country) {
    return null
  } else if (country.data) {
    console.log(country.data, 'is country data')
    console.log('country data exists')
    country.found = true
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name.official} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flags.png} height='100' alt={`flag of ${country.data[0].name.official}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log('we arrived at fetch')
    console.log(country, 'is country from useCountry in app')
    console.log(name, 'is name in fetch')
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App