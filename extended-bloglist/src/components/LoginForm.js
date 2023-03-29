//import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>
              username
          <input
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder='Enter username'
          />
        </div>
        <div>
              password
          <input
            id='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder='Enter password'
          />
        </div>
        <Button id="login-button" type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm