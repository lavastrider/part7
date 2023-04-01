import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const paddingTextStyle = {
  paddingRight: 5,
  fontFamily: 'Tillana'
}

const logOutStyle = {
  backgroundColor: 'gray',
  borderColor: 'white',
  borderRadius: 25,
  borderWidth: 3,
  color: 'white',
  fontFamily: 'Tillana'
}

const Menu = () => {

  const user = useSelector(state => state.userInfo)
  //console.log(user, 'is user use selector userinfo in menu')

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

  if (user.length === 0 || typeof user.token === 'undefined') {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="repsonsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/blogs">list of blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/signup">sign up</Link>
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
              <em style={paddingTextStyle}>{user.loggedUser.personName} is logged in <Button onClick={() => logOut()} style={logOutStyle}>log out</Button></em>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/create">post a link</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as='span'>
              <Link style={paddingTextStyle} to="/blogs">list of blogs</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu