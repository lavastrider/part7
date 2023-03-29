//import { useState, useEffect, useRef } from 'react'
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

//const Home = () => {

//const navigate = useNavigate()

//const message = 'You are here because you tried to perform an action that only registered users can perform. Log in or click the button to register an account!'
//return(
//  <div>
//    <p>{message}</p>
//    <button onClick={() => navigate('/signup')}>register</button>
//  </div>
//)
//}

//const Footer = () => {
//  return(
//    <footer><p>insert image of a yellow boxfish</p></footer>
//  )
//}


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
      console.log(usered, 'is usered in useeffect in app')
      dispatch(userData(usered))
      //console.log(user, 'is user in useeffect')
      dispatch(userToken(usered))
      dispatch(setNotif(`Welcome ${user.personName}!`), 5)
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
      dispatch(setNotif(`Welcome ${user.personName}!`), 5)
    } catch (exception) {
      dispatch(setNotif('Error: Wrong username or password', 5))
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

  const imageStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'url("https://www.textures4photoshop.com/tex/thumbs/seamless-notebook-paper-texture-free-thumb36.jpg")',
    //backgroundColor: 'lightblue'
  }

  const titleStyle = {
    color: 'black',
    textAlign: 'center',
    textShadow: 'white'
  }

  const titleImg = 'https://png.pngtree.com/png-clipart/20210308/original/pngtree-red-pencil-and-notebook-clipart-png-image_5748128.jpg'
  const girly = '*'
  const girly1 = '~'

  const imgFlipStyle = {
    transform: 'scaleX(-1)'
  }

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  //if (user.length === 0) {
  return (
    <Router>
      <div>
        <div style={imageStyle}>
          <Menu />
          <div className="container">
            <div style={titleStyle}>
              <h2>{girly1} <img src={titleImg} width='30' height='30'></img>{girly} Blogs {girly} <img src={titleImg} width='30' height='30' style={imgFlipStyle}></img> {girly1}</h2>
            </div>
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