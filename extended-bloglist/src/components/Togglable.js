//import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { useState, forwardRef, useImperativeHandle } from 'react'

const buttonStyleCancel = {
  backgroundColor: '#858484',
  borderColor: 'red',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
}

const buttonStyleLogIn = {
  backgroundColor: '#858484',
  borderColor: 'green',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
}

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisib = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisib
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisib} style={buttonStyleLogIn}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisib} style={buttonStyleCancel}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable