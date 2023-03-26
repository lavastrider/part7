import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = () => {

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  const logOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      if (!(window.localStorage.getItem('loggedBlogAppUser'))) {
        window.location.reload(true)
      }
    } catch (exception) {
      console.log('we have an error')
    }
  }

  const padding = {
    paddingRight: 5
  }

  if (user.length === 0) {
    return (
      <div>
        <div>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/blogs">blogs</Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <p>{user.personName} is logged in <button onClick={logOut}>logout</button></p>
        </div>
      </div>
    )
  }
}

export default Menu