import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Menu = () => {

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  const navigate = useNavigate()

  const logOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      if (!(window.localStorage.getItem('loggedBlogAppUser'))) {
        window.location.reload(true)
      }
      navigate('/signup')
    } catch (exception) {
      console.log('we have an error')
    }
  }

  const padding = {
    paddingRight: 5
  }

  if (user.length === 0) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="repsonsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/create">post a link</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/blogs">list of blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/signup">sign up</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  else {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="repsonsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as='span'>
              <em style={padding}>{user.personName} is logged in <button onClick={() => logOut()}>log out</button></em>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/create">post a link</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={padding} to="/blogs">list of blogs</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu