//import { useState, useEffect, useRef } from 'react'
//import { useEffect } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { useDispatch } from 'react-redux'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Users from './components/Users'
import Create from './components/Create'
import SignUpPage from './components/SignUpPage'
import UserBlogs from './components/UserBlogs'
//import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
//import { userData, userToken, newUser } from './reducers/userReducer'
import { userData, userToken } from './reducers/userReducer'
import { initializeComms } from './reducers/commentReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//const Footer = () => {
//  return(
//    <footer><p>insert image of a yellow boxfish</p></footer>
//  )
//}

const vertLineStyle = {
  // red line
  borderLeft: '5px red double',
  //position: 'absolute',
  //float: 'left',
  width: '100%',
  height: '100%',
  //marginLeft: '100px',
  marginLeft: '11%',
  //paddingRight: '500px',
  paddingRight: '10%',
  //display: 'inline-block',
  backgroundColor: '#DEDEDB'
}

const vertLineStyle1 = {
  // blue line
  borderRight: '5px solid rgba(148,185,240,0.4)',
  //position: 'absolute',
  //float: 'left',
  width: '100%',
  height: '100%',
  //marginRight: '20%',
  //paddingRight: '500px',
  //paddingRight: '1%',
  //paddingLeft: '10%',
  //display: 'inline-block',
  backgroundColor: '#DEDEDB'
}

const mainBgStyle = {
  backgroundColor: '#DEDEDB',
  width: '100%',
  height: '100%',
  //position: 'absolute',
  paddingRight: '200px',
  //backgroundRepeat: 'repeatY'
}

const fontSizeStyle = {
  fontSize: '45px'
}

const hrTopStyle = {
  border: '2px solid #94B9F0',
  width: '100%',
  position: 'absolute',
  //marginLeft: '-100px',
  marginLeft: '-10%',
  //paddingRight: '100px'
}

const titleStyle = {
  color: 'black',
  textAlign: 'center',
  //marginLeft: '477px',
  textShadow: 'white',
  fontFamily: 'Tillana'
}

const imgFlipStyle = {
  transform: 'scaleX(-1)'
}


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeComms())
  }, [dispatch])

  useEffect(() => {
    //here is where we do login stuff
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    //console.log(loggedUserJSON, 'is logged user')
    if (loggedUserJSON) {
      const usered = JSON.parse(loggedUserJSON)
      //console.log(usered, 'is usered in useeffect in app')
      dispatch(userData(usered))
      //console.log(user, 'is user in useeffect')
      dispatch(userToken(usered))
      dispatch(setNotif(`Welcome ${usered.personName}!`), 5)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const usering = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(usering) )
      //console.log(usering, 'is usering in handlelogin') <- this has value
      dispatch(userData(usering))
      dispatch(userToken(usering))
      setUsername('')
      setPassword('')
      dispatch(setNotif(`Welcome ${usering.personName}!`), 5)
    } catch (exception) {
      dispatch(setNotif('Error: Wrong username or password', 5))
      //console.log(exception, 'is exception')
    }
    //navigate('/blogs')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  //const imageStyle = {
  //width: '100%',
  //height: '100%',
  //backgroundImage: 'url("https://www.textures4photoshop.com/tex/thumbs/seamless-notebook-paper-texture-free-thumb36.jpg")',
  //backgroundColor: 'rgb(239,214,95)',
  //backgroundColor: 'rgb(228,220,199)'
  //backgroundColor: '#DEDEDB',
  //display: 'block'
  //}

  const titleImg = 'https://png.pngtree.com/png-clipart/20210308/original/pngtree-red-pencil-and-notebook-clipart-png-image_5748128.jpg'
  const girly = '*'
  const girly1 = '~'

  const user = useSelector(state => state.userInfo)
  //console.log(user, 'is user use selector userinfo in app')

  return (
    <Router>
      <div style={mainBgStyle}>
        <div style={vertLineStyle}>
          <div style={vertLineStyle1}>
            <Menu />
            <div style={titleStyle}>
              <h1 style={fontSizeStyle}>{girly1} <img src={titleImg} width='30' height='30'></img>{girly} Blogs {girly} <img src={titleImg} width='30' height='30' style={imgFlipStyle}></img> {girly1}</h1>
            </div>
            <hr style={hrTopStyle}></hr>
            <Notification />
            {(user.length === 0 || typeof user.token === 'undefined') && loginForm()}

            <Routes>
              <Route path="/" element={<BlogsList />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserBlogs />} />
              <Route path="/blogs" element={<BlogsList />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/create" element={<Create />} />
              <Route path="/signup" element={<SignUpPage />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App