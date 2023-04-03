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

const hrStyle = {
  //padding: '10',
  color: '#94B9F0',
  borderWidth: 2
}

const textStyle = {
  fontFamily: 'Tillana',
  textAlign: 'center'
}

const LoginPage = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  return (
    <div style={textStyle}>
      <h2>Log in to the application</h2>
      <hr style={hrStyle}></hr>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder='Enter username'
          />
        </div>
        <hr style={hrStyle}></hr>
        <div>
          <input
            id='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder='Enter password'
          />
        </div>
        <hr style={hrStyle}></hr>
        <Button id="login-button" type="submit" style={newButtStyle}>login</Button> <Button style={newButtStyle}>forgot password?</Button>
      </form>
    </div>
  )
}

export default LoginPage