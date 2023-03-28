//import { useState, useEffect, useRef } from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { useDispatch } from 'react-redux'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
//import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Users from './components/Users'
import { useField } from './hooks/index'
import { initializeBlogs, newBlogs } from './reducers/blogReducer'
//import { initializeBlogs } from './reducers/blogReducer'
import { setNotif } from './reducers/notifReducer'
import { userData, userToken, newUser } from './reducers/userReducer'
import { initializeComms } from './reducers/commentReducer'
//import {
//  BrowserRouter as Router,
//  Routes, Route, Link, useParams,
//  useNavigate
//} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'

const Create = () => {
  const title = useField('title')
  const author = useField('author')
  const site = useField('url')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addBlog = (blogObject) => {
    dispatch(newBlogs(blogObject))
    navigate('/blogs')
    dispatch(setNotif(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`, 5))
  }

  const createBlogObj = (event) => {
    event.preventDefault()
    addBlog({
      title: title.value,
      author: author.value,
      url: site.value,
      likes: 0
    })
    console.log('we are in create blog object')
  }

  return(
    <div className="container">
      <form onSubmit={createBlogObj}>
        <div>
          Title:
          <input {...title} placeholder="What's the title?"/>
        </div>
        <div>
          Author:
          <input {...author} placeholder="Who wrote it?"/>
        </div>
        <div>
          Link:
          <input {...site} placeholder="https://..."/>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

const Home = () => {

  const navigate = useNavigate()

  const message = 'You are here because you tried to perform an action that only registered users can perform. Log in or click the button to register an account!'
  return(
    <div>
      <p>{message}</p>
      <button onClick={() => navigate('/signup')}>register</button>
    </div>
  )
}

const SignUpPage = () => {

  const usernomen = useField('username')
  const passing = useField('password')
  const personNomen = useField('personName')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addAcct = (acctObj) => {
    dispatch(newUser(acctObj))
    navigate('/create')
    dispatch(setNotif('Success! Your account has been created.', 5))
  }

  const makeAcct = (event) => {
    event.preventDefault()
    addAcct({
      username: usernomen.value,
      personName: personNomen.value,
      password: passing.value
    })
    console.log('we fired the makeacct function')
  }

  const message = 'Register below to post a blog to the list of blogs!'
  return(
    <div>
      <p>{message}</p>
      <form onSubmit={makeAcct}>
        <div>
          Username:
          <input {...usernomen} />
        </div>
        <div>
          Name:
          <input {...personNomen} />
        </div>
        <div>
          Password:
          <input {...passing}/>
        </div>
        <button type="submit">create account</button>
      </form>
    </div>
  )

}

const UsersBlogs = () => {
  const id = useParams().id
  console.log(id, 'is id in usersblogs')

  const bloggies = useSelector(state => state.blogs)
  console.log(bloggies, 'is bloggies')

  if (bloggies.length > 0) {
    //find user that has same id as id
    //save that user info to nomen

    var nomen = ''
    const posterBlogs = []

    //put blogs the user has posted into array
    for (let j = 0; j < bloggies.length; j++) {
      //if the user of the blog isn't null
      if (bloggies[j].user){
        //console.log(bloggies[j].user, 'is bloggies j user when making sure it isn not null')
        //if the id of the blog poster is the same as the id from saved user
        if (bloggies[j].user.id === id) {
          //console.log(bloggies[j].user, 'is bloggies j user when the user id equals id from params')
          nomen = bloggies[j].user.personName
          posterBlogs.push(bloggies[j].title)
        }
      }
    }

    //console.log(posterBlogs, 'is poster blogs')
    //const phrases = anecdotes.find((words) => words.id=== Number(id))
    //could do above for posterBlogs
    //will decide later

    return (
      <div className="container">
        <h1>{nomen}</h1>
        <h2>added blogs</h2>
        {posterBlogs.map((posting, ind) => {
          return (
            <ul key={ind}>
              <li>{posting}</li>
            </ul>
          )
        })}
      </div>
    )
  }

  return (
    <p>loading...</p>
  )
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

  const user = useSelector(state => state.userInfo)
  console.log(user, 'is user use selector userinfo')

  //if (user.length === 0) {
  return (
    <Router>
      <div>
        <Menu />
        <div className="container">
          <h2>Blogs</h2>
          <Notification />
          {user.length === 0 && loginForm()}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UsersBlogs />} />
            <Route path="/blogs" element={<BlogsList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/create" element={<Create />} />
            <Route path="/signup" element={<SignUpPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App