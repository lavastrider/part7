import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useField } from '../hooks/index'
import { newUser } from '../reducers/userReducer'
import { setNotif } from '../reducers/notifReducer'

const SignUpPage = () => {

  const usernomen = useField('username')
  const passing = useField('password')
  const personNomen = useField('personName')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addAcct = (acctObj) => {
    dispatch(newUser(acctObj))
    navigate('/create')
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
        <Button type="submit">create account</Button>
      </form>
    </div>
  )
}

export default SignUpPage