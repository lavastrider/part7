import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const paddingTextStyle = {
  paddingRight: 5,
  fontFamily: 'Tillana',
  color: 'black',
}

const paddingTextLinkStyle = {
  paddingRight: 5,
  fontFamily: 'Tillana',
  color: 'black',
  cursor: 'move'
}

const logOutStyle = {
  backgroundColor: '#C7C7C3',
  borderColor: 'black',
  borderRadius: 25,
  borderWidth: 3,
  color: 'black',
  fontFamily: 'Tillana',
  cursor: 'move'
}

const bgStyle = {
  backgroundColor: '#C7C7C3'
}

//instead of black bar, maybe have bg images of collage of piles of books?

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
      <div style={bgStyle}>
        <Navbar collapseOnSelect expand="lg" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/blogs">list of blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/signup">sign up</Link>
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/login">login</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
  else {
    return (
      <div style={bgStyle}>
        <Navbar collapseOnSelect expand="lg" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/create">post a link</Link>
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as='span'>
                <Link style={paddingTextLinkStyle} to="/blogs">list of blogs</Link>
              </Nav.Link>
              <p style={paddingTextStyle}> <strong>{user.loggedUser.personName}</strong> <Button onClick={() => logOut()} style={logOutStyle}>log out</Button> </p>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Menu