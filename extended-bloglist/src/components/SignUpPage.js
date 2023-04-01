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
  borderColor: 'navy',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
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
    dispatch(newUser(acctObj))
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
      <p>{message}</p>
      <form onSubmit={makeAcct}>
        <div>
          Username:
          <input {...usernomen} />
        </div>
        <div>
          Name:
          <input {...personNomen} />
        </div>
        <div>
          Password:
          <input {...passing}/>
        </div>
        <Button type="submit" style={submitStyle}>create account</Button>
      </form>
    </div>
  )
}

export default SignUpPage