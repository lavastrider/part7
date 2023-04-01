import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
//import loginService from '../services/login'
import { useField } from '../hooks/index'
//import { userData, userToken, newUser } from '../reducers/userReducer'
import { newUser } from '../reducers/userReducer'
import { setNotif } from '../reducers/notifReducer'

const submitStyle = {
  backgroundColor: '#DEDEDB',
  borderColor: '#6F7378',
  //borderColor: '#5A5A5A',
  borderRadius: 25,
  borderWidth: 3,
  //color: '#6F7378',
  color: '#5A5A5A',
  fontFamily: 'Tillana'
}

const textMarginStyle = {
  //marginLeft: '1%',
  fontFamily: 'Tillana',
  textAlign: 'center',
  lineHeight: 0.8
}

const hrStyle = {
  //padding: '10',
  color: '#94B9F0',
  borderWidth: 2
}

const SignUpPage = () => {

  const usernomen = useField('username')
  const passing = useField('password')
  const personNomen = useField('personName')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //const handleLogin = async (user) => {
  //  const username = user.username
  //  const password = user.password
  //  //console.log(username, 'is user username assigned to username var in handlelogin in signup')
  //  //console.log(password, 'is user password assigned to password var in handlelogin in signup')
  //  const usering = await loginService.login({ username, password })
  //  window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(usering) )
  //  console.log(usering, 'is usering in handlelogin in signup')
  //  dispatch(userData(usering))
  //  dispatch(userToken(usering))
  //  //dispatch(setNotif(`Welcome ${usering.personName}!`), 5)
  //  console.log(user, 'is user in handlelogin in signup')
  //}

  const addAcct = (acctObj) => {
    dispatch(newUser(acctObj)).catch((error) => dispatch(setNotif(`Error: ${error.response.data.error}`, 5)))
    //dispatch(newUser(acctObj))
    //handleLogin(acctObj)
    navigate('/login')
    dispatch(setNotif('Success! Your account has been created.', 5))
  }

  const makeAcct = (event) => {
    event.preventDefault()
    addAcct({
      username: usernomen.value,
      personName: personNomen.value,
      password: passing.value
    })
    console.log('we fired the makeacct function')
  }

  const message = 'Register below to post a blog to the list of blogs!'
  return(
    <div>
      <p style={textMarginStyle}>{message}</p>
      <hr style={hrStyle}></hr>
      <form style={textMarginStyle} onSubmit={makeAcct}>
        <div>
          <input {...usernomen} placeholder='At least 3 characters'/>
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input {...personNomen} placeholder='Your name'/>
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input {...passing} placeholder='At least 16 characters'/>
          <p></p>
          <p>Save your password! It cannot be reset or recovered!</p>
        </div>
        <hr style={hrStyle}></hr>
        <Button type="submit" style={submitStyle}>create account</Button>
      </form>
      <hr style={hrStyle}></hr>
    </div>
  )
}

export default SignUpPage