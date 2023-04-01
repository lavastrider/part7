//import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const newButtStyle = {
  backgroundColor: '#DEDEDB',
  borderColor: 'black',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana'
}

const textStyle = {
  fontFamily: 'Tillana'
}

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  return (
    <div style={textStyle}>
      <h2>Log in to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>
              username:
          <input
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder='Enter username'
          />
        </div>
        <div>
              password:
          <input
            id='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder='Enter password'
          />
        </div>
        <Button id="login-button" type="submit" style={newButtStyle}>login</Button> <button>sign up</button>
      </form>
    </div>
  )
}

export default LoginForm