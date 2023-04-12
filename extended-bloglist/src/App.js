//import { useState, useEffect, useRef } from 'react'
import { useState, useEffect } from 'react'
//import { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from './hooks/index'
import Notification from './components/Notification'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Users from './components/Users'
import Create from './components/Create'
import SignUpPage from './components/SignUpPage'
import UserBlogs from './components/UserBlogs'
import LoginPage from './components/LoginPage'
//import { initializeBlogs, newBlogs } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
//import { userData, userToken, newUser } from './reducers/userReducer'
import { userData, userToken } from './reducers/userReducer'
import { initializeComms } from './reducers/commentReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import 'animate.css'

const vertLineStyle = {
  // red line
  borderLeft: '5px red double',
  position: 'absolute',
  //float: 'left',
  width: '100%',
  height: '100%',
  //marginLeft: '100px',
  //marginLeft: '3%',
  //paddingRight: '500px',
  paddingRight: '45%',
  //display: 'inline-block',
  backgroundColor: '#DEDEDB',
  overflow: 'auto'
}

const vertLineStyle1 = {
  // blue line
  borderRight: '5px solid rgba(148,185,240,0.4)',
  position: 'absolute',
  //float: 'left',
  width: '100%',
  height: '100%',
  //marginRight: '20%',
  //marginLeft: '-1%',
  //paddingRight: '500px',
  //paddingRight: '20%',
  //paddingLeft: '-10%',
  display: 'inline-block',
  backgroundColor: '#DEDEDB',
  overflow: 'auto'
}

const mainBgStyle = {
  backgroundColor: '#DEDEDB',
  width: '100%',
  height: '100%',
  //position: 'absolute',
  //paddingRight: '200px',
  //paddingRight: '16%',
  //textAlign: 'center',
  //backgroundRepeat: 'repeatY'
}

const hrTopStyle = {
  border: '2px solid #94B9F0',
  width: '100%',
  position: 'absolute',
  //marginLeft: '-100px',
  //marginLeft: '-12%',
  marginLeft: '-1%',
  //paddingRight: '100px'
}

//const imgFlipStyle = {
//  transform: 'scaleX(-1)'
//}

const containerStyle = {
  paddingLeft: '4%',
  paddingRight: '5%',
  //marginLeft: '-4%'
  marginLeft: '1%',
  marginRight: '20%'
}

const footStyle = {
  fontFamily: 'Tillana',
  lineHeight: 0.5
}

const Footer = () => {
  return (
    <div style={footStyle}>
      <p>Backend code is located <a href='https://github.com/lavastrider/react_course_part4_bloglist'>here</a></p>
      <p>Frontend code is located <a href='https://github.com/lavastrider/part7/tree/main/extended-bloglist'>here</a></p>
    </div>
  )
}

const App = () => {

  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 2500))
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const loaderElement = document.querySelector('.loader-container')
      if (loaderElement) {
        loaderElement.remove()
        setLoading(!isLoading)
      }
    })
  })

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
      dispatch(setNotif({ msg: `Welcome ${usered.personName}!`, variant: 'success' }, 5))
    }
  }, [])

  const isPhoneTablet = useMediaQuery('(max-width: 500px)')
  //console.log(isPhoneTablet, 'is isphonetablet')

  const titleStyle = {
    color: 'black',
    textAlign: 'center',
    //marginLeft: '477px',
    //textShadow: '2px 2px 8px #FF0000',
    textShadow: '2px 2px 8px #94B9F0',
    //textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF',
    fontFamily: 'Tillana',
    //fontSize: '45px'
    //fontSize: isPhoneTablet ? '6vw' : '8vw'
    fontSize: isPhoneTablet ? '35px' : '55px'
  }

  if (isLoading) {
    return null
  }

  return (
    <Router>
      <div className="container" style={containerStyle}>
        <div style={mainBgStyle}>
          <div style={vertLineStyle}>
            <div style={vertLineStyle1} className="container">
              <Menu />
              <h1 style={titleStyle}>List of Blogs</h1>
              <hr style={hrTopStyle}></hr>
              <Notification />

              <Routes>
                <Route path="/" element={<BlogsList />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserBlogs />} />
                <Route path="/blogs" element={<BlogsList />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/create" element={<Create />} />
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="/login" element={<LoginPage />}/>
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App