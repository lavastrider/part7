//import PropTypes from 'prop-types'
import loginService from '../services/login'
import { setNotif } from '../reducers/notifReducer'
import { userData, userToken } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const newButtStyle = {
  backgroundColor: '#DEDEDB',
  borderColor: 'black',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
}

const hrStyle = {
  //padding: '10',
  color: '#94B9F0',
  borderWidth: 2
}

const textStyle = {
  fontFamily: 'Tillana',
  textAlign: 'center'
}

const LoginPage = () => {

  const username = useField('userNomen')
  const password = useField('passing')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const usering = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(usering) )
      //console.log(usering, 'is usering in handlelogin') <- this has value
      dispatch(userData(usering))
      dispatch(userToken(usering))
      dispatch(setNotif({ msg: `Welcome ${usering.personName}!`, variant: 'success' }, 5))
      navigate('/blogs')
    } catch (exception) {
      dispatch(setNotif({ msg: 'Error: Wrong username or password', variant: 'error' }, 5))
      //console.log(exception, 'is exception')
    }
  }

  const forgotPass = (event) => {
    event.preventDefault()
    window.alert('Sorry, I warned you that your password cannot be recovered!')
    navigate('/signup')
  }


  return (
    <div style={textStyle}>
      <h2>Log in</h2>
      <hr style={hrStyle}></hr>
      <form onSubmit={handleLogin}>
        <div>
          <input {...username}
            placeholder='Enter username'
          />
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input {...password}
            placeholder='Enter password'
          />
        </div>
        <hr style={hrStyle}></hr>
        <Button type="submit" style={newButtStyle}>login</Button> <Button onClick={(event) => forgotPass(event)} style={newButtStyle}>forgot password?</Button>
      </form>
    </div>
  )
}

export default LoginPage